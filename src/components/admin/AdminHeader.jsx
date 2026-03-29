import { PanelRightOpen } from 'lucide-react';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="container bg-gray-200 h-14 border-b border-gray-300 fixed md:relative top-13 md:top-0 left-0 right-0 z-10">
      <header className="flex items-center justify-between h-full gap-4">
        <button
          className="text-sm bg-white p-2 rounded-md shadow text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer w-fit"
          onClick={() => (toggleSidebar())}
        >
          <PanelRightOpen size={18} />
        </button>
        <h1 className="text-base md:text-2xl font-bold text-primary flex-1">
          Admin
        </h1>

        <button type="button" className="text-sm bg-primary p-2 px-4 rounded-md shadow text-white hover:bg-primary-dark focus:outline-none cursor-pointer w-fit" onClick={handleLogout}>
          Logout
        </button>
      </header>
    </div>
  )
}

export default AdminHeader;