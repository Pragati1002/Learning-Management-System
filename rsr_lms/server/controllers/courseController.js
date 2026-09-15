const Course = require('../models/Course');
const User = require('../models/User');
const Certificate = require('../models/Certificate');

const isStaff = user => ['admin', 'trainer'].includes(user?.role);
const isEnrolled = (user, course) => (user?.enrolledCourses || []).some(id => String(id) === String(course._id));
const hasPaidAccess = (user, course) => Number(course?.price || 0) <= 0 || (user?.paidCoursePayments || []).some(p => String(p.course) === String(course._id));

const sanitizeStudentCourse = (course, user) => {
  const obj = course.toObject();
  const access = isEnrolled(user, course) && hasPaidAccess(user, course);
  obj.modules = (obj.modules || [])
    .filter(m => m.isReleased !== false)
    .map(m => access ? m : { ...m, lessons: [] });
  return obj;
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    if (isStaff(req.user)) return res.json(courses);
    res.json(courses.map(c => sanitizeStudentCourse(c, req.user)));
  } catch (err) { next(err); }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!isStaff(req.user) && (!isEnrolled(req.user, course) || !hasPaidAccess(req.user, course))) {
      return res.status(403).json({ message: Number(course.price || 0) > 0 ? 'Payment is required before accessing this paid course.' : 'You are not enrolled in this course.' });
    }
    const obj = course.toObject();
    if (!isStaff(req.user)) obj.modules = (obj.modules || []).filter(m => m.isReleased !== false);
    res.json(obj);
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

const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) { next(err); }
};

const updateModuleAccess = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    const { moduleId, isReleased } = req.body;
    const target = course.modules.find(m => String(m.moduleId) === String(moduleId));
    if (!target) return res.status(404).json({ message: 'Module not found' });
    target.isReleased = Boolean(isReleased);
    await course.save();
    res.json(course);
  } catch (err) { next(err); }
};

const confirmCoursePayment = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (Number(course.price || 0) <= 0) return res.status(400).json({ message: 'This course is free and does not require payment.' });

    const user = await User.findById(req.user._id);
    user.paidCoursePayments = user.paidCoursePayments || [];
    const alreadyPaid = user.paidCoursePayments.some(p => String(p.course) === String(course._id));
    if (!alreadyPaid) {
      user.paidCoursePayments.push({
        course: course._id,
        amount: Number(course.price),
        paymentRef: String(req.body.paymentRef || `DEMO-${Date.now()}`),
        paidAt: new Date()
      });
    }
    if (!user.enrolledCourses.some(id => String(id) === String(course._id))) user.enrolledCourses.push(course._id);
    await user.save();
    res.json({ message: 'Payment confirmed and course unlocked.', enrolledCourses: user.enrolledCourses, paidCoursePayments: user.paidCoursePayments });
  } catch (err) { next(err); }
};

const enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (Number(course.price || 0) > 0) {
      return res.status(402).json({ message: 'Paid courses cannot be enrolled directly. Complete payment first.', requiresPayment: true, courseId: String(course._id) });
    }
    const user = await User.findById(req.user._id);
    if (!user.enrolledCourses.some(id => String(id) === String(course._id))) user.enrolledCourses.push(course._id);
    await user.save();
    res.json({ message: `Enrolled in ${course.title}`, enrolledCourses: user.enrolledCourses, paidCoursePayments: user.paidCoursePayments || [] });
  } catch (err) { next(err); }
};

const toggleLessonComplete = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!isStaff(req.user) && (!isEnrolled(user, course) || !hasPaidAccess(user, course))) return res.status(403).json({ message: 'You do not have access to this course.' });
    const targetModule = course.modules.find(m => m.lessons.some(l => String(l.lessonId) === String(lessonId)));
    if (!isStaff(req.user) && targetModule?.isReleased === false) return res.status(403).json({ message: 'This module has not been released by the administrator yet.' });

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

    const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.lessonId));
    const allDone = allLessonIds.length > 0 && allLessonIds.every(id => user.completedLessons.includes(id));
    let certificate = null;
    if (allDone) {
      certificate = await Certificate.findOne({ student: user._id, course: course._id });
      if (!certificate) certificate = await Certificate.create({
        certificateId: 'LMS-CERT-' + Date.now(), student: user._id, course: course._id,
        studentName: user.name, courseName: course.title, issueDate: new Date().toISOString().split('T')[0],
        score: '100%', grade: 'A+ (Excellence)', instructor: course.instructor || 'Administrator'
      });
    }
    res.json({ completedLessons: user.completedLessons, lessonCompletions: user.lessonCompletions, points: user.points, certificateIssued: certificate });
  } catch (err) { next(err); }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse, enrollInCourse, confirmCoursePayment, updateModuleAccess, toggleLessonComplete };
