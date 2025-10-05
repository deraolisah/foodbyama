// pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaStar, FaHistory, FaSpinner } from 'react-icons/fa';

const Profile = () => {
  const { user, setUser, getUserProfile, getUserOrders, isLoading, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user.id) return;
    
    setProfileLoading(true);
    try {
      // Load full user profile if we only have basic user data
      if (!user.fullName || !user.email) {
        const userProfile = await getUserProfile(user.id);
        // console.log('✅ User profile loaded:', userProfile);
      }
      
      // Load user orders
      const userOrders = await getUserOrders(user.id);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  // If no user but we have user ID in localStorage, try to load it
  useEffect(() => {
    const checkStoredUser = async () => {
      const savedUser = localStorage.getItem('foodbyama_user');
      if (savedUser && !user) {
        try {
          const userData = JSON.parse(savedUser);
          if (userData.id) {
            setUser(userData);
          }
        } catch (error) {
          console.error('Error loading stored user:', error);
        }
      }
    };
    
    checkStoredUser();
  }, [user, setUser]);



  if (profileLoading) {
    return (
      <div className="container py-8 text-center">
        <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
        <p>Loading your profile...</p>
      </div>
    );
  }


  if (!user) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="mb-6">You need to be logged in to view your profile.</p>
        <Link to="/auth" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
          Login / Sign Up
        </Link>
      </div>
    )
  }
  

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.fullName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {user.fullName || 'FoodByAma Customer'}
              </h1>
              <p className="text-gray-600">{user.email || 'No email provided'}</p>
              <p className="text-sm text-gray-500">
                {user.isGuest ? 'Guest Account' : 'Member'} • {orders.length} orders
              </p>
              {user.isGuest && (
                <div className="mt-1 w-fit bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                  <p className="text-yellow-800 text-xs">
                    <strong>Guest Account:</strong> Create a password to secure your account.
                  </p>
                </div>
              )}
            </div>
            <button onClick={() => logout()} className="cursor-pointer"> Logout </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaUser className="inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'orders'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaShoppingBag className="inline mr-2" />
            My Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('loyalty')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'loyalty'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaStar className="inline mr-2" />
            Loyalty ({user.loyaltyPoints || 0} pts)
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Account Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <p><strong>Name:</strong> {user.fullName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Member since:</strong> {new Date(user.memberSince).toLocaleDateString()}</p>
                  </div>
                  
                  {user.isGuest && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800">
                        <strong>Guest Account:</strong> Create a password to save your order history and earn loyalty rewards.
                      </p>
                      <button className="mt-2 bg-primary text-white px-4 py-2 rounded-lg text-sm">
                        Create Password
                      </button>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Order Summary</h3>
                  <div className="space-y-2">
                    <p><strong>Total Orders:</strong> {user.totalOrders || 0}</p>
                    <p><strong>Loyalty Points:</strong> {user.loyaltyPoints || 0}</p>
                    <p><strong>Account Type:</strong> {user.isGuest ? 'Guest' : 'Full Member'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold mb-4">My Orders</h2>
              {isLoading ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <FaHistory className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No orders yet</p>
                  <Link to="/menu" className="text-primary hover:underline mt-2 inline-block">
                    Start shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₦{order.pricing.total?.toLocaleString()}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{order.orderType} • {order.paymentStatus}</p>
                        <Link 
                          to={`/orders/${order._id}`} 
                          className="text-primary hover:underline text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'loyalty' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Loyalty Program</h2>
              <div className="bg-gradient-to-r from-primary to-purple-600 rounded-lg p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">{user.loyaltyPoints || 0} Points</h3>
                    <p>Earn 1 point for every ₦100 spent</p>
                  </div>
                  <FaStar className="text-4xl" />
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3">How it works:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• 1 point = ₦1 discount on future orders</li>
                  <li>• Points never expire</li>
                  <li>• Earn double points on your birthday month</li>
                  <li>• Redeem points at checkout</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;