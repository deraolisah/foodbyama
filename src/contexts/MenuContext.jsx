// contexts/MenuContext.js
import React, { createContext, useState, useEffect } from 'react';
// import productsData from '../assets/products.json';
import productsData from '../assets/data.js';


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
        // Destructure here after productsData is imported
        const { categories: importedCategories, products, weeklyMenu: importedWeeklyMenu } = productsData;

        setCategories(importedCategories);
        setWeeklyMenu(importedWeeklyMenu);

        // Start with regular products
        const mergedItems = JSON.parse(JSON.stringify(products));

        // Add items from the weekly menu to their respective categories
        for (const day in importedWeeklyMenu) {
          importedWeeklyMenu[day].forEach(item => {
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
      searchItems 
    }}>
      {children}
    </MenuContext.Provider>
  );
};