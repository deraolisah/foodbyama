import React from 'react';
import { Link } from 'react-router-dom';

const AdminSiderbar = ({ isSidebarOpen }) => {
  return (
    <aside className={`fixed md:sticky top-27 md:top-13 w-64 h-full bg-gray-200 text-gray-800 p-4 sm:p-6 md:p-8 transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}>
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
  )
}

export default AdminSiderbar;