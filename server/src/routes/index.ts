import { Router } from 'express';
import projectRoutes from './project';
import skillRoutes from './skill';
import experienceRoutes from './experience';
import messageRoutes from './message';
import adminRoutes from './admin';
import settingsRoutes from './settings';
import dashboardRoutes from './dashboard';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/contact', messageRoutes);
router.use('/auth', adminRoutes);
router.use('/settings', settingsRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
