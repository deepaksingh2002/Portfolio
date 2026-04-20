import { Router } from 'express';
import { body } from 'express-validator';
import {
  createExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from '../controllers/experienceController';
import { verifyToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.get('/', getExperience);
router.post(
  '/',
  verifyToken,
  [
    body('role').trim().notEmpty(),
    body('company').trim().notEmpty(),
    body('period').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('current').optional().isBoolean(),
  ],
  validateRequest,
  createExperience
);
router.put(
  '/:id',
  verifyToken,
  [
    body('role').optional().trim().notEmpty(),
    body('company').optional().trim().notEmpty(),
    body('period').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('current').optional().isBoolean(),
  ],
  validateRequest,
  updateExperience
);
router.delete('/:id', verifyToken, deleteExperience);

export default router;
