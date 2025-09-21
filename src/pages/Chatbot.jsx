import React, { useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import whatsappBg from "../assets/whatsapp-bg.png";
import sendBtn from "../assets/send-icon.svg";
import { IoMdClose } from "react-icons/io";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const handleSend = () => {
    const encodedMessage = encodeURIComponent(message || "Hi, I was chatting on your website");
    window.open(`https://wa.me/2349054414660?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="fixed bottom-20 left-0 w-full z-50 pointer-events-none">
      <div className="container flex justify-end items-center relative">
        {/* WhatsApp Icon */}
        <button onClick={handleOpen} className="z-40 pointer-events-auto cursor-pointer bg-[#25d366] p-2.5 rounded-full shadow">
          <FaWhatsapp className='text-light text-4xl' />
        </button>

        {/* Notification Dot */}
        {!isOpen && (
          <span className='z-50'>
            <span className="absolute top-0.5 right-3 w-3 h-3 rounded-full bg-primary animate-pulse"></span>
            <span className="absolute top-0.5 right-3 w-3 h-3 rounded-full bg-primary animate-ping"></span>
          </span>
        )}

        {/* Popup Chat Window */}
        {/* {isOpen && ( */}
          <div className={`absolute bottom-20 right-6 z-30 bg-transparent shadow-xl rounded-2xl overflow-hidden w-[360px] p-0 text-dark pointer-events-auto transform transition-all duration-400 ease-in-out ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
            }`}>
            {/* Header */}
            <div className="flex justify-start items-center gap-4 bg-[#075e55] text-light p-4 py-3">
              <a href='https://wa.me/2349054414660/' target='_blank' className='relative'>
                <img src={logo} alt='' className='w-13 h-13 object-cover object-center rounded-full ring-1 ring-light/50' />
                <span className='bg-[#25d366] w-3 h-3 rounded-full absolute bottom-0 right-0 border-2 border-[#075e55]'></span>
              </a>
              <div className='flex flex-col flex-1'>
                <h4 className="font-semibold text-base"> FoodByAma🍜 </h4>
                <p className='text-xs text-light/80 font-lighter'> Typically replies in minutes </p>
              </div>
              <button onClick={handleClose} className="text-sm font-bold cursor-pointer p-2 bg-light/10 hover:bg-light/15 rounded-full">
                {/* ✕ */}
                <IoMdClose />
              </button>
            </div>

            {/* Body */}
            <div className='flex flex-col p-0 bg-[#eae6df]' style={{ backgroundImage: `url(${whatsappBg})`}}>
              <div className='py-8 px-4'>
                <p className="w-fit p-2.5 mr-10 text-xs mb-3 bg-light rounded-lg shadow"> Hi there 👋 <br/> Thanks for reaching out to us. What would you like to order today? </p>
              </div>


              <div className='w-full bg-[#f0f0f0] p-2 flex items-center gap-2'>
                <input 
                  type="text" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Type a message..."
                  required
                  className="w-full px-3 py-2 text-md bg-light border border-dark/10 rounded-full"
                />

                <button onClick={handleSend} className="w-fit text-light rounded-md text-sm font-semibold cursor-pointer">
                    <img src={sendBtn} alt='' className='w-8 pr-2 invert-60' />
                  {/* Continue on WhatsApp */}
                </button>
              </div>
            </div>
          </div>
        {/* )} */}

        {/* Overlay */}
        {isOpen && (
          <div onClick={handleClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 pointer-events-auto transition-opacity duration-300"/>
        )}

      </div>
    </div>
  );
};

export default Chatbot;