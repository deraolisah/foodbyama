import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

import { IoHomeOutline, IoHome } from "react-icons/io5";
import { RiSearch2Line, RiSearch2Fill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { RiHome4Fill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { PiShoppingBagFill } from "react-icons/pi";
import { IoBagHandle } from "react-icons/io5";
import { PiUserFill } from "react-icons/pi";
import { House, Search, ShoppingCart, Soup, UserRound } from 'lucide-react';

const BottomNav = () => {
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  return (
    <div className='fixed z-30 bottom-0 left-1/2 -translate-x-1/2 w-full h-16 text-center bg-light text-dark border-t border-gray-300 flex md:hidden items-center justify-center '>
      <ul className='container h-full flex items-center justify-between px-6!'>
        <NavLink to="/" className="relative h-full text-[11px] text-center flex items-center justify-center">
          {({ isActive }) => (
            <div className={`w-full h-fit flex flex-col items-center justify-center text-center ${isActive ? "text-primary" : "text-dark/80"}`}>
              <House size={20} strokeWidth={1.5} />
              {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full" />}
              Home
            </div>
          )}
        </NavLink>

        {/* <NavLink to="/search" className="relative h-full text-[11px] text-center">
          {({ isActive }) => (
            <div className={`w-full h-full flex flex-col items-center justify-center text-center ${isActive ? "text-primary" : "text-dark/80"}`}>
              <Search size={21} strokeWidth={1.5} />
              {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full" />}
              Search
            </div>
          )}
        </NavLink> */}

        <NavLink to="/shop" className="relative h-full text-[11px] text-center">
          {({ isActive }) => (
            <div className={`w-full h-full flex flex-col items-center justify-center text-center ${isActive ? "text-primary" : "text-dark/80"}`}>
              <Soup size={21} strokeWidth={1.5} />
              {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full" />}
              Shop
            </div>
          )}
        </NavLink>

        <NavLink to="/cart" className="relative h-full text-[11px] text-center">
          {({ isActive }) => (
            <div className={`w-full h-full flex flex-col items-center justify-center text-center ${isActive ? "text-primary" : "text-dark/80"}`}>
              <ShoppingCart size={21} strokeWidth={1.5} />
              {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full" />}
              {/* Cart badge */}
              {cartItemsCount > 0 && (
                <span className="absolute top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
              Cart
            </div>
          )}
        </NavLink>

        <NavLink to="/account" className="relative h-full text-[11px] text-center">
          {({ isActive }) => (
            <div className={`w-full h-full flex flex-col items-center justify-center text-center ${isActive ? "text-primary" : "text-dark/80"}`}>
              <UserRound size={21} strokeWidth={1.5} />
              {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full" />}
              Account
            </div>
          )}
        </NavLink>


      </ul>
    </div>
  );
};

export default BottomNav;