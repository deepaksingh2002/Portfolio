import { Router } from 'express';
import {
  sendMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
} from '../controllers/messageController';
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
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty(),
    body('email').trim().isEmail(),
    body('subject').trim().notEmpty(),
    body('message').trim().notEmpty(),
  ],
  validateRequest,
  sendMessage
);

router.get('/messages', verifyToken, getMessages);
router.patch('/messages/:id/read', verifyToken, markMessageAsRead);
router.delete('/messages/:id', verifyToken, deleteMessage);

export default router;
