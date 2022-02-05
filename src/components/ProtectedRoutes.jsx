import React from 'react';
import { Navigate, Route, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('authToken');
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
