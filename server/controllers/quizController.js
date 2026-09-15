const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');

const publicQuiz = q => {
  const obj = q.toObject ? q.toObject() : q;
  return { ...obj, questions: (obj.questions || []).map(({ correctAnswer, ...rest }) => rest) };
};

const studentCanAccessQuiz = (quiz, user) => {
  // Course enrollment is the ONLY student access boundary.
  // Assignment never grants access to a quiz from another course.
  if (quiz.status === 'draft') return false;
  if (!quiz.courseId) return false;
  return (user.enrolledCourses || []).some(
    courseId => String(courseId) === String(quiz.courseId)
  );
};

const getQuizzes = async (req, res, next) => {
  try {
    let filter;
    if (req.user.role === 'admin' || req.user.role === 'trainer') {
      filter = {};
    } else {
      const enrolledIds = (req.user.enrolledCourses || []).map(id => String(id));
      // STRICT RULE: a student sees quizzes only when the quiz has a courseId
      // matching one of the student's enrolled course IDs. No title matching,
      // legacy fallback, or assignedStudents override is allowed.
      filter = enrolledIds.length ? {
        $and: [
          { $or: [{ status: 'published' }, { status: { $exists: false } }, { status: null }] },
          { courseId: { $in: enrolledIds } }
        ]
      } : { _id: { $exists: false } };
    }
    const quizzes = await Quiz.find(filter).sort({ createdAt: -1 });
    res.json(req.user.role === 'admin' || req.user.role === 'trainer' ? quizzes : quizzes.map(publicQuiz));
  } catch (e) { next(e); }
};

const createQuiz = async (req, res, next) => {
  try {
    const payload = { ...req.body, assignedStudents: req.body.assignedStudents || [] };
    res.status(201).json(await Quiz.create(payload));
  } catch (e) { next(e); }
};

const updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (e) { next(e); }
};

const assignQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    const ids = Array.isArray(req.body.studentIds) ? req.body.studentIds : [];
    const students = await User.find({ _id: { $in: ids }, role: 'student' }).select('_id');
    quiz.assignedStudents = students.map(s => s._id);
    await quiz.save();
    res.json(quiz);
  } catch (e) { next(e); }
};

const getQuizDashboard = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('assignedStudents', 'name email');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    const attempts = await QuizAttempt.find({ quiz: quiz._id }).populate('student', 'name email').sort({ createdAt: -1 });
    const scores = attempts.map(a => Number(a.scorePercentage || 0));
    const passed = attempts.filter(a => Number(a.scorePercentage || 0) >= quiz.passingScore).length;
    res.json({
      quiz,
      assignedStudents: quiz.assignedStudents || [],
      attempts,
      stats: {
        assigned: quiz.assignedStudents?.length || 0,
        attemptedStudents: new Set(attempts.map(a => String(a.student?._id || a.student))).size,
        notAttempted: Math.max(0, (quiz.assignedStudents?.length || 0) - new Set(attempts.map(a => String(a.student?._id || a.student))).size),
        attempts: attempts.length,
        average: scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0,
        highest: scores.length ? Math.max(...scores) : 0,
        lowest: scores.length ? Math.min(...scores) : 0,
        passed,
        failed: Math.max(0, attempts.length - passed)
      }
    });
  } catch (e) { next(e); }
};

const deleteQuiz = async (req, res, next) => {
  try { const q = await Quiz.findByIdAndDelete(req.params.id); if (!q) return res.status(404).json({ message: 'Quiz not found' }); res.json({ message: 'Quiz deleted' }); } catch (e) { next(e); }
};

const submitQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    if (req.user.role === 'student') {
      const enrolledCourses = (req.user.enrolledCourses || []).length
        ? await require('../models/Course').find({ _id: { $in: req.user.enrolledCourses } }).select('title')
        : [];
      if (!studentCanAccessQuiz(quiz, req.user)) {
        return res.status(403).json({ message: 'You are not enrolled or assigned to this quiz.' });
      }
    }
    const answers = req.body.answers || {};
    let correctCount = 0;
    quiz.questions.forEach(q => { if (Number(answers[String(q._id)]) === Number(q.correctAnswer)) correctCount++; });
    const totalCount = quiz.questions.length;
    const scorePercentage = totalCount ? Math.round(correctCount / totalCount * 100) : 0;
    const attempt = await QuizAttempt.create({ student: req.user._id, quiz: quiz._id, scorePercentage, correctCount, totalCount, answers: Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer: Number(answer) })) });
    res.json({ correctCount, totalCount, scorePercentage, attemptId: attempt._id, passed: scorePercentage >= quiz.passingScore });
  } catch (e) { next(e); }
};

const getMyAttempts = async (req,res,next)=>{try{res.json(await QuizAttempt.find({student:req.user._id}).populate('quiz','title'));}catch(e){next(e)}};
module.exports={getQuizzes,createQuiz,updateQuiz,assignQuiz,getQuizDashboard,deleteQuiz,submitQuiz,getMyAttempts};
