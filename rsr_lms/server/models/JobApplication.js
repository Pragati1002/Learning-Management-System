const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  jobTitle: String,
  company: String,
  location: String,
  status: { type: String, enum: ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Rejected'], default: 'Applied' }
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
