// // components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { FaSpinner } from 'react-icons/fa';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading, user } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }
  
//   // if (!isAuthenticated) {
//   //   return <Navigate to="/login" replace />;
//   // }
//   if (!user && !isLoading && !isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// };

// export default ProtectedRoute;


// components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, setShowLoginModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
      navigate('/', { replace: true });
    }
  }, [user, setShowLoginModal, navigate]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;