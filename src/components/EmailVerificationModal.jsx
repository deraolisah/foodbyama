// components/EmailVerificationModal.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaKey, FaSpinner } from 'react-icons/fa';

const EmailVerificationModal = ({ 
  email, 
  onVerify, 
  onResend, 
  isLoading,
  onClose 
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      await onVerify(email, code);
    } catch (err) {
      setError(err.message || 'Invalid verification code');
    }
  };

  const handleResend = async () => {
    setError('');
    setResendMessage('');
    try {
      await onResend(email);
      setResendMessage('New code sent! Check your email.');
      setTimeout(() => setResendMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to resend code');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a 6-digit verification code to <strong>{email}</strong>
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {resendMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4">
            {resendMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Verification Code
            </label>
            <div className="relative">
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength="6"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
          >
            {isLoading ? (
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
            onClick={handleResend}
            disabled={isLoading}
            className="w-full text-gray-600 hover:text-primary transition-colors text-sm"
          >
            Didn't receive code? Resend
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationModal;