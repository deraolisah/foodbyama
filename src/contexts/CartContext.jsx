// contexts/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const toast = useToast();

  // Helper function to extract price from string (e.g., "₦11,000" -> 11000)
  const extractPrice = (priceString) => {
    return parseFloat(priceString.replace(/[^\d.]/g, '')) || 0;
  };

  const addToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => 
        cartItem.name === item.name && cartItem.size === item.size
      );
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        toast.success(`Updated ${item.name} quantity to ${newQuantity}`);
        return prevItems.map(cartItem =>
          cartItem.name === item.name && cartItem.size === item.size
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        );
      } else {
        toast.success(`Added ${quantity} ${item.name} to cart`);
        return [...prevItems, { 
          ...item, 
          quantity,
          unitPrice: extractPrice(item.price) // Store unit price for calculations
        }];
      }
    });
  };

  const removeFromCart = (itemName, size) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.name === itemName && item.size === size);
      if (removedItem) {
        toast.info(`Removed ${removedItem.name} from cart`);
      }
      return prevItems.filter(item => !(item.name === itemName && item.size === size));
    });
  };

  const updateQuantity = (itemName, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemName, size);
      return;
    }
    
    setCartItems(prevItems => {
      const updatedItem = prevItems.find(item => item.name === itemName && item.size === size);
      if (updatedItem && updatedItem.quantity !== newQuantity) {
        toast.success(`Updated ${updatedItem.name} quantity to ${newQuantity}`);
      }
      return prevItems.map(item =>
        item.name === itemName && item.size === size
          ? { 
              ...item, 
              quantity: newQuantity,
              unitPrice: item.unitPrice || extractPrice(item.price) // Ensure unitPrice exists
            }
          : item
      );
    });
  };

  const clearCart = () => {
    if (cartItems.length > 0) {
      toast.info('Cart cleared');
    }
    setCartItems([]);
  };

  // Calculate total for a specific item
  const getItemTotal = (item) => {
    const unitPrice = item.unitPrice || extractPrice(item.price);
    return unitPrice * item.quantity;
  };

  // Format price with Nigerian Naira symbol
  const formatPrice = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + getItemTotal(item);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      getItemTotal, // Add this new function
      formatPrice   // Add formatting utility
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};