// pages/OrderSuccess.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle, FaWhatsapp, FaPrint, FaHome } from 'react-icons/fa';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderNumber, grandTotal } = location.state || {};

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const message = `Hello FoodByAma! I just placed an order.\nOrder Number: ${orderNumber}\nAmount: ₦${grandTotal?.toLocaleString()}\nPlease confirm my order.`;
    const whatsappUrl = `https://wa.me/2348123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!orderNumber) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="mb-6">It seems you accessed this page directly.</p>
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-dark/10 p-6 md:p-8">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
          <p className="text-gray-600 mt-2">Thank you for your order. We're preparing it now.</p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-bold text-primary">₦{grandTotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status:</span>
              <span className="font-medium text-green-600">Paid ✅</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Status:</span>
              <span className="font-medium text-blue-600">Processing</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">What's Next?</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li>1. We've received your order and payment</li>
            <li>2. Our team will contact you to confirm details</li>
            <li>3. Your food will be prepared fresh</li>
            <li>4. Delivery/Pickup as selected</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition flex-1"
          >
            <FaWhatsapp />
            Confirm via WhatsApp
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition flex-1"
          >
            <FaPrint />
            Print Receipt
          </button>
          
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition flex-1"
          >
            <FaHome />
            Back Home
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Contact us at: 
            <br />📞 0800-FOOD-AMA (0800-366-3262)
            <br />📧 support@foodbyama.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;