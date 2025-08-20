import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5050',
  withCredentials: true
});

export const register = async (payload) => {
  const { data } = await api.post('/api/auth/register', payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post('/api/auth/login', payload);
  return data;
};

export const profile = async () => {
  const { data } = await api.get('/api/auth/profile');
  return data;
};

export const logout = async () => {
  const { data } = await api.post('/api/auth/logout');
  return data;
};

export default {
  register,
  login,
  profile,
  logout
};


