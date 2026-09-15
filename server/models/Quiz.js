const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], default: [] },
  correctAnswer: { type: Number, required: true }
}, { _id: true });

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  courseTitle: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  institution: { type: String, default: '' },
  durationMinutes: { type: Number, default: 10 },
  passingScore: { type: Number, default: 60 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
