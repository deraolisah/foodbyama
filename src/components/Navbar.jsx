import React, { useState } from 'react';
import logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';
import { MdSearch } from "react-icons/md";
import { TbMenu3 } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className='bg-dark py-2 relative'>
      <div className='container flex items-center justify-between'>
        {/* Search Icon */}
        <span className="text-primary bg-light/10 rounded-full flex items-center justify-center cursor-pointer p-2">
          <MdSearch className='text-xl' />
        </span>

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt='FoodByAma Logo' className='rounded-lg w-24' />
        </Link>

        {/* Menu Button */}
        <div onClick={toggleMenu} className='p-2 flex flex-col items-start justify-center gap-1 bg-light/10 text-primary rounded-full cursor-pointer'>
          <TbMenu3 className='text-xl' />
        </div>
      </div>

      {/* Navigation Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-dark text-light shadow-md z-50 pt-40">
          <button onClick={toggleMenu} className='fixed top-4 right-4 p-2 bg-light/10 text-primary rounded-full cursor-pointer'>
            <IoMdClose className='text-xl' />
          </button>
          <ul className="flex flex-col items-center p-4 gap-4 text-3xl">
            <Link to="/about" className="hover:text-primary"> About </Link>
            <Link to="/testimonials" className="hover:text-primary"> Testimonials </Link>
            <Link to="/contact" className="hover:text-primary"> Contact </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;