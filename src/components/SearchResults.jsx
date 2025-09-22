import React, { useContext, useState } from 'react';
import { MenuContext } from '../contexts/MenuContext';
import placeholder from "../assets/placeholder.jpg";
import ItemModal from './ItemModal';

const SearchResults = ({ query, onItemSelect }) => {
  const { itemsByCategory, weeklyMenu } = useContext(MenuContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Flatten all items from categories
  const allItems = Object.values(itemsByCategory).flat();
  
  // Flatten all items from weekly menu
  const weeklyItems = Object.values(weeklyMenu).flat();
  
  // Combine all items
  const allMenuItems = [...allItems, ...weeklyItems];
  
  // Filter items based on search query
  const filteredItems = allMenuItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
  );

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (filteredItems.length === 0) {
    return (
      <div className="mt-4 p-4 bg-dark rounded-lg text-center text-light/70">
        No results found for "{query}"
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 max-h-96 overflow-y-auto rounded-lg">
        <div className="grid gap-2">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item)}
              className="p-3 bg-light/5 hover:bg-light/10 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image || placeholder}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-light font-medium">{item.name}</h4>
                  <div className="flex justify-between items-center text-sm text-light/70">
                    <span>{item?.category || ""}</span>
                    <span>{item?.size || ""}</span>
                    <span className="font-semibold text-primary">{item.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ItemModal 
        item={selectedItem} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          onItemSelect();
        }} 
      />
    </>
  );
};

export default SearchResults;