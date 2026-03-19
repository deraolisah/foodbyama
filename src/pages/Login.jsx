// pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaKey, FaSpinner, FaArrowLeft } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('request'); // 'request' or 'verify'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { 
    findOrCreateUser, 
    verifyUser, 
    resendCode, 
    isLoading, 
    verificationSent 
  } = useAuth();
  
  const navigate = useNavigate();

  const handleRequestAccess = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      // We don't need fullName and phone for login, 
      // so we'll pass just email with placeholder values
      await findOrCreateUser({
        email,
        phone: '0000000000', // Placeholder - we'll get this from orders
        fullName: 'Customer' // Placeholder
      });

      setSuccess('Verification code sent! Check your email.');
      setMode('verify');
    } catch (err) {
      setError(err.message || 'Failed to send verification code');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      await verifyUser(email, code);
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Invalid verification code');
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    
    try {
      await resendCode(email);
      setSuccess('New verification code sent!');
    } catch (err) {
      setError(err.message || 'Failed to resend code');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            {/* <h1 className="text-3xl font-bold text-primary">FoodByAma</h1> */}
            <h1 className="text-xl font-bold">
              {mode === 'request' 
                ? 'Access your orders & account' 
                : 'Check your email for the verification code'}
            </h1>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          {/* Request Mode - Email Input */}
          {mode === 'request' && (
            <form onSubmit={handleRequestAccess}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    autoComplete='email'
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your@email.com"
                    required
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We'll send a 6-digit verification code to this email
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Sending Code...
                  </span>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </form>
          )}

          {/* Verify Mode - Code Input */}
          {mode === 'verify' && (
            <form onSubmit={handleVerify}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-gray-700">{email}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={code}
                    inputMode='numeric'
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
                  'Verify & Access Account'
                )}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-primary hover:underline"
                >
                  Resend Code
                </button>
                <button
                  type="button"
                  onClick={() => setMode('request')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Use different email
                </button>
              </div>
            </form>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">How it works:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Enter your email address</li>
              <li>• We'll send a 6-digit verification code</li>
              <li>• Enter the code to access your account</li>
              <li>• No password to remember!</li>
            </ul>
          </div>

          {/* Test Mode Notice (remove in production) */}
          {import.meta.env.DEV && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>🔧 Development Mode:</strong> Check the browser console for verification codes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;