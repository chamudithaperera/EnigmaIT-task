import axios from 'axios';

const MEALDB = axios.create({ baseURL: 'https://www.themealdb.com/api/json/v1/1' });

export const fetchCategories = async () => {
  const { data } = await MEALDB.get('/categories.php');
  return data?.categories || [];
};

export const fetchByCategory = async (category) => {
  const { data } = await MEALDB.get('/filter.php', { params: { c: category } });
  return data?.meals || [];
};

export const searchMeals = async (query) => {
  const { data } = await MEALDB.get('/search.php', { params: { s: query } });
  return data?.meals || [];
};

export const fetchMeal = async (id) => {
  const { data } = await MEALDB.get('/lookup.php', { params: { i: id } });
  return (data?.meals || [])[0] || null;
};

export default { fetchCategories, fetchByCategory, searchMeals, fetchMeal };


