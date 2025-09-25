// components/ItemModal.jsx
import React, { useState, useEffect } from 'react';
import placeholder from "../assets/placeholder.png";
import { useCart } from '../contexts/CartContext';
import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";

const ItemModal = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedSizeIndex(0);
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Normalize item structure
  const normalizedItem = item ? {
    ...item,
    sizes: item.sizes || [{ size: 'Standard', price: item.price || '₦0' }],
    isAvailable: item.isAvailable !== false
  } : null;

  const handleAddToCart = () => {
    if (!normalizedItem) return;

    const selectedSize = normalizedItem.sizes[selectedSizeIndex];
    const cartItem = {
      ...normalizedItem,
      name: normalizedItem.name,
      size: selectedSize.size,
      price: selectedSize.price,
      unitPrice: parseFloat(selectedSize.price.replace(/[^\d.]/g, '')) || 0,
      // Remove sizes array for cart
      sizes: undefined
    };

    addToCart(cartItem, quantity);
    onClose();
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !normalizedItem) return null;

  const selectedSize = normalizedItem.sizes[selectedSizeIndex];
  const hasMultipleSizes = normalizedItem.sizes.length > 1;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slideUp">
        <div className="w-full mx-auto max-w-2xl !px-0 bg-white rounded-t-3xl max-h-[80svh] overflow-y-auto scrollbar-hidden">
          {/* Header */}
          <div className="w-full relative bg-primary p-4 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white text-dark hover:bg-gray-100 transition cursor-pointer"
            >
              <FaTimes />
            </button>
            
            <img
              src={normalizedItem.image || placeholder}
              alt={normalizedItem.name}
              className="w-fit h-64 mx-auto object-cover rounded-xl shadow"
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h2 className="text-xl font-bold">{normalizedItem.name}</h2>
                <p className="text-dark/80 text-sm mt-1">{normalizedItem.desc}</p>
              </div>
              <span className="text-xl font-bold text-primary">
                {selectedSize.price}
              </span>
            </div>

            <hr className="border border-dark/10"/>

            {/* Availability */}
            <p className={`text-sm ${normalizedItem.isAvailable ? "text-green-600" : "text-red-600"}`}>
              {normalizedItem.isAvailable ? 
                (
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-600 inline-flex"></span>Available 
                  </div>
                ) : (
                "❌ Out of stock"
              )}
            </p>


            {/* Size Selection */}
            {hasMultipleSizes && (
              <div>
                <label className="block font-medium mb-2">Select Size:</label>
                <div className="flex gap-2 overflow-x-auto">
                  {normalizedItem.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSizeIndex(index)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedSizeIndex === index
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{size.size}</div>
                      <div className="text-sm">{size.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          
            {/* Quantity and Add to Cart */}
            {normalizedItem.isAvailable && (
              <div className="space-y-4 mt-8">
                <div className="flex items-center justify-start gap-2.5">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center bg-dark/10 rounded-full p-1">
                    <button 
                      onClick={decrementQuantity}
                      className="p-2 rounded-full shadow bg-light hover:bg-primary/20 transition cursor-pointer"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="px-3.5 font-medium">{quantity}</span>
                    <button 
                      onClick={incrementQuantity}
                      className="p-2 rounded-full shadow bg-light hover:bg-primary/20 transition cursor-pointer"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Add to Cart - {selectedSize.price}
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