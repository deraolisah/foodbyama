// pages/ItemDetail.jsx
import React, { useContext, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import placeholder from "../assets/placeholder.jpg";
import { MenuContext } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';
import { FaArrowLeft, FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

const ItemDetail = () => {
  const { category, itemName } = useParams();
  const { itemsByCategory, weeklyMenu } = useContext(MenuContext);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  
  const decodedName = decodeURIComponent(itemName);
  
  // First try to find in regular categories
  let item = itemsByCategory[category]?.find(i => i.name === decodedName);
  
  // If not found, check if it's from weekly menu
  if (!item) {
    for (const day in weeklyMenu) {
      const weeklyItem = weeklyMenu[day].find(i => 
        i.name === decodedName && i.category === category
      );
      if (weeklyItem) {
        item = weeklyItem;
        break;
      }
    }
  }

  if (!item) {
    return (
      <div className="container p-4 text-center">
        <p>Item not found</p>
        <Link to="/menu" className="inline-block mt-4 px-4 py-2 rounded-full bg-dark text-light font-semibold hover:bg-primary/80 transition">
          Back to Menu
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(item, quantity);
    alert(`${quantity} ${item.name} added to cart!`);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="space-y-6 container bg-blue-500 fixed bottom-0 left-1/2 -translate-x-1/2 overflow-y-auto rounded-t-2xl">
      <div className='relative bg-primary flex items-center justify-center py-4'>
        <div className='absolute top-4 left-4'>
          {location.state?.fromWeeklyMenu ? (
            <Link to="/" className="text-xs md:text-sm p-2.5 flex items-center justify-center rounded-full bg-dark text-light font-semibold hover:bg-dark/80 transition">
              <FaArrowLeft /> 
              {/* Back to Home */}
            </Link>
          ) : (
            <Link to="/menu" className="text-xs md:text-sm p-2.5 flex items-center justify-center rounded-full bg-dark text-light font-semibold hover:bg-dark/80 transition">
              <FaArrowLeft /> 
              {/* Back to Menu */}
            </Link>
          )}
        </div>
        <img
          src={item.image || placeholder}
          alt={item.name}
          className="w-fit h-64 object-cover rounded-xl mb-4 ring-4 ring-dark"
          />
      </div>


      <div className='w-full flex items-center justify-between gap-4'>
        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
        <p className="text-xl text-primary font-bold mb-4">{item.price}</p>
      </div>

      <div>        
        {item.size && <p className="text-md text-dark/70 mb-2">Size: {item.size}</p>}
        
        
        <p className={`text-sm mb-4 ${item.isAvailable !== false ? "text-green-600" : "text-red-600"}`}>
          {item.isAvailable !== false ? "Available" : "Out of stock"}
        </p>

        {item.isAvailable !== false && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center bg-gray-100 p-1 rounded-full overflow-hidden">
                <button 
                  onClick={decrementQuantity}
                  className="p-2 flex items-center justify-center text-base font-bold rounded-full shadow bg-white cursor-pointer"
                >
                  {/* - */}
                  <FaMinus />
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="p-2 flex items-center justify-center text-base font-bold rounded-full shadow bg-white cursor-pointer"
                >
                  {/* + */}
                  <FaPlus />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;