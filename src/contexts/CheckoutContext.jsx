// contexts/CheckoutContext.jsx
import React, { createContext, useContext, useState } from 'react';

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    additionalNotes: ''
  });

  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'

  const updateDeliveryInfo = (newInfo) => {
    setDeliveryInfo(prev => ({ ...prev, ...newInfo }));
  };

  const validateDeliveryInfo = () => {
    const requiredFields = ['fullName', 'phone', 'email', 'address'];
    
    if (orderType === 'delivery') {
      requiredFields.push('city', 'state');
    }

    for (const field of requiredFields) {
      if (!deliveryInfo[field]?.trim()) {
        return { isValid: false, missingField: field };
      }
    }

    // Basic phone validation
    const phoneRegex = /^[0-9+]{11,15}$/;
    if (!phoneRegex.test(deliveryInfo.phone.replace(/\s/g, ''))) {
      return { isValid: false, error: 'Please enter a valid phone number' };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(deliveryInfo.email)) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true };
  };

  const clearCheckoutData = () => {
    setDeliveryInfo({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      additionalNotes: ''
    });
    setOrderType('delivery');
  };

  return (
    <CheckoutContext.Provider value={{
      deliveryInfo,
      orderType,
      updateDeliveryInfo,
      setOrderType,
      validateDeliveryInfo,
      clearCheckoutData
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};