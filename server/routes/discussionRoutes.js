const express = require('express');
const router = express.Router();
const { getDiscussions, createDiscussion, addReply } = require('../controllers/discussionController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getDiscussions);
router.post('/', protect, createDiscussion);
router.post('/:id/reply', protect, addReply);

module.exports = router;
