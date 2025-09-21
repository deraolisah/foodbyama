import React from 'react'
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Chatbot from '../pages/Chatbot';

const PublicLayout = () => {
  return (
    <div className='min-h-screen flex flex-col relative pb-21'>
      <Navbar />
      <Outlet />
      <Chatbot />
      <BottomNav />
    </div>
  )
}

export default PublicLayout;