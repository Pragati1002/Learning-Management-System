const express = require('express');
const router = express.Router();
const { getAssignments, createAssignment } = require('../controllers/assignmentController');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, getAssignments);
router.post('/', protect, requireRole('admin', 'trainer'), createAssignment);

module.exports = router;
