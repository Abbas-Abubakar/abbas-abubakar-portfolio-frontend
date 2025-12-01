import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '../../utils/animations';
import { login } from '../../services/authService';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/input/Input';
import Button from '../../components/common/button/Button';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: loginUser, isAuthenticated, loading: authLoading } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated()) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate, location]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');

      // Call login API (cookie is set automatically by backend)
      const response = await login(data);
      
      console.log('Login successful:', response);

      // Store user data in context (no token needed - it's in cookie)
      loginUser({
        _id: response._id,
        name: response.name,
        email: response.email,
      });

      // Redirect to dashboard
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 'Invalid credentials. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show loader while checking auth
  if (authLoading) {
    return (
      <div className="admin-login-page">
        <div className="login-container">
          <p style={{ textAlign: 'center', color: 'var(--gray-400)' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Don't show login form if already authenticated
  if (isAuthenticated()) {
    return null;
  }

  return (
    <div className="admin-login-page">
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="login-container"
      >
        <motion.div variants={fadeIn} className="login-header">
          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">Sign in to manage your portfolio</p>
        </motion.div>

        <motion.form
          variants={fadeIn}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="error-alert"
            >
              {error}
            </motion.div>
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="admin@example.com"
            required
            register={register}
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            register={register}
            error={errors.password}
          />

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </motion.form>

        <motion.div
          variants={fadeIn}
          transition={{ delay: 0.3 }}
          className="login-footer"
        >
          <button onClick={() => navigate('/')} className="back-link">
            ← Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;