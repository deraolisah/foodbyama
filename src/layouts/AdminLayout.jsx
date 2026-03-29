import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSiderbar from '../components/admin/AdminSiderbar';

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex container relative p-0!">


        {/* Sidebar */}
        <AdminSiderbar />

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;