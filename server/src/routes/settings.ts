import { Router } from 'express';
import { body } from 'express-validator';
import {
  clearMessages,
  deleteAdminAccount,
  getSettings,
  resetPortfolioData,
  updateProfileSettings,
  updateSocialSettings,
} from '../controllers/settingsController';
import { verifyToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.get('/', verifyToken, getSettings);
router.put(
  '/profile',
  verifyToken,
  [
    body('displayName').optional().trim().notEmpty(),
    body('email').optional().trim().isEmail(),
    body('bio').optional().trim(),
    body('availableForOpportunities').optional().isBoolean(),
  ],
  validateRequest,
  updateProfileSettings
);
router.put(
  '/socials',
  verifyToken,
  [
    body('githubUrl').optional({ values: 'falsy' }).isURL(),
    body('linkedinUrl').optional({ values: 'falsy' }).isURL(),
    body('twitterUrl').optional({ values: 'falsy' }).isURL(),
  ],
  validateRequest,
  updateSocialSettings
);
router.delete('/messages', verifyToken, clearMessages);
router.post('/reset', verifyToken, resetPortfolioData);
router.delete('/account', verifyToken, deleteAdminAccount);

export default router;
