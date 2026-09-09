const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  author: String,
  content: String,
  createdAt: { type: String }
}, { _id: true });

const discussionSchema = new mongoose.Schema({
  author: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  avatar: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: String,
  content: String,
  upvotes: { type: Number, default: 0 },
  tags: [String],
  replies: [replySchema]
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);
