import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/stats`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        const data = await res.json();
        setStats(data.stats);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [user]);


  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="">

      {/* Header */}
      {/* <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all cursor-pointer"
        >
          Logout
        </button>
      </div> */}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Orders */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500">Total Orders</h2>
          <p className="text-2xl font-bold mt-2">
            {stats?.totalOrders || 0}
          </p>
        </div>

        {/* Users */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold mt-2">
            {stats?.totalUsers || 0}
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold mt-2">
            ₦{stats?.revenue?.toLocaleString() || 0}
          </p>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;