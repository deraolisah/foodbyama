// components/LoginModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaSpinner, FaGoogle, FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
  const { showLoginModal, setShowLoginModal, login, verifyCode, resendCode, pendingEmail } = useAuth();
  // const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('request');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!showLoginModal) return null;

  const handleRequestAccess = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!email) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    const result = await login(email);
    
    if (result.success) {
      setSuccess(`Verification code sent to your email: ${pendingEmail || email}`);
      setMode('verify');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      setIsLoading(false);
      return;
    }

    const result = await verifyCode(pendingEmail || email, code);
    
    if (!result.success) {
      setError(result.error);
      setCode('');
    }
    
    setIsLoading(false);
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    const result = await resendCode(pendingEmail || email);
    
    if (result.success) {
      setSuccess('New verification code sent!');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setShowLoginModal(false);
    setMode('request');
    setEmail('');
    setCode('');
    setError('');
    setSuccess('');
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-5000 p-4">
      <div className="bg-white rounded-2xl max-h-[80vh] h-fit max-w-md w-full p-5 md:p-6 relative flex flex-col items-center justify-between overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => { handleClose }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>

        <div className="w-full text-center mb-8">
          <h2 className="text-xl font-bold">Welcome Back!</h2>
          <p className="text-gray-600 text-sm mt-1">
            {mode === 'request' 
              ? 'Enter your email to continue' 
              : 'Check your email for the verification code'}
          </p>
        </div>

        <div className="w-full flex flex-col gap-1">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg mb-4 text-sm text-center w-full">
              {success}
            </div>
          )}
        </div>

        {mode === 'request' ? (
          <form onSubmit={handleRequestAccess} className="w-full space-y-4 flex-1">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Sending...
                </span>
              ) : (
                'Continue with Email'
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              <FaGoogle className="text-gray-600" />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="w-full space-y-4 flex-1">
            <div>
              <input
                type="text"
                value={code}
                inputMode='numeric'
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl tracking-widest"
                maxLength="6"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Verifying...
                </span>
              ) : (
                'Verify & Login'
              )}
            </button>

            <div className="text-center space-x-2">
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="text-sm text-primary hover:underline"
              >
                Resend code
              </button>
              <span className="text-sm text-gray-400">•</span>
              <button
                type="button"
                onClick={() => setMode('request')}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Use different email
              </button>
            </div>
          </form>
        )}

        <p className="text-xs text-center text-gray-500 mt-10">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-gray-700 underline hover:text-primary">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;