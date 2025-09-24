// components/WelcomePopup.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes, FaInfoCircle, FaShoppingCart, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  // Check if user has seen the popup before
  useEffect(() => {
    const seen = localStorage.getItem('foodByAma_welcomeSeen');
    if (!seen) {
      // Show popup after a small delay on first visit
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasSeenPopup(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenPopup(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('foodByAma_welcomeSeen', 'true');
    setHasSeenPopup(true);
  };

  const handleReopen = () => {
    setIsOpen(true);
  };

  // Don't show anything if popup is closed and user has seen it
  if (!isOpen && hasSeenPopup) {
    return (
      <div className="fixed bottom-36 left-0 w-full h-full z-40 pointer-events-none">
        <div className="container h-full flex items-end justify-end relative">
          <button
            onClick={handleReopen}
            className="pointer-events-auto mr-1 z-50 w-12 h-12 bg-primary rounded-full shadow-xl flex items-center justify-center text-white hover:bg-primary/90 transition-all duration-300 hover:scale-110 cursor-pointer group"
            title="How to order"
            >
            <FaInfoCircle className="text-xl" />
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
              !
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
        onClick={handleClose}
      >
        {/* Popup Content */}
        <div 
          className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto cursor-default scrollbar-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 rounded-t-2xl relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            >
              <FaTimes className="text-white" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaShoppingCart className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Welcome to Food By Ama! 🎉</h2>
                <p className="text-white/90 mt-1">We're excited to serve you!</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                We sell delicious meals, provide catering services and offer Home/Office Deliveries.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                How to order from this store: 🍰
              </h3>
              
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">1</span>
                  <span>Click on any food that you want to order.</span>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">2</span>
                  <span>Click the "Add to Cart" button on the bottom corner.</span>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">3</span>
                  <span>Then go to Cart page, and verify the items in your Cart.</span>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">4</span>
                  <span>Then click on "Proceed to Checkout" button on the bottom corner.</span>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">5</span>
                  <span>Type in your Delivery Details and Phone number.</span>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">6</span>
                  <span>Click the "Pay" button, and make payment to complete your Order.</span>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">7</span>
                  <span>Send the receipt of payment via <strong>WhatsApp</strong> with a screenshot of you order.</span>
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">8</span>
                  <span>Your Order would be delivered. 🚚</span>
                </li>
              </ol>
            </div>

            {/* WhatsApp Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <FaWhatsapp className="text-lg" />
                <span className="font-semibold">WhatsApp Support:</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Need help? Contact us via WhatsApp for quick assistance with your order!
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
            <button
              onClick={handleClose}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Got it! Let's Start Shopping 🛒
            </button>
          </div>
        </div>
      </div>

      {/* Floating reopen button (shown when popup is closed but user has seen it) */}
      {hasSeenPopup && !isOpen && (
        <button
          onClick={handleReopen}
          className="fixed right-6 bottom-6 z-50 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary/90 transition-all duration-300 hover:scale-110 cursor-pointer group"
          title="How to order"
        >
          <FaInfoCircle className="text-xl" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
            !
          </span>
          
          {/* Tooltip */}
          <span className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            How to order
          </span>
        </button>
      )}
    </>
  );
};

export default WelcomePopup;