const express = require('express');
const router = express.Router();
const {
  getPlacements, createPlacement, applyToPlacement, updateApplicantStatus
} = require('../controllers/placementController');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, getPlacements);
router.post('/', protect, requireRole('admin', 'placement'), createPlacement);
router.post('/:id/apply', protect, applyToPlacement);
router.patch('/:id/applicants/:studentId', protect, requireRole('admin', 'placement'), updateApplicantStatus);

module.exports = router;
