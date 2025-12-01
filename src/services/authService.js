import api from './api';

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data.data; // ✅ Extract data
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data.data; // ✅ Extract data
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data.data; // ✅ Extract data
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};