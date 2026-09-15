const Course = require('../models/Course');
const User = require('../models/User');
const Certificate = require('../models/Certificate');

const isPaid = course => Number(course?.price || 0) > 0;
const hasPaidAccess = (user, course) => user?.role !== 'student' || (user?.paidCourseIds || []).some(id => String(id) === String(course._id));

const studentCourseView = (course) => {
  const obj = course.toObject ? course.toObject() : course;
  return {
    ...obj,
    modules: (obj.modules || []).filter(m => m.enabled !== false).map(m => ({
      ...m,
      lessons: m.lessons || []
    }))
  };
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    if (req.user?.role === 'student') return res.json(courses.map(studentCourseView));
    res.json(courses);
  } catch (err) { next(err); }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (req.user?.role === 'student' && isPaid(course) && !hasPaidAccess(req.user, course)) {
      return res.status(402).json({ message: 'Payment is required before accessing this course.' });
    }
    res.json(req.user?.role === 'student' ? studentCourseView(course) : course);
  } catch (err) { next(err); }
};

const createCourse = async (req, res, next) => {
  try { res.status(201).json(await Course.create(req.body)); } catch (err) { next(err); }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) { next(err); }
};

const updateModuleAccess = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    const enabledMap = req.body?.modules || {};
    course.modules.forEach(m => {
      if (Object.prototype.hasOwnProperty.call(enabledMap, m.moduleId)) m.enabled = Boolean(enabledMap[m.moduleId]);
    });
    await course.save();
    res.json(course);
  } catch (err) { next(err); }
};

const deleteCourse = async (req, res, next) => {
  try { await Course.findByIdAndDelete(req.params.id); res.json({ message: 'Course deleted' }); } catch (err) { next(err); }
};

const confirmCoursePayment = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!isPaid(course)) return res.status(400).json({ message: 'This course is free. No payment is required.' });
    const user = await User.findById(req.user._id);
    user.paidCourseIds = user.paidCourseIds || [];
    user.enrolledCourses = user.enrolledCourses || [];
    if (!user.paidCourseIds.some(id => String(id) === String(course._id))) user.paidCourseIds.push(course._id);
    if (!user.enrolledCourses.some(id => String(id) === String(course._id))) user.enrolledCourses.push(course._id);
    await user.save();
    res.json({ message: 'Payment confirmed and course unlocked.', enrolledCourses: user.enrolledCourses, paidCourseIds: user.paidCourseIds });
  } catch (err) { next(err); }
};

const enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (isPaid(course)) return res.status(402).json({ message: 'Payment is required before enrolling in this paid course.' });
    const user = await User.findById(req.user._id);
    if (!user.enrolledCourses.some(id => String(id) === String(course._id))) user.enrolledCourses.push(course._id);
    await user.save();
    res.json({ message: `Enrolled in ${course.title}`, enrolledCourses: user.enrolledCourses, paidCourseIds: user.paidCourseIds || [] });
  } catch (err) { next(err); }
};

const toggleLessonComplete = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (isPaid(course) && !hasPaidAccess(user, course)) return res.status(402).json({ message: 'Payment is required before accessing this course.' });
    const accessibleLesson = course.modules.some(m => m.enabled !== false && m.lessons.some(l => l.lessonId === lessonId));
    if (!accessibleLesson) return res.status(403).json({ message: 'This module has not been released by the administrator yet.' });
    const isDone = user.completedLessons.includes(lessonId);
    if (isDone) {
      user.completedLessons = user.completedLessons.filter(id => id !== lessonId);
      user.lessonCompletions = (user.lessonCompletions || []).filter(lc => lc.lessonId !== lessonId);
      user.points = Math.max(0, (user.points || 0) - 25);
    } else {
      user.completedLessons.push(lessonId);
      const lessonTitle = course.modules.flatMap(m => m.lessons).find(l => l.lessonId === lessonId)?.title || 'Lesson';
      user.lessonCompletions = user.lessonCompletions || [];
      user.lessonCompletions.push({ lessonId, courseId: course._id, courseTitle: course.title, lessonTitle, completedAt: new Date() });
      user.points = (user.points || 0) + 25;
    }
    await user.save();
    const allLessonIds = course.modules.filter(m => m.enabled !== false).flatMap(m => m.lessons.map(l => l.lessonId));
    const allDone = allLessonIds.length > 0 && allLessonIds.every(id => user.completedLessons.includes(id));
    let certificate = null;
    if (allDone) {
      certificate = await Certificate.findOne({ student: user._id, course: course._id });
      if (!certificate) certificate = await Certificate.create({ certificateId: 'LMS-CERT-' + Date.now(), student: user._id, course: course._id, studentName: user.name, courseName: course.title, issueDate: new Date().toISOString().split('T')[0], score: '100%', grade: 'A+ (Excellence)', instructor: course.instructor || 'Administrator' });
    }
    res.json({ completedLessons: user.completedLessons, lessonCompletions: user.lessonCompletions, points: user.points, certificateIssued: certificate });
  } catch (err) { next(err); }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, updateModuleAccess, deleteCourse, enrollInCourse, confirmCoursePayment, toggleLessonComplete };
