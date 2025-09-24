import React from 'react'
import Navbar from '../components/Navbar';
import WelcomePopup from '../components/WelcomePopup';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Chatbot from '../components/Chatbot';

const PublicLayout = () => {
  return (
    <div className='min-h-screen flex flex-col relative pb-21'>
      <Navbar />
      <WelcomePopup /> {/* Add the popup here */}
      <Outlet />
      <Chatbot />
      <BottomNav />
    </div>
  )
}

export default PublicLayout;