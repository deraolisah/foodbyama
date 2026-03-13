import React, { useState, useEffect, useRef } from 'react';
import logo from "../assets/favicon.png";
import { href, Link } from 'react-router-dom';
import { Facebook, Info, Instagram, Menu, X } from 'lucide-react';
import { House, Search, ShoppingCart, Soup, UserRound } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import WelcomePopup from './WelcomePopup';

const Header = () => {
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  const navLinks = [
    {name: "Home", href: "/" },
    {name: "About", href: "/about" },
    {name: "Contact", href: "/contact" },
    {name: "Shop", href: "/shop" }
  ];

  const [isSticky, setIsSticy] = useState(false);
  const [isMenuOpen, setIsmenuOpen] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  // Menu
  const toggleMenu = () => {
    setIsmenuOpen(!isMenuOpen);
  }


  // Help
  const toggleHelp = () => {
    setOpenHelp(!openHelp);
  }

  // Popup
  const togglePopup = () => {
    setOpenPopup(!openPopup);
  }

  const dropdownRef = useRef();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if help is open and click is outside the dropdownRef
      if (openHelp && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenHelp(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openHelp]); 

  return (
    <nav className={`sticky border-b border-gray-200 z-900 bg-white container flex items-center justify-between min-h-12 py-2 top-0 transition-all duration-500`}>
       <ul className="hidden md:flex items-center justify-start gap-4 text-sm w-full">
        {navLinks.map((item) => (
          <li key={item.name}>
            <Link to={item.href} onClick={() => { scrollTo(0,0); }}> {item.name} </Link>
          </li>
        ))}
      </ul>   

      <div className="w-full h-full">
        <Link to="/" className="w-full h-full text-dark flex items-center justify-start md:justify-center gap-2 text-xs md:text-sm font-medium z-60 relative">
          <img src={logo} alt='' className="w-9 h-9 object-cover rounded-full" />
          FoodByAma
        </Link>
      </div>


      <div className="w-full flex items-center justify-end gap-4">
        {isMenuOpen ? (
          <button className="flex md:hidden cursor-pointer z-100 rounded-full transition-all duration-300 -mr-1">
            <X size={20} strokeWidth={1.5} onClick={() => {toggleMenu()}} />
          </button>
        ) : (
          <button className="flex md:hidden flex-col space-y-1 cursor-pointer rounded-full transition-all duration-300 z-60 group p-2 -mr-2" type='button' onClick={() => {toggleMenu()}}>
            {/* <Menu /> */}
            <span className="w-4 h-0.5 bg-dark rounded-full group-hover:bg-gray-600"></span>
            <span className="ml-0.5 w-4 h-0.5 bg-dark rounded-full group-hover:bg-gray-600"></span>
            <span className="w-4 h-0.5 bg-dark rounded-full group-hover:bg-gray-600"></span>
          </button>
        )}

        <div className="hidden md:flex items-center gap-4">
          <div ref={dropdownRef} className="relative -mb-2">
            <button title='Info' type='button' onClick={() => {toggleHelp()}} className="cursor-pointer"> 
              <Info size={20} strokeWidth={1.5} /> 
            </button>
            {openHelp && (
              <div className="border border-gray-300 bg-light shadow-md text-xs w-fit rounded-lg absolute right-0 flex flex-col overflow-hidden">
                <button type='button' onClick={() => {togglePopup()}} className="border-b border-gray-300 p-2 text-nowrap cursor-pointer hover:bg-gray-100"> How To Order </button>
                { openPopup && (<WelcomePopup />) }
                <Link to="/feedback" className="p-2 text-nowrap cursor-pointer hover:bg-gray-100"> Leave Feedback </Link>
              </div>
            )}
          </div>
          {/* <Link title='Search' to="/search"> <Search size={20} strokeWidth={1.5} /> </Link> */}
          <Link title='Cart' to="/cart" className="relative" onClick={() => { scrollTo(0,0); }}> 
            <ShoppingCart size={20} strokeWidth={1.5} /> 
            {/* Cart badge */}
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <Link title='Account' to="/account" onClick={() => { scrollTo(0,0); }}> <UserRound size={20} strokeWidth={1.5} /> </Link>
        </div>
      </div>


      <ul className={`fixed inset-0 w-full max-w-3xl ml-auto overflow-y-auto flex md:hidden flex-col items-start justify-between gap-10 px-4 pt-20 pb-10 bg-light text-dark bottom-0 left-0 right-0 z-50 transition-all duration-400 ${
        isMenuOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-20 pointer-events-none"
      }`}>
        <span className="w-full">
          {navLinks.map((item) => (
            <li key={item.name} className="border-b border-gray-300 w-full">
              <Link to={item.href} className="w-full flex py-2.5"> 
                {item.name} 
              </Link>
            </li>
          ))}
        </span>

        <div className="h-fit w-full text-sm flex flex-col">
          <div className="flex flex-wrap items-center gap-2.5 py-2.5 border-t border-gray-300">
            <a href='tel:+2349054414660'> 09054414660 </a> |
            <a href='mailto:foodbyama4@gmail.com'> foodbyama4@gmail.com </a> |
            <a href=""> <Facebook size={16} /></a> |
            <a href=""> <Instagram size={16} /> </a> 
          </div>
          <div className="border-t border-gray-300 w-full py-2.5 text-wrap"> 
            © FoodByAma. All Rights Reserved.
          </div>
        </div>

      </ul>      
    </nav>
  )
}

export default Header;