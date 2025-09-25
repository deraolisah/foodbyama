// pages/Cart.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import ItemModal from '../components/ItemModal';
import placeholder from "../assets/placeholder.png";

const Cart = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal, 
    clearCart,
    getItemTotal,
    formatPrice,
    generateItemId
  } = useCart();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items from our menu!</p>
          <Link 
            to="/menu" 
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <span className="text-gray-600">{cartItems.length} items</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-dark/10 overflow-hidden">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2 p-4 border-b border-dark/10 last:border-b-0">
              <img 
                src={item.image || placeholder} 
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              
              <div className="flex-1 truncate">
                <h3 
                  className="font-semibold hover:text-primary cursor-pointer transition-colors overflow-hidden truncate group"
                  onClick={() => handleItemClick(item)}
                >
                  {item.name}
                  <span className="text-gray-500 group-hover:text-primary text-sm"> | {item.size} </span>
                </h3>
                {/* <p className="text-sm text-gray-600">
                  Size: {item.size}
                </p> */}
                <p className="text-gray-500 text-xs text-wrap mt-1">
                  {formatPrice(item.unitPrice)} × {item.quantity} = 
                  <span className="text-primary font-bold"> {formatPrice(getItemTotal(item))} </span>
                </p>
                {/* Item Total */}
                {/* <div className="min-w-[100px]">
                  <p className="font-semibold">{formatPrice(getItemTotal(item))}</p>
                </div> */}
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center bg-dark/10 rounded-full p-1 overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 bg-light hover:bg-primary/20 transition rounded-full shadow cursor-pointer"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="px-3 font-medium min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 bg-light hover:bg-primary/20 transition rounded-full shadow cursor-pointer"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>


                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2.5 text-primary bg-dark/10 hover:bg-primary/20 rounded-full transition cursor-pointer"
                >
                  <FaTrash className='text-sm'size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="p-4 pt-6 md:p-6 bg-dark/5">
            <div className="flex justify-between items-end mb-8">
              <div className="text-lg font-bold flex items-end gap-2">
                Total:
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(getCartTotal())}
                </span>
              </div>
              <button onClick={clearCart} className="text-sm text-primary hover:underline font-medium cursor-pointer"> Clear Cart </button>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 flex-wrap">
              <button 
                onClick={()=> navigate("/")}
                className="flex-1 py-3 bg-primary/10 rounded-lg text-primary hover:bg-gray-50 transition cursor-pointer text-nowrap">
                Continue Shopping
              </button>
              
              <Link 
                to="/checkout" 
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold text-center hover:bg-primary/90 transition cursor-pointer text-nowrap"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ItemModal 
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Cart;