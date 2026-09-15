const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  options: { type: [String], required: true, validate: v => Array.isArray(v) && v.length >= 2 },
  correctAnswer: { type: Number, required: true, min: 0 }
}, { _id: true });

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  courseTitle: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  institution: { type: String, default: '', trim: true },
  durationMinutes: { type: Number, default: 10, min: 1 },
  passingScore: { type: Number, default: 60, min: 0, max: 100 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  // A quiz is student-visible only when that student's id is present here.
  assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
