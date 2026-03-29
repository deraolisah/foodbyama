// // components/RequireEmailVerification.jsx - Add better error handling
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { FaEnvelope, FaKey, FaSpinner, FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';

// const RequireEmailVerification = ({ children }) => {
//   const { user, verifyUser, resendCode, isLoading } = useAuth();
//   const [code, setCode] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [countdown, setCountdown] = useState(0);
//   const navigate = useNavigate();

//   // Check if user has verified email in this session
//   const [isVerified, setIsVerified] = useState(() => {
//     return sessionStorage.getItem('email_verified') === 'true';
//   });

//   useEffect(() => {
//     // If no user, redirect to login
//     if (!user) {
//       navigate('/login');
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     // Countdown for resend button
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (code.length !== 6) {
//       setError('Please enter a valid 6-digit code');
//       return;
//     }

//     try {
//       await verifyUser(user.email, code);
//       sessionStorage.setItem('email_verified', 'true');
//       setIsVerified(true);
//     } catch (err) {
//       setError(err.message || 'Invalid verification code');
//       setCode(''); // Clear the code for retry
//     }
//   };

//   const handleResend = async () => {
//     setError('');
//     setSuccess('');
//     setCountdown(60); // 60 second cooldown
    
//     try {
//       await resendCode(user.email);
//       setSuccess('New verification code sent! Check your email.');
      
//       // In development, show the code from server logs
//       if (import.meta.env.DEV) {
//         setSuccess(prev => prev + ' Check server console for code.');
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to resend code');
//       setCountdown(0);
//     }
//   };

//   if (isVerified) {
//     return children;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-md mx-auto">
//         <button
//           onClick={() => navigate('/account')}
//           className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back to Account
//         </button>

//         <div className="bg-white rounded-2xl shadow-md p-8">
//           <div className="text-center mb-6">
//             <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FaEnvelope className="text-3xl text-primary" />
//             </div>
//             <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
//             <p className="text-gray-600">
//               We've sent a verification code to <strong className="text-primary">{user?.email}</strong>
//             </p>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 flex items-start gap-2">
//               <FaExclamationCircle className="mt-0.5 shrink-0" />
//               <span>{error}</span>
//             </div>
//           )}

//           {success && (
//             <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4">
//               {success}
//             </div>
//           )}

//           <form onSubmit={handleVerify}>
//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Enter 6-Digit Code
//               </label>
//               <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-3xl tracking-widest font-mono"
//                 placeholder="000000"
//                 maxLength="6"
//                 autoFocus
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-2 text-center">
//                 Enter the 6-digit code sent to your email
//               </p>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading || code.length !== 6}
//               className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <FaSpinner className="animate-spin mr-2" />
//                   Verifying...
//                 </span>
//               ) : (
//                 'Verify & Continue'
//               )}
//             </button>

//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={handleResend}
//                 disabled={isLoading || countdown > 0}
//                 className="text-primary hover:underline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {countdown > 0 
//                   ? `Resend code in ${countdown}s` 
//                   : 'Didn\'t receive code? Resend'
//                 }
//               </button>
//             </div>
//           </form>

//           {import.meta.env.DEV && (
//             <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <p className="text-xs text-yellow-800">
//                 <strong>🔧 Development Mode:</strong> Check your server console for the verification code
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequireEmailVerification;