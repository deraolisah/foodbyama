import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="container text-center text-sm py-8 md:py-12 space-y-6">
      <div className="flex items-center justify-center gap-2">
        <Link to="/privacy">
          Privacy Policy
        </Link>
        |
        <Link to="/terms">
          Terms & Condition
        </Link>
        |
        <Link to="/refunds">
          Refund Policy
        </Link>
      </div>
      
      <div>
        ©2026 FoodByAma. All Rights Reserved.
      </div>

    </footer>
  )
}

export default Footer;