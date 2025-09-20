import React from 'react';
import { FaWhatsapp } from "react-icons/fa";

const Chatbot = () => {
  return (
    <div className='fixed bottom-20 right-5 bg-light hover:bg-white text-green-500 font-semibold rounded-full flex items-center gap-1 py-2 px-3 pr-5 cursor-pointer select-none border border-dark/10'>
      <FaWhatsapp className='text-2xl' />
      Live Chat
      <span className='flex absolute -top-1 right-1 w-3 h-3 rounded-full bg-primary animate-pulse'></span>
      <span className='flex absolute -top-1 right-1 w-3 h-3 rounded-full bg-primary animate-ping'></span>
    </div>
  )
}

export default Chatbot;