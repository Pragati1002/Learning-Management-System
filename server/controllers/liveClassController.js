const mongoose = require('mongoose');
const LiveClass = require('../models/LiveClass');
const Course = require('../models/Course');

const formatLiveClass = (liveClass) => {
  const item = liveClass.toObject ? liveClass.toObject() : liveClass;
  return {
    ...item,
    id: String(item._id),
    courseId: String(item.courseId?._id || item.courseId),
    courseTitle: item.courseId?.title || item.courseTitle || 'Course',
    time: `${item.startTime} - ${item.endTime}`
  };
};

const getLiveClasses = async (req, res, next) => {
  try {
    const filter = {};

    // Students can only see live classes belonging to courses they are enrolled in.
    if (req.user.role === 'student') {
      filter.courseId = { $in: req.user.enrolledCourses || [] };
    }

    const liveClasses = await LiveClass.find(filter)
      .populate('courseId', 'title')
      .sort({ date: 1, startTime: 1, createdAt: -1 });

    res.json(liveClasses.map(formatLiveClass));
  } catch (err) {
    next(err);
  }
};

const createLiveClass = async (req, res, next) => {
  try {
    const {
      courseId,
      title,
      instructor,
      date,
      startTime,
      endTime,
      platform,
      meetingLink,
      description,
      status
    } = req.body;

    if (!courseId || !title || !date || !startTime || !endTime || !meetingLink) {
      return res.status(400).json({
        message: 'Course, title, date, start time, end time and meeting link are required'
      });
    }

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: 'Invalid course selected' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Selected course was not found' });
    }

    const liveClass = await LiveClass.create({
      courseId: course._id,
      title: title.trim(),
      instructor: instructor?.trim() || req.user.name,
      date,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      platform: platform || 'Google Meet',
      meetingLink: meetingLink.trim(),
      description: description?.trim() || '',
      status: status || 'Scheduled',
      createdBy: req.user._id
    });

    const populated = await LiveClass.findById(liveClass._id).populate('courseId', 'title');
    res.status(201).json(formatLiveClass(populated));
  } catch (err) {
    next(err);
  }
};

const updateLiveClass = async (req, res, next) => {
  try {
    const liveClass = await LiveClass.findById(req.params.id);
    if (!liveClass) return res.status(404).json({ message: 'Live class not found' });

    const allowedFields = [
      'courseId', 'title', 'instructor', 'date', 'startTime', 'endTime',
      'platform', 'meetingLink', 'description', 'status'
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) liveClass[field] = req.body[field];
    }

    if (liveClass.courseId) {
      const course = await Course.findById(liveClass.courseId);
      if (!course) return res.status(404).json({ message: 'Selected course was not found' });
    }

    await liveClass.save();

    const updated = await LiveClass.findById(liveClass._id).populate('courseId', 'title');
    res.json(formatLiveClass(updated));
  } catch (err) {
    next(err);
  }
};

const deleteLiveClass = async (req, res, next) => {
  try {
    const liveClass = await LiveClass.findByIdAndDelete(req.params.id);
    if (!liveClass) return res.status(404).json({ message: 'Live class not found' });
    res.json({ message: 'Live class deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getLiveClasses,
  createLiveClass,
  updateLiveClass,
  deleteLiveClass
};
