import { Router } from 'express';
import {
  getProgressOverview,
  getSkillBreakdown,
  getRecommendations,
  getUserBadges,
} from '../controllers/progress.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All progress routes require authentication
router.use(authenticate);

router.get('/overview', getProgressOverview);
router.get('/skills', getSkillBreakdown);
router.get('/recommendations', getRecommendations);
router.get('/badges', getUserBadges);

export default router;
