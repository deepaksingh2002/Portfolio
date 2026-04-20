import { Router } from 'express';
import { body } from 'express-validator';
import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from '../controllers/skillController';
import { verifyToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.get('/', getSkills);
router.post(
  '/',
  verifyToken,
  [
    body('name').trim().notEmpty(),
    body('category').isIn(['frontend', 'backend', 'devops', 'tools']),
    body('proficiency').isInt({ min: 1, max: 5 }),
    body('icon').trim().notEmpty(),
  ],
  validateRequest,
  createSkill
);
router.put(
  '/:id',
  verifyToken,
  [
    body('name').optional().trim().notEmpty(),
    body('category').optional().isIn(['frontend', 'backend', 'devops', 'tools']),
    body('proficiency').optional().isInt({ min: 1, max: 5 }),
    body('icon').optional().trim().notEmpty(),
  ],
  validateRequest,
  updateSkill
);
router.delete('/:id', verifyToken, deleteSkill);

export default router;
