const express = require('express');
const router = express.Router();
const { getInterviewTracks, submitInterview, getMyInterviewResults } = require('../controllers/interviewController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getInterviewTracks);
router.post('/:trackId/submit', protect, submitInterview);
router.get('/results/mine', protect, getMyInterviewResults);

module.exports = router;
