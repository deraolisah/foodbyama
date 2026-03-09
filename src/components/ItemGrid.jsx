import React, { useState, useEffect } from 'react';
import Item from "./Item";
import ItemModal from './ItemModal';
import { useMenu } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';

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
          <div className="text-center text-gray-500">
            No items available in this category
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
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