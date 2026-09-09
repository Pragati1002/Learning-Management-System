const express = require('express');
const router = express.Router();
const { getQuizzes, createQuiz, submitQuiz, getMyAttempts } = require('../controllers/quizController');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, getQuizzes);
router.post('/', protect, requireRole('admin', 'trainer'), createQuiz);
router.post('/:id/submit', protect, submitQuiz);
router.get('/attempts/mine', protect, getMyAttempts);

module.exports = router;
