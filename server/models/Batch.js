const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  trainer: String,
  startDate: String,
  endDate: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  attendance: [{
    date: String,
    presentStudentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);
