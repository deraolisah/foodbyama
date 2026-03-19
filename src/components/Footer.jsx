import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="container text-center text-sm py-8 md:py-12 space-y-6">
      <div className="flex items-center justify-center flex-wrap gap-3">
        <Link to="/privacy" className="text-nowrap" onClick={()=> {scrollTo(0,0); }}>
          Privacy Policy
        </Link>
        |
        <Link to="/terms" className="text-nowrap" onClick={()=> {scrollTo(0,0); }}>
          Terms & Condition
        </Link>
        |
        <Link to="/returns" className="text-nowrap" onClick={()=> {scrollTo(0,0); }}>
          Returns Policy
        </Link>
        |
        <Link to="/faqs" className="text-nowrap" onClick={()=> {scrollTo(0,0); }}>
          Frequently Asked Questions
        </Link>
      </div>
      
      <div>
        ©2026 FoodByAma. All Rights Reserved.
      </div>

    </footer>
  )
}

export default Footer;