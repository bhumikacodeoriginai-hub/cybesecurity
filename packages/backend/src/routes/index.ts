import { Router } from 'express';
import authRoutes from './auth.routes';
import coursesRoutes from './courses.routes';
import progressRoutes from './progress.routes';
import searchRoutes from './search.routes';
import labsRoutes from './labs.routes';
import labOrchestrator from '../services/lab-orchestrator';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  const labStats = labOrchestrator.getStats();
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      labs: labStats,
    },
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/', coursesRoutes);
router.use('/progress', progressRoutes);
router.use('/search', searchRoutes);
router.use('/labs', labsRoutes);

export default router;
