// contexts/MenuContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import productsData from '../assets/data.js';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [itemsByCategory, setItemsByCategory] = useState({});
  const [weeklyMenu, setWeeklyMenu] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const { categories: importedCategories, products, weeklyMenu: importedWeeklyMenu } = productsData;

        setCategories(importedCategories);
        setWeeklyMenu(importedWeeklyMenu);
        
        if (importedCategories.length > 0) {
          setSelectedCategory(importedCategories[0]);
        }

        // Process products - keep original structure but ensure consistency
        const processedProducts = {};
        
        Object.keys(products).forEach(category => {
          processedProducts[category] = products[category].map(product => ({
            ...product,
            // Ensure every product has consistent structure
            category: category,
            sizes: product.sizes || [{ size: 'Standard', price: product.price || '₦0' }],
            price: product.price || (product.sizes && product.sizes[0]?.price) || '₦0',
            isAvailable: product.isAvailable !== false
          }));
        });

        setItemsByCategory(processedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading product data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Get unique products for display (one entry per product name)
  const getUniqueProducts = () => {
    const uniqueProducts = {};
    
    Object.keys(itemsByCategory).forEach(category => {
      uniqueProducts[category] = [];
      const seenNames = new Set();
      
      itemsByCategory[category].forEach(item => {
        if (!seenNames.has(item.name)) {
          seenNames.add(item.name);
          uniqueProducts[category].push(item);
        }
      });
    });
    
    return uniqueProducts;
  };

  // Get all items flattened for search
  const getAllItems = () => {
    const regularItems = Object.values(itemsByCategory).flat();
    const weeklyItems = Object.values(weeklyMenu).flat();
    return [...regularItems, ...weeklyItems];
  };

  const searchItems = (query) => {
    const allItems = getAllItems();
    return allItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase())) ||
      (item.desc && item.desc.toLowerCase().includes(query.toLowerCase()))
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
      searchItems,
      getUniqueProducts,
      getAllItems
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};