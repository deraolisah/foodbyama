// pages/account/index.jsx (Account Layout)
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaShoppingBag, FaStar, FaSignOutAlt } from 'react-icons/fa';

const AccountLayout = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Clear session verification
    sessionStorage.removeItem('email_verified');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Account Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-xl">FoodByAma</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">My Account</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="container max-w-6xl mx-auto px-4 mt-6">
        <nav className="flex space-x-1 bg-white rounded-lg shadow-sm p-1">
          <NavLink
            to="/account"
            end
            className={({ isActive }) =>
              `flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <FaUser />
            <span className="hidden sm:inline">Overview</span>
          </NavLink>
          <NavLink
            to="/account/orders"
            className={({ isActive }) =>
              `flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <FaShoppingBag />
            <span className="hidden sm:inline">Orders</span>
          </NavLink>
          <NavLink
            to="/account/loyalty"
            className={({ isActive }) =>
              `flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <FaStar />
            <span className="hidden sm:inline">Loyalty</span>
          </NavLink>
        </nav>

        {/* User Info Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              {user?.fullName?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{user?.fullName}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;