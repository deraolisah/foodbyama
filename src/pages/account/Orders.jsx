// // pages/Orders.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { FaArrowLeft, FaCheckCircle, FaClock, FaUtensils, FaShippingFast } from 'react-icons/fa';

// const Orders = () => {
//   const { orderId } = useParams();
//   const { user, getOrder } = useAuth();
//   const [order, setOrder] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (orderId) {
//       loadOrder();
//     }
//   }, [orderId]);

//   const loadOrder = async () => {
//     try {
//       const orderData = await getOrder(orderId);
//       setOrder(orderData);
//     } catch (error) {
//       console.error('Error loading order:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'delivered': return <FaCheckCircle className="text-green-500" />;
//       case 'preparing': return <FaUtensils className="text-blue-500" />;
//       case 'ready': return <FaClock className="text-orange-500" />;
//       case 'confirmed': return <FaCheckCircle className="text-blue-500" />;
//       default: return <FaShippingFast className="text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'delivered': return 'bg-green-100 text-green-800';
//       case 'preparing': return 'bg-blue-100 text-blue-800';
//       case 'ready': return 'bg-orange-100 text-orange-800';
//       case 'confirmed': return 'bg-blue-100 text-blue-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="container py-8">
//         <div className="text-center">Loading order details...</div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="container py-8 text-center">
//         <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
//         <p className="mb-6">The order you're looking for doesn't exist.</p>
//         <a href="/profile" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
//           Back to Profile
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <a href="/profile" className="flex items-center text-primary hover:underline">
//             <FaArrowLeft className="mr-2" />
//             Back to Profile
//           </a>
//           <h1 className="text-2xl font-bold">Order Details</h1>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Order Summary */}
//           <div className="md:col-span-2 space-y-6">
//             {/* Order Status */}
//             <div className="bg-white rounded-2xl shadow-md p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold">Order #{order.orderNumber}</h2>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
//                   {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                 </span>
//               </div>
              
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span>Order Date:</span>
//                   <span>{new Date(order.createdAt).toLocaleDateString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Order Type:</span>
//                   <span className="capitalize">{order.orderType}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Payment Status:</span>
//                   <span className={order.paymentStatus === 'paid' ? 'text-green-600 font-medium' : ''}>
//                     {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Order Items */}
//             <div className="bg-white rounded-2xl shadow-md p-6">
//               <h3 className="text-lg font-bold mb-4">Order Items</h3>
//               <div className="space-y-4">
//                 {order.items.map((item, index) => (
//                   <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-4">
//                     <div className="flex items-center gap-3">
//                       {item.image && (
//                         <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
//                       )}
//                       <div>
//                         <p className="font-medium">{item.name}</p>
//                         {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
//                         <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//                       </div>
//                     </div>
//                     <p className="font-medium">
//                       ₦{((item.unitPrice || parseFloat(item.price.replace(/[^\d.]/g, ''))) * item.quantity).toLocaleString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Delivery Information */}
//             <div className="bg-white rounded-2xl shadow-md p-6">
//               <h3 className="text-lg font-bold mb-4">
//                 {order.orderType === 'delivery' ? 'Delivery Information' : 'Pickup Information'}
//               </h3>
//               <div className="space-y-2">
//                 <p><strong>Name:</strong> {order.customerInfo.fullName}</p>
//                 <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
//                 <p><strong>Email:</strong> {order.customerInfo.email}</p>
//                 {order.orderType === 'delivery' ? (
//                   <div>
//                     <p><strong>Address:</strong></p>
//                     <p className="whitespace-pre-line">{order.customerInfo.address}</p>
//                   </div>
//                 ) : (
//                   <p><strong>Pickup Location:</strong> {order.selectedLocation?.name}</p>
//                 )}
//                 {order.customerInfo.additionalNotes && (
//                   <div>
//                     <p><strong>Additional Notes:</strong></p>
//                     <p>{order.customerInfo.additionalNotes}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Order Total */}
//           <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-4">
//             <h3 className="text-lg font-bold mb-4">Order Total</h3>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span>Subtotal:</span>
//                 <span>₦{order.pricing.subtotal?.toLocaleString()}</span>
//               </div>
//               {order.pricing.deliveryFee > 0 && (
//                 <div className="flex justify-between">
//                   <span>Delivery Fee:</span>
//                   <span>₦{order.pricing.deliveryFee?.toLocaleString()}</span>
//                 </div>
//               )}
//               <div className="flex justify-between">
//                 <span>Service Fee:</span>
//                 <span>₦{order.pricing.serviceFee?.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
//                 <span>Total:</span>
//                 <span>₦{order.pricing.total?.toLocaleString()}</span>
//               </div>
//             </div>

//             {/* Payment Information */}
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <h4 className="font-semibold mb-2">Payment Information</h4>
//               <p className="text-sm">Method: {order.paymentMethod}</p>
//               {order.paystackReference && (
//                 <p className="text-sm">Reference: {order.paystackReference}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;


// pages/account/Orders.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  FaSpinner, 
  FaClock, 
  FaShoppingBag, 
  FaMapMarkerAlt,
  FaFilter,
  FaSearch
} from 'react-icons/fa';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadOrders();
  }, [user]);

  useEffect(() => {
    filterOrders();
  }, [orders, filter, searchTerm]);

  const loadOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/orders?email=${encodeURIComponent(user.email)}`
      );
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(order => 
        order.status?.toLowerCase() === filter.toLowerCase()
      );
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order._id.toLowerCase().includes(term) ||
        order.items?.some(item => item.name.toLowerCase().includes(term))
      );
    }

    setFilteredOrders(filtered);
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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">My Orders</h2>
        
        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="out for delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          {orders.length === 0 ? (
            <>
              <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
              <Link
                to="/shop"
                className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
              >
                Start Shopping
              </Link>
            </>
          ) : (
            <p className="text-gray-500">No orders match your filters</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <Link
              key={order._id}
              to={`/account/orders/${order._id}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
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
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <FaClock className="text-gray-400" />
                      {formatDate(order.createdAt)}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <FaShoppingBag className="text-gray-400" />
                      {order.items?.length || 0} items
                    </div>
                    {order.orderType === 'delivery' && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <FaMapMarkerAlt className="text-gray-400" />
                        Delivery
                      </div>
                    )}
                  </div>

                  {/* Item Preview */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {order.items?.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {item.name} x{item.quantity}
                      </span>
                    ))}
                    {order.items?.length > 3 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">
                    {formatPrice(order.pricing?.total || order.grandTotal)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.paymentStatus || 'Paid'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;