import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

// Response interceptor - DON'T auto-redirect on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Just return the error, let components handle it
    return Promise.reject(error);
  }
);

export default api;