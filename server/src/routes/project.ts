import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { verifyToken } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { normalizeProjectPayload } from '../middleware/normalizeProjectPayload';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);

router.post(
  '/',
  verifyToken,
  upload.single('image'),
  normalizeProjectPayload,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('techStack').isArray({ min: 1 }).withMessage('At least one tech stack item is required'),
    body('liveUrl').optional({ values: 'falsy' }).isURL().withMessage('Invalid live URL'),
    body('githubUrl').optional({ values: 'falsy' }).isURL().withMessage('Invalid GitHub URL'),
    body('category').trim().notEmpty().withMessage('Category is required'),
  ],
  validateRequest,
  createProject
);

router.put(
  '/:id',
  verifyToken,
  upload.single('image'),
  normalizeProjectPayload,
  [
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('techStack').optional().isArray({ min: 1 }),
    body('liveUrl').optional({ values: 'falsy' }).isURL(),
    body('githubUrl').optional({ values: 'falsy' }).isURL(),
    body('category').optional().trim().notEmpty(),
    body('featured').optional().isBoolean(),
    body('published').optional().isBoolean(),
    body('order').optional().isInt({ min: 0 }),
  ],
  validateRequest,
  updateProject
);

router.delete('/:id', verifyToken, deleteProject);

export default router;
