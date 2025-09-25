// pages/Menu.jsx
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from "react-icons/fa";
import { useCart } from '../contexts/CartContext';
import { useMenu } from '../contexts/MenuContext';
import placeholderImg from "../assets/placeholder.png";
import ItemModal from '../components/ItemModal';

const Menu = () => {
  const { weeklyMenu } = useMenu();
  const { addToCart } = useCart();
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const days = Object.keys(weeklyMenu);
  const currentDay = days[currentDayIndex];
  const menuItems = weeklyMenu[currentDay] || [];

  const nextDay = () => {
    setCurrentDayIndex((prev) => (prev + 1) % days.length);
  };

  const prevDay = () => {
    setCurrentDayIndex((prev) => (prev - 1 + days.length) % days.length);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleQuickAdd = (item, e) => {
    e.stopPropagation();
    
    const cartItem = {
      ...item,
      size: item.sizes[0].size,
      price: item.sizes[0].price,
      unitPrice: parseFloat(item.sizes[0].price.replace(/[^\d.]/g, '')) || 0,
      sizes: undefined
    };
    
    addToCart(cartItem, 1);
  };

  if (days.length === 0) {
    return (
      <div className="container py-8 text-center">
        <p className="text-gray-500">No weekly menu available. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* Day Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={prevDay}
          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          <FaChevronLeft />
        </button>
        
        <h2 className="text-2xl font-bold text-center">
          {currentDay} Specials
        </h2>
        
        <button 
          onClick={nextDay}
          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Menu Items */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-sm border border-dark/10 p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <div className="flex gap-4">
              <img 
                src={item.image || placeholderImg} 
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                {/* <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {item.desc} ({item.category})
                </p> */}
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">
                    {item.sizes[0].price}
                  </span>
                  {/* <button
                    onClick={(e) => handleQuickAdd(item, e)}
                    className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition"
                  >
                    <FaShoppingCart size={14} />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-primary/10 border border-primary rounded-xl p-4 py-6 text-center">
        <p className="font-semibold text-primary mb-1">
          Thank you for shopping with FoodByAma! 🎉
        </p>
        <p className="text-primary text-sm">
          Please remember to place your order for each day at least 12 hours in advance.
        </p>
      </div>

      <ItemModal 
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Menu;