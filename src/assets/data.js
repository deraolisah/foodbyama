// SOUPS
import egusi from "./products/egusi-soup.jpg";
import nsala from "./products/nsala.png";
import ogbono from "./products/ogbono.png";
import oha from "./products/oha.png";
import okro from "./products/okro.png";
import vegetable from "./products/vegetable.png";

// STEWS
import beef_stew from "./products/beef-stew.png";
import chicken_stew from "./products/chicken-stew.png";

import fried_rice_with_plantain_and_turkey from "./products/fried-rice-with-plantain-and-turkey.png";
import fried_rice_with_plantain_and_chicken from "./products/fried-rice-with-plantain-and-chicken.png";


import garnishedCroaker from "./products/garnished-peppered-croaker.jpg";

import semovita from "./products/semovita.jpg";

import watermelon from "./products/watermelon-juice.jpg";

// 
import beef_sharwarma from "./products/beef-sharwarma.jpg";
import chicken_sharwarma from "./products/chicken-sharwarma.jpeg";

const categories = [
  "Soups", "Stews", "Swallows", "Breakfasts", "Lunch Packs", "Sides & Extras",
  "Drinks", "Pastries", "Food Platters",
];

const products = {
  Soups: [
    { 
      name: "Egusi Soup", 
      desc: "A hearty mix of melon seed and spiciness for a satisfying meal.", 
      sizes: [
        { size: "2 Litres", price: "₦11,000" },
        { size: "3 Litres", price: "₦16,000" },
        { size: "5 Litres", price: "₦26,000" }
      ],
      image: egusi, 
      isAvailable: true 
    },
    { 
      name: "Nsala Soup", 
      desc: "Delicious white soup with fresh fish and assorted meat.", 
      sizes: [
        { size: "2 Litres", price: "₦11,000" },
        { size: "3 Litres", price: "₦16,000" },
        { size: "5 Litres", price: "₦26,000" }
      ],
      image: nsala, 
      isAvailable: true 
    },
    { 
      name: "Ogbono Soup", 
      desc: "Rich and drawy soup perfect with any swallow.", 
      sizes: [
        { size: "2 Litres", price: "₦11,000" },
        { size: "3 Litres", price: "₦16,000" },
        { size: "5 Litres", price: "₦26,000" }
      ],
      image: ogbono, 
      isAvailable: true 
    },
    { 
      name: "Oha Soup", 
      desc: "Traditional soup with oha leaves and assorted meat.", 
      sizes: [
        { size: "2 Litres", price: "₦12,000" },
        { size: "3 Litres", price: "₦17,000" },
        { size: "5 Litres", price: "₦27,000" }
      ],
      image: oha, 
      isAvailable: true 
    },
    { 
      name: "Okro Soup", 
      desc: "Fresh okro soup with your choice of protein.", 
      sizes: [
        { size: "2 Litres", price: "₦11,000" },
        { size: "3 Litres", price: "₦16,000" },
        { size: "5 Litres", price: "₦26,000" }
      ],
      image: okro, 
      isAvailable: true 
    },
    { 
      name: "Vegetable Soup", 
      desc: "Nutritious vegetable soup packed with vitamins.", 
      sizes: [
        { size: "2 Litres", price: "₦12,000" },
        { size: "3 Litres", price: "₦17,000" },
        { size: "5 Litres", price: "₦27,000" }
      ],
      image: vegetable, 
      isAvailable: true 
    }
  ],
  Stews: [
    { 
      name: "Beef Stew", 
      desc: "Flavorful beef stew perfect for rice dishes.", 
      sizes: [
        { size: "2 Litres", price: "₦10,000" },
        { size: "3 Litres", price: "₦13,500" },
        { size: "5 Litres", price: "₦20,000" }
      ],
      image: beef_stew, 
      isAvailable: true 
    },
    { 
      name: "Buka Stew", 
      desc: "Special Nigerian buka stew with assorted meat.", 
      sizes: [
        { size: "2 Litres", price: "₦13,000" },
        { size: "3 Litres", price: "₦18,000" },
        { size: "5 Litres", price: "₦38,000" }
      ],
      image: "", 
      isAvailable: true 
    },
    { 
      name: "Chicken Stew", 
      desc: "Delicious chicken stew for your favorite rice.", 
      sizes: [
        { size: "2 Litres", price: "₦11,000" },
        { size: "3 Litres", price: "₦16,000" },
        { size: "5 Litres", price: "₦26,000" }
      ],
      image: chicken_stew, 
      isAvailable: true 
    }
  ],
  Swallows: [
    { 
      name: "Semovita", 
      desc: "Smooth semovita for your delicious soups.", 
      sizes: [
        { size: "2 Wraps", price: "₦2,500" },
        { size: "4 Wraps", price: "₦4,500" }
      ],
      image: semovita, 
      isAvailable: true 
    },
    { 
      name: "Garri / Eba", 
      desc: "Fresh garri for your favorite soups.", 
      sizes: [
        { size: "2 Wraps", price: "₦3,000" },
        { size: "4 Wraps", price: "₦5,500" }
      ],
      image: "", 
      isAvailable: true 
    },
    { 
      name: "Amala", 
      desc: "Soft amala for your traditional soups.", 
      sizes: [
        { size: "1 Wrap", price: "₦300" },
        { size: "2 Wraps", price: "₦500" }
      ],
      image: "", 
      isAvailable: true 
    }
  ],
  Drinks: [
    { 
      name: "Watermelon Fruit Juice", 
      desc: "Fresh watermelon juice, naturally sweet.", 
      sizes: [
        { size: "500ml", price: "₦1,500" },
        { size: "1 Litre", price: "₦2,500" }
      ],
      image: watermelon, 
      isAvailable: true 
    },
  ],
  "Sides & Extras": [
    { 
      name: "Beef Shawarma", 
      desc: "Delicious beef shawarma with fresh vegetables.", 
      sizes: [
        { size: "Regular", price: "₦2,500" },
        { size: "Large", price: "₦3,500" }
      ],
      image: beef_sharwarma, 
      isAvailable: true 
    },
    { 
      name: "Chicken Shawarma", 
      desc: "Tasty chicken shawarma with special sauce.", 
      sizes: [
        { size: "Regular", price: "₦2,800" },
        { size: "Large", price: "₦3,800" }
      ],
      image: chicken_sharwarma, 
      isAvailable: true 
    },
  ],
  "Food Platters": [
    { 
      name: "Garnished Peppered Croaker", 
      desc: "Special peppered croaker fish with garnishes.", 
      sizes: [
        { size: "Standard", price: "₦15,500" }
      ],
      image: garnishedCroaker, 
      isAvailable: true 
    },
  ]
};

// data.js - Fix the weekly menu structure
const weeklyMenu = {
  Monday: [
    { 
      name: "Fried Rice with Plantain and Turkey", 
      desc: "Delicious fried rice with plantain and turkey",
      sizes: [
        { size: "Standard", price: "₦4,600" }
      ], 
      image: fried_rice_with_plantain_and_turkey,
      category: "Lunch Packs" 
    },
    { 
      name: "Fried Rice with Plantain and Chicken", 
      desc: "Tasty fried rice with plantain and chicken",
      sizes: [
        { size: "Standard", price: "₦4,500"}
      ], 
      image: fried_rice_with_plantain_and_chicken,
      category: "Lunch Packs" 
    },
    { 
      name: "Smokey Jellof with Peppered Turkey and Plantain",
      desc: "Smokey jollof rice with peppered turkey and plantain",
      sizes: [
        { size: "Standard", price: "₦4,500"}
      ], 
      image: "", // Fixed typo: was "iamge"
      category: "Lunch Packs" 
    },
    { 
      name: "Smokey Jellof with Peppered Chicken and Plantain",
      desc: "Smokey jollof rice with peppered chicken and plantain",
      sizes: [
        { size: "Standard", price: "₦4,000"}
      ], 
      image: "", // Fixed typo: was "iamge"
      category: "Lunch Packs" 
    },
    { 
      name: "Smokey Jellof with Peppered Goat Meat and Plantain",
      desc: "Smokey jollof rice with peppered goat meat and plantain",
      sizes: [
        { size: "Standard", price: "₦3,000"}
      ], 
      image: "", // Fixed typo: was "iamge"
      category: "Lunch Packs" 
    }
  ]
};

export default {
  categories,
  products,
  weeklyMenu
};