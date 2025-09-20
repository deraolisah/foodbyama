// pages/Home.jsx
import React, { useState, useContext } from 'react';
import { FaArrowLeft, FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from '../contexts/CartContext';
import { MenuContext } from '../contexts/MenuContext';
import placeholderImg from "../assets/placeholder.jpg";


const Home = () => {
  const { weeklyMenu } = useContext(MenuContext);
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  const days = Object.keys(weeklyMenu);
  const nextDay = () => {
    setCurrentIndex((prev) => (prev + 1) % days.length);
  };

  const prevDay = () => {
    setCurrentIndex((prev) => (prev - 1 + days.length) % days.length);
  };

  const currentDay = days[currentIndex];
  const menuItems = weeklyMenu[currentDay] || [];

  const handleQuickAdd = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    alert(`${item.name} added to cart!`);
  };

  if (days.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-4 md:pt-8">
        <div className='bg-white rounded-2xl shadow-md p-4 md:p-6 text-center'>
          <p>No weekly menu available. Check back later!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-4 md:pt-8">
      <div className='bg-white rounded-2xl shadow-md p-4 md:p-6 space-y-4'>
        {/* Carousel Controls */}
        <div className="flex justify-between items-center">
          <button onClick={prevDay} className="p-2.5 bg-primary/10 text-dark text-xs hover:bg-primary hover:text-light rounded-full cursor-pointer"> 
            <FaArrowLeft /> 
          </button>
          <h3 className="text-md font-bold text-center rounded-full bg-primary/10 w-fit mx-auto px-4 py-0.5 uppercase"> 
            {currentDay} 
          </h3>
          <button onClick={nextDay} className="p-2.5 bg-primary/10 text-dark text-xs hover:bg-primary hover:text-light rounded-full cursor-pointer"> 
            <FaArrowRight /> 
          </button>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
          {menuItems.map((item, index) => (
            <Link 
              to={`/menu/${item.category}/${encodeURIComponent(item.name)}`} 
              key={index} 
              className="bg-primary/10 p-4 rounded-xl shadow flex items-start gap-2.5 relative group"
              state={{ fromWeeklyMenu: true, day: currentDay }} // Optional: pass state for tracking
            >
              <img src={placeholderImg} alt='' className='min-w-20 h-20 rounded-lg bg-dark/50' />
              <div className='flex flex-col items-start flex-1'>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-primary font-bold">{item.price}</p>
              </div>
              
              {/* Quick Add to Cart Button */}
              <button
                onClick={(e) => handleQuickAdd(item, e)}
                className="absolute top-2 right-2 p-2 bg-primary text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Quick add to cart"
              >
                <FaShoppingCart size={14} />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;