// contexts/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext'; // Add this import

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
   const toast = useToast(); // Get toast function

  const addToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => 
        cartItem.name === item.name && cartItem.size === item.size
      );
      
      if (existingItem) {
        toast.success(`Updated ${item.name} quantity to ${existingItem.quantity + quantity}`);
        return prevItems.map(cartItem =>
          cartItem.name === item.name && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      
      toast.success(`Added ${quantity} ${item.name} to cart`);
      return [...prevItems, { ...item, quantity }];
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
      if (updatedItem) {
        toast.success(`Updated ${updatedItem.name} quantity to ${newQuantity}`);
      }
      return prevItems.map(item =>
        item.name === itemName && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return total + (price * item.quantity);
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
      getCartItemsCount
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