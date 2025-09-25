// pages/Home.jsx
import React, { useState, useEffect } from 'react';
import placeholder from "../assets/placeholder.png";
import { useMenu } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';
import ItemModal from '../components/ItemModal';

const Home = () => {
  const { categories, selectedCategory, setSelectedCategory, isLoading, getUniqueProducts } = useMenu();
  const { addToCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  if (isLoading) {
    return (
      <div className="container py-8 text-center">
        <div className="animate-pulse">Loading menu...</div>
      </div>
    );
  }

  const uniqueProducts = getUniqueProducts();
  const displayItems = uniqueProducts[selectedCategory] || [];

  return (
    <div className="min-h-screen">
      {/* Category Navigation */}
      <div className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className="container">
          <div className="flex overflow-x-auto gap-2 py-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4.5 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors border border-dark/10 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-primary text-white font-medium border-primary"
                    : scrolled 
                    ? "text-gray-700 hover:bg-primary/10"
                    : "bg-white/80 text-gray-700 hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container py-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          {selectedCategory}
        </h2>

        {displayItems.length === 0 ? (
          <div className="text-center py-2 text-gray-500">
            No items available in this category
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayItems.map((item, index) => (
              <div 
                key={`${item.name}-${index}`}
                className="bg-white rounded-xl shadow-sm border border-dark/10 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="aspect-square overflow-hidden relative rounded-b-xl">
                  <img 
                    src={item.image || placeholder} 
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="w-full h-fit absolute bottom-0 bg-gradient-to-b from-transparent via-dark to-dark backdrop-blur-xs rounded-b-xl p-2.5 px-4 font-semibold text-light text-sm">{item.name}</h3>
                </div>
                
                <div className="p-2.5 px-4">
                  <p className="text-dark font-bold text-sm">
                    {item.sizes.length > 1 
                      ? `From ${item.sizes[0].price}` 
                      : item.sizes[0].price
                    }
                  </p>
                  
                  {/* <button
                    onClick={(e) => handleQuickAdd(item, e)}
                    className="w-full mt-2 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Quick Add
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ItemModal 
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;