const mongoose = require('mongoose');

const ivQuestionSchema = new mongoose.Schema({
  question: String
}, { _id: true });

const interviewTrackSchema = new mongoose.Schema({
  role: { type: String, required: true },
  interviewerName: { type: String, default: 'AI Interviewer' },
  durationMinutes: { type: Number, default: 20 },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  questions: [ivQuestionSchema]
}, { timestamps: true });

module.exports = mongoose.model('InterviewTrack', interviewTrackSchema);
