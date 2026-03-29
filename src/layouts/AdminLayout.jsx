import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSiderbar from '../components/admin/AdminSiderbar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // console.log("Toggling sidebar, new state:", !isSidebarOpen);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <div className="flex h-full container relative p-0!">
        {/* Sidebar */}
        <AdminSiderbar isSidebarOpen={isSidebarOpen} />

        {/* Content */}
        <main className="flex-1 h-full container py-18 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;