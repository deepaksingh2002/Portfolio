import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import rateLimit from 'express-rate-limit';
import { verifyToken } from '../middleware/auth';

const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3,
  message: 'Too many messages sent, please try again later.',
});

const router = Router();

router.post(
  '/contact',
  contactLimiter,
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('subject').notEmpty(),
    body('message').notEmpty(),
  ],
  validateRequest,
  sendMessage
);

router.get('/messages', verifyToken, getMessages);

export default router;
