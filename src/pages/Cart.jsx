// pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FaMinus, FaPlus, FaXmark } from "react-icons/fa6";

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal, 
    clearCart,
    getItemTotal,
    formatPrice 
  } = useCart();

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
        {cartItems.map((item, index) => {
          const itemTotal = getItemTotal(item);
          const unitPrice = item.unitPrice || parseFloat(item.price.replace(/[^\d.]/g, ''));
          
          return (
            <div key={index} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                {item.size && <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>}
                
                {/* Breakdown (optional) */}
                <p className="text-xs text-gray-500 mt-1">
                  {unitPrice.toLocaleString()} × {item.quantity} = {itemTotal.toLocaleString()}
                </p>

                <p className="text-primary font-bold text-lg">
                  {formatPrice(itemTotal)}
                </p>

                {/* Unit Price */}
                {/* <p className="text-sm text-gray-600">
                  Unit Price: {formatPrice(unitPrice)}
                </p> */}
                
                {/* Quantity and Item Total */}
                <div className="flex items-center justify-between mt-2">
                  {/* <span className="text-sm font-medium">Quantity: {item.quantity}</span> */}
                </div>                
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center bg-dark/10 p-1 rounded-full overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.name, item.size, item.quantity - 1)}
                    className="p-2 flex items-center justify-center text-base font-bold rounded-full shadow bg-white cursor-pointer hover:bg-gray-50 transition"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="px-4 py-1 font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.name, item.size, item.quantity + 1)}
                    className="p-2 flex items-center justify-center text-base font-bold rounded-full shadow bg-white cursor-pointer hover:bg-gray-50 transition"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.name, item.size)}
                  className="text-red-600 hover:text-red-800 bg-dark/10 p-2.5 rounded-full font-medium text-lg transition-colors cursor-pointer"
                >
                  <FaXmark />
                </button>
              </div>
            </div>
          );
        })}
        
        <div className="mt-6 pt-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold">Total: {formatPrice(getCartTotal())}</h3>
              <p className="text-sm text-gray-600">
                {cartItems.reduce((total, item) => total + item.quantity, 0)} items
              </p>
            </div>
            <button 
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 font-medium transition-colors cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
          
          <div className='flex items-center gap-4 justify-between'>
            <Link 
              to="/menu" 
              className="w-full py-3 rounded-lg block text-center text-primary hover:underline transition-colors bg-primary/5 cursor-pointer"
              >
              Continue Shopping
            </Link>

            <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition cursor-pointer">
              Proceed to Checkout
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;