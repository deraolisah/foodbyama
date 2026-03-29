// // pages/Account.jsx
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   FaUser, 
//   FaShoppingBag, 
//   FaStar, 
//   FaHistory, 
//   FaSpinner,
//   FaSignOutAlt,
//   FaClock,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaEnvelope
// } from 'react-icons/fa';
// import { useOrder } from '../contexts/OrderContext';

// const Account = () => {
//   const { user, logout, } = useAuth();

  
//   const { initializePaystackPayment,
//       verifyPayment,
//       createOrder,
//       getOrder,
//       isLoading } = useOrder();

//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [error, setError] = useState('');

  
//   const navigate = useNavigate();

//   // Add this right after the component starts
//   console.log('Current user data:', user);
//   console.log('User from localStorage:', localStorage.getItem('foodbyama_user'));

//   // Load orders when user is available
//   useEffect(() => {
//     if (user?.email) {
//       loadUserOrders();
//     }
//   }, [user]);

//   const loadUserOrders = async () => {
//     setLoadingOrders(true);
//     setError('');
    
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/users/orders?email=${encodeURIComponent(user.email)}`
//       );
      
//       const data = await response.json();
      
//       if (data.success) {
//         setOrders(data.orders || []);
//       } else {
//         setError(data.error || 'Failed to load orders');
//       }
//     } catch (error) {
//       console.error('Error loading orders:', error);
//       setError('Failed to load your orders. Please try again.');
//     } finally {
//       setLoadingOrders(false);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-NG', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-NG', {
//       style: 'currency',
//       currency: 'NGN',
//       minimumFractionDigits: 0
//     }).format(price);
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'delivered':
//         return 'bg-green-100 text-green-800';
//       case 'processing':
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800';
//       case 'out for delivery':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Don't render anything if no user
//   if (!user) {
//     return null; // The modal will show instead
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container max-w-6xl mx-auto px-4">
//         {/* Account Header */}
//         <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
//                 {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold">{user.fullName}</h1>
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
//                   <span className="flex items-center text-gray-600 text-sm">
//                     <FaEnvelope className="mr-1" /> {user.email}
//                   </span>
//                   {user.phone && user.phone !== '0000000000' && (
//                     <span className="flex items-center text-gray-600 text-sm">
//                       <FaPhone className="mr-1" /> {user.phone}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <button
//               onClick={handleLogout}
//               className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
//             >
//               <FaSignOutAlt />
//               Logout
//             </button>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
//             <div className="bg-orange-50 rounded-lg p-4">
//               <p className="text-sm text-orange-600 mb-1">Total Orders</p>
//               <p className="text-2xl font-bold text-orange-700">{orders.length}</p>
//             </div>
//             <div className="bg-blue-50 rounded-lg p-4">
//               <p className="text-sm text-blue-600 mb-1">Loyalty Points</p>
//               <p className="text-2xl font-bold text-blue-700">{user.loyaltyPoints || 0}</p>
//             </div>
//             <div className="bg-green-50 rounded-lg p-4">
//               <p className="text-sm text-green-600 mb-1">Member Since</p>
//               <p className="text-lg font-bold text-green-700">
//                 {formatDate(user.createdAt || user.createdAt)}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//           <div className="flex border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex-1 px-4 py-3 font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors ${
//                 activeTab === 'overview'
//                   ? 'border-b-2 border-primary text-primary bg-orange-50'
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//             >
//               <FaUser />
//               <span className="hidden sm:inline">Overview</span>
//             </button>
//             <button
//               onClick={() => setActiveTab('orders')}
//               className={`flex-1 px-4 py-3 font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors ${
//                 activeTab === 'orders'
//                   ? 'border-b-2 border-primary text-primary bg-orange-50'
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//             >
//               <FaShoppingBag />
//               <span className="hidden sm:inline">My Orders</span>
//               {orders.length > 0 && (
//                 <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
//                   {orders.length}
//                 </span>
//               )}
//             </button>
//             <button
//               onClick={() => setActiveTab('loyalty')}
//               className={`flex-1 px-4 py-3 font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors ${
//                 activeTab === 'loyalty'
//                   ? 'border-b-2 border-primary text-primary bg-orange-50'
//                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
//               }`}
//             >
//               <FaStar />
//               <span className="hidden sm:inline">Loyalty</span>
//             </button>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {/* Overview Tab */}
//             {activeTab === 'overview' && (
//               <div>
//                 <h2 className="text-xl font-bold mb-4">Account Overview</h2>
                
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <h3 className="font-semibold text-gray-700">Personal Information</h3>
//                     <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                       <p><span className="text-gray-600">Full Name:</span> {user.fullName}</p>
//                       <p><span className="text-gray-600">Email:</span> {user.email}</p>
//                       {user.phone && user.phone !== '0000000000' && (
//                         <p><span className="text-gray-600">Phone:</span> {user.phone}</p>
//                       )}
//                       <p><span className="text-gray-600">Member Since:</span> {formatDate(user.memberSince || user.createdAt)}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <h3 className="font-semibold text-gray-700">Quick Stats</h3>
//                     <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                       <p><span className="text-gray-600">Total Orders:</span> {orders.length}</p>
//                       <p><span className="text-gray-600">Loyalty Points:</span> {user.loyaltyPoints || 0}</p>
//                       <p><span className="text-gray-600">Recent Orders:</span> {orders.slice(0, 3).length} in last 30 days</p>
//                     </div>
//                   </div>
//                 </div>

//                 {orders.length === 0 && (
//                   <div className="mt-6 p-6 bg-blue-50 rounded-lg text-center">
//                     <FaHistory className="text-4xl text-blue-400 mx-auto mb-3" />
//                     <h3 className="font-semibold text-blue-800 mb-2">No Orders Yet</h3>
//                     <p className="text-blue-600 mb-4">Ready to order some delicious food?</p>
//                     <Link 
//                       to="/shop" 
//                       className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
//                     >
//                       Browse Menu
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Orders Tab */}
//             {activeTab === 'orders' && (
//               <div>
//                 <h2 className="text-xl font-bold mb-4">My Orders</h2>
                
//                 {error && (
//                   <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
//                     {error}
//                     <button 
//                       onClick={loadUserOrders}
//                       className="ml-2 text-red-600 underline hover:no-underline"
//                     >
//                       Try again
//                     </button>
//                   </div>
//                 )}

//                 {loadingOrders ? (
//                   <div className="text-center py-12">
//                     <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
//                     <p className="text-gray-600">Loading your orders...</p>
//                   </div>
//                 ) : orders.length === 0 ? (
//                   <div className="text-center py-12">
//                     <FaHistory className="text-6xl text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
//                     <p className="text-gray-500 mb-6">Looks like you haven't placed any orders.</p>
//                     <Link 
//                       to="/shop" 
//                       className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
//                     >
//                       Start Shopping
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {orders.map((order) => (
//                       <div 
//                         key={order._id} 
//                         className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-3 mb-2">
//                               <h3 className="font-semibold text-lg">
//                                 Order #{order._id.slice(-8).toUpperCase()}
//                               </h3>
//                               <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                                 {order.status || 'Pending'}
//                               </span>
//                             </div>
                            
//                             <div className="space-y-1 text-sm text-gray-600">
//                               <p className="flex items-center gap-2">
//                                 <FaClock className="text-gray-400" />
//                                 {formatDate(order.createdAt)}
//                               </p>
//                               <p className="flex items-center gap-2">
//                                 <FaShoppingBag className="text-gray-400" />
//                                 {order.items?.length || 0} items
//                               </p>
//                               {order.orderType === 'delivery' && (
//                                 <p className="flex items-center gap-2">
//                                   <FaMapMarkerAlt className="text-gray-400" />
//                                   Delivery to: {order.deliveryAddress || 'Address provided'}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
                          
//                           <div className="text-right">
//                             <p className="text-xl font-bold text-primary">
//                               {formatPrice(order.pricing?.total || order.grandTotal || 0)}
//                             </p>
//                             <p className="text-sm text-gray-500 mt-1">
//                               {order.paymentStatus || 'Paid'}
//                             </p>
//                             <Link
//                               to={`/orders/${order._id}?email=${encodeURIComponent(user.email)}`}
//                               className="inline-block mt-2 text-primary hover:underline text-sm"
//                             >
//                               View Details →
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Loyalty Tab */}
//             {activeTab === 'loyalty' && (
//               <div>
//                 <h2 className="text-xl font-bold mb-4">Loyalty Program</h2>
                
//                 <div className="bg-linear-to-r from-primary to-orange-600 rounded-2xl p-6 text-white mb-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90 mb-1">Your Points Balance</p>
//                       <p className="text-4xl font-bold">{user.loyaltyPoints || 0}</p>
//                       <p className="text-sm opacity-90 mt-2">
//                         ≈ {formatPrice(user.loyaltyPoints || 0)} in rewards
//                       </p>
//                     </div>
//                     <FaStar className="text-5xl opacity-50" />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="bg-gray-50 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-800 mb-3">How to Earn</h3>
//                     <ul className="space-y-2 text-sm text-gray-600">
//                       <li className="flex items-start gap-2">
//                         <span className="text-primary font-bold">•</span>
//                         <span>Earn 1 point for every ₦100 spent</span>
//                       </li>
//                       <li className="flex items-start gap-2">
//                         <span className="text-primary font-bold">•</span>
//                         <span>Double points on your birthday month</span>
//                       </li>
//                       <li className="flex items-start gap-2">
//                         <span className="text-primary font-bold">•</span>
//                         <span>Bonus points for first order</span>
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="bg-gray-50 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-800 mb-3">How to Use</h3>
//                     <ul className="space-y-2 text-sm text-gray-600">
//                       <li className="flex items-start gap-2">
//                         <span className="text-primary font-bold">•</span>
//                         <span>100 points = ₦100 discount</span>
//                       </li>
//                       <li className="flex items-start gap-2">
//                         <span className="text-primary font-bold">•</span>
//                         <span>Redeem at checkout</span>
//                       </li>
//                       <li className="flex items-start gap-2">
//                         <span className="text-primary font-bold">•</span>
//                         <span>Points never expire</span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>

//                 {orders.length > 0 && (
//                   <div className="mt-6 text-center">
//                     <Link
//                       to="/shop"
//                       className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
//                     >
//                       Order Now & Earn Points
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;



// pages/Account.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaShoppingBag, 
  FaStar, 
  FaHistory, 
  FaSpinner,
  FaSignOutAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Account = () => {
  const { user, logout, setShowLoginModal } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    if (!user) {
      // Show login modal immediately
      setShowLoginModal(true);
      // Optional: navigate back or to home
      navigate('/', { replace: true });
    }
  }, [user, setShowLoginModal, navigate]);

  // Load orders when user is available
  useEffect(() => {
    if (user?.email) {
      loadUserOrders();
    }
  }, [user]);

  const loadUserOrders = async () => {
    setLoadingOrders(true);
    setError('');
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/orders?email=${encodeURIComponent(user.email)}`
      );
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setError(data.error || 'Failed to load orders');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setError('Failed to load your orders. Please try again.');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'out for delivery':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Show nothing while checking auth
  if (!user) {
    return null; // The modal will show instead
  }

  // Show loading while fetching orders
  if (loadingOrders && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Account Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.fullName}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                  <span className="flex items-center text-gray-600 text-sm">
                    <FaEnvelope className="mr-1" /> {user.email}
                  </span>
                  {user.phone && user.phone !== '0000000000' && (
                    <span className="flex items-center text-gray-600 text-sm">
                      <FaPhone className="mr-1" /> {user.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 transition-colors text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-orange-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-orange-700">{orders.length}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Loyalty Points</p>
              <p className="text-2xl font-bold text-blue-700">{user.loyaltyPoints || 0}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 mb-1">Member Since</p>
              <p className="text-lg font-bold text-green-700">
                {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-4 py-3 font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary text-primary bg-orange-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FaUser />
              <span className="hidden sm:inline">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-4 py-3 font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-b-2 border-primary text-primary bg-orange-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FaShoppingBag />
              <span className="hidden sm:inline">My Orders</span>
              {orders.length > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {orders.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('loyalty')}
              className={`flex-1 px-4 py-3 font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'loyalty'
                  ? 'border-b-2 border-primary text-primary bg-orange-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FaStar />
              <span className="hidden sm:inline">Loyalty</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Account Overview</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700">Personal Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p><span className="text-gray-600">Full Name:</span> {user.fullName}</p>
                      <p><span className="text-gray-600">Email:</span> {user.email}</p>
                      {user.phone && user.phone !== '0000000000' && (
                        <p><span className="text-gray-600">Phone:</span> {user.phone}</p>
                      )}
                      <p><span className="text-gray-600">Member Since:</span> {formatDate(user.createdAt)}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700">Quick Stats</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p><span className="text-gray-600">Total Orders:</span> {orders.length}</p>
                      <p><span className="text-gray-600">Loyalty Points:</span> {user.loyaltyPoints || 0}</p>
                      <p><span className="text-gray-600">Recent Orders:</span> {orders.slice(0, 3).length} in last 30 days</p>
                    </div>
                  </div>
                </div>

                {orders.length === 0 && (
                  <div className="mt-6 p-6 bg-blue-50 rounded-lg text-center">
                    <FaHistory className="text-4xl text-blue-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-blue-800 mb-2">No Orders Yet</h3>
                    <p className="text-blue-600 mb-4">Ready to order some delicious food?</p>
                    <Link 
                      to="/shop" 
                      className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Browse Menu
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold mb-4">My Orders</h2>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
                    {error}
                    <button 
                      onClick={loadUserOrders}
                      className="ml-2 text-red-600 underline hover:no-underline"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {loadingOrders ? (
                  <div className="text-center py-12">
                    <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
                    <p className="text-gray-600">Loading your orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <FaHistory className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't placed any orders.</p>
                    <Link 
                      to="/shop" 
                      className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div 
                        key={order._id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">
                                Order #{order._id.slice(-8).toUpperCase()}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status || 'Pending'}
                              </span>
                            </div>
                            
                            <div className="space-y-1 text-sm text-gray-600">
                              <p className="flex items-center gap-2">
                                <FaClock className="text-gray-400" />
                                {formatDate(order.createdAt)}
                              </p>
                              <p className="flex items-center gap-2">
                                <FaShoppingBag className="text-gray-400" />
                                {order.items?.length || 0} items
                              </p>
                              {order.orderType === 'delivery' && (
                                <p className="flex items-center gap-2">
                                  <FaMapMarkerAlt className="text-gray-400" />
                                  Delivery to: {order.deliveryAddress || 'Address provided'}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary">
                              {formatPrice(order.pricing?.total || order.grandTotal || 0)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {order.paymentStatus || 'Paid'}
                            </p>
                            <Link
                              to={`/orders/${order._id}?email=${encodeURIComponent(user.email)}`}
                              className="inline-block mt-2 text-primary hover:underline text-sm"
                            >
                              View Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Loyalty Tab */}
            {activeTab === 'loyalty' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Loyalty Program</h2>
                
                <div className="bg-linear-to-r from-primary to-orange-600 rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Your Points Balance</p>
                      <p className="text-4xl font-bold">{user.loyaltyPoints || 0}</p>
                      <p className="text-sm opacity-90 mt-2">
                        ≈ {formatPrice(user.loyaltyPoints || 0)} in rewards
                      </p>
                    </div>
                    <FaStar className="text-5xl opacity-50" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">How to Earn</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Earn 1 point for every ₦100 spent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Double points on your birthday month</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Bonus points for first order</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">How to Use</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>100 points = ₦100 discount</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Redeem at checkout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Points never expire</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {orders.length > 0 && (
                  <div className="mt-6 text-center">
                    <Link
                      to="/shop"
                      className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Order Now & Earn Points
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;