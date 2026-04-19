import React from 'react'
import TopNav from '../components/public/TopNav';
import Header from '../components/public/Header';
import Chatbot from '../components/public/Chatbot';
import BottomNav from '../components/public/BottomNav';
import Footer from '../components/public/Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <Header />
      <Chatbot />
      <main className='min-h-svh flex-1 flex flex-col'>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

export default PublicLayout;