const mongoose = require('mongoose');
const quizAnswerSchema = new mongoose.Schema({ questionId: String, answer: Number }, { _id: false });
const schema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  scorePercentage: Number,
  correctCount: Number,
  totalCount: Number,
  answers: [quizAnswerSchema]
}, { timestamps: true });
module.exports = mongoose.model('QuizAttempt', schema);
