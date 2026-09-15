const express = require('express');
const router = express.Router();
const { register, login, getMe, getStudents } = require('../controllers/authController');
const { requireRole } = require('../middleware/auth');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/students', protect, requireRole('admin', 'trainer'), getStudents);

module.exports = router;
