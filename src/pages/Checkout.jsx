// // pages/Checkout.jsx
// import React, { useState } from 'react';
// import { useCart } from '../contexts/CartContext';
// import { useCheckout } from '../contexts/CheckoutContext';
// import { useOrder } from '../contexts/OrderContext';
// import { useToast } from '../contexts/ToastContext';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaMapMarkerAlt, FaStore, FaChevronDown } from 'react-icons/fa';
// // import EmailVerificationModal from '../components/EmailVerificationModal';
// import { useAuth } from '../contexts/AuthContext';

// const Checkout = () => {
//   const { cartItems, getCartTotal, formatPrice, clearCart } = useCart();
//   const { 
//     deliveryInfo, 
//     orderType, 
//     selectedLocation,
//     selectedDeliveryZone,
//     deliveryZones,
//     pickupLocations,
//     updateDeliveryInfo, 
//     setOrderType,
//     setSelectedLocation,
//     setSelectedDeliveryZone,
//     validateDeliveryInfo,
//     getDeliveryFee,
//     clearCheckoutData
//   } = useCheckout();
//   const { initializePaystackPayment, createOrder, verifyPayment, isLoading } = useOrder();
//   const toast = useToast();
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showPickupDropdown, setShowPickupDropdown] = useState(false);
//   const [showDeliveryDropdown, setShowDeliveryDropdown] = useState(false);


//   // Inside the Checkout component, add:
//   const { findOrCreateUser, verifyUser, resendCode, isLoading: authLoading, verificationSent, pendingEmail } = useAuth();
//   const [showVerificationModal, setShowVerificationModal] = useState(false);
//   const [pendingUserData, setPendingUserData] = useState(null);

//   // Load Paystack script dynamically
//   // In Checkout.jsx, update the useEffect:
//   React.useEffect(() => {
//     if (typeof window.PaystackPop !== 'undefined') {
//       return; // Already loaded
//     }

//     const script = document.createElement('script');
//     script.src = 'https://js.paystack.co/v1/inline.js';
//     script.async = true;
//     // script.onload = () => console.log('Paystack script loaded');
//     script.onerror = () => console.error('Failed to load Paystack script');
//     document.body.appendChild(script);

//     return () => {
//       if (document.body.contains(script)) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   if (cartItems.length === 0) {
//     return (
//       <div className="container py-8 text-center">
//         <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
//         <p className="mb-6">Add some items to your cart before checkout</p>
//         <Link 
//           to="/cart" 
//           className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
//         >
//           Back to Cart
//         </Link>
//       </div>
//     );
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     updateDeliveryInfo({ [name]: value });
//   };

//   const handleOrderTypeChange = (type) => {
//     setOrderType(type);
//     if (type === 'pickup') {
//       setSelectedDeliveryZone('');
//     } else {
//       setSelectedLocation('');
//     }
//   };

//   const handlePickupLocationSelect = (location) => {
//     setSelectedLocation(location);
//     setShowPickupDropdown(false);
//     updateDeliveryInfo({ 
//       address: `${location.name}\n${location.address}\nOpen: ${location.hours}` 
//     });
//   };

//   const handleDeliveryZoneSelect = (zone) => {
//     setSelectedDeliveryZone(zone.id);
//     setShowDeliveryDropdown(false);
//   };


//   // Update the handleSubmit function:
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const validation = validateDeliveryInfo();
//     if (!validation.isValid) {
//       toast.error(validation.error || `Please fill in the ${validation.missingField} field`);
//       return;
//     }

//     setIsProcessing(true);
    
//     try {
//       // Step 1: Find or create user
//       const userData = {
//         email: deliveryInfo.email,
//         phone: deliveryInfo.phone,
//         fullName: deliveryInfo.fullName
//       };

//       const user = await findOrCreateUser(userData);
//       setPendingUserData(user);
      
//       // Show verification modal
//       // setShowVerificationModal(true);
      
//     } catch (error) {
//       console.error('User creation error:', error);
//       toast.error(error.message || 'Failed to process your information');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Handle verification
//   // const handleVerify = async (email, code) => {
//   //   try {
//   //     await verifyUser(email, code);
      
//   //     // Now proceed with payment
//   //     await processPayment();
      
//   //   } catch (error) {
//   //     throw error;
//   //   }
//   // };

//   // Process payment after verification
//   const processPayment = async () => {
//     try {
//       const cartTotal = getCartTotal();
//       const deliveryFee = getDeliveryFee();
//       const serviceFee = Math.round(cartTotal * 0.02);
//       const grandTotal = cartTotal + deliveryFee + serviceFee;

//       const orderData = {
//         items: cartItems,
//         total: cartTotal,
//         grandTotal: grandTotal,
//         deliveryInfo,
//         orderType,
//         selectedLocation: orderType === 'pickup' ? selectedLocation : null,
//         selectedDeliveryZone: orderType === 'delivery' ? selectedDeliveryZone : null,
//         deliveryFee: deliveryFee,
//         serviceFee: serviceFee,
//         timestamp: new Date().toISOString()
//       };

//       // Initialize Paystack payment
//       const paymentResponse = await initializePaystackPayment(orderData);
      
//       // Create order and get user info
//       const orderResult = await createOrder(orderData, paymentResponse.reference);
      
//       // Clear and navigate
//       clearCheckoutData();
//       toast.success('Order placed successfully! Check your email for confirmation.');
      
//       navigate('/order-success', { 
//         state: { 
//           orderNumber: paymentResponse.reference,
//           grandTotal: grandTotal,
//           userId: orderResult.userId,
//           email: deliveryInfo.email
//         } 
//       });
      
//     } catch (error) {
//       console.error('Payment error:', error);
//       if (error.message !== 'Payment cancelled by user') {
//         toast.error(error.message || 'Failed to process payment. Please try again.');
//       }
//     }
//   };

//   const cartTotal = getCartTotal();
//   const deliveryFee = getDeliveryFee();
//   const serviceFee = Math.round(cartTotal * 0.02);
//   const grandTotal = cartTotal + deliveryFee + serviceFee;

//   const selectedZone = deliveryZones.find(zone => zone.id === selectedDeliveryZone);

//   return (
//     <div className="container py-8">
//       <Link to="/cart" className="inline-flex items-center text-sm text-dark hover:underline mb-6">
//         <FaArrowLeft className="mr-2" />
//         Back to Cart
//       </Link>

//       <div className="grid md:grid-cols-2 gap-8 md:gap-4">
//         {/* Order Information Form */}
//         <div className="bg-white h-fit rounded-2xl md:shadow-md md:border border-dark/10 p-0 md:p-6">
//           <h2 className="text-2xl font-bold mb-6">Order Information</h2>
          
//           {/* Order Type Selection */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-3">Order Type</label>
//             <div className="flex space-x-4">
//               <button
//                 type="button"
//                 onClick={() => handleOrderTypeChange('delivery')}
//                 className={`flex-1 flex items-center justify-center p-4 py-2.5 rounded-lg border-2 transition-colors ${
//                   orderType === 'delivery'
//                     ? 'border-primary bg-primary/10 text-primary'
//                     : 'border-gray-300 hover:border-primary'
//                 }`}
//               >
//                 <FaMapMarkerAlt className="mr-2" />
//                 Delivery
//               </button>
//               <button
//                 disabled
//                 type="button"
//                 onClick={() => handleOrderTypeChange('pickup')}
//                 className={`flex-1 flex items-center justify-center p-4 py-2.5 rounded-lg border-2 transition-colors ${
//                   orderType === 'pickup'
//                     ? 'border-primary bg-primary/10 text-primary'
//                     : 'border-gray-300 hover:border-gray-300'
//                 }`}
//               >
//                 <FaStore className="mr-2" />
//                 Pickup
//               </button>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="fullName" className="block text-sm font-medium mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="fullName"
//                   name="fullName"
//                   value={deliveryInfo.fullName}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium mb-1">
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={deliveryInfo.phone}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium mb-1">
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 autoComplete='email'
//                 value={deliveryInfo.email}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                 required
//               />
//             </div>

//             {/* Delivery Zone Selection */}
//             {orderType === 'delivery' && (
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Select Delivery Zone *
//                 </label>
//                 <div className="relative">
//                   <button
//                     type="button"
//                     onClick={() => setShowDeliveryDropdown(!showDeliveryDropdown)}
//                     className="w-full p-3 border border-gray-300 rounded-lg text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary"
//                   >
//                     <span>
//                       {selectedZone ? `${selectedZone.name} - ${formatPrice(selectedZone.price)}` : 'Choose a delivery zone'}
//                     </span>
//                     <FaChevronDown className={`transition-transform ${showDeliveryDropdown ? 'rotate-180' : ''}`} />
//                   </button>
                  
//                   {showDeliveryDropdown && (
//                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       {deliveryZones.map((zone, index) => (
//                         <button
//                           key={zone.id}
//                           type="button"
//                           onClick={() => handleDeliveryZoneSelect(zone)}
//                           className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
//                         >
//                           <div className="font-medium">{zone.name} - {formatPrice(zone.price)}</div>
//                           <div className="text-sm text-gray-600">{zone.description}</div>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 {/* {selectedZone && (
//                   <p className="text-xs text-green-600 mt-1">
//                     ✅ Selected: {selectedZone.name} - Delivery fee: {formatPrice(selectedZone.price)}
//                   </p>
//                 )} */}
//               </div>
//             )}

//             {/* Pickup Location Selection */}
//             {orderType === 'pickup' && (
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Select Pickup Location *
//                 </label>
//                 <div className="relative">
//                   <button
//                     type="button"
//                     onClick={() => setShowPickupDropdown(!showPickupDropdown)}
//                     className="w-full p-3 border border-gray-300 rounded-lg text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary"
//                   >
//                     <span>
//                       {selectedLocation ? `${selectedLocation.name} (${selectedLocation.hours})` : 'Choose a pickup location'}
//                     </span>
//                     <FaChevronDown className={`transition-transform ${showPickupDropdown ? 'rotate-180' : ''}`} />
//                   </button>
                  
//                   {showPickupDropdown && (
//                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       {pickupLocations.map((location, index) => (
//                         <button
//                           key={location.id}
//                           type="button"
//                           onClick={() => handlePickupLocationSelect(location)}
//                           className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
//                         >
//                           <div className="font-medium">{location.name}</div>
//                           <div className="text-sm text-gray-600">{location.address}</div>
//                           <div className="text-xs text-primary">{location.hours}</div>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 {selectedLocation && (
//                   <p className="text-sm text-green-600 mt-2">
//                     ✅ Selected: {selectedLocation.name}
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Address Textarea */}
//             {orderType === 'delivery' && (
//             <div>
//               <label htmlFor="address" className="block text-sm font-medium mb-1">
//                 Delivery Address *
//               </label>
//               <textarea
//                 id="address"
//                 name="address"
//                 value={deliveryInfo.address}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
//                 required
//                 // readOnly={orderType === 'pickup' && selectedLocation}
//                 placeholder='Enter your complete delivery address including street, building number, landmarks...'
//               />
//             </div>
//             )}

//             <div>
//               <label htmlFor="additionalNotes" className="block text-sm font-medium mb-1">
//                 Additional Notes (Optional)
//               </label>
//               <textarea
//                 id="additionalNotes"
//                 name="additionalNotes"
//                 value={deliveryInfo.additionalNotes}
//                 onChange={handleInputChange}
//                 rows="3"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
//                 placeholder="Any special instructions for your order..."
//               />
//             </div>
//           </form>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white rounded-2xl shadow-md border border-dark/10 p-4 md:p-6 h-fit sticky space-y-4 top-4">
//           <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          
//           {/* Order Type Badge */}
//           <div className="mb-4">
//             <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//               orderType === 'delivery' 
//                 ? 'bg-blue-100 text-blue-800' 
//                 : 'bg-green-100 text-green-800'
//             }`}>
//               {orderType === 'delivery' ? (
//                 <p className="flex items-center gap-0">
//                   <FaMapMarkerAlt className="mr-1 text-xs" />
                  
//                   <span className="flex items-center gap-1">
//                     <span> Delivery </span>
//                     <span> {selectedZone && `- ${selectedZone.name} - ${formatPrice(selectedZone.price)}`}</span>
                    
//                     {/* <span>- {formatPrice(selectedZone.price)} </span> */}
//                   </span>
//                 </p>
//               ) : (
//                 <>
//                   <FaStore className="mr-1" />
//                   Pickup
//                   {selectedLocation && ` - ${selectedLocation.name}`}
//                 </>
//               )}
//             </div>
//           </div>
          
//           {/* Cart Items */}
//           <div className="space-y-3 mb-6">
//             {cartItems.map((item, index) => (
//               <div key={index} className="flex justify-between items-start py-2 border-b border-dark/10">
//                 <div>
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-sm text-gray-600">
//                     {formatPrice(item.unitPrice || parseFloat(item.price.replace(/[^\d.]/g, '')))} × {item.quantity}
//                   </p>
//                 </div>
//                 <p className="font-medium">
//                   {formatPrice((item.unitPrice || parseFloat(item.price.replace(/[^\d.]/g, ''))) * item.quantity)}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Price Breakdown */}
//           <div className="space-y-2 mb-6">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>{formatPrice(cartTotal)}</span>
//             </div>
            
//             {orderType === 'delivery' && (
//               <div className="flex justify-between">
//                 <span>Delivery Fee</span>
//                 <span>{formatPrice(deliveryFee)}</span>
//               </div>
//             )}
            
//             <div className="flex justify-between">
//               <span>
//                 Service Fee 
//                 <abbr title="There's a 2 percent service charge for using our website to place an order.">(2%)</abbr> 
//                 {/* <abbr title="2% service charge applies" aria-label="2 percent service charge">(2%)</abbr> */}
//               </span>
//               <span>{formatPrice(serviceFee)}</span>
//             </div>
            
//             <div className="flex justify-between text-lg font-bold border-t border-dark/10 pt-2.5">
//               <span>Total</span>
//               <span>{formatPrice(grandTotal)}</span>
//             </div>
//           </div>

//           {/* Payment Security Notice */}
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
//             <div className="flex items-center gap-2 text-green-800">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//               <span className="font-semibold">Secure Payment</span>
//             </div>
//             <p className="text-green-700 text-sm mt-1">
//               Your payment is processed securely via Paystack. We never store your card details.
//             </p>
//           </div>

//           {/* Proceed to Payment Button */}
//           <div className="space-y-4">
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               disabled={isProcessing || isLoading}
//               className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
//             >
//               {isProcessing || isLoading ? 'Processing Payment...' : `Pay Securely - ${formatPrice(grandTotal)}`}
//             </button>
//             {/* <button
//               disabled={isProcessing}
//               className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
//             >
//               {isProcessing ? 'Processing...' : `Pay ${formatPrice(grandTotal)}`}
//             </button> */}
//             <button onClick={() => navigate("/cart")} className="w-full py-3 rounded-lg block text-center text-primary hover:underline transition-colors bg-primary/5 cursor-pointer">
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* {showVerificationModal && (
//       <EmailVerificationModal
//           email={deliveryInfo.email}
//           onVerify={handleVerify}
//           onResend={resendCode}
//           isLoading={authLoading}
//           onClose={() => {
//             setShowVerificationModal(false);
//             setPendingUserData(null);
//           }}
//         />
//       )} */}
//     </div>
//   );
// };

// export default Checkout;




// pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useCheckout } from '../contexts/CheckoutContext';
import { useOrder } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaStore, FaChevronDown, FaSpinner } from 'react-icons/fa';

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
  const { initializePaystackPayment, createOrder, isLoading: orderLoading } = useOrder();
  const { user, findOrCreateUser, verifyUser, isLoading: authLoading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDeliveryDropdown, setShowDeliveryDropdown] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  // Load Paystack script
  useEffect(() => {
    if (typeof window.PaystackPop !== 'undefined') return;

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onerror = () => console.error('Failed to load Paystack script');
    document.body.appendChild(script);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="mb-6">Add some items to your cart before checkout</p>
        <Link 
          to="/cart" 
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          Back to Cart
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
  };

  const handleDeliveryZoneSelect = (zone) => {
    setSelectedDeliveryZone(zone.id);
    setShowDeliveryDropdown(false);
  };

  // Step 1: Handle initial form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateDeliveryInfo();
    if (!validation.isValid) {
      toast.error(validation.error || `Please fill in the ${validation.missingField} field`);
      return;
    }

    setIsProcessing(true);
    
    try {
      // If user is already logged in, skip to payment
      if (user) {
        await processPayment();
        return;
      }

      // Create user account
      const userData = {
        email: deliveryInfo.email,
        phone: deliveryInfo.phone,
        fullName: deliveryInfo.fullName
      };

      await findOrCreateUser(userData);
      setPendingEmail(deliveryInfo.email);
      setShowVerification(true);
      toast.success('Verification code sent to your email!');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to process your information');
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 2: Handle verification code submission
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setIsProcessing(true);
    
    try {
      await verifyUser(pendingEmail, verificationCode);
      setShowVerification(false);
      await processPayment();
    } catch (error) {
      toast.error(error.message || 'Invalid verification code');
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 3: Process payment after verification
  const processPayment = async () => {
    try {
      const cartTotal = getCartTotal();
      const deliveryFee = getDeliveryFee();
      const serviceFee = Math.round(cartTotal * 0.02);
      const grandTotal = cartTotal + deliveryFee + serviceFee;

      const orderData = {
        items: cartItems,
        total: cartTotal,
        grandTotal,
        deliveryInfo,
        orderType,
        selectedLocation: orderType === 'pickup' ? selectedLocation : null,
        selectedDeliveryZone: orderType === 'delivery' ? selectedDeliveryZone : null,
        deliveryFee,
        serviceFee
      };

      // Initialize payment
      const paymentResponse = await initializePaystackPayment(orderData);
      
      // Create order
      await createOrder(orderData, paymentResponse.reference);
      
      // Success!
      clearCart();
      clearCheckoutData();
      toast.success('Order placed successfully!');
      
      navigate('/order-success', { 
        state: { 
          orderNumber: paymentResponse.reference,
          grandTotal
        } 
      });
      
    } catch (error) {
      console.error('Payment error:', error);
      if (error.message !== 'Payment cancelled by user') {
        toast.error(error.message || 'Failed to process payment');
      }
    }
  };

  const cartTotal = getCartTotal();
  const deliveryFee = getDeliveryFee();
  const serviceFee = Math.round(cartTotal * 0.02);
  const grandTotal = cartTotal + deliveryFee + serviceFee;
  const selectedZone = deliveryZones.find(zone => zone.id === selectedDeliveryZone);

  // Show verification screen if needed
  if (showVerification) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a 6-digit code to <strong>{pendingEmail}</strong>
          </p>

          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full text-center text-3xl tracking-widest p-4 border border-gray-300 rounded-lg mb-4"
              maxLength="6"
              autoFocus
            />

            <button
              type="submit"
              disabled={isProcessing || verificationCode.length !== 6}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 mb-3"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Verifying...
                </span>
              ) : (
                'Verify & Complete Order'
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowVerification(false)}
              className="w-full text-gray-600 hover:text-primary transition-colors"
            >
              Back
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main checkout screen
  return (
    <div className="container py-8">
      <Link to="/cart" className="inline-flex items-center text-sm text-dark hover:underline mb-6">
        <FaArrowLeft className="mr-2" />
        Back to Cart
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Order Information</h2>
          
          {/* Order Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Order Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleOrderTypeChange('delivery')}
                className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 transition ${
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
                className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 transition ${
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
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={deliveryInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={deliveryInfo.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Delivery Zone */}
            {orderType === 'delivery' && (
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Zone *</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDeliveryDropdown(!showDeliveryDropdown)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-left flex justify-between items-center"
                  >
                    <span>
                      {selectedZone ? `${selectedZone.name} - ${formatPrice(selectedZone.price)}` : 'Choose delivery zone'}
                    </span>
                    <FaChevronDown className={`transition ${showDeliveryDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDeliveryDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                      {deliveryZones.map((zone) => (
                        <button
                          key={zone.id}
                          type="button"
                          onClick={() => handleDeliveryZoneSelect(zone)}
                          className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                        >
                          <div className="font-medium">{zone.name} - {formatPrice(zone.price)}</div>
                          <div className="text-sm text-gray-600">{zone.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pickup Location */}
            {orderType === 'pickup' && (
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Location *</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPickupDropdown(!showPickupDropdown)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-left flex justify-between items-center"
                  >
                    <span>
                      {selectedLocation ? selectedLocation.name : 'Choose pickup location'}
                    </span>
                    <FaChevronDown className={`transition ${showPickupDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showPickupDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                      {pickupLocations.map((location) => (
                        <button
                          key={location.id}
                          type="button"
                          onClick={() => handlePickupLocationSelect(location)}
                          className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                        >
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-gray-600">{location.address}</div>
                          <div className="text-xs text-primary">{location.hours}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Address for Delivery */}
            {orderType === 'delivery' && (
              <div>
                <label className="block text-sm font-medium mb-1">Delivery Address *</label>
                <textarea
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                  placeholder="Street, building number, landmarks..."
                />
              </div>
            )}

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium mb-1">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={deliveryInfo.additionalNotes}
                onChange={handleInputChange}
                rows="2"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Any special instructions..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || orderLoading || authLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
            >
              {isProcessing || orderLoading || authLoading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </span>
              ) : (
                `Continue to Payment - ${formatPrice(grandTotal)}`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-4">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          
          {/* Order Type Badge */}
          {orderType === 'delivery' && selectedZone && (
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
              <FaMapMarkerAlt className="mr-1" />
              Delivery - {selectedZone.name} ({formatPrice(selectedZone.price)})
            </div>
          )}
          
          {orderType === 'pickup' && selectedLocation && (
            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mb-4">
              <FaStore className="mr-1" />
              Pickup - {selectedLocation.name}
            </div>
          )}

          {/* Cart Items */}
          <div className="space-y-3 mb-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between py-2 border-b">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {formatPrice(item.unitPrice)} × {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  {formatPrice(item.unitPrice * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2">
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
            
            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span className="text-primary">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;