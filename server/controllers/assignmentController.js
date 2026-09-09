const Assignment = require('../models/Assignment');

const getAssignments = async (req, res, next) => {
  try {
    const filter = req.query.courseId ? { courseId: req.query.courseId } : {};
    const assignments = await Assignment.find(filter);
    res.json(assignments);
  } catch (err) { next(err); }
};

const createAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (err) { next(err); }
};

module.exports = { getAssignments, createAssignment };
