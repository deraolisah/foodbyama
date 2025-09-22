// components/ItemModal.jsx
import React, { useState, useEffect } from 'react';
import placeholder from "../assets/placeholder.jpg";
import { useCart } from '../contexts/CartContext';
import { FaTimes } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

const ItemModal = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);

  // Update current item when modal opens with a new item
  useEffect(() => {
    if (isOpen && item) {
      setCurrentItem(item);
      setQuantity(1); // Reset quantity when new item is selected
      
      // Prevent body scrolling
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling when modal closes
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen, item]);

  const handleAddToCart = () => {
    if (currentItem) {
      addToCart(currentItem, quantity);
      alert(`${quantity} ${currentItem.name} added to cart!`);
      onClose();
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27 && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Modal content - Always rendered but hidden */}
      <div className={`fixed bottom-0 left-0 right-0 z-60 transform transition-all duration-400 ease-in-out ${
        isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-25 opacity-0 pointer-events-none"
      }`}>
        <div className="container !px-0 !py-0 bg-white rounded-t-3xl max-h-[84vh] md:max-h-[90vh] overflow-y-auto scrollbar-hidden">
          <div className="relative bg-primary flex items-center justify-center p-4 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-dark text-light hover:bg-dark/80 transition cursor-pointer"
            >
              <FaTimes />
            </button>
            
            <img
              src={currentItem?.image || placeholder}
              alt={currentItem?.name}
              className="w-fit h-64 object-cover rounded-xl ring-1 ring-dark/50"
            />
          </div>

          <div className="p-6 space-y-4 md:space-y-6">
            {currentItem ? (
              <>
                <div className='w-full flex items-start justify-between gap-4 mb-6 md:mb-8'>
                  <h2 className="text-xl md:text-2xl font-bold">{currentItem.name}</h2>
                  <p className="text-xl text-primary font-bold">{currentItem.price}</p>
                </div>

                <hr className='h-px w-full border-none bg-dark/10'/>

                <div>        
                  {currentItem.size && <p className="text-md text-dark/70 mb-2">Size: {currentItem.size}</p>}
                  
                  <p className={`text-sm mb-4 ${currentItem.isAvailable !== false ? "text-green-600" : "text-red-600"}`}>
                    {currentItem.isAvailable !== false ? "Available" : "Out of stock"}
                  </p>

                  {currentItem.isAvailable !== false && (
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
              </>
            ) : (
              <div className="text-center py-8">
                <p>Item not found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop overlay - Only rendered when modal is open */}
      {isOpen && (
        <div 
          className="fixed top-0 inset-0 h-full w-full bg-dark/50 backdrop-blur-xs z-50 cursor-pointer"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default ItemModal;