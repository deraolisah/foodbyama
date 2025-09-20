// pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="mb-6">Add some delicious items from our menu!</p>
        <Link 
          to="/menu" 
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      
      <div className="bg-white rounded-2xl shadow-md p-6">
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-4 border-b last:border-b-0">
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
              <p className="text-primary font-bold">{item.price}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={() => updateQuantity(item.name, item.size, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-4 py-1">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.name, item.size, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.name, item.size)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Total: ₦{getCartTotal().toLocaleString()}</h3>
            <button 
              onClick={clearCart}
              className="text-red-600 hover:text-red-800"
            >
              Clear Cart
            </button>
          </div>
          
          <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
            Proceed to Checkout
          </button>
          
          <Link 
            to="/menu" 
            className="block text-center mt-4 text-primary hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;