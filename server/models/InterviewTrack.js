const mongoose = require('mongoose');

const ivQuestionSchema = new mongoose.Schema({
  question: String
}, { _id: true });

const interviewTrackSchema = new mongoose.Schema({
  role: { type: String, required: true },
  interviewerName: { type: String, default: 'AI Interviewer' },
  questions: [ivQuestionSchema]
}, { timestamps: true });

module.exports = mongoose.model('InterviewTrack', interviewTrackSchema);
