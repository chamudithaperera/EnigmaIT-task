import axios from 'axios';

const MEALDB = axios.create({ baseURL: 'https://www.themealdb.com/api/json/v1/1' });
const ALLOWED_CATEGORIES = ['Beef', 'Chicken', 'Dessert', 'Pasta', 'Vegetarian'];

export const getCategories = async (req, res, next) => {
  try {
    const { data } = await MEALDB.get('/categories.php');
    const categories = (data?.categories || [])
      .map((c) => c.strCategory)
      .filter((c) => ALLOWED_CATEGORIES.includes(c));
    return res.status(200).json({ categories });
  } catch (err) {
    return next(err);
  }
};

export const getByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;
    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: 'Invalid or unsupported category' });
    }
    const { data } = await MEALDB.get('/filter.php', { params: { c: category } });
    return res.status(200).json({ meals: data?.meals || [] });
  } catch (err) {
    return next(err);
  }
};

export const searchMeals = async (req, res, next) => {
  try {
    const { q } = req.query;
    const { data } = await MEALDB.get('/search.php', { params: { s: q || '' } });
    return res.status(200).json({ meals: data?.meals || [] });
  } catch (err) {
    return next(err);
  }
};

export const getMeal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await MEALDB.get('/lookup.php', { params: { i: id } });
    const meal = (data?.meals || [])[0] || null;
    return res.status(200).json({ meal });
  } catch (err) {
    return next(err);
  }
};


