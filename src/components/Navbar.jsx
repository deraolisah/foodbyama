// import React, { useState, useContext, useEffect, useRef } from 'react';
// import logo from "../assets/favicon.png";
// import { Link } from 'react-router-dom';
// import { MdSearch } from "react-icons/md";
// import { TbMenu3 } from "react-icons/tb";
// import { IoMdClose } from "react-icons/io";
// import { MenuContext } from '../contexts/MenuContext';
// import SearchResults from './SearchResults';
// import { Menu } from 'lucide-react';

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const { itemsByCategory, weeklyMenu } = useContext(MenuContext);
//   const searchInputRef = useRef(null);
//   const scrollRef = useRef(0);

//   const toggleMenu = () => {
//     const newState = !menuOpen;
//     setMenuOpen(newState);

//     if (newState) {
//       document.body.classList.add("no-scroll");
//     } else {
//       document.body.classList.remove("no-scroll");
//     }
//   };
  
//   const toggleSearch = () => {
//     const newSearchState = !searchOpen;
//     setSearchOpen(newSearchState);
    
//     if (newSearchState) {
//       // Save scroll position and prevent body scrolling
//       const scrollY = window.scrollY;
//       document.body.style.position = 'fixed';
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.width = '100%';
//       document.body.style.overflow = 'hidden';
      
//       // Focus on input when search opens
//       setTimeout(() => {
//         if (searchInputRef.current) {
//           scrollRef.current = window.scrollY;
//         }
//       }, 100);
//     } else {
//       // Restore scrolling
//       const scrollY = document.body.style.top;
//       document.body.style.position = '';
//       document.body.style.top = '';
//       document.body.style.width = '';
//       document.body.style.overflow = '';
//       window.scrollTo(0, scrollRef.current);
//       setSearchQuery('');
//     }
//   };

//   // Function to handle menu item clicks
//   const handleMenuItemClick = () => {
//     toggleMenu(); // Close the menu when a menu item is clicked
//   };

//   // Close menu when escape key is pressed
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.keyCode === 27) {
//         if (searchOpen) {
//           toggleSearch();
//         } else if (menuOpen) {
//           toggleMenu();
//         }
//       }
//     };
    
//     window.addEventListener('keydown', handleEsc);
//     return () => window.removeEventListener('keydown', handleEsc);
//   }, [searchOpen, menuOpen]);

//   return (
//     <>
//       <nav className='bg-dark h-10 relative z-50'>
//         <div className='container bg-red-400 h-full flex items-center justify-between'>
//           {/* Search Icon */}
//           <button onClick={toggleSearch} className="text-light bg-light/10 rounded-full flex items-center justify-center cursor-pointer p-2">
//             <MdSearch className='text-xl' />
//           </button>

//           {/* Logo */}
//           <Link to="/">
//             <img src={logo} alt='FoodByAma Logo' className='rounded-full w-12' />
//           </Link>

//           {/* Menu Button */}
//           <div onClick={toggleMenu} className='p-2 flex flex-col items-start justify-center gap-1 bg-light/10 text-light rounded-full cursor-pointer z-50'>
//             {!menuOpen ? (<TbMenu3 className='text-xl' />) : (<IoMdClose className='text-xl' />)}
//           </div>
//           <button type='button' onClick={toggleMenu()}>
//             <Menu />
//           </button>
//         </div>

  

//         {/* Navigation Menu */}
//         <div className="container flex items-end justify-end relative! overflow-x-hidden">
//           <div className={`fixed top-0 left-0 w-full h-full bg-dark text-light text-center shadow-md z-10 pt-40 transition-all duration-400 ${!menuOpen ? "opacity-0 -translate-y-20 pointer-events-none" : "opacity-100 translate-y-0 pointer-events-auto"}`}>
//             <p className="text-light/60 text-xs md:text-sm italics absolute top-6.5 left-5"> Flat tummy doesn't matter in Heaven.. </p>
//             <ul className="flex flex-col items-center p-4 gap-4 text-3xl">
//               <Link 
//                 to="/about" 
//                 className="hover:text-primary transition-colors" 
//                 onClick={handleMenuItemClick}
//               >
//                 About Us
//               </Link>
//               <Link 
//                 to="/testimonials" 
//                 className="hover:text-primary transition-colors" 
//                 onClick={handleMenuItemClick}
//               >
//                 Testimonials
//               </Link>
//               <Link 
//                 to="/contact" 
//                 className="hover:text-primary transition-colors" 
//                 onClick={handleMenuItemClick}
//               >
//                 Contact Us
//               </Link>
//             </ul>
//           </div>
//         </div>
//       </nav>

  

//       {/* Backdrop overlay when menu is open - click to close */}
//       {menuOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-5"
//           onClick={toggleMenu}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;