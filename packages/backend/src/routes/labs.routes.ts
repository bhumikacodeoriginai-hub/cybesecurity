import { Router } from 'express';
import {
  getLabs,
  getLab,
  startLab,
  stopLab,
  resetLab,
  getLabStatus,
  validateLab,
  getActiveLabs,
  getLabHistory,
} from '../controllers/labs.controller';
import { authenticate, optionalAuth } from '../middleware/auth';

const router = Router();

// Public lab listing
router.get('/', optionalAuth, getLabs);
router.get('/active', authenticate, getActiveLabs);
router.get('/history', authenticate, getLabHistory);

// Single lab detail
router.get('/:id', optionalAuth, getLab);

// Lab lifecycle (requires auth)
router.post('/:id/start', authenticate, startLab);
router.post('/:id/stop', authenticate, stopLab);
router.post('/:id/reset', authenticate, resetLab);
router.get('/:id/status', authenticate, getLabStatus);
router.post('/:id/validate', authenticate, validateLab);

export default router;
