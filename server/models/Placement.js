const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Applied', 'Shortlisted', 'Interview', 'Offer Accepted', 'Placed', 'Rejected'], default: 'Applied' }
}, { _id: false });

const placementSchema = new mongoose.Schema({
  company: { type: String, required: true },
  logo: String,
  role: String,
  location: String,
  package: String,
  openings: Number,
  eligibility: String,
  deadline: String,
  applicants: [applicantSchema]
}, { timestamps: true });

module.exports = mongoose.model('Placement', placementSchema);
