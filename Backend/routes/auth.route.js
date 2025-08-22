import { Router } from 'express';
import { register, login, getAllUsers, getUserById, updateMe } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authMiddleware, getAllUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.put('/me', authMiddleware, updateMe); 

export default router;
