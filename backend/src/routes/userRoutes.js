import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);

router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:recipeId', removeFavorite);

export default router;
