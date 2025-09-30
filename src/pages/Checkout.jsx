// pages/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useCheckout } from '../contexts/CheckoutContext';
import { useOrder } from '../contexts/OrderContext';
import { useToast } from '../contexts/ToastContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaStore, FaChevronDown } from 'react-icons/fa';

const Checkout = () => {
  const { cartItems, getCartTotal, formatPrice, clearCart } = useCart();
  const { 
    deliveryInfo, 
    orderType, 
    selectedLocation,
    selectedDeliveryZone,
    deliveryZones,
    pickupLocations,
    updateDeliveryInfo, 
    setOrderType,
    setSelectedLocation,
    setSelectedDeliveryZone,
    validateDeliveryInfo,
    getDeliveryFee,
    clearCheckoutData
  } = useCheckout();
  const { initializePaystackPayment, createOrder, verifyPayment, isLoading } = useOrder();
  const toast = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDeliveryDropdown, setShowDeliveryDropdown] = useState(false);

  // Load Paystack script dynamically
  // In Checkout.jsx, update the useEffect:
  React.useEffect(() => {
    if (typeof window.PaystackPop !== 'undefined') {
      return; // Already loaded
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    // script.onload = () => console.log('Paystack script loaded');
    script.onerror = () => console.error('Failed to load Paystack script');
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
    if (type === 'pickup') {
      setSelectedDeliveryZone('');
    } else {
      setSelectedLocation('');
    }
  };

  const handlePickupLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowPickupDropdown(false);
    updateDeliveryInfo({ 
      address: `${location.name}\n${location.address}\nOpen: ${location.hours}` 
    });
  };

  const handleDeliveryZoneSelect = (zone) => {
    setSelectedDeliveryZone(zone.id);
    setShowDeliveryDropdown(false);
  };


  // In Checkout.jsx - update the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateDeliveryInfo();
    if (!validation.isValid) {
      toast.error(validation.error || `Please fill in the ${validation.missingField} field`);
      return;
    }

    setIsProcessing(true);
    
    try {
      const cartTotal = getCartTotal();
      const deliveryFee = getDeliveryFee();
      const serviceFee = Math.round(cartTotal * 0.02);
      const grandTotal = cartTotal + deliveryFee + serviceFee;

      const orderData = {
        items: cartItems,
        total: cartTotal,
        grandTotal: grandTotal,
        deliveryInfo,
        orderType,
        selectedLocation: orderType === 'pickup' ? selectedLocation : null,
        selectedDeliveryZone: orderType === 'delivery' ? selectedDeliveryZone : null,
        deliveryFee: deliveryFee,
        serviceFee: serviceFee,
        timestamp: new Date().toISOString()
      };

      // Initialize Paystack payment
      const paymentResponse = await initializePaystackPayment(orderData);
      
      // Create order and get user info
      const orderResult = await createOrder(orderData, paymentResponse.reference);
      
      // ✅ FIXED: Pass user data to OrderSuccess
      clearCheckoutData();
      toast.success('Order placed successfully! Account created automatically.');
      
      navigate('/order-success', { 
        state: { 
          orderNumber: paymentResponse.reference,
          grandTotal: grandTotal,
          userId: orderResult.userId, // ✅ Add this
          isGuest: orderResult.isGuest // ✅ Add this
        } 
      });
      
    } catch (error) {
      console.error('Checkout error:', error);
      if (error.message !== 'Payment cancelled by user') {
        toast.error(error.message || 'Failed to process payment. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const cartTotal = getCartTotal();
  const deliveryFee = getDeliveryFee();
  const serviceFee = Math.round(cartTotal * 0.02);
  const grandTotal = cartTotal + deliveryFee + serviceFee;

  const selectedZone = deliveryZones.find(zone => zone.id === selectedDeliveryZone);

  return (
    <div className="container py-8">
      <Link to="/cart" className="inline-flex items-center text-sm text-dark hover:underline mb-6">
        <FaArrowLeft className="mr-2" />
        Back to Cart
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Information Form */}
        <div className="bg-white h-fit rounded-2xl shadow-md border border-dark/10 p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-6">Order Information</h2>
          
          {/* Order Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Order Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleOrderTypeChange('delivery')}
                className={`flex-1 flex items-center justify-center p-4 py-2.5 rounded-lg border-2 transition-colors ${
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
                className={`flex-1 flex items-center justify-center p-4 py-2.5 rounded-lg border-2 transition-colors ${
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

            {/* Delivery Zone Selection */}
            {orderType === 'delivery' && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Select Delivery Zone *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDeliveryDropdown(!showDeliveryDropdown)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <span>
                      {selectedZone ? `${selectedZone.name} - ${formatPrice(selectedZone.price)}` : 'Choose a delivery zone'}
                    </span>
                    <FaChevronDown className={`transition-transform ${showDeliveryDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDeliveryDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {deliveryZones.map((zone, index) => (
                        <button
                          key={zone.id}
                          type="button"
                          onClick={() => handleDeliveryZoneSelect(zone)}
                          className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium">{zone.name} - {formatPrice(zone.price)}</div>
                          <div className="text-sm text-gray-600">{zone.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {selectedZone && (
                  <p className="text-sm text-green-600 mt-2">
                    ✅ Selected: {selectedZone.name} - Delivery fee: {formatPrice(selectedZone.price)}
                  </p>
                )}
              </div>
            )}

            {/* Pickup Location Selection */}
            {orderType === 'pickup' && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Select Pickup Location *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPickupDropdown(!showPickupDropdown)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <span>
                      {selectedLocation ? `${selectedLocation.name} (${selectedLocation.hours})` : 'Choose a pickup location'}
                    </span>
                    <FaChevronDown className={`transition-transform ${showPickupDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showPickupDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {pickupLocations.map((location, index) => (
                        <button
                          key={location.id}
                          type="button"
                          onClick={() => handlePickupLocationSelect(location)}
                          className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-gray-600">{location.address}</div>
                          <div className="text-xs text-primary">{location.hours}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {selectedLocation && (
                  <p className="text-sm text-green-600 mt-2">
                    ✅ Selected: {selectedLocation.name}
                  </p>
                )}
              </div>
            )}

            {/* Address Textarea */}
            {orderType === 'delivery' && (
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                Delivery Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={deliveryInfo.address}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
                required
                // readOnly={orderType === 'pickup' && selectedLocation}
                placeholder='Enter your complete delivery address including street, building number, landmarks...'
              />
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
                placeholder="Any special instructions for your order..."
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md border border-dark/10 p-4 md:p-6 h-fit sticky space-y-4 top-4">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          
          {/* Order Type Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              orderType === 'delivery' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {orderType === 'delivery' ? (
                <>
                  <FaMapMarkerAlt className="mr-1" />
                  Delivery
                  {selectedZone && ` - ${selectedZone.name}`}
                </>
              ) : (
                <>
                  <FaStore className="mr-1" />
                  Pickup
                  {selectedLocation && ` - ${selectedLocation.name}`}
                </>
              )}
            </span>
          </div>
          
          {/* Cart Items */}
          <div className="space-y-3 mb-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-start py-2 border-b border-dark/10">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {formatPrice(item.unitPrice || parseFloat(item.price.replace(/[^\d.]/g, '')))} × {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
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
            
            <div className="flex justify-between text-lg font-bold border-t border-dark/10 pt-2.5">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* Payment Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
            <div className="flex items-center gap-2 text-green-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Secure Payment</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              Your payment is processed securely via Paystack. We never store your card details.
            </p>
          </div>

          {/* Proceed to Payment Button */}
          <div className="space-y-4">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isProcessing || isLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isProcessing || isLoading ? 'Processing Payment...' : `Pay Securely - ${formatPrice(grandTotal)}`}
            </button>
            {/* <button
              disabled={isProcessing}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isProcessing ? 'Processing...' : `Pay ${formatPrice(grandTotal)}`}
            </button> */}
            <button onClick={() => navigate("/cart")} className="w-full py-3 rounded-lg block text-center text-primary hover:underline transition-colors bg-primary/5 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;