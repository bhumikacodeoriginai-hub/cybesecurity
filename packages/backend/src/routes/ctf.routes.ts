import { Router } from 'express';
import {
  getChallenges,
  getChallenge,
  submitFlag,
  getHint,
  getLeaderboard,
  getUserCTFStats,
  getCategories,
} from '../controllers/ctf.controller';
import { authenticate, optionalAuth } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/challenges', optionalAuth, getChallenges);
router.get('/challenges/categories', getCategories);
router.get('/challenges/:id', optionalAuth, getChallenge);
router.get('/leaderboard', optionalAuth, getLeaderboard);

// Auth-required routes
router.post('/challenges/:id/submit', authenticate, submitFlag);
router.post('/challenges/:id/hint', authenticate, getHint);
router.get('/stats', authenticate, getUserCTFStats);

export default router;
