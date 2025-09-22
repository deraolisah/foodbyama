// contexts/MenuContext.js
import React, { createContext, useState, useEffect } from 'react';
import productsData from '../assets/products.json';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [itemsByCategory, setItemsByCategory] = useState({});
  const [weeklyMenu, setWeeklyMenu] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("Soups");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        setCategories(productsData.categories);
        setWeeklyMenu(productsData.weeklyMenu); // Fixed this line
        setIsLoading(false);

        // Start with regular products
        const mergedItems = {...productsData.products};

        // Add items from the weekly menu to their respective categories
        for (const day in productsData.weeklyMenu) {
          productsData.weeklyMenu[day].forEach(item => {
            const category = item.category;
            if (!mergedItems[category]) {
              mergedItems[category] = [];
            }
            
            // Check if item already exists to avoid duplicates
            const exists = mergedItems[category].some(
              existingItem => existingItem.name === item.name && existingItem.size === item.size
            );
            
            if (!exists) {
              mergedItems[category].push(item);
            }
          });
        }

        setItemsByCategory(mergedItems);
      } catch (error) {
        console.error("Error loading product data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);


  // contexts/MenuContext.js (add this method to the context)
  const searchItems = (query) => {
    // Flatten all items
    const allItems = Object.values(itemsByCategory).flat();
    const weeklyItems = Object.values(weeklyMenu).flat();
    const allMenuItems = [...allItems, ...weeklyItems];
    
    // Filter based on query
    return allMenuItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <MenuContext.Provider value={{ 
      categories, 
      itemsByCategory, 
      weeklyMenu,
      selectedCategory, 
      setSelectedCategory,
      isLoading,
      searchItems // Add this
    }}>
      {children}
    </MenuContext.Provider>
  );
};