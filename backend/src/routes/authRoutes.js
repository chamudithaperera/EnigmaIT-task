import { Router } from 'express';
import { login, register, profile, logout } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', requireAuth, profile);
router.post('/logout', requireAuth, logout);

export default router;


