import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { House, Soup, ShoppingCart, UserRound } from "lucide-react";

const BottomNav = ({ cartItemsCount }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const navRef = useRef(null);

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

  return (
    <div className="fixed z-30 bottom-0 left-1/2 -translate-x-1/2 w-full h-16 bg-light text-dark border-t border-gray-300 flex md:hidden items-center justify-center">
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
              className="relative h-full text-[11px] flex flex-col items-center justify-center"
            >
              {({ isActive }) => (
                <div
                  className={`w-full flex flex-col items-center justify-center ${
                    isActive ? "text-primary" : "text-dark/80"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {/* Cart badge */}
                  {item.label === "Cart" && cartItemsCount > 0 && (
                    <span className="absolute top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          </li>
        ))}
        {/* Sliding bar indicator */}
        <span
          className="absolute -top-3.5 h-1 bg-primary rounded-b-xl transition-transform duration-500"
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
