import React from 'react'

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user || user.role !== 'admin') {
    return null;
  }

  return children;
};

export default AdminRoute;