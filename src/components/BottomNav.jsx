import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdShoppingCart, MdAccountCircle } from "react-icons/md";
import { RiShoppingBag3Fill, RiHome4Fill } from "react-icons/ri";
import { FaClipboardList, } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

import { LuLayoutList } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";

import { RiFileList2Fill, RiFileList2Line } from "react-icons/ri";
import { BsCartCheckFill, BsCartCheck } from "react-icons/bs";
import { GoHome, GoHomeFill } from "react-icons/go";
import { HiMiniUser, HiOutlineUser } from "react-icons/hi2";
import { RiWhatsappFill, RiWhatsappLine } from "react-icons/ri";

const BottomNav = () => {
  const menuBarLinks = [
    {
      name: "Menu",
      path: "/menu",
      icon: <FaListAlt />,
    },
    {
      name: "Account",
      path: "/account",
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
    <div className='fixed bottom-0 left-1/2 -translate-x-1/2 p-2 w-full h-16 text-center bg-light text-dark border-t border-dark/10'>
      <ul className='container h-full flex items-center justify-between'>
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center text-xs text-center hover:text-primary ${ isActive ? "text-primary" : "" }` }>
          {({ isActive }) => (
            <>
              {isActive ? (
                <GoHomeFill className="text-3xl" />
              ) : (
                <GoHome className="text-xl" />
              )}
              Home
            </>
          )}
        </NavLink>

        <NavLink to="/menu" className={({ isActive }) => `flex flex-col items-center text-xs text-center hover:text-primary ${ isActive ? "text-primary" : "" }` }>
          {({ isActive }) => (
            <>
              {isActive ? (
                <RiFileList2Fill className="text-3xl" />
              ) : (
                <RiFileList2Line className="text-xl" />
              )}
              Menu
            </>
          )}
        </NavLink>
     
        <NavLink to="/cart" className={({ isActive }) => `flex flex-col items-center text-xs text-center hover:text-primary ${ isActive ? "text-primary" : "" }` }>
          {({ isActive }) => (
            <>
              {isActive ? (
                <BsCartCheckFill className="text-3xl" />
              ) : (
                <BsCartCheck className="text-xl" />
              )}
              Cart
            </>
          )}
        </NavLink>

        <NavLink to="/account" className={({ isActive }) => `flex flex-col items-center text-xs text-center hover:text-primary ${ isActive ? "text-primary" : "" }` }>
          {({ isActive }) => (
            <>
              {isActive ? (
                <HiMiniUser className="text-3xl" />
              ) : (
                <HiOutlineUser className="text-xl" />
              )}
              Account
            </>
          )}
        </NavLink>

        {/* <NavLink to="/chat" className={({ isActive }) => `flex flex-col items-center text-xs text-center hover:text-primary ${ isActive ? "text-primary" : "" }` }>
          {({ isActive }) => (
            <>
              {isActive ? (
                <RiWhatsappFill className="text-3xl" />
              ) : (
                <RiWhatsappLine className="text-xl" />
              )}
              Chat
            </>
          )}
        </NavLink> */}
      </ul>
    </div>
  )
}

export default BottomNav;