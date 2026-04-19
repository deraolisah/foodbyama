import { Facebook, Instagram } from 'lucide-react';
import { TiktokLogoIcon } from "@phosphor-icons/react";
import React from 'react'

const TopNav = () => {
  return (
    <div className="container hidden md:flex items-center justify-between gap-4 h-10 border-b border-gray-200 text-xs relative">

      <div className="w-full flex items-center justify-start gap-4">
        <a title='Phone' href='tel:+2349054414660' target='_blank' className="hover:text-primary"> 
          09054414660
        </a>
        <a title='Mail' href='mailto:foodbyama4@gmail.com' target='_blank' className="hover:text-primary"> 
          foodbyama4@gmail.com 
        </a>
      </div>

      <div className="w-full text-center">
        {/* Open  */}
        7AM — 6PM 
      </div>

      <div className="w-full flex items-center justify-end gap-4">
        <a title='Facebook' href="" target='_blank' className="hover:text-primary"> 
          <Facebook size={18} />
        </a>
        <a title='Instagram' href="https://www.instagram.com/foodbyama__/" target='_blank' className="hover:text-primary"> 
          <Instagram size={18} />
        </a>
        <a title='Tiktok' href='https://www.tiktok.com/@foodbyama22' target='_blank' className="hover:text-primary"> 
          <TiktokLogoIcon size={18} />
        </a>
      </div>
    </div>
  )
}

export default TopNav;