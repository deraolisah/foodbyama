// pages/OrderTracking.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaSpinner, FaClock, FaMotorcycle } from 'react-icons/fa';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  // Status order for progress bar
  const statusOrder = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
  
  // Get status step number (0-5)
  const getCurrentStep = (status) => {
    const index = statusOrder.indexOf(status);
    return index === -1 ? 0 : index;
  };
  
  // Get status display text
  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Order Placed',
      'confirmed': 'Order Confirmed',
      'preparing': 'Preparing Your Food',
      'ready': 'Ready for Pickup/Delivery',
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
  };
  
  // Fetch order details
  const fetchOrder = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.order);
      } else {
        setError('Order not found');
      }
    } catch (err) {
      setError('Failed to load order');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrder();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [orderId]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Order not found'}</p>
          <Link to="/account" className="text-primary underline">
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }
  
  const currentStep = getCurrentStep(order.trackingStatus);
  const progressPercentage = (currentStep / (statusOrder.length - 1)) * 100;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Header */}
        <Link to="/account" className="text-primary hover:underline mb-4 inline-block">
          ← Back to Orders
        </Link>
        
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-2">Track Your Order</h1>
          <p className="text-gray-600 mb-6">
            Order #{order.orderNumber || order._id.slice(-8)}
          </p>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2 text-sm">
              {statusOrder.map((status, idx) => (
                <span 
                  key={status}
                  className={idx <= currentStep ? 'text-primary font-medium' : 'text-gray-400'}
                >
                  {status === 'out_for_delivery' ? 'Delivery' : status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          
          {/* Current Status */}
          <div className="bg-primary/10 rounded-lg p-6 mb-6 text-center">
            <div className="text-4xl mb-2">
              {order.trackingStatus === 'delivered' ? '🎉' : '🛵'}
            </div>
            <h2 className="text-xl font-bold text-primary">
              {getStatusText(order.trackingStatus)}
            </h2>
            {order.estimatedDeliveryTime && order.trackingStatus !== 'delivered' && (
              <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
                <FaClock />
                Estimated: {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}
              </p>
            )}
          </div>
          
          {/* Status Timeline */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Order Timeline</h3>
            <div className="space-y-4">
              {order.statusUpdates?.map((update, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="shrink-0">
                    {idx === order.statusUpdates.length - 1 ? (
                      <FaCheckCircle className="text-primary mt-1" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-gray-300 mt-1" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{getStatusText(update.status)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(update.timestamp).toLocaleString()}
                    </p>
                    {update.note && (
                      <p className="text-sm text-gray-600 mt-1">{update.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;