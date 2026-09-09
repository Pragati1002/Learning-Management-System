const Placement = require('../models/Placement');

const getPlacements = async (req, res, next) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.json(placements);
  } catch (err) { next(err); }
};

const createPlacement = async (req, res, next) => {
  try {
    const placement = await Placement.create(req.body);
    res.status(201).json(placement);
  } catch (err) { next(err); }
};

// @route POST /api/placements/:id/apply
const applyToPlacement = async (req, res, next) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement) return res.status(404).json({ message: 'Placement drive not found' });

    const alreadyApplied = placement.applicants.some(a => a.student.toString() === req.user._id.toString());
    if (alreadyApplied) return res.status(400).json({ message: 'You have already applied to this drive' });

    placement.applicants.push({ student: req.user._id, status: 'Applied' });
    await placement.save();
    res.json(placement);
  } catch (err) { next(err); }
};

// @route PATCH /api/placements/:id/applicants/:studentId  body: { status }
const updateApplicantStatus = async (req, res, next) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement) return res.status(404).json({ message: 'Placement drive not found' });

    const applicant = placement.applicants.find(a => a.student.toString() === req.params.studentId);
    if (!applicant) return res.status(404).json({ message: 'Applicant not found on this drive' });

    applicant.status = req.body.status;
    await placement.save();
    res.json(placement);
  } catch (err) { next(err); }
};

module.exports = { getPlacements, createPlacement, applyToPlacement, updateApplicantStatus };
