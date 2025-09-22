// pages/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useCheckout } from '../contexts/CheckoutContext';
import { useToast } from '../contexts/ToastContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaStore } from 'react-icons/fa';

const Checkout = () => {
  const { cartItems, getCartTotal, formatPrice, clearCart } = useCart();
  const { deliveryInfo, orderType, updateDeliveryInfo, setOrderType, validateDeliveryInfo } = useCheckout();
  const toast = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="mb-6">Add some items to your cart before checkout</p>
        <Link 
          to="/menu" 
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateDeliveryInfo({ [name]: value });
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateDeliveryInfo();
    if (!validation.isValid) {
      toast.error(validation.error || `Please fill in the ${validation.missingField} field`);
      return;
    }

    setIsProcessing(true);
    
    try {
      // Prepare order data
      const orderData = {
        items: cartItems,
        total: getCartTotal(),
        deliveryInfo,
        orderType,
        timestamp: new Date().toISOString()
      };

      // Initialize Paystack payment
      await initializePaystackPayment(orderData);
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const initializePaystackPayment = async (orderData) => {
    // This is where you'll integrate with Paystack
    // For now, we'll simulate a successful payment
    setTimeout(() => {
      handlePaymentSuccess(orderData);
    }, 2000);
  };

  const handlePaymentSuccess = (orderData) => {
    // Send order to backend (you'll implement this later)
    sendOrderToBackend(orderData);
    
    // Clear cart and show success message
    clearCart();
    toast.success('Order placed successfully! We will contact you shortly.');
    
    // Redirect to order confirmation page or home
    navigate('/');
  };

  const sendOrderToBackend = async (orderData) => {
    try {
      // This is where you'll send the order to your backend
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save order');
      }
      
      console.log('Order saved successfully');
    } catch (error) {
      console.error('Error saving order:', error);
      // You might want to handle this error differently
    }
  };

  const cartTotal = getCartTotal();
  const deliveryFee = orderType === 'delivery' ? 1000 : 0; // Example delivery fee
  const serviceFee = Math.round(cartTotal * 0.02); // 2% service fee
  const grandTotal = cartTotal + deliveryFee + serviceFee;

  return (
    <div className="container py-8">
      <Link to="/cart" className="inline-flex items-center text-primary hover:underline mb-6">
        <FaArrowLeft className="mr-2" />
        Back to Cart
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Delivery Information Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
          
          {/* Order Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Order Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleOrderTypeChange('delivery')}
                className={`flex-1 flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                  orderType === 'delivery'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                <FaMapMarkerAlt className="mr-2" />
                Delivery
              </button>
              <button
                type="button"
                onClick={() => handleOrderTypeChange('pickup')}
                className={`flex-1 flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                  orderType === 'pickup'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                <FaStore className="mr-2" />
                Pickup
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={deliveryInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={deliveryInfo.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                {orderType === 'delivery' ? 'Delivery Address *' : 'Pickup Location *'}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={deliveryInfo.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {orderType === 'delivery' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryInfo.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={deliveryInfo.state}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={deliveryInfo.additionalNotes}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Any special instructions for delivery..."
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-4">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          
          {/* Cart Items */}
          <div className="space-y-3 mb-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {formatPrice(item.unitPrice || parseFloat(item.price.replace(/[^\d.]/g, '')))} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  {formatPrice((item.unitPrice || parseFloat(item.price.replace(/[^\d.]/g, ''))) * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            
            {orderType === 'delivery' && (
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Service Fee (2%)</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
            
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* Proceed to Payment Button */}
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : `Pay ${formatPrice(grandTotal)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;