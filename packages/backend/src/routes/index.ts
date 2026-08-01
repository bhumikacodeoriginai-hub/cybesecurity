import { Router } from 'express';
import authRoutes from './auth.routes';
import coursesRoutes from './courses.routes';
import progressRoutes from './progress.routes';
import searchRoutes from './search.routes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/', coursesRoutes);
router.use('/progress', progressRoutes);
router.use('/search', searchRoutes);

export default router;
