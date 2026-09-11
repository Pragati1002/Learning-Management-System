const Course = require('../models/Course');
const User = require('../models/User');
const Certificate = require('../models/Certificate');

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) { next(err); }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) { next(err); }
};

const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) { next(err); }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) { next(err); }
};

const deleteCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) { next(err); }
};

// @route POST /api/courses/:id/enroll
const enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const user = await User.findById(req.user._id);
    if (!user.enrolledCourses.includes(course._id)) {
      user.enrolledCourses.push(course._id);
      await user.save();
    }
    res.json({ message: `Enrolled in ${course.title}`, enrolledCourses: user.enrolledCourses });
  } catch (err) { next(err); }
};

// @route POST /api/courses/:id/lessons/:lessonId/complete
const toggleLessonComplete = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.params.id);

    const isDone = user.completedLessons.includes(lessonId);
    if (isDone) {
      user.completedLessons = user.completedLessons.filter(id => id !== lessonId);
      user.lessonCompletions = (user.lessonCompletions || []).filter(lc => lc.lessonId !== lessonId);
      user.points = Math.max(0, (user.points || 0) - 25);
    } else {
      user.completedLessons.push(lessonId);
      const lessonTitle = course?.modules
        ?.flatMap(m => m.lessons)
        ?.find(l => l.lessonId === lessonId)?.title || 'Lesson';
      user.lessonCompletions = user.lessonCompletions || [];
      user.lessonCompletions.push({
        lessonId,
        courseId: course?._id,
        courseTitle: course?.title || '',
        lessonTitle,
        completedAt: new Date()
      });
      user.points = (user.points || 0) + 25;
    }
    await user.save();

    // Auto-issue certificate if every lesson in the course is now complete
    const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.lessonId));
    const allDone = allLessonIds.every(id => user.completedLessons.includes(id));

    let certificate = null;
    if (allDone) {
      certificate = await Certificate.findOne({ student: user._id, course: course._id });
      if (!certificate) {
        certificate = await Certificate.create({
          certificateId: 'LMS-CERT-' + Date.now(),
          student: user._id,
          course: course._id,
          studentName: user.name,
          courseName: course.title,
          issueDate: new Date().toISOString().split('T')[0],
          score: '100%',
          grade: 'A+ (Excellence)',
          instructor: course.instructor || 'Administrator'
        });
      }
    }

    res.json({
      completedLessons: user.completedLessons,
      lessonCompletions: user.lessonCompletions,
      points: user.points,
      certificateIssued: certificate
    });
  } catch (err) { next(err); }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse, enrollInCourse, toggleLessonComplete };
