import React from 'react';
// import { FaWhatsapp } from "react-icons/fa";
import whatsapp from "../assets/whatsapp.png";

const Chatbot = () => {
  return (
    <div className='fixed w-full left-0 bottom-20 z-40'>
      <div className='container relative bg-transparent flex items-center justify-end gap-1 cursor-pointer select-none'>
        <img src={whatsapp} alt='' className='w-10' />
        <span className='flex absolute -top-1 right-3 w-3 h-3 rounded-full bg-primary animate-pulse'></span>
        <span className='flex absolute -top-1 right-3 w-3 h-3 rounded-full bg-primary animate-ping'></span>
      </div>
    </div>
  )
}

export default Chatbot;