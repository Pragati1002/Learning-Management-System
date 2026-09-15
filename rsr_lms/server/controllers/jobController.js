const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication');

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) { next(err); }
};

const createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) { next(err); }
};

// @route POST /api/jobs/:id/apply
const applyToJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const existing = await JobApplication.findOne({ student: req.user._id, job: job._id });
    if (existing) return res.status(400).json({ message: 'You have already applied to this job' });

    const application = await JobApplication.create({
      student: req.user._id,
      job: job._id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      status: 'Applied'
    });

    res.status(201).json(application);
  } catch (err) { next(err); }
};

const getMyApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) { next(err); }
};

// @route PATCH /api/jobs/applications/:id/status  (admin/placement staff only)
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await JobApplication.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (err) { next(err); }
};

module.exports = { getJobs, createJob, applyToJob, getMyApplications, updateApplicationStatus };
