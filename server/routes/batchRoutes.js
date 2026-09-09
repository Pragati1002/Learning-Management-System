const express = require('express');
const router = express.Router();
const { getBatches, createBatch, markAttendance } = require('../controllers/batchController');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, requireRole('admin', 'trainer'), getBatches);
router.post('/', protect, requireRole('admin'), createBatch);
router.post('/:id/attendance', protect, requireRole('admin', 'trainer'), markAttendance);

module.exports = router;
