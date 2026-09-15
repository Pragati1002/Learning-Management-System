const express = require('express');
const router = express.Router();
const { getBatches, createBatch, deleteBatch, addStudentToBatch, removeStudentFromBatch, markAttendance } = require('../controllers/batchController');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, requireRole('admin', 'trainer'), getBatches);
router.post('/', protect, requireRole('admin'), createBatch);
router.post('/:id/students', protect, requireRole('admin', 'trainer'), addStudentToBatch);
router.delete('/:id/students/:studentId', protect, requireRole('admin', 'trainer'), removeStudentFromBatch);
router.post('/:id/attendance', protect, requireRole('admin', 'trainer'), markAttendance);
router.delete('/:id', protect, requireRole('admin'), deleteBatch);

module.exports = router;
