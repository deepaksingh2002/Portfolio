import { Router } from 'express';
import projectRoutes from './project';
import skillRoutes from './skill';
import experienceRoutes from './experience';
import messageRoutes from './message';
import adminRoutes from './admin';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/contact', messageRoutes);
router.use('/auth', adminRoutes);

export default router;
