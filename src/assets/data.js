import egusi2 from "./products/Egwusi-2-litres.jpg";
import garnishedCroaker from "./products/garnished-peppered-croaker.jpg";
import semovita from "./products/semovita.jpg";

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
      image: egusi2, 
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
      image: "", 
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
      image: "", 
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
      image: "", 
      isAvailable: true 
    },
    { 
      name: "Okra Soup", 
      desc: "Fresh okra soup with your choice of protein.", 
      sizes: [
        { size: "2 Litres", price: "₦11,000" },
        { size: "3 Litres", price: "₦16,000" },
        { size: "5 Litres", price: "₦26,000" }
      ],
      image: "", 
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
      image: "", 
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
      image: "", 
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
      image: "", 
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
      image: "", 
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
      image: "", 
      isAvailable: true 
    },
    { 
      name: "Chicken Shawarma", 
      desc: "Tasty chicken shawarma with special sauce.", 
      sizes: [
        { size: "Regular", price: "₦2,800" },
        { size: "Large", price: "₦3,800" }
      ],
      image: "", 
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
      category: "Lunch Packs" 
    },
    { 
      name: "Fried Rice with Plantain and Chicken", 
      desc: "Tasty fried rice with plantain and chicken",
      sizes: [
        { size: "Standard", price: "₦4,500"}
      ], 
      category: "Lunch Packs" 
    },
    { 
      name: "Smokey Jellof with Peppered Turkey and Plantain",
      desc: "Smokey jollof rice with peppered turkey and plantain",
      sizes: [
        { size: "Standard", price: "₦4,500"}
      ], 
      category: "Lunch Packs" 
    },
    { 
      name: "Smokey Jellof with Peppered Chicken and Plantain",
      desc: "Smokey jollof rice with peppered chicken and plantain",
      sizes: [
        { size: "Standard", price: "₦4,000"}
      ], 
      category: "Lunch Packs" 
    },
    { 
      name: "Smokey Jellof with Peppered Goat Meat and Plantain",
      desc: "Smokey jollof rice with peppered goat meat and plantain",
      sizes: [
        { size: "Standard", price: "₦3,000"}
      ], 
      category: "Lunch Packs" 
    }
  ],
  Tuesday: [
    { 
      name: "Yam Porridge with Smoked Fish",
      desc: "Hearty yam porridge with smoked fish",
      sizes: [
        { size: "Standard", price: "₦3,500" }
      ],
      category: "Lunch Packs" 
    },
    { 
      name: "Jollof Spaghetti with Chicken",
      desc: "Jollof spaghetti with chicken",
      sizes: [
        { size: "Standard", price: "₦4,000" }
      ],
      category: "Lunch Packs" 
    }
  ],
  Wednesday: [
    { 
      name: "White Rice with Stew and Beef",
      desc: "White rice with stew and beef",
      sizes: [
        { size: "Standard", price: "₦3,800" }
      ],
      category: "Lunch Packs" 
    },
    { 
      name: "Fried Rice with Plantain and Fish",
      desc: "Fried rice with plantain and fish",
      sizes: [
        { size: "Standard", price: "₦4,200" }
      ],
      category: "Lunch Packs" 
    }
  ],
  Thursday: [
    { 
      name: "Coconut Rice with Chicken",
      desc: "Coconut rice with chicken",
      sizes: [
        { size: "Standard", price: "₦4,500" }
      ],
      category: "Lunch Packs" 
    },
    { 
      name: "Ofada Rice with Assorted Meat",
      desc: "Ofada rice with assorted meat",
      sizes: [
        { size: "Standard", price: "₦4,800" }
      ],
      category: "Lunch Packs" 
    }
  ],
  Friday: [
    { 
      name: "Eba with Egusi Soup",
      desc: "Eba with egusi soup",
      sizes: [
        { size: "Standard", price: "₦3,200" }
      ],
      category: "Swallows" 
    },
    { 
      name: "Pounded Yam with Ogbono Soup",
      desc: "Pounded yam with ogbono soup",
      sizes: [
        { size: "Standard", price: "₦3,500" }
      ],
      category: "Swallows" 
    }
  ],
  Saturday: [
    { 
      name: "Special Jollof Rice Party Pack", 
      desc: "Special jollof rice party pack",
      sizes: [
        { size: "Standard", price: "₦12,000" }
      ], 
      category: "Food Platters" 
    },
    { 
      name: "Small Chops Platter",
      desc: "Small chops platter",
      sizes: [
        { size: "Standard", price: "₦8,500" }
      ],
      category: "Food Platters" 
    }
  ],
  Sunday: [
    { 
      name: "Sunday Special Rice and Stew",
      desc: "Sunday special rice and stew",
      sizes: [
        { size: "Standard", price: "₦4,000" }
      ], 
      category: "Lunch Packs" 
    },
    { 
      name: "Sunday Special Soup",
      desc: "Sunday special soup",
      sizes: [
        { size: "Standard", price: "₦3,800" }
      ], 
      category: "Soups" 
    }
  ]
};

export default {
  categories,
  products,
  weeklyMenu
};