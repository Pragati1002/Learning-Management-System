const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number // index into options
}, { _id: true });

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseTitle: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  durationMinutes: { type: Number, default: 10 },
  passingScore: { type: Number, default: 60 },
  questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
