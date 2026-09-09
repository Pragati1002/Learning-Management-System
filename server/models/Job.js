const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: String,
  location: String,
  type: String,
  skills: [String],
  logo: String,
  postedTime: String
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
