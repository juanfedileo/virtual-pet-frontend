import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props {
  allowedRoles: string[];
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<Props> = ({ allowedRoles, children }) => {
  const { isAuthenticated, role } = useAuth() as any;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
