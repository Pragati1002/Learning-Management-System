const Discussion = require('../models/Discussion');

const getDiscussions = async (req, res, next) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) { next(err); }
};

const createDiscussion = async (req, res, next) => {
  try {
    const discussion = await Discussion.create({
      ...req.body,
      author: req.user.name,
      authorId: req.user._id
    });
    res.status(201).json(discussion);
  } catch (err) { next(err); }
};

// @route POST /api/discussions/:id/reply
const addReply = async (req, res, next) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

    discussion.replies.push({
      author: req.user.name,
      content: req.body.content,
      createdAt: new Date().toISOString()
    });
    await discussion.save();
    res.json(discussion);
  } catch (err) { next(err); }
};

module.exports = { getDiscussions, createDiscussion, addReply };
