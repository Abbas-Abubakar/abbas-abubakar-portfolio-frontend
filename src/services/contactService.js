import api from './api';

export const submitContactForm = async (formData) => {
  const response = await api.post('/contact', formData);
  return response.data;
};

export const getContactMessages = async () => {
  const response = await api.get('/contact');
  return response.data.data;
};

export const markAsRead = async (id) => {
  const response = await api.patch(`/contact/${id}/read`);
  return response.data.data;
};

export const deleteContactMessage = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};