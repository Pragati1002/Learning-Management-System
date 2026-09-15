const express = require('express');
const router = express.Router();
const {
  getLiveClasses,
  createLiveClass,
  updateLiveClass,
  deleteLiveClass
} = require('../controllers/liveClassController');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, getLiveClasses);
router.post('/', protect, requireRole('admin', 'trainer'), createLiveClass);
router.put('/:id', protect, requireRole('admin', 'trainer'), updateLiveClass);
router.delete('/:id', protect, requireRole('admin', 'trainer'), deleteLiveClass);

module.exports = router;
