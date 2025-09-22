// components/ItemModal.jsx
import React, { useState, useEffect } from 'react';
import placeholder from "../assets/placeholder.jpg";
import { useCart } from '../contexts/CartContext';
import { FaTimes } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

const ItemModal = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  // Handle visibility and transitions
  useEffect(() => {
    if (isOpen) {
      // Show the modal and trigger transition
      setIsVisible(true);
      
      // Save the current scroll position and prevent scrolling
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Trigger transition out
      setIsVisible(false);
      
      // Wait for transition to complete before fully hiding
      const timer = setTimeout(() => {
        // Restore scrolling
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }, 400); // Match this with your CSS transition duration
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleAddToCart = () => {
    addToCart(item, quantity);
    alert(`${quantity} ${item.name} added to cart!`);
    onClose();
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Don't render anything if modal is not open and not visible
  if (!isOpen && !isVisible) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div 
        className={`fixed inset-0 h-full w-full bg-black/50 backdrop-blur-sm z-50 transition-all duration-400 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className={`container !px-0 fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[84vh] md:max-h-[90vh] overflow-y-auto scrollbar-hidden transition-all duration-400 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="relative bg-primary flex items-center justify-center py-4 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-dark text-light hover:bg-dark/80 transition cursor-pointer"
          >
            <FaTimes />
          </button>
          
          <img
            src={item?.image || placeholder}
            alt={item?.name}
            className="w-fit h-64 object-cover rounded-xl ring-4 ring-dark"
          />
        </div>

        <div className="p-6 space-y-4 md:space-y-6">
          <div className='w-full flex items-start justify-between gap-4 mb-6 md:mb-8'>
            <h2 className="text-xl md:text-2xl font-bold">{item?.name}</h2>
            <p className="text-xl text-primary font-bold">{item?.price}</p>
          </div>

          <hr className='h-px w-full border-none bg-dark/10'/>

          <div>        
            {item?.size && <p className="text-md text-dark/70 mb-2">Size: {item.size}</p>}
            
            <p className={`text-sm mb-4 ${item?.isAvailable !== false ? "text-green-600" : "text-red-600"}`}>
              {item?.isAvailable !== false ? "Available" : "Out of stock"}
            </p>

            {item?.isAvailable !== false && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center bg-gray-100 p-1 rounded-full overflow-hidden">
                    <button 
                      onClick={decrementQuantity}
                      className="p-2 flex items-center justify-center text-base font-bold rounded-full shadow bg-white cursor-pointer"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                      onClick={incrementQuantity}
                      className="p-2 flex items-center justify-center text-base font-bold rounded-full shadow bg-white cursor-pointer"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemModal;