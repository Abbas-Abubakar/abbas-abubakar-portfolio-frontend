import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loader from './loader/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  console.log('🔒 ProtectedRoute Check:', {
    loading,
    authenticated: isAuthenticated(),
    path: location.pathname
  });

  if (loading) {
    console.log('⏳ ProtectedRoute: Still loading auth...');
    return <Loader fullScreen size="large" />;
  }

  if (!isAuthenticated()) {
    console.log('❌ ProtectedRoute: Not authenticated, redirecting to login');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  console.log('✅ ProtectedRoute: Authenticated, rendering protected content');
  return children;
};

export default ProtectedRoute;