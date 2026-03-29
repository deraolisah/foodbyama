import React, {useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return null;

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  

  // useEffect(() => {
  //   if (user?.role === 'admin') {
  //     navigate('/admin');
  //   }
  // }, [user]);

  return children;
};

export default AdminRoute;