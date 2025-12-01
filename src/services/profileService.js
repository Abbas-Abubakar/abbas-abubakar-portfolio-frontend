import api from './api';

export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/profile', profileData);
  return response.data.data;
};

export const addSkill = async (skillData) => {
  const response = await api.post('/profile/skills', skillData);
  return response.data.data;
};

export const deleteSkill = async (skillId) => {
  const response = await api.delete(`/profile/skills/${skillId}`);
  return response.data.data;
};