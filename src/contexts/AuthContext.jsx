// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('foodbyama_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('foodbyama_user');
      }
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('foodbyama_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foodbyama_user');
    }
  }, [user]);

  // Find or create user at checkout
  const findOrCreateUser = async (userData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/find-or-create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      // Store email for verification
      setPendingEmail(userData.email);
      setVerificationSent(true);
      
      // In development, show code in console
      if (import.meta.env.DEV) {
        console.log('🔐 Verification code:', result.verificationCode);
      }
      
      return result.user;

    } catch (error) {
      console.error('Error in findOrCreateUser:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify user with code
  // contexts/AuthContext.jsx - Update verifyUser
  const verifyUser = async (email, code) => {
    setIsLoading(true);
    try {
      console.log('🔍 Verifying with:', { email, code });
      
      const response = await fetch(`${API_BASE_URL}/users/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code })
      });

      const result = await response.json();
      console.log('📥 Verification response:', result);

      if (!result.success) {
        throw new Error(result.error || 'Verification failed');
      }

      setUser(result.user);
      setVerificationSent(false);
      setPendingEmail('');
      
      // Set session verification
      sessionStorage.setItem('email_verified', 'true');
      
      return result.user;

    } catch (error) {
      console.error('Error in verifyUser:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification code
  const resendCode = async (email) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/resend-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      if (import.meta.env.DEV) {
        console.log('🔐 New verification code:', result.verificationCode);
      }
      
      return true;

    } catch (error) {
      console.error('Error resending code:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get user orders by email
  const getUserOrders = async (email) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/orders?email=${encodeURIComponent(email)}`
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result;

    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get single order
  const getOrder = async (orderId, email) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/orders/${orderId}?email=${encodeURIComponent(email)}`
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.order;

    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setVerificationSent(false);
    setPendingEmail('');
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      findOrCreateUser,
      verifyUser,
      resendCode,
      getUserOrders,
      getOrder,
      logout,
      isLoading,
      verificationSent,
      pendingEmail
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