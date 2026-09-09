const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: String,
  location: String,
  type: String,
  skills: [String]
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
