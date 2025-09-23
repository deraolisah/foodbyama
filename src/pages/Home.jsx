// pages/Home.jsx
import React, { useState, useEffect, useContext } from 'react';
import placeholder from "../assets/placeholder.png";
import { MenuContext } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';
import ItemModal from '../components/ItemModal';

const Home = () => {
  const { categories, itemsByCategory, selectedCategory, setSelectedCategory, isLoading } = useContext(MenuContext);
  const { addToCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 68);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleQuickAdd = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item); // This will now trigger the toast via CartContext
    // alert(`${item.name} added to cart!`);
  };

  if (isLoading && !categories) {
    return (
      <div className="container py-8 text-center">
        <p>Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Horizontal Category List */}
      <div className={`sticky z-40 top-0 transition-colors duration-300 ${scrolled ? "bg-primary" : "bg-transparent"}`}>
        <div className='container flex overflow-x-auto space-x-2 py-2.5 md:py-3 scrollbar-hidden'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              title={category}
              className={`relative scroll-snap snap-start px-4.5 py-1.5 rounded-full whitespace-nowrap text-sm cursor-pointer ${
                selectedCategory === category
                ? "bg-primary text-light"
                : scrolled 
                ? "bg-dark/5 text-light/60 hover:bg-dark/15"
                : "border border-dark/10 text-dark/80 hover:bg-dark/10"
              }`}
            >
              {category}
              {/* Dot below active category — only on scroll */}
              {selectedCategory === category && scrolled && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-light"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Display Items */}
      <div className='container space-y-6'>
        <h3 className="text-sm font-bold text-center rounded-full bg-primary/10 w-fit mx-auto px-4 py-1.5 uppercase mt-2"> All {selectedCategory}</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {itemsByCategory[selectedCategory]?.map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl bg-primary/20 overflow-hidden relative group cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <div className='overflow-hidden rounded-2xl h-[220px] md:h-60'>
                <img src={item.image || placeholder} alt="" className='h-full w-full object-cover object-center outline-0 border-0 group-hover:scale-[1.04] transition-all duration-300' />
              </div>

              <h3 className="text-sm md:text-base font-semibold p-2 px-4 absolute bottom-9 bg-gradient-to-b from-transparent via-dark to-dark backdrop-blur-xs text-light w-full rounded-b-2xl">
                {item.name}
                {item.size && (
                  <span className="text-sm font-normal text-light/80"> x {item.size}</span>
                )}
              </h3>

              <div className='p-4 py-1.5 flex justify-between items-center'>
                <p className="text-dark font-bold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Modal */}
      <ItemModal 
        item={selectedItem} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Home;