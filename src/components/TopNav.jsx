import { Facebook, Instagram } from 'lucide-react';
import React from 'react'

const TopNav = () => {
  return (
    <div className="container hidden md:flex items-center justify-between gap-4 h-10 border-b border-gray-200 text-xs">
      <div className="flex items-center gap-3">
        <a href='tel:+2349054414660'> 09054414660 </a>
        <a href='mailto:foodbyama4@gmail.com'> foodbyama4@gmail.com </a>
      </div>

      <div className="flex items-center gap-3">
        <a href=""> <Facebook size={14} /></a>
        <a href=""> <Instagram size={14} /> </a>
      </div>
    </div>
  )
}

export default TopNav;