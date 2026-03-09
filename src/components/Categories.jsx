import React, { useEffect, useState } from 'react';
import { useMenu } from "../contexts/MenuContext";

const Categories = () => {
  const { categories, selectedCategory, setSelectedCategory, isLoading, getUniqueProducts } = useMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div className={`container sticky top-13 z-40 bg-light border-b border-transparent transition-all duration-300 ${scrolled ? "border-gray-200/80!" : ""}`}>
      <div className="flex items-center md:justify-center overflow-y-hidden overflow-x-auto gap-1.5 h-11 scrollbar-hidden relative!">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-2.5 py-1 h-fit rounded-full text-xs whitespace-nowrap transition-colors border border-dark/10 cursor-pointer ${
              selectedCategory === category
              ? "bg-primary text-white font-medium border-primary"
              : scrolled 
              ? "text-gray-700 hover:bg-primary/10"
              : "bg-white/80 text-gray-700 hover:bg-primary/10"
          }`}>
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Categories;