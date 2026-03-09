// components/SearchResults.jsx
import React, { useState } from 'react';
import { useMenu } from '../contexts/MenuContext';
import placeholder from "../assets/placeholder.png";
import ItemModal from './ItemModal';

const SearchResults = ({ query, onItemSelect }) => {
  const { searchItems } = useMenu();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const results = searchItems(query);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-dark border border-gray-200 rounded-lg shadow-lg mt-1 p-4">
        <p className="text-light/70 text-center">No results found for "{query}"</p>
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-full left-0 right-0 bg-dark rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto scrollbar-hidden z-50">
        <div className="p-4 gap-2 grid grid-cols-1 md:grid-cols-2">
          {results.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                handleItemClick(item);
              }}
              className="p-3 text-light bg-light/5 rounded-lg hover:bg-light/10 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image || placeholder}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-light/60 text-xs">
                      {item.category} • {item.sizes ? `${item.sizes.length} size(s)` : 'Standard'}
                    </p>
                    <p className="text-primary font-bold text-sm">
                      {item.sizes?.[0]?.price || item.price}
                    </p>
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
          if (onItemSelect) onItemSelect();
        }}
      />
    </>
  );
};

export default SearchResults;