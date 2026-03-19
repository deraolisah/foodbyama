import React, { useState, useEffect } from 'react';
import Item from "./Item";
import ItemModal from './ItemModal';
import { useMenu } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';
import { Hamburger } from 'lucide-react';

const ItemGrid = () => {
  const { categories, selectedCategory, setSelectedCategory, isLoading, getUniqueProducts } = useMenu();
  const { addToCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const uniqueProducts = getUniqueProducts();
  const displayItems = uniqueProducts[selectedCategory] || [];

  const items = [
    { id: 1, name: "stew", price: "#2,000", description: "", litres: "", img: "" },
    { id: 1, name: "stew", price: "#2,000", description: "", litres: "", img: "" },
    { id: 1, name: "stew", price: "#2,000", description: "", litres: "", img: "" },
  ]

  return (
    <div className="container pt-3 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-center mb-4 md:mb-6">
          {selectedCategory}
        </h2>

        {displayItems.length === 0 ? (
          <div className="rounded-xl text-center text-gray-600 bg-gray-200 min-h-60 flex flex-col items-center justify-center gap-2">
            <Hamburger size={60} />
            <span className='text-dark/80'> No items available in this category </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8">
            {displayItems.map((item, index) => (
              <Item item={item} index={index} handleItemClick={handleItemClick} />
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
  )
}

export default ItemGrid;