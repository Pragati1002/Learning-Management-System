const mongoose = require('mongoose');

const interviewResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  track: { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewTrack', required: true },
  role: String,
  responses: [{ questionId: String, answer: String }],
  score: Number,
  strengths: [String],
  improvements: [String],
  durationSeconds: Number
}, { timestamps: true });

module.exports = mongoose.model('InterviewResult', interviewResultSchema);
