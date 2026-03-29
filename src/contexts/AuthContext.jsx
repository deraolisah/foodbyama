// // contexts/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [verificationSent, setVerificationSent] = useState(false);
//   const [pendingEmail, setPendingEmail] = useState('');

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   // Load user from localStorage on app start
//   useEffect(() => {
//     const savedUser = localStorage.getItem('foodbyama_user');
//     if (savedUser) {
//       try {
//         const userData = JSON.parse(savedUser);
//         setUser(userData);
//       } catch (error) {
//         console.error('Error parsing saved user:', error);
//         localStorage.removeItem('foodbyama_user');
//       }
//     }
//   }, []);

//   // Save user to localStorage when it changes
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('foodbyama_user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('foodbyama_user');
//     }
//   }, [user]);

//   // Find or create user at checkout
//   const findOrCreateUser = async (userData) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/find-or-create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData)
//       });

//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error);
//       }

//       // Store email for verification
//       setPendingEmail(userData.email);
//       setVerificationSent(true);
      
//       // In development, show code in console
//       // if (import.meta.env.DEV) {
//       //   console.log('🔐 Verification code:', result.verificationCode);
//       // }
      
//       return result.user;

//     } catch (error) {
//       console.error('Error in findOrCreateUser:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Verify user with code
//   // contexts/AuthContext.jsx - Update verifyUser
//   const verifyUser = async (email, code) => {
//     setIsLoading(true);
//     try {
//       console.log('🔍 Verifying with:', { email, code });
      
//       const response = await fetch(`${API_BASE_URL}/users/verify`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, code })
//       });

//       const result = await response.json();
//       console.log('📥 Verification response:', result);

//       if (!result.success) {
//         throw new Error(result.error || 'Verification failed');
//       }

//       setUser(result.user);
//       setVerificationSent(false);
//       setPendingEmail('');
      
//       // Set session verification
//       sessionStorage.setItem('email_verified', 'true');
      
//       return result.user;

//     } catch (error) {
//       console.error('Error in verifyUser:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Resend verification code
//   const resendCode = async (email) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/resend-code`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email })
//       });

//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error);
//       }

//       if (import.meta.env.DEV) {
//         console.log('🔐 New verification code:', result.verificationCode);
//       }
      
//       return true;

//     } catch (error) {
//       console.error('Error resending code:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Get user orders by email
//   const getUserOrders = async (email) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/users/orders?email=${encodeURIComponent(email)}`
//       );

//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error);
//       }

//       return result;

//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Get single order
//   const getOrder = async (orderId, email) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/users/orders/${orderId}?email=${encodeURIComponent(email)}`
//       );

//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error);
//       }

//       return result.order;

//     } catch (error) {
//       console.error('Error fetching order:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setVerificationSent(false);
//     setPendingEmail('');
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       setUser,
//       findOrCreateUser,
//       verifyUser,
//       resendCode,
//       getUserOrders,
//       getOrder,
//       logout,
//       isLoading,
//       verificationSent,
//       pendingEmail
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };




// // contexts/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// // contexts/AuthContext.jsx - Update the initial loading
// export const AuthProvider = ({ children }) => {

//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [verificationSent, setVerificationSent] = useState(false);
//   const [pendingEmail, setPendingEmail] = useState('');

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   // Check auth status on app start
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);


//   const checkAuthStatus = async () => {
//     setIsLoading(true);
    
//     try {
//       // Check for token first
//       const token = localStorage.getItem('foodbyama_token');
      
//       if (!token) {
//         setIsAuthenticated(false);
//         setUser(null);
//         setIsLoading(false);
//         return;
//       }

//       // Validate token with backend
//       const response = await fetch(`${API_BASE_URL}/users/verify-token`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Token validation failed');
//       }

//       const data = await response.json();

//       if (data.success && data.user) {
//         setUser(data.user);
//         setIsAuthenticated(true);
//       } else {
//         // Token invalid
//         localStorage.removeItem('foodbyama_token');
//         localStorage.removeItem('foodbyama_user');
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       // Don't clear token on network errors, just set not authenticated
//       // This prevents logging out users when server is temporarily down
//       setIsAuthenticated(false);
//       setUser(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };


 

//   // Load user from localStorage on app start
//   useEffect(() => {
//     const loadUser = async () => {
//       setIsLoading(true); // Make sure loading is true
      
//       const savedUser = localStorage.getItem('foodbyama_user');
//       if (savedUser) {
//         try {
//           const userData = JSON.parse(savedUser);
          
//           // If we have an email, fetch fresh user data from server
//           if (userData?.email) {
//             try {
//               const response = await fetch(
//                 `${API_BASE_URL}/users/orders?email=${encodeURIComponent(userData.email)}`
//               );
//               const data = await response.json();
              
//               if (data.success && data.user) {
//                 setUser(data.user);
//                 localStorage.setItem('foodbyama_user', JSON.stringify(data.user));
//               } else {
//                 setUser(userData); // Fall back to saved data
//               }
//             } catch (error) {
//               console.error('Error fetching fresh user data:', error);
//               setUser(userData); // Fall back to saved data
//             }
//           } else {
//             setUser(userData);
//           }
//         } catch (error) {
//           console.error('Error parsing saved user:', error);
//           localStorage.removeItem('foodbyama_user');
//         }
//       }
      
//       setIsLoading(false); // Always set loading to false when done
//     };

//     loadUser();
//   }, []);

//   // Save user to localStorage when it changes
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('foodbyama_user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('foodbyama_user');
//     }
//   }, [user]);

//   // Find or create user
//   const findOrCreateUser = async (userData) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/find-or-create`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData)
//       });

//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error);
//       }

//       setPendingEmail(userData.email);
//       setVerificationSent(true);
      
//       return result.user;

//     } catch (error) {
//       console.error('Error in findOrCreateUser:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Verify user with code
//   const verifyUser = async (email, code) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/verify`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, code })
//       });

//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error || 'Verification failed');
//       }

//       // Store token if provided
//       if (result.token) {
//         localStorage.setItem('foodbyama_token', result.token);
//       }

//       // Store user data
//       setUser(result.user);
//       setIsAuthenticated(true);
//       setVerificationSent(false);
//       setPendingEmail('');
      
//       return result.user;

//     } catch (error) {
//       console.error('Error in verifyUser:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Verify user with code
//   // const verifyUser = async (email, code) => {
//   //   setIsLoading(true);
//   //   try {
//   //     const response = await fetch(`${API_BASE_URL}/users/verify`, {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ email, code })
//   //     });

//   //     const result = await response.json();

//   //     if (!result.success) {
//   //       throw new Error(result.error || 'Verification failed');
//   //     }

//   //     // Store complete user data
//   //     setUser(result.user);
//   //     setVerificationSent(false);
//   //     setPendingEmail('');
      
//   //     return result.user;

//   //   } catch (error) {
//   //     console.error('Error in verifyUser:', error);
//   //     throw error;
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // Resend verification code
//   const resendCode = async (email) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/resend-code`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       });

//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error);
//       }
      
//       return true;

//     } catch (error) {
//       console.error('Error resending code:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Refresh user data from server
//   const refreshUser = async () => {
//     if (!user?.email) return;
    
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/users/orders?email=${encodeURIComponent(user.email)}`
//       );
//       const data = await response.json();
      
//       if (data.success && data.user) {
//         setUser(data.user);
//       }
//     } catch (error) {
//       console.error('Error refreshing user:', error);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     setVerificationSent(false);
//     setPendingEmail('');
//     localStorage.removeItem('foodbyama_token');
//     localStorage.removeItem('foodbyama_user');
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       setUser,
//       findOrCreateUser,
//       verifyUser,
//       resendCode,
//       refreshUser,
//       logout,
//       isLoading,
//       verificationSent,
//       pendingEmail,
//       isAuthenticated,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };




// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');


  // Set and Load user from localStorage on app start - SIMPLE
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('foodbyama_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error loading user:', error);
      return null;
    }
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('foodbyama_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foodbyama_user');
    }
  }, [user]);

  const login = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/find-or-create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone: '0000000000',
          fullName: 'Customer'
        })
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(errorText || 'Request failed');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Something went wrong');
      }

      setPendingEmail(email);
      return { success: true, requiresVerification: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const verifyCode = async (email, code) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Request failed');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Something went wrong');
      }

      // const result = await response.json();

      // if (!result.success) {
      //   throw new Error(result.error || 'Verification failed');
      // }

      // Store user data - this will automatically save to localStorage
      setUser({
        ...result.user,
        token: result.token
      });
      setShowLoginModal(false);
      setPendingEmail('');
      
      return { success: true };
    } catch (error) {
      console.error('Verification error:', error);
      return { success: false, error: error.message };
    }
  };

  const resendCode = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/resend-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(errorText || 'Request failed');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Something went wrong');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('foodbyama_user');
    setUser(null);
    setPendingEmail('');
  };

  const requireAuth = () => {
    if (!user) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };


  useEffect(() => {
    const verifyUserToken = async () => {
      if (!user?.token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/users/verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error);
        }

        // ✅ Update user with fresh backend data
        setUser(prev => ({
          ...result.user,
          token: prev.token
        }));

      } catch (error) {
        console.error('Token invalid/expired:', error);

        // ❌ Kill session
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserToken();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      showLoginModal,
      setShowLoginModal,
      pendingEmail,
      login,
      verifyCode,
      resendCode,
      logout,
      requireAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};