const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, createQuiz, updateQuiz, assignQuiz, getQuizDashboard, deleteQuiz, submitQuiz, getMyAttempts } = require('../controllers/quizController');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, getQuizzes);
router.get('/attempts/mine', protect, getMyAttempts);
router.get('/:id/dashboard', protect, requireRole('admin'), getQuizDashboard);
router.get('/:id', protect, getQuizById);
router.post('/', protect, requireRole('admin'), createQuiz);
router.put('/:id', protect, requireRole('admin'), updateQuiz);
router.post('/:id/assign', protect, requireRole('admin'), assignQuiz);
router.post('/:id/submit', protect, submitQuiz);
router.delete('/:id', protect, requireRole('admin'), deleteQuiz);
module.exports = router;
