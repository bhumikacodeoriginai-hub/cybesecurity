import { Router } from 'express';
import {
  getLearningPaths,
  getLearningPath,
  getCourses,
  getCourse,
  enrollInCourse,
  getLesson,
  completeLesson,
} from '../controllers/courses.controller';
import { authenticate, optionalAuth } from '../middleware/auth';

const router = Router();

// Learning Paths (public)
router.get('/learning-paths', getLearningPaths);
router.get('/learning-paths/:id', getLearningPath);

// Courses (public listing, auth for enrollment)
router.get('/courses', getCourses);
router.get('/courses/:id', optionalAuth, getCourse);
router.post('/courses/:id/enroll', authenticate, enrollInCourse);

// Lessons
router.get('/lessons/:id', optionalAuth, getLesson);
router.post('/lessons/:id/complete', authenticate, completeLesson);

export default router;
