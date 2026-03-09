import React from 'react'
// import Navbar from '../components/Navbar';
import WelcomePopup from '../components/WelcomePopup';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Chatbot from '../components/Chatbot';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout = () => {
  return (
    <div className="pb-16 md:pb-0">
      <Header />
      {/* <WelcomePopup /> */}
      <Chatbot />
      <main className='min-h-screen flex flex-col'>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

export default PublicLayout;