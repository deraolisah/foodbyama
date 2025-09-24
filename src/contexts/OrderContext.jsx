// contexts/OrderContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';
import { useCart } from './CartContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { clearCart } = useCart();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  // Initialize Paystack payment
  const initializePaystackPayment = async (orderData) => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.PaystackPop) {
        reject(new Error('Paystack not loaded'));
        return;
      }

      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: orderData.deliveryInfo.email,
        amount: orderData.grandTotal * 100, // Convert to kobo
        currency: 'NGN',
        ref: `FBA-${Date.now()}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Full Name",
              variable_name: "full_name",
              value: orderData.deliveryInfo.fullName
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: orderData.deliveryInfo.phone
            },
            {
              display_name: "Order Type",
              variable_name: "order_type",
              value: orderData.orderType
            }
          ]
        },
        callback: function(response) {
          // Payment successful
          resolve(response);
        },
        onClose: function() {
          // Payment window closed
          reject(new Error('Payment cancelled by user'));
        }
      });

      handler.openIframe();
    });
  };

  // Verify Paystack payment
  const verifyPayment = async (reference) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Payment verification failed');
      }

      return result;

    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  };

  // Create order with payment verification
  const createOrder = async (orderData, paymentReference) => {
    setIsLoading(true);
    
    try {
      // Verify payment first
      const paymentVerification = await verifyPayment(paymentReference);
      
      if (!paymentVerification.data.status) {
        throw new Error('Payment verification failed');
      }

      // Prepare order data with payment info
      const completeOrderData = {
        ...orderData,
        paymentStatus: 'paid',
        paystackReference: paymentReference,
        paymentMethod: 'paystack',
        paymentVerification: paymentVerification.data
      };

      // Save order to database
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeOrderData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to create order');
      }

      // Clear cart on successful order
      clearCart();
      
      toast.success('Order placed successfully! Payment verified.');
      return result;

    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error.message || 'Failed to process order');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch order');
      }

      return result.order;

    } catch (error) {
      console.error('Order fetch error:', error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider value={{
      initializePaystackPayment,
      verifyPayment,
      createOrder,
      getOrder,
      isLoading
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};