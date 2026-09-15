const express = require('express');
const router = express.Router();
const {
  getJobs, createJob, applyToJob, getMyApplications, updateApplicationStatus
} = require('../controllers/jobController');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, getJobs);
router.post('/', protect, requireRole('admin', 'placement'), createJob);
router.post('/:id/apply', protect, applyToJob);
router.get('/applications/mine', protect, getMyApplications);
router.patch('/applications/:id/status', protect, requireRole('admin', 'placement'), updateApplicationStatus);

module.exports = router;
