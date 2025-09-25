// contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const toast = useToast(); // ✅

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('foodByAma_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        localStorage.removeItem('foodByAma_cart');
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('foodByAma_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Consistent price extraction
  const extractPrice = (priceString) => {
    if (typeof priceString === 'number') return priceString;
    if (!priceString) return 0;
    
    const numericValue = parseFloat(priceString.replace(/[^\d.]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  // Generate unique ID for cart items
  const generateItemId = (item) => {
    return `${item.name}-${item.size || 'standard'}`;
  };

  const addToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      const itemId = generateItemId(item);
      const existingItemIndex = prevItems.findIndex(cartItem => 
        generateItemId(cartItem) === itemId
      );
      
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity
        };
        
        // toast(`Updated ${item.name} quantity to ${newQuantity}`, 'success');
        toast.success(`Updated ${item.name} quantity to ${newQuantity}`);

        return updatedItems;
      } else {
        const newItem = {
          ...item,
          id: itemId,
          quantity,
          unitPrice: extractPrice(item.price),
          size: item.size || 'Standard'
        };
        
        // toast(`Added ${item.name} to cart`, 'success');
        toast.success(`Added ${item.name} to cart`);
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === itemId);
      if (removedItem) {
        // toast(`Removed ${removedItem.name} from cart`, 'warning');
        toast.warning(`Removed ${removedItem.name} from cart`);

      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    if (cartItems.length > 0) {
      // toast('Cart cleared', 'info');
      toast.info(`Cart cleared`);

    }
    setCartItems([]);
  };

  const getItemTotal = (item) => {
    return (item.unitPrice || extractPrice(item.price)) * item.quantity;
  };

  const formatPrice = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + getItemTotal(item), 0);
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
      getItemTotal,
      formatPrice,
      generateItemId
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