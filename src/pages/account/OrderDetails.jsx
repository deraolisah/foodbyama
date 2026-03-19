// pages/account/OrderDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaArrowLeft, 
  FaShoppingBag, 
  FaMapMarkerAlt, 
  FaStore,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaSpinner,
  FaPrint,
  FaCheckCircle,
  FaTruck,
  FaBoxOpen,
  FaCreditCard
} from 'react-icons/fa';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.email) {
      navigate('/account');
      return;
    }

    loadOrderDetails();
  }, [orderId, user]);

  const loadOrderDetails = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/orders/${orderId}?email=${encodeURIComponent(user.email)}`
      );
      
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.error || 'Failed to load order details');
      }
    } catch (error) {
      console.error('Error loading order:', error);
      setError('Failed to load order details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'out for delivery':
        return <FaTruck className="text-blue-500" />;
      case 'processing':
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'cancelled':
        return <FaBoxOpen className="text-red-500" />;
      default:
        return <FaShoppingBag className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'out for delivery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
        <p className="text-gray-600 mb-6">{error || 'Unable to load this order'}</p>
        <Link
          to="/account/orders"
          className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/account/orders"
          className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Orders
        </Link>
        
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaPrint />
          <span className="hidden sm:inline">Print</span>
        </button>
      </div>

      {/* Order Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Order Header */}
        <div className="bg-linear-to-r from-primary to-orange-600 text-white p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Order Number</p>
              <h1 className="text-2xl font-bold font-mono">
                #{order._id.slice(-8).toUpperCase()}
              </h1>
            </div>
            <div className={`px-4 py-2 rounded-full ${getStatusColor(order.status)} text-sm font-medium inline-flex items-center gap-2`}>
              {getStatusIcon(order.status)}
              {order.status || 'Pending'}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm opacity-90">
            <FaClock />
            <span>Ordered on {formatDate(order.createdAt)}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <FaUser className="text-primary" />
            Customer Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{order.customer?.fullName || order.deliveryInfo?.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{order.customer?.email || order.deliveryInfo?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{order.customer?.phone || order.deliveryInfo?.phone}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <FaShoppingBag className="text-primary" />
            Order Items
          </h3>
          
          <div className="space-y-3">
            {order.items?.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.price)} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatPrice(order.pricing?.subtotal || order.total)}</span>
            </div>
            {order.orderType === 'delivery' && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span>{formatPrice(order.pricing?.delivery || 0)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee</span>
              <span>{formatPrice(order.pricing?.service || 0)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-primary">
                {formatPrice(order.pricing?.total || order.grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery/Pickup Info */}
        <div className="p-6">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            {order.orderType === 'delivery' ? (
              <>
                <FaMapMarkerAlt className="text-primary" />
                Delivery Address
              </>
            ) : (
              <>
                <FaStore className="text-primary" />
                Pickup Location
              </>
            )}
          </h3>
          
          {order.orderType === 'delivery' ? (
            <p className="whitespace-pre-line bg-gray-50 p-3 rounded-lg">
              {order.deliveryAddress || order.deliveryInfo?.address}
            </p>
          ) : (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">{order.selectedLocation?.name}</p>
              <p className="text-sm text-gray-600 mt-1">{order.selectedLocation?.address}</p>
              <p className="text-sm text-gray-600 mt-1">Hours: {order.selectedLocation?.hours}</p>
            </div>
          )}
        </div>

        {/* Payment Info */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaCreditCard />
            <span>Payment Reference: </span>
            <span className="font-mono">{order.paymentReference}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;