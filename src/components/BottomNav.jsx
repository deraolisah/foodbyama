import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { House, Soup, ShoppingCart, UserRound } from "lucide-react";
import { useCart } from '../contexts/CartContext';


const BottomNav = () => {
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const navRef = useRef(null);

  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  const navItems = [
    { to: "/", icon: <House size={20} strokeWidth={1.5} />, label: "Home" },
    { to: "/shop", icon: <Soup size={21} strokeWidth={1.5} />, label: "Shop" },
    { to: "/cart", icon: <ShoppingCart size={21} strokeWidth={1.5} />, label: "Cart" },
    { to: "/account", icon: <UserRound size={21} strokeWidth={1.5} />, label: "Account" },
  ];

  useEffect(() => {
    const updateWidth = () => {
      if (navRef.current) {
        const firstItem = navRef.current.querySelector("li");
        if (firstItem) {
          setItemWidth(firstItem.offsetWidth);
        }
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.to === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);


  return (
    <div className="fixed z-30 bottom-0 left-1/2 -translate-x-1/2 w-full h-16 bg-light text-dark border-t border-gray-200 flex md:hidden items-center justify-center px-0!">
      <ul ref={navRef} className="flex items-center justify-between w-full relative gap-0">
        {navItems.map((item, index) => (
          <li
            key={index}
            className="flex-1 h-full relative"
            onClick={() =>{ setActiveIndex(index); scrollTo(0,0) }}
          >
            <NavLink
              to={item.to}
              end
              className="relative h-full text-[11px] flex flex-col items-center justify-center gap-4"
            >
              {({ isActive }) => (
                <div
                  className={`w-full flex flex-col items-center justify-center relative ${
                    isActive ? "text-primary" : "text-dark/80"
                  }`}
                >
                  {item.icon}
                  <span className="flex items-center justify-center">
                    {item.label}
                    {/* Cart badge */}
                    {item.label === "Cart" && cartItemsCount > 0 && (
                      <span className="absolute translate-x-[calc(100%+10px)] bg-primary text-white text-[10px] min-w-4 min-h-4 p-px flex items-center justify-center rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </span>
                </div>
              )}
            </NavLink>
          </li>
        ))}
        {/* Sliding bar indicator */}
        <span
          className="absolute -top-3.5 h-1.5 bg-primary rounded-b-xl transition-transform duration-500"
          style={{
            width: itemWidth * 0.4, // bar is 60% of item width
            transform: `translateX(${activeIndex * itemWidth + itemWidth * 0.3}px)`,
          }}
        ></span>
      </ul>
    </div>
  );
};

export default BottomNav;