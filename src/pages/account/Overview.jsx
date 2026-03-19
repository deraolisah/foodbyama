// pages/account/Overview.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaHistory, FaSpinner, FaClock, FaShoppingBag } from 'react-icons/fa';

const AccountOverview = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSpent: 0,
    averageOrder: 0,
    favoriteItems: []
  });

  useEffect(() => {
    loadUserOrders();
  }, [user]);

  const loadUserOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/orders?email=${encodeURIComponent(user.email)}`
      );
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders || []);
        calculateStats(data.orders || []);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (orders) => {
    if (orders.length === 0) return;

    const total = orders.reduce((sum, order) => 
      sum + (order.pricing?.total || order.grandTotal || 0), 0
    );

    // Count item frequencies
    const itemCounts = {};
    orders.forEach(order => {
      order.items?.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
      });
    });

    const favoriteItems = Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

    setStats({
      totalSpent: total,
      averageOrder: total / orders.length,
      favoriteItems
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <FaSpinner className="animate-spin text-3xl text-primary mx-auto mb-3" />
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-orange-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.fullName.split(' ')[0]}!</h2>
        <p className="opacity-90">
          {orders.length === 0 
            ? 'Ready to place your first order?' 
            : `You've placed ${orders.length} order${orders.length > 1 ? 's' : ''} with us.`}
        </p>
      </div>

      {/* Stats Grid */}
      {orders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(stats.totalSpent)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Average Order</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(stats.averageOrder)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Member Since</p>
            <p className="text-2xl font-bold text-primary">
              {formatDate(user.memberSince || user.createdAt)}
            </p>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          {orders.length > 0 && (
            <Link to="/account/orders" className="text-primary hover:underline text-sm">
              View All →
            </Link>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <FaHistory className="text-5xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
            <Link
              to="/shop"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <Link
                key={order._id}
                to={`/account/orders/${order._id}`}
                className="block p-3 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">#{order._id.slice(-8).toUpperCase()}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {formatDate(order.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaShoppingBag className="text-xs" />
                        {order.items?.length || 0} items
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      {formatPrice(order.pricing?.total || order.grandTotal)}
                    </p>
                    <p className={`text-xs mt-1 ${
                      order.status === 'delivered' ? 'text-green-600' :
                      order.status === 'cancelled' ? 'text-red-600' :
                      'text-orange-600'
                    }`}>
                      {order.status || 'Pending'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Loyalty Preview */}
      {user.loyaltyPoints > 0 && (
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Your Loyalty Points</p>
              <p className="text-3xl font-bold">{user.loyaltyPoints} pts</p>
              <p className="text-sm opacity-90 mt-2">
                Worth {formatPrice(user.loyaltyPoints)} on your next order
              </p>
            </div>
            <Link
              to="/account/loyalty"
              className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              View Benefits
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountOverview;