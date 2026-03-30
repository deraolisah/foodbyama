// // pages/Login.jsx
// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';
// import { FaEnvelope, FaKey, FaSpinner, FaArrowLeft } from 'react-icons/fa';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [code, setCode] = useState('');
//   const [mode, setMode] = useState('request'); // 'request' or 'verify'
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const { 
//     findOrCreateUser, 
//     verifyUser, 
//     resendCode, 
//     isLoading, 
//     verificationSent 
//   } = useAuth();
  
//   const navigate = useNavigate();

//   const handleRequestAccess = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!email) {
//       setError('Please enter your email address');
//       return;
//     }

//     try {
//       // We don't need fullName and phone for login, 
//       // so we'll pass just email with placeholder values
//       await findOrCreateUser({
//         email,
//         phone: '0000000000', // Placeholder - we'll get this from orders
//         fullName: 'Customer' // Placeholder
//       });

//       setSuccess('Verification code sent! Check your email.');
//       setMode('verify');
//     } catch (err) {
//       setError(err.message || 'Failed to send verification code');
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (code.length !== 6) {
//       setError('Please enter a valid 6-digit code');
//       return;
//     }

//     try {
//       await verifyUser(email, code);
//       navigate('/account');
//     } catch (err) {
//       setError(err.message || 'Invalid verification code');
//     }
//   };

//   const handleResend = async () => {
//     setError('');
//     setSuccess('');
    
//     try {
//       await resendCode(email);
//       setSuccess('New verification code sent!');
//     } catch (err) {
//       setError(err.message || 'Failed to resend code');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-md mx-auto">
//         <div className="bg-white rounded-2xl shadow-md p-8">
//           {/* Logo/Header */}
//           <div className="text-center mb-8">
//             {/* <h1 className="text-3xl font-bold text-primary">FoodByAma</h1> */}
//             <h1 className="text-xl font-bold">
//               {mode === 'request' 
//                 ? 'Access your orders & account' 
//                 : 'Check your email for the verification code'}
//             </h1>
//           </div>

//           {/* Error/Success Messages */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
//               {error}
//             </div>
//           )}

//           {success && (
//             <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4">
//               {success}
//             </div>
//           )}

//           {/* Request Mode - Email Input */}
//           {mode === 'request' && (
//             <form onSubmit={handleRequestAccess}>
//               <div className="mb-6">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="email"
//                     value={email}
//                     autoComplete='email'
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                     placeholder="your@email.com"
//                     required
//                     />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   We'll send a 6-digit verification code to this email
//                 </p>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center">
//                     <FaSpinner className="animate-spin mr-2" />
//                     Sending Code...
//                   </span>
//                 ) : (
//                   'Send Verification Code'
//                 )}
//               </button>
//             </form>
//           )}

//           {/* Verify Mode - Code Input */}
//           {mode === 'verify' && (
//             <form onSubmit={handleVerify}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Email
//                 </label>
//                 <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                   <p className="text-gray-700">{email}</p>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Verification Code
//                 </label>
//                 <div className="relative">
//                   <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     value={code}
//                     inputMode='numeric'
//                     onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                     className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl tracking-widest"
//                     placeholder="000000"
//                     maxLength="6"
//                     required
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Enter the 6-digit code sent to your email
//                 </p>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center">
//                     <FaSpinner className="animate-spin mr-2" />
//                     Verifying...
//                   </span>
//                 ) : (
//                   'Verify & Access Account'
//                 )}
//               </button>

//               <div className="flex items-center justify-between text-sm">
//                 <button
//                   type="button"
//                   onClick={handleResend}
//                   disabled={isLoading}
//                   className="text-primary hover:underline"
//                 >
//                   Resend Code
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setMode('request')}
//                   className="text-gray-600 hover:text-gray-900"
//                 >
//                   Use different email
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Info Box */}
//           <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <h3 className="font-semibold text-blue-800 mb-2">How it works:</h3>
//             <ul className="text-sm text-blue-700 space-y-1">
//               <li>• Enter your email address</li>
//               <li>• We'll send a 6-digit verification code</li>
//               <li>• Enter the code to access your account</li>
//               <li>• No password to remember!</li>
//             </ul>
//           </div>

//           {/* Test Mode Notice (remove in production) */}
//           {import.meta.env.DEV && (
//             <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <p className="text-xs text-yellow-800">
//                 <strong>🔧 Development Mode:</strong> Check the browser console for verification codes
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




// pages/Login.jsx
// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';
// import { FaSpinner, FaGoogle } from 'react-icons/fa';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [code, setCode] = useState('');
//   const [mode, setMode] = useState('request'); 
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const { 
//     findOrCreateUser, 
//     verifyUser, 
//     resendCode, 
//     isLoading 
//   } = useAuth();
  
//   const navigate = useNavigate();

//   const handleRequestAccess = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!email) {
//       setError('Please enter your email address');
//       return;
//     }

//     try {
//       await findOrCreateUser({
//         email,
//         phone: '0000000000',
//         fullName: 'Customer'
//       });

//       setSuccess('Verification code sent! Check your email.');
//       setMode('verify');
//     } catch (err) {
//       setError(err.message || 'Failed to send verification code');
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (code.length !== 6) {
//       setError('Please enter a valid 6-digit code');
//       return;
//     }

//     try {
//       await verifyUser(email, code);
//       navigate('/account');
//     } catch (err) {
//       setError(err.message || 'Invalid verification code');
//     }
//   };

//   const handleResend = async () => {
//     setError('');
//     setSuccess('');
    
//     try {
//       await resendCode(email);
//       setSuccess('New verification code sent!');
//     } catch (err) {
//       setError(err.message || 'Failed to resend code');
//     }
//   };

//   const handleGoogleLogin = () => {
//     // Placeholder for Google OAuth
//     console.log('Google login clicked');
//     // You can implement Google OAuth later
//   };

//   return (
//     <div className="min-h-[90vh] bg-gray-100 flex items-center justify-center p-0!">
//       <div className="w-full max-w-md bg-white px-4 py-6 sm:px-6 sm:rounded-xl sm:shadow border border-gray-200">
//         {/* Header with time - matching the image */}
//         {/* <div className="flex justify-between items-center mb-8 text-sm text-gray-500">
//           <span>01:07</span>
//           <span>M</span>
//         </div> */}

//         {/* Main Content */}
//         <div className="text-center mb-8">
//           <h1 className="text-base mb-2">
//             You need to be logged in to continue.
//           </h1>
//         </div>

//         {/* Error/Success Messages */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 text-sm">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4 text-sm">
//             {success}
//           </div>
//         )}

//         {/* Request Mode - Email Input */}
//         {mode === 'request' && (
//           <form onSubmit={handleRequestAccess} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 text-sm mb-1">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 autoComplete='true'
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your@email.com"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <FaSpinner className="animate-spin mr-2" />
//                   Sending...
//                 </span>
//               ) : (
//                 'Login'
//               )}
//             </button>
//           </form>
//         )}

//         {/* Verify Mode - Code Input */}
//         {mode === 'verify' && (
//           <form onSubmit={handleVerify} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 text-sm mb-1">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 disabled
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 text-sm mb-1">
//                 Verification Code
//               </label>
//               <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                 placeholder="000000"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl tracking-widest"
//                 maxLength="6"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading || code.length !== 6}
//               className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <FaSpinner className="animate-spin mr-2" />
//                   Verifying...
//                 </span>
//               ) : (
//                 'Verify'
//               )}
//             </button>

//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={handleResend}
//                 className="text-sm text-primary hover:underline"
//               >
//                 Resend code
//               </button>
//               <span className="text-sm text-gray-400 mx-2">•</span>
//               <button
//                 type="button"
//                 onClick={() => setMode('request')}
//                 className="text-sm text-gray-500 hover:text-gray-700"
//               >
//                 Use different email
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Divider */}
//         <div className="relative my-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-4 bg-white text-gray-500">Or continue with</span>
//           </div>
//         </div>

//         {/* Google Button */}
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           <FaGoogle className="text-gray-600" />
//           <span className="text-gray-700 font-medium">Google</span>
//         </button>

//         {/* Sign Up Link */}
//         {/* <div className="mt-6 text-center">
//           <span className="text-sm text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/signup" className="text-primary font-medium hover:underline">
//               Sign Up
//             </Link>
//           </span>
//         </div> */}

//         {/* Terms */}
//         <div className="mt-8 text-xs text-center text-gray-500">
//           By signing in, you agree to our{' '}
//           <Link to="/terms" className="text-gray-700 underline hover:text-primary">
//             Terms of Service
//           </Link>
//           .
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaSpinner, FaGoogle, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isLoading, setIsLoading, login, verifyCode, resendCode, pendingEmail } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('request');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


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
      // setSuccess(`Verification code sent to your email: ${pendingEmail || email}`);
      setSuccess(`Verification code sent to your email:  ${result.email}`);
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
    if (result.success) {
      navigate('/account');
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

  return (
    // <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-5000 p-4">
    // <div className="min-h-screen flex items-center justify-center bg-light px-4">
    <div className="min-h-dvh flex items-start justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl max-h-[80vh] h-fit max-w-md w-full p-5 md:p-6 relative flex flex-col items-center justify-between overflow-y-auto">
        {/* Close button */}
        {/* <button
          onClick={() => { handleClose }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button> */}

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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
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

export default Login;