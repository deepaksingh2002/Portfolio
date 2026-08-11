import { Router } from 'express';
import {
  login,
  getMe,
  refreshAccessToken,
  logout,
  seedAdmin,
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateLogin } from '../middleware/validate.js';

const router = Router();

router.post('/login', validateLogin, login);
router.post('/refresh-token', refreshAccessToken);
router.get('/me', verifyToken, getMe);
router.post('/logout', verifyToken, logout);
router.post('/seed', seedAdmin); // dev only

export default router;
