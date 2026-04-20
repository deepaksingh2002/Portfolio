import { Router } from 'express';
import {
  changePassword,
  getCurrentAdmin,
  login,
  logout,
  refreshAccessToken,
} from '../controllers/adminController';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
  ],
  validateRequest,
  login
);
router.post('/refresh', refreshAccessToken);
router.get('/me', verifyToken, getCurrentAdmin);
router.post(
  '/change-password',
  verifyToken,
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 8 }),
  ],
  validateRequest,
  changePassword
);
router.post('/logout', logout);

export default router;
