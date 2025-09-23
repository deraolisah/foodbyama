import egusi2 from "./products/Egwusi-2-litres.jpg";

const categories = [
  "Soups", "Stews", "Salads", "Swallows", "Lunch Packs", "Sides & Extras",
  "Drinks", "Mini Sets", "Gift Boxes", "Pastries", "Food Platters", "Yoghurts"
];

const products = {
  Soups: [
    { name: "Egusi Soup", size: "2 Litres", price: "₦11,000", image: egusi2, isAvailable: true },
    { name: "Egusi Soup", size: "3 Litres", price: "₦16,000", image: "", isAvailable: true },
    { name: "Egusi Soup", size: "5 Litres", price: "₦26,000", image: "", isAvailable: true },
    { name: "Nsala Soup", size: "2 Litres", price: "₦11,000", image: "", isAvailable: true },
    { name: "Nsala Soup", size: "3 Litres", price: "₦16,000", image: "", isAvailable: true },
    { name: "Nsala Soup", size: "5 Litres", price: "₦26,000", image: "", isAvailable: true },
    { name: "Ogbono Soup", size: "2 Litres", price: "₦11,000", image: "", isAvailable: true },
    { name: "Ogbono Soup", size: "3 Litres", price: "₦16,000", image: "", isAvailable: true },
    { name: "Ogbono Soup", size: "5 Litres", price: "₦26,000", image: "", isAvailable: true },
    { name: "Oha Soup", size: "2 Litres", price: "₦12,000", image: "", isAvailable: true },
    { name: "Oha Soup", size: "3 Litres", price: "₦17,000", image: "", isAvailable: true },
    { name: "Oha Soup", size: "5 Litres", price: "₦27,000", image: "", isAvailable: true },
    { name: "Okra-Ogbono Soup", size: "2 Litres", price: "₦11,000", image: "", isAvailable: true },
    { name: "Okra-Ogbono Soup", size: "3 Litres", price: "₦16,000", image: "", isAvailable: true },
    { name: "Okra-Ogbono Soup", size: "5 Litres", price: "₦26,000", image: "", isAvailable: true },
    { name: "Okra Soup", size: "2 Litres", price: "₦11,000", image: "", isAvailable: true },
    { name: "Okra Soup", size: "3 Litres", price: "₦16,000", image: "", isAvailable: true },
    { name: "Okra Soup", size: "5 Litres", price: "₦26,000", image: "", isAvailable: true },
    { name: "Vegetable Soup", size: "2 Litres", price: "₦12,000", image: "", isAvailable: true },
    { name: "Vegetable Soup", size: "3 Litres", price: "₦17,000", image: "", isAvailable: true },
    { name: "Vegetable Soup", size: "5 Litres", price: "₦27,000", image: "", isAvailable: true }
  ],
  Stews: [
    { name: "Beef Stew", size: "2 Litres", price: "₦10,000", image: "", isAvailable: true },
    { name: "Beef Stew", size: "3 Litres", price: "₦13,500", image: "", isAvailable: true },
    { name: "Beef Stew", size: "5 Litres", price: "₦20,000", image: "", isAvailable: true },
    { name: "Buka Stew", size: "2 Litres", price: "₦13,000", image: "", isAvailable: true },
    { name: "Buka Stew", size: "3 Litres", price: "₦18,000", image: "", isAvailable: true },
    { name: "Buka Stew", size: "5 Litres", price: "₦38,000", image: "", isAvailable: true },
    { name: "Chicken Stew", size: "2 Litres", price: "₦11,000", image: "", isAvailable: true },
    { name: "Chicken Stew", size: "3 Litres", price: "₦16,000", image: "", isAvailable: true },
    { name: "Chicken Stew", size: "5 Litres", price: "₦26,000", image: "", isAvailable: true }
  ],
  Swallows: [
    { name: "Semovita", size: "2 Wraps", price: "₦2,500", image: "", isAvailable: true },
    { name: "Garri / Eba", size: "2 Wraps", price: "₦3,000", image: "", isAvailable: true },
    { name: "Amala", size: "1 Wrap", price: "₦300", image: "", isAvailable: true }
  ]
};

const weeklyMenu = {
  Monday: [
    { name: "Fried Rice with Plantain and Turkey", price: "₦4,600", category: "Lunch Packs" },
    { name: "Fried Rice with Plantain and Chicken", price: "₦4,500", category: "Lunch Packs" },
    { name: "Smokey Jellof with Peppered Turkey and Plantain", price: "₦4,500", category: "Lunch Packs" },
    { name: "Smokey Jellof with Peppered Chicken and Plantain", price: "₦4,000", category: "Lunch Packs" },
    { name: "Smokey Jellof with Peppered Goat Meat and Plantain", price: "₦3,000", category: "Lunch Packs" }
  ],
  Tuesday: [
    { name: "Yam Porridge with Smoked Fish", price: "₦3,500", category: "Lunch Packs" },
    { name: "Jollof Spaghetti with Chicken", price: "₦4,000", category: "Lunch Packs" }
  ],
  Wednesday: [
    { name: "White Rice with Stew and Beef", price: "₦3,800", category: "Lunch Packs" },
    { name: "Fried Rice with Plantain and Fish", price: "₦4,200", category: "Lunch Packs" }
    ],
  Thursday: [
    { name: "Coconut Rice with Chicken", price: "₦4,500", category: "Lunch Packs" },
    { name: "Ofada Rice with Assorted Meat", price: "₦4,800", category: "Lunch Packs" }
    ],
  Friday: [
    { name: "Eba with Egusi Soup", price: "₦3,200", category: "Swallows" },
    { name: "Pounded Yam with Ogbono Soup", price: "₦3,500", category: "Swallows" }
    ],
  Saturday: [
    { name: "Special Jollof Rice Party Pack", price: "₦12,000", category: "Food Platters" },
    { name: "Small Chops Platter", price: "₦8,500", category: "Food Platters" }
    ],
  Sunday: [
    { name: "Sunday Special Rice and Stew", price: "₦4,000", category: "Lunch Packs" },
    { name: "Sunday Special Soup", price: "₦3,800", category: "Soup" }
    ]
};

export default {
  categories,
  products,
  weeklyMenu
};