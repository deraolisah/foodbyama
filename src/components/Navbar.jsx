import React, { useState, useContext, useEffect, useRef } from 'react';
import logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';
import { MdSearch } from "react-icons/md";
import { TbMenu3 } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { MenuContext } from '../contexts/MenuContext';
import SearchResults from './SearchResults';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemsByCategory, weeklyMenu } = useContext(MenuContext);
  const searchInputRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const toggleSearch = () => {
    const newSearchState = !searchOpen;
    setSearchOpen(newSearchState);
    
    if (newSearchState) {
      // Save scroll position and prevent body scrolling
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Focus on input when search opens
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      
      setSearchQuery('');
    }
  };

  // Close search when escape key is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27 && searchOpen) {
        toggleSearch();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [searchOpen]);

  return (
    <>
      <nav className='bg-dark py-2 relative z-50'>
        <div className='container flex items-center justify-between'>
          {/* Search Icon */}
          <span 
            onClick={toggleSearch}
            className="text-light bg-light/10 rounded-full flex items-center justify-center cursor-pointer p-2"
          >
            <MdSearch className='text-xl' />
          </span>

          {/* Logo */}
          <Link to="/">
            <img src={logo} alt='FoodByAma Logo' className='rounded-lg w-24' />
          </Link>

          {/* Menu Button */}
          <div onClick={toggleMenu} className='p-2 flex flex-col items-start justify-center gap-1 bg-light/10 text-light rounded-full cursor-pointer'>
            <TbMenu3 className='text-xl' />
          </div>
        </div>

        {/* Search Bar - Fixed at top when open */}
        {searchOpen && (
          <div className="fixed top-0 left-0 w-full bg-dark shadow-md z-500 animate-slide-down">
            <div className="container py-3">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for dishes, soups, stews..."
                  className="w-full p-4 py-2.5 pr-12 rounded-lg bg-light/10 text-light placeholder-light/70 border border-light/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={toggleSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-light/70 hover:text-light"
                >
                  <IoMdClose className="text-xl" />
                </button>
              </div>
              
              {/* Search Results */}
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
        )}

        {/* Navigation Menu */}
        {menuOpen && (
          <div className="container flex items-end justify-end !relative bg-red-500">
            <div className="fixed top-16 right-0 w-md h-full bg-dark text-light shadow-md z-10 pt-40">
              {/* <button onClick={toggleMenu} className='fixed top-4 right-4 p-2 bg-light/10 text-primary rounded-full cursor-pointer'>
                <IoMdClose className='text-xl' />
              </button> */}
              <ul className="flex flex-col items-center p-4 gap-4 text-3xl">
                <Link to="/about" className="hover:text-primary"> About Us </Link>
                <Link to="/testimonials" className="hover:text-primary"> Testimonials </Link>
                <Link to="/contact" className="hover:text-primary"> Contact Us </Link>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay when search is open */}
      {searchOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-45"
          onClick={toggleSearch}
        />
      )}
    </>
  );
};

export default Navbar;