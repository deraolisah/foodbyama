import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

import { MdShoppingCart, MdAccountCircle } from "react-icons/md";
import { RiHome4Fill } from "react-icons/ri";
import { FaListAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

import { GoHomeFill } from "react-icons/go";
import { FaBowlFood } from "react-icons/fa6";
// import { RiFileList2Fill } from "react-icons/ri";

import { PiShoppingBagFill } from "react-icons/pi";
import { IoBagHandle } from "react-icons/io5";
import { PiUserFill } from "react-icons/pi";
import { House, Search, ShoppingCart, Soup, UserRound } from 'lucide-react';


const BottomNav = () => {

   const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal, 
    clearCart,
    getItemTotal,
    formatPrice,
    getCartItemsCount
  } = useCart();
  


  const menuBarLinks = [
    {
      name: "Menu",
      path: "/menu",
      icon: <FaListAlt />,
    },
    {
      name: "profile",
      path: "/profile",
      icon: <MdAccountCircle />,
    },
    {
      name: "Home",
      path: "/",
      icon: <RiHome4Fill />
    },
    {
      name: "Cart",
      path: "/cart",
      icon: <MdShoppingCart />,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: <FaWhatsapp />,
    },
  ]



  return (
    <div className='fixed z-30 bottom-0 left-1/2 -translate-x-1/2 p-2 w-full h-16 text-center bg-light text-dark border-t border-dark/30 flex md:hidden'>
      <ul className='container h-full flex items-center justify-between px-6!'>
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center text-[11px] text-center hover:text-primary ${ isActive ? "text-primary" : "text-dark/80" }` }>
          {/* <GoHomeFill className="text-xl" /> */}
          <House size={21} strokeWidth={1.5} />
          Home
        </NavLink>

        <NavLink to="/menu" className={({ isActive }) => `flex flex-col items-center text-[11px] text-center hover:text-primary ${ isActive ? "text-primary" : "text-dark/80" }` }>
          {/* <RiFileList2Fill className="text-xl" /> */}
          {/* <FaBowlFood className='text-xl' /> */}
          <Search size={21} strokeWidth={1.5} />
          Search
        </NavLink>
     
        <NavLink to="/shop" className={({ isActive }) => `flex flex-col items-center text-[11px] text-center hover:text-primary relative ${ isActive ? "text-primary" : "text-dark/80" }` }>
          {/* <PiShoppingBagFill className='text-xl' /> */}
          {/* <IoBagHandle className='text-xl' /> */}
          {/* <span className="absolute -top-2 -right-2 bg-primary/80 rounded-full w-3.5 h-3.5 flex items-center justify-center text-light text-[11px]">{getCartItemsCount()}</span> */}
          <Soup size={22} strokeWidth={1.5} />
          Shop
        </NavLink>
     
        <NavLink to="/cart" className={({ isActive }) => `flex flex-col items-center text-[11px] text-center hover:text-primary relative ${ isActive ? "text-primary" : "text-dark/80" }` }>
          {/* <PiShoppingBagFill className='text-xl' /> */}
          {/* <IoBagHandle className='text-xl' /> */}
          <ShoppingCart size={21} strokeWidth={1.5} />
          {/* <span className="absolute -top-2 -right-2 bg-primary/80 rounded-full w-3.5 h-3.5 flex items-center justify-center text-light text-[11px]">{getCartItemsCount()}</span> */}
          Cart
        </NavLink>

        <NavLink to="/account" className={({ isActive }) => `flex flex-col items-center text-[11px] text-center hover:text-primary ${ isActive ? "text-primary" : "text-dark/80" }` }>
          {/* <PiUserFill className="text-xl" /> */}
          <UserRound size={21} strokeWidth={1.5} />
          Account
        </NavLink>
      </ul>
    </div>
  )
}

export default BottomNav;