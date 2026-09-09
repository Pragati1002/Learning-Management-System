const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lessonId: { type: String, required: true }, // stable id used across enrollments/progress
  title: String,
  duration: String,
  videoUrl: String,
  notes: String,
  audioUrl: String,
  resources: [String]
}, { _id: false });

const moduleSchema = new mongoose.Schema({
  moduleId: { type: String, required: true },
  title: String,
  lessons: [lessonSchema]
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  description: String,
  duration: String,
  level: String,
  instructor: String,
  instructorId: String,
  thumbnail: String,
  price: { type: Number, default: 0 },
  originalPrice: { type: Number, default: 0 },
  enrolledCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  modules: [moduleSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
