import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMe, logout as logoutApi } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in on mount by calling /api/auth/me
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get current user (cookie will be sent automatically)
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        // No valid session
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function - just store user data (cookie is set by backend)
  const login = (userData) => {
    setUser(userData);
    // No need to store token - it's in the cookie!
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint to clear cookie
      await logoutApi();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      
      // Only navigate if on admin page
      if (location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
        navigate('/admin/login', { replace: true });
      }
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};