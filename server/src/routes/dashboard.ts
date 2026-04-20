import { Router } from 'express';
import { getDashboardOverview } from '../controllers/dashboardController';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.get('/overview', verifyToken, getDashboardOverview);

export default router;
