const mongoose = require('mongoose');

const mtQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number
}, { _id: true });

const mtSectionSchema = new mongoose.Schema({
  title: String,
  durationMinutes: Number,
  questions: [mtQuestionSchema]
}, { _id: true });

const mockTestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  totalMarks: Number,
  sections: [mtSectionSchema]
}, { timestamps: true });

module.exports = mongoose.model('MockTest', mockTestSchema);
