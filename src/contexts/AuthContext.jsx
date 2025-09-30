// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('foodbyama_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        // console.log('✅ User loaded from localStorage:', userData);
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
      // console.log('✅ User saved to localStorage:', user);
    } else {
      localStorage.removeItem('foodbyama_user');
      // console.log('✅ User removed from localStorage');
    }
  }, [user]);

  // Get user profile with full details
  const getUserProfile = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      // Update user with full profile data
      setUser(result.user);
      return result.user;
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  const getUserOrders = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/orders`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result.orders;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  };

  const getOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result.order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      getUserProfile,
      getUserOrders,
      getOrder,
      logout,
      isLoading
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