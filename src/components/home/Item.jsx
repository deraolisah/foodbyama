import React from 'react';
import placeholder from "../../assets/placeholder.png";

const Item = ({ item, index, handleItemClick }) => {

  return (
    <div 
      key={`${item.name}-${index}`}
      className="bg-white rounded-xl border border-dark/10 overflow-hidden transition-shadow cursor-pointer group"
      onClick={() => handleItemClick(item)}
    >
      <div className="aspect-4/5 md:aspect-square overflow-hidden relative rounded-b-xl">
        <img 
          src={item.image || placeholder} 
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <h3 className="w-full h-fit absolute bottom-0 bg-linear-to-b from-transparent via-dark to-dark backdrop-blur-xs rounded-b-xl py-2.5 px-4 font-semibold text-light text-sm">{item.name}</h3>
      </div>
      
      <div className="py-2 md:py-2.5 px-4">
        <p className="text-dark font-semibold text-sm">
          {item.sizes.length > 1 
            ? `From ${item.sizes[0].price}` 
            : item.sizes[0].price
          }
        </p>
        
        {/* <button
          onClick={(e) => handleQuickAdd(item, e)}
          className="w-full mt-2 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Quick Add
        </button> */}
      </div>
    </div>
  )
}

export default Item;