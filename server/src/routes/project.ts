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
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);

router.post(
  '/',
  verifyToken,
  upload.single('image'),
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('techStack').isArray(),
    body('liveUrl').isURL(),
    body('githubUrl').isURL(),
    body('category').notEmpty(),
  ],
  validateRequest,
  createProject
);

router.put(
  '/:id',
  verifyToken,
  upload.single('image'),
  [
    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
    body('techStack').optional().isArray(),
    body('liveUrl').optional().isURL(),
    body('githubUrl').optional().isURL(),
    body('category').optional().notEmpty(),
  ],
  validateRequest,
  updateProject
);

router.delete('/:id', verifyToken, deleteProject);

export default router;
