// pages/Shop.jsx
import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaFilter } from "react-icons/fa";
import { useCart } from '../contexts/CartContext';
import { useMenu } from '../contexts/MenuContext';
// import placeholderImg from "../assets/placeholder.png";
import ItemModal from '../components/ItemModal';
import Item from '../components/Item';
import { ListFilter, Search, X } from 'lucide-react';

const Shop = () => {
  const { itemsByCategory, categories, weeklyMenu, getUniqueProducts } = useMenu();
  const { addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    days: [],
    categories: [],
    mealTypes: [],
    dietary: [],
    priceRanges: [],
    protein: []
  });
  const [sortBy, setSortBy] = useState('alphabetical');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  // Combine all products from all categories
  useEffect(() => {
    const uniqueProducts = getUniqueProducts();
    let products = [];
    
    // Get products from all categories
    Object.keys(uniqueProducts).forEach(category => {
      products = [...products, ...uniqueProducts[category]];
    });
    
    // Add weekly menu items (avoid duplicates)
    const weeklyItems = Object.values(weeklyMenu).flat();
    const weeklyNames = new Set(weeklyItems.map(item => item.name));
    
    // Add weekly items that aren't already in products
    weeklyItems.forEach(item => {
      if (!products.some(p => p.name === item.name)) {
        products.push(item);
      }
    });
    
    setAllProducts(products);
  }, [itemsByCategory, weeklyMenu, getUniqueProducts]);

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

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      days: [],
      categories: [],
      mealTypes: [],
      dietary: [],
      priceRanges: [],
      protein: []
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus the input after it appears
      setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.focus();
      }, 100);
    } else {
      setSearchQuery(''); // Clear search when closing
    }
  };

  const getFilteredAndSortedProducts = () => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => {
        // Search in name
        const nameMatch = item.name.toLowerCase().includes(query);
        
        // Search in description (if available)
        const descriptionMatch = item.description ? item.description.toLowerCase().includes(query) : false;
        
        // Search in category
        const categoryMatch = item.category ? item.category.toLowerCase().includes(query) : false;
        
        // Search in ingredients (if available)
        const ingredientsMatch = item.ingredients ? 
          item.ingredients.some(ing => ing.toLowerCase().includes(query)) : false;
        
        // Search in dietary tags (if available)
        const dietaryMatch = item.dietary ? 
          item.dietary.some(diet => diet.toLowerCase().includes(query)) : false;
        
        return nameMatch || descriptionMatch || categoryMatch || ingredientsMatch || dietaryMatch;
      });
    }

    // Apply sorting
    switch(sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.sizes[0].price.replace(/[^\d.]/g, '')) || 0;
          const priceB = parseFloat(b.sizes[0].price.replace(/[^\d.]/g, '')) || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.sizes[0].price.replace(/[^\d.]/g, '')) || 0;
          const priceB = parseFloat(b.sizes[0].price.replace(/[^\d.]/g, '')) || 0;
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    // Apply day filters
    if (selectedFilters.days.length > 0) {
      filtered = filtered.filter(item => {
        const isInWeeklyMenu = Object.entries(weeklyMenu).some(([day, items]) => 
          selectedFilters.days.includes(day) && items.some(menuItem => menuItem.name === item.name)
        );
        return isInWeeklyMenu;
      });
    }

    // Apply category filters
    if (selectedFilters.categories.length > 0) {
      filtered = filtered.filter(item => 
        selectedFilters.categories.includes(item.category)
      );
    }

    // Apply price range filters
    if (selectedFilters.priceRanges.length > 0) {
      filtered = filtered.filter(item => {
        const price = parseFloat(item.sizes[0].price.replace(/[^\d.]/g, '')) || 0;
        return selectedFilters.priceRanges.some(range => {
          if (range === 'budget' && price < 3000) return true;
          if (range === 'medium' && price >= 3000 && price < 8000) return true;
          if (range === 'premium' && price >= 8000 && price < 15000) return true;
          if (range === 'luxury' && price >= 15000) return true;
          return false;
        });
      });
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  // Count active filters (excluding search)
  const activeFilterCount = Object.values(selectedFilters).reduce(
    (acc, curr) => acc + curr.length, 0
  );

  return (
    <div className="container py-0">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar - Left */}
        <div className={`
          lg:w-72 shrink-0
          ${isFilterOpen ? 'flex md:block' : 'hidden lg:block'}
          fixed top-28 left-0 lg:sticky lg:top-0 inset-0 z-150 lg:z-auto bg-white lg:bg-transparent 
          overflow-y-auto lg:overflow-visible
          max-h-screen lg:max-h-none
          `}
          >

        <div className="w-full bg-white p-4 md:p-0 lg:sticky lg:top-13 overflow-hidden">
          {/* Filters Header */}
          <div className="flex items-center justify-between py-2 md:py-4">
            <h3 className="hidden md:flex font-semibold text-lg">Filters</h3>
            {activeFilterCount > 0 && (
              <button 
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear All ({activeFilterCount})
              </button>
            )}
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="lg:hidden top-6 right-8 text-2xl cursor-pointer"
              >
              ×
            </button>
          </div>

          {/* Filter Sections */}
          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pt-2 pr-2">
            {/* Days of the Week */}
            <div className="border-b border-dark/10 pb-4">
              <h4 className="font-medium mb-2"> Daily Specials </h4>
              <div className="space-y-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <label key={day} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={selectedFilters.days.includes(day)}
                      onChange={() => handleFilterChange('days', day)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="border-b border-dark/10 pb-4">
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={selectedFilters.categories.includes(category)}
                      onChange={() => handleFilterChange('categories', category)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="pb-4">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="space-y-2">
                {[
                  { value: 'budget', label: 'Budget (Under ₦3,000)' },
                  { value: 'medium', label: 'Medium (₦3,000 - ₦8,000)' },
                  { value: 'premium', label: 'Premium (₦8,000 - ₦15,000)' },
                  { value: 'luxury', label: 'Luxury (₦15,000+)' }
                ].map(range => (
                  <label key={range.value} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={selectedFilters.priceRanges.includes(range.value)}
                      onChange={() => handleFilterChange('priceRanges', range.value)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Main Content - Right */}
        <div className="flex-1 space-y-2">
          {/* Sort, Search and Results Count */}
          <div className="sticky top-13 z-20 bg-white pt-1 space-y-1 border-dark/10">
            {/* Search Bar - appears when search is open */}
            <div className={`
              transition-all duration-300 ease-in-out overflow-hidden
              ${isSearchOpen ? 'max-h-16 opacity-100 mt-2' : 'max-h-0 opacity-0'}
            `}>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, category, ingredients, or dietary preferences..."
                  className="w-full px-4 py-3 pl-10 pr-10 border border-primary/30 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              {/* Search results info */}
              {/* {searchQuery && (
                <div className="text-xs text-gray-500 mt-1 ml-1 relative">
                  Found {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                </div>
              )} */}
            </div>

            {/* Header with buttons */}
            <div className="flex justify-between items-center gap-2 h-14">
              <button 
                onClick={toggleSearch}
                className={`flex items-center gap-2 p-2.5 text-sm rounded-md cursor-pointer group transition-colors duration-200
                  ${isSearchOpen 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700'
                  }`}
              >
                <Search size={16} />
                {/* <span className="text-xs"> {isSearchOpen ? 'Close' : 'Search'} </span> */}
              </button>
              
              {/* Mobile Filter Button and Results Count */}
              <div className="flex-1 flex items-center gap-2">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 rounded-md cursor-pointer"
                  title='Filter'
                >
                  <ListFilter size={16} />
                  <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`} </span>
                </button>
                <p className="hidden lg:flex text-sm text-gray-600 ml-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-100 border border-dark/10 text-sm text-gray-600 rounded-lg px-4 py-2 pr-10 hover:text-gray-700 hover:bg-gray-200 focus:outline-none focus:border-primary cursor-pointer"
                  title='Sort'
                >
                  <option value="alphabetical"> Alphabetically A-Z</option>
                  <option value="price-low"> Price: Low to High</option>
                  <option value="price-high"> Price: High to Low</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 mb-2">
                {searchQuery 
                  ? `No products found matching "${searchQuery}"` 
                  : 'No products found matching your filters.'}
              </p>
              <div className="space-x-4">
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="text-primary hover:underline"
                  >
                    Clear search
                  </button>
                )}
                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((item, index) => (
                <Item 
                  key={`${item.name}-${index}`}
                  item={item}
                  index={index}
                  handleItemClick={handleItemClick}
                />
              ))}
            </div>
          )}

          {/* Weekly Specials Banner */}
          <div className="mt-8 bg-primary/10 border border-primary rounded-xl p-4 py-6 text-center">
            <p className="font-semibold text-primary mb-1">
              🍽️ Weekly Specials Available!
            </p>
            <p className="text-primary text-sm">
              Check our daily specials for Monday - Friday. 
              <br/>
              Pre-order at least 12 hours in advance.
            </p>
          </div>
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

export default Shop;