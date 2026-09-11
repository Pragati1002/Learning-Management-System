const express = require('express');
const router = express.Router();

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  toggleLessonComplete
} = require('../controllers/courseController');

const { protect, requireRole } = require('../middleware/auth');

router.get('/', getCourses);

router.get('/:id', protect, getCourseById);

router.post(
  '/',
  protect,
  requireRole('admin', 'trainer'),
  createCourse
);

router.put(
  '/:id',
  protect,
  requireRole('admin', 'trainer'),
  updateCourse
);

router.delete(
  '/:id',
  protect,
  requireRole('admin'),
  deleteCourse
);

router.post('/:id/enroll', protect, enrollInCourse);

router.post(
  '/:id/lessons/:lessonId/complete',
  protect,
  toggleLessonComplete
);

module.exports = router;