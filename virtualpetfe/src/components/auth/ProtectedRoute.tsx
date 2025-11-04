import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  requiredRole: 'admin' | 'cliente';
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // Redirige al login, guardando la ubicación a la que quería ir
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== requiredRole) {
    // Redirige a la home
    return <Navigate to="/" replace />;
  }

  // esta logueado y tiene el rol: permite el acceso
  return <Outlet />; 
};