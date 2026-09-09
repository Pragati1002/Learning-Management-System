const Batch = require('../models/Batch');

const getBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find().populate('students', 'name email');
    res.json(batches);
  } catch (err) { next(err); }
};

const createBatch = async (req, res, next) => {
  try {
    const batch = await Batch.create(req.body);
    res.status(201).json(batch);
  } catch (err) { next(err); }
};

// @route POST /api/batches/:id/attendance  body: { date, presentStudentIds: [] }
const markAttendance = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });

    batch.attendance.push({ date: req.body.date, presentStudentIds: req.body.presentStudentIds });
    await batch.save();
    res.json(batch);
  } catch (err) { next(err); }
};

module.exports = { getBatches, createBatch, markAttendance };
