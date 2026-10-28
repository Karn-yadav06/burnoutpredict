import express from 'express';
import { registerUser, loginUser, getMe, forgotPassword, resetPassword } from '../controllers/authController.js';
import { registerValidators, loginValidators } from '../middleware/validationMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerValidators, registerUser);
router.post('/login', loginValidators, loginUser);
router.get('/me', authenticateToken, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:id/:token', resetPassword);

export default router;
