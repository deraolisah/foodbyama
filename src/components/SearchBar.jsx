// components/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { IoMdSearch, IoMdClose } from "react-icons/io";
import SearchResults from './SearchResults';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  };

  // Close search on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleSearch();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <>
      {/* Search Icon Button */}
      <button
        onClick={toggleSearch}
        className="p-2 text-light hover:text-primary transition"
      >
        <IoMdSearch className="text-xl" />
      </button>

      {/* Search Bar - Fixed at top when open */}
      {isOpen && (
        <>
          <div className="fixed top-0 left-0 w-full bg-dark shadow-md z-50 animate-slide-down">
            <div className="container py-3">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for dishes, soups, stews..."
                  className="w-full p-4 py-2.5 pl-12 pr-12 rounded-lg bg-light/10 text-light placeholder-light/70 border border-light/20 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light/70 text-xl" />
                <button
                  onClick={toggleSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-light/70 hover:text-light"
                >
                  <IoMdClose className="text-xl" />
                </button>
              </div>
              
              {searchQuery && (
                <SearchResults 
                  query={searchQuery} 
                  onItemSelect={() => {
                    toggleSearch();
                  }} 
                />
              )}
            </div>
          </div>

          {/* Backdrop overlay when search is open */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-45"
            onClick={toggleSearch}
          />
        </>
      )}
    </>
  );
};

export default SearchBar;