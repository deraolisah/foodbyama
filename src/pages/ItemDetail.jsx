// pages/ItemDetail.jsx
import React, { useContext, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import placeholder from "../assets/placeholder.jpg";
import { MenuContext } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';

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
    <div className="container py-8 space-y-6">
      {location.state?.fromWeeklyMenu ? (
        <Link to="/" className="inline-block px-4 py-2 rounded-full bg-dark text-light font-semibold hover:bg-primary/80 transition">
          ← Back to Home
        </Link>
      ) : (
        <Link to="/menu" className="inline-block px-4 py-2 rounded-full bg-dark text-light font-semibold hover:bg-primary/80 transition">
          ← Back to Menu
        </Link>
      )}

      <div className="bg-white rounded-2xl shadow-md p-6">
        <img
          src={item.image || placeholder}
          alt={item.name}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        
        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
        
        {item.size && <p className="text-md text-dark/70 mb-2">Size: {item.size}</p>}
        
        <p className="text-xl text-primary font-bold mb-4">{item.price}</p>
        
        <p className={`text-sm mb-4 ${item.isAvailable !== false ? "text-green-600" : "text-red-600"}`}>
          {item.isAvailable !== false ? "Available" : "Out of stock"}
        </p>

        {item.isAvailable !== false && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  +
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