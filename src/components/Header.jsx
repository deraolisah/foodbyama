import React, { useState, useEffect } from 'react';
import logo from "../assets/favicon.png";
import { href, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { House, Search, ShoppingCart, Soup, UserRound } from 'lucide-react';

const Header = () => {
  const navLinks = [
    {name: "Home", href: "/" },
    {name: "About", href: "/about" },
    {name: "Contact", href: "/contact" }
  ];

  const [isSticky, setIsSticy] = useState(false);
  const [isMenuOpen, setIsmenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsmenuOpen(!isMenuOpen);
  }

  return (
    <nav className={`sticky border-b border-gray-200 z-90 bg-white container flex items-center justify-between h-12 py-2 top-0 transition-all duration-500`}>
       <ul className="hidden md:flex items-center justify-start gap-4 text-sm w-full">
        {navLinks.map((item) => (
          <li key={item.name}>
            <Link to={item.href}> {item.name} </Link>
          </li>
        ))}
      </ul>   

      <div className="w-full h-full">
        <Link to="/" className="w-full h-full text-dark flex items-center justify-start md:justify-center gap-2 text-xs font-medium z-60 relative">
          <img src={logo} alt='' className="w-fit h-full object-cover rounded-full" />
          FoodByAma
        </Link>
      </div>


      <div className="w-full flex items-center justify-end gap-4">
        {isMenuOpen ? (
          <X className='z-100 cursor-pointer' size={20} strokeWidth={1.5} onClick={() => {toggleMenu()}} />
        ) : (
          <button className="flex md:hidden flex-col space-y-1 cursor-pointer rounded-full transition-all duration-300 z-60 group" type='button' onClick={() => {toggleMenu()}}>
            {/* <Menu /> */}
            <span className="w-4 h-0.5 bg-dark rounded-full group-hover:bg-gray-600"></span>
            <span className="ml-0.5 w-4 h-0.5 bg-dark rounded-full group-hover:bg-gray-600"></span>
            <span className="w-4 h-0.5 bg-dark rounded-full group-hover:bg-gray-600"></span>
          </button>
        )}

        <div className="hidden md:flex items-center gap-4">
          <Link title='Shop' to="/shop"> <Soup size={20} strokeWidth={1.5} /> </Link>
          <Link title='Search' to="/search"> <Search size={20} strokeWidth={1.5} /> </Link>
          <Link title='Cart' to="/cart"> <ShoppingCart size={20} strokeWidth={1.5} /> </Link>
          <Link title='Account' to="/account"> <UserRound size={20} strokeWidth={1.5} /> </Link>
        </div>
      </div>


      <ul className={`fixed inset-0 w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 bg-light text-dark bottom-0 left-0 right-0 z-50 transition-all duration-400 ${
        isMenuOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-20 pointer-events-none"
      }`}>
      {/* <ul className={` w-full h-full flex-col items-center justify-center gap-4 fixed inset-0 z-50 bg-light text-dark  ${isMenuOpen ? "flex" : "hidden" } `}> */}
        {navLinks.map((item) => (
          <li key={item.name}>
            <Link to={item.href}> {item.name} </Link>
          </li>
        ))}
      </ul>      
    </nav>
  )
}

export default Header;