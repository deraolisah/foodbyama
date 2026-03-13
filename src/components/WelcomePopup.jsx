// components/WelcomePopup.jsx
import React from 'react';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WelcomePopup = ({ setOpenPopup }) => {
  const handleClose = () => {
    setOpenPopup(false)
  };


  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4 cursor-pointer"
        onClick={handleClose}
      >
        {/* Popup Content */}
        <div 
          className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[84svh] md:max-h-[90dvh] overflow-y-auto cursor-default scrollbar-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-linear-to-bl from-primary to-primary/60 text-white p-6 rounded-t-2xl relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            >
              <FaTimes className="text-white" />
            </button>
            
            <div className="flex items-center">
              <div>
                <h2 className="text-2xl font-bold"> Welcome to Food By Ama! </h2>
                {/* <p className="text-white/90 mt-1"> We're excited to serve you! 🎉</p> */}
                <p className="text-sm text-white/90 mt-1"> Flat tummy doesn't matter in Heaven.. </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-dark/80 text-sm">
                We sell delicious meals, provide catering services and offer Home/Office Deliveries in <strong>Awka</strong>. 🛒
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                {/* <FaCheckCircle className="text-green-500" /> */}
                {/* How to order from our store: */}
                How to Place Your Order
              </h3>
              
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <span> Tap on any dish you'd love to enjoy. </span>
                </li>
                
                <li className="flex items-start gap-3 mt-4">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <span> Hit the <strong>“Add to Cart”</strong> button at the bottom corner of the product. </span>
                </li>
                
                <li className="flex items-start gap-3 mt-4">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <span> Head to the <strong>Cart page</strong> to confirm your selected items. </span>
                </li>
                
                <li className="flex items-start gap-3 mt-4">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <span> Click the <strong>“Proceed to Checkout”</strong> button to continue. </span>
                </li>
                
                <li className="flex items-start gap-3 mt-4">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
                  <span> Fill in your <strong>delivery address</strong> and <strong>phone number</strong>. </span>
                </li>
                
                <li className="flex items-start gap-3 mt-4">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">6</span>
                  <span> Click the <strong>“Pay”</strong> button and complete your payment securely. </span>
                </li>
                
                <li className="flex items-start gap-3 mt-4">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">7</span>
                  <span> Share your <strong>payment receipt</strong> and a <strong>screenshot of your order</strong> with us via WhatsApp. </span>
                </li>
                
                <li className="flex items-start gap-3 mt-4">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">8</span>
                  <span> Your order will be delivered to your doorstep. 🚚✨ </span>
                </li>
              </ol>
            </div>

            {/* WhatsApp Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-1.5 text-green-800">
                <FaWhatsapp className="text-lg" />
                <span className="font-semibold">Customer Support:</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Need help? Contact us via <a className="underline" href='https://wa.me/' target='_blank'>WhatsApp</a> for quick assistance with your order!
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
            <Link to="/shop"
              onClick={() => {handleClose() }}
              className="w-full h-fit bg-primary text-white py-3 px-4 flex items-center justify-center rounded-lg font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Got it! Let's Go Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePopup;