const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  mobile: { type: String },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'trainer', 'accountant', 'placement'], default: 'student' },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  completedLessons: [{ type: String }], // lesson ids within course.modules.lessons
  lessonCompletions: [{
    lessonId: String,
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    courseTitle: String,
    lessonTitle: String,
    completedAt: { type: Date, default: Date.now }
  }],
  points: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
