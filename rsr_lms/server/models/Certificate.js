const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  studentName: String,
  courseName: String,
  issueDate: { type: String },
  score: String,
  grade: String,
  instructor: String,
  verified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
