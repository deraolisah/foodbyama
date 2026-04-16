import React from 'react'
// import Navbar from '../components/Navbar';
import TopNav from '../components/public/TopNav';
// import WelcomePopup from '../components/WelcomePopup';
import Header from '../components/public/Header';
import Chatbot from '../components/public/Chatbot';
import BottomNav from '../components/public/BottomNav';
import Footer from '../components/public/Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="pb-16 md:pb-0 h-full w-full relative!">
      {/* <Navbar /> */}
      <TopNav />
      <Header />
      {/* <WelcomePopup /> */}
      <Chatbot />
      <main className='min-h-svh flex flex-col'>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

export default PublicLayout;