const Batch = require('../models/Batch');
const User = require('../models/User');

const getBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find().populate('students', 'name email');
    res.json(batches);
  } catch (err) { next(err); }
};

const createBatch = async (req, res, next) => {
  try {
    const batch = await Batch.create(req.body);
    const populated = await Batch.findById(batch._id).populate('students', 'name email');
    res.status(201).json(populated);
  } catch (err) { next(err); }
};

const deleteBatch = async (req, res, next) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    res.json({ message: 'Batch deleted' });
  } catch (err) { next(err); }
};

const addStudentToBatch = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    const student = await User.findOne({ name: req.body.studentName, role: 'student' });
    if (!student) return res.status(404).json({ message: 'Student not found. The student must register first.' });
    if (!batch.students.some(id => id.toString() === student._id.toString())) {
      batch.students.push(student._id);
      await batch.save();
    }
    res.json(await Batch.findById(batch._id).populate('students', 'name email'));
  } catch (err) { next(err); }
};

const removeStudentFromBatch = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    batch.students = batch.students.filter(id => id.toString() !== String(req.params.studentId));
    await batch.save();
    res.json(await Batch.findById(batch._id).populate('students', 'name email'));
  } catch (err) { next(err); }
};

// @route POST /api/batches/:id/attendance  body: { date, presentStudentIds: [] }
const markAttendance = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    const date = req.body.date;
    const record = { date, presentStudentIds: req.body.presentStudentIds || [] };
    const index = batch.attendance.findIndex(a => a.date === date);
    if (index >= 0) batch.attendance[index] = record;
    else batch.attendance.push(record);
    await batch.save();
    res.json(await Batch.findById(batch._id).populate('students', 'name email'));
  } catch (err) { next(err); }
};

module.exports = { getBatches, createBatch, deleteBatch, addStudentToBatch, removeStudentFromBatch, markAttendance };
