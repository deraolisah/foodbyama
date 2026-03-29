import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin</h2>

        <nav className="space-y-4">
          <Link to="/admin" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/admin/orders" className="block hover:text-gray-300">
            Orders
          </Link>
          <Link to="/admin/products" className="block hover:text-gray-300">
            Products
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;