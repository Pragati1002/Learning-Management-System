const express = require('express');
const router = express.Router();
const { getMockTests, getMockTestById, submitMockTest } = require('../controllers/mockTestController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMockTests);
router.get('/:id', protect, getMockTestById);
router.post('/:id/submit', protect, submitMockTest);

module.exports = router;
