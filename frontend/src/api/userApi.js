import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  withCredentials: true
});

export const getFavorites = async () => {
  const { data } = await api.get('/api/users/favorites');
  return data;
};

export const addFavorite = async (recipe) => {
  const { data } = await api.post('/api/users/favorites', recipe);
  return data;
};

export const removeFavorite = async (recipeId) => {
  const { data } = await api.delete(`/api/users/favorites/${recipeId}`);
  return data;
};

export default {
  getFavorites,
  addFavorite,
  removeFavorite
};
