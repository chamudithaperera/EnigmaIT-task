import { Router } from 'express';
import { getCategories, getByCategory, searchMeals, getMeal } from '../controllers/recipeController.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/', getByCategory); // /api/recipes?category=Pasta
router.get('/search', searchMeals); // /api/recipes/search?q=carbonara
router.get('/:id', getMeal);

export default router;


