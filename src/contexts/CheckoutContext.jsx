import React, { createContext, useContext, useState } from 'react';

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    additionalNotes: ''
  });

  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'
  const [selectedLocation, setSelectedLocation] = useState(''); // For pickup locations
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState(''); // For delivery zones

  // Define delivery zones and prices
  const deliveryZones = [
    { 
      id: 'city-center', 
      name: 'City Center', 
      price: 500, 
      description: 'Central Business District, Maitama, Asokoro' 
    },
    { 
      id: 'suburban', 
      name: 'Suburban Areas', 
      price: 800, 
      description: 'Gwarinpa, Kubwa, Lugbe, Karu' 
    },
    { 
      id: 'outskirts', 
      name: 'Outskirts', 
      price: 1200, 
      description: 'Nyanya, Mararaba, Kuje, Bwari' 
    }
  ];

  // Define pickup locations
  const pickupLocations = [
    { id: 'main-store', name: 'Main Store - City Center', address: '123 Central Business District', hours: '8AM - 10PM' },
    { id: 'maitama', name: 'Maitama Branch', address: '456 Maitama District', hours: '9AM - 9PM' },
    { id: 'gwarinpa', name: 'Gwarinpa Outlet', address: '789 Gwarinpa Estate', hours: '8AM - 8PM' }
  ];

  const updateDeliveryInfo = (newInfo) => {
    setDeliveryInfo(prev => ({ ...prev, ...newInfo }));
  };

  const validateDeliveryInfo = () => {
    const requiredFields = ['fullName', 'phone', 'email'];
    
    if (orderType === 'delivery') {
      requiredFields.push('address');
      if (!selectedDeliveryZone) {
        return { isValid: false, error: 'Please select a delivery zone' };
      }
    } else if (orderType === 'pickup') {
      if (!selectedLocation) {
        return { isValid: false, error: 'Please select a pickup location' };
      }
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

  // Calculate delivery fee based on selected zone
  const getDeliveryFee = () => {
    if (orderType === 'pickup') return 0;
    
    const zone = deliveryZones.find(zone => zone.id === selectedDeliveryZone);
    return zone ? zone.price : 0;
  };

  const clearCheckoutData = () => {
    setDeliveryInfo({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      additionalNotes: ''
    });
    setOrderType('delivery');
    setSelectedLocation('');
    setSelectedDeliveryZone('');
  };

  return (
    <CheckoutContext.Provider value={{
      deliveryInfo,
      orderType,
      selectedLocation,
      selectedDeliveryZone,
      deliveryZones,
      pickupLocations,
      updateDeliveryInfo,
      setOrderType,
      setSelectedLocation,
      setSelectedDeliveryZone,
      validateDeliveryInfo,
      getDeliveryFee,
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