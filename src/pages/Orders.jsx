// pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaArrowLeft, FaCheckCircle, FaClock, FaUtensils, FaShippingFast } from 'react-icons/fa';

const Orders = () => {
  const { orderId } = useParams();
  const { user, getOrder } = useAuth();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const orderData = await getOrder(orderId);
      setOrder(orderData);
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <FaCheckCircle className="text-green-500" />;
      case 'preparing': return <FaUtensils className="text-blue-500" />;
      case 'ready': return <FaClock className="text-orange-500" />;
      case 'confirmed': return <FaCheckCircle className="text-blue-500" />;
      default: return <FaShippingFast className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-orange-100 text-orange-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="mb-6">The order you're looking for doesn't exist.</p>
        <a href="/profile" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
          Back to Profile
        </a>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <a href="/profile" className="flex items-center text-primary hover:underline">
            <FaArrowLeft className="mr-2" />
            Back to Profile
          </a>
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Order #{order.orderNumber}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Order Date:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Type:</span>
                  <span className="capitalize">{order.orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className={order.paymentStatus === 'paid' ? 'text-green-600 font-medium' : ''}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ₦{((item.unitPrice || parseFloat(item.price.replace(/[^\d.]/g, ''))) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">
                {order.orderType === 'delivery' ? 'Delivery Information' : 'Pickup Information'}
              </h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {order.customerInfo.fullName}</p>
                <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                <p><strong>Email:</strong> {order.customerInfo.email}</p>
                {order.orderType === 'delivery' ? (
                  <div>
                    <p><strong>Address:</strong></p>
                    <p className="whitespace-pre-line">{order.customerInfo.address}</p>
                  </div>
                ) : (
                  <p><strong>Pickup Location:</strong> {order.selectedLocation?.name}</p>
                )}
                {order.customerInfo.additionalNotes && (
                  <div>
                    <p><strong>Additional Notes:</strong></p>
                    <p>{order.customerInfo.additionalNotes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-4">
            <h3 className="text-lg font-bold mb-4">Order Total</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₦{order.pricing.subtotal?.toLocaleString()}</span>
              </div>
              {order.pricing.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>₦{order.pricing.deliveryFee?.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Service Fee:</span>
                <span>₦{order.pricing.serviceFee?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                <span>Total:</span>
                <span>₦{order.pricing.total?.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold mb-2">Payment Information</h4>
              <p className="text-sm">Method: {order.paymentMethod}</p>
              {order.paystackReference && (
                <p className="text-sm">Reference: {order.paystackReference}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;