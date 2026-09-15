const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');

const isAdmin = req => req.user?.role === 'admin';
const publicQuiz = quiz => {
  const obj = quiz.toObject ? quiz.toObject() : quiz;
  return {
    id: String(obj._id || obj.id), title: obj.title, courseId: obj.courseId, courseTitle: obj.courseTitle,
    institution: obj.institution || '', durationMinutes: obj.durationMinutes, passingScore: obj.passingScore,
    status: obj.status, questions: (obj.questions || []).map(q => ({ id: String(q._id || q.id), question: q.question, options: q.options || [] }))
  };
};
const adminQuiz = quiz => {
  const obj = quiz.toObject ? quiz.toObject() : quiz;
  return {
    ...obj, id: String(obj._id || obj.id),
    assignedStudents: (obj.assignedStudents || []).map(s => typeof s === 'object' ? { id: String(s._id || s.id), name: s.name, email: s.email } : String(s))
  };
};

const getQuizzes = async (req, res, next) => {
  try {
    if (isAdmin(req)) {
      const quizzes = await Quiz.find().populate('assignedStudents', 'name email').sort({ createdAt: -1 });
      return res.json(quizzes.map(adminQuiz));
    }
    const quizzes = await Quiz.find({ status: 'published', assignedStudents: req.user._id }).sort({ createdAt: -1 });
    res.json(quizzes.map(publicQuiz));
  } catch (e) { next(e); }
};

const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('assignedStudents', 'name email');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    if (!isAdmin(req) && (quiz.status !== 'published' || !quiz.assignedStudents.some(s => String(s._id || s) === String(req.user._id)))) {
      return res.status(403).json({ message: 'This quiz is not assigned to your account.' });
    }
    res.json(isAdmin(req) ? adminQuiz(quiz) : publicQuiz(quiz));
  } catch (e) { next(e); }
};

const validateQuestions = questions => {
  if (!Array.isArray(questions) || !questions.length) throw Object.assign(new Error('Add at least one question.'), { status: 400 });
  const clean = questions.map(q => ({
    question: String(q.question || '').trim(),
    options: Array.isArray(q.options) ? q.options.map(x => String(x).trim()).filter(Boolean) : [],
    correctAnswer: Number(q.correctAnswer)
  }));
  if (clean.some(q => !q.question || q.options.length < 2 || !Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
    throw Object.assign(new Error('Every question must have valid text, at least two options and a valid correct answer.'), { status: 400 });
  }
  return clean;
};

const createQuiz = async (req, res, next) => {
  try {
    const { title, courseId, courseTitle, institution, durationMinutes, passingScore, status, questions, assignedStudents } = req.body;
    if (!String(title || '').trim()) return res.status(400).json({ message: 'Quiz title is required.' });
    const cleanQuestions = validateQuestions(questions);
    const ids = Array.isArray(assignedStudents) ? assignedStudents : [];
    const validStudents = await User.find({ _id: { $in: ids }, role: 'student' }).select('_id');
    const quiz = await Quiz.create({
      title: String(title).trim(), courseId: courseId || undefined, courseTitle: courseTitle || '', institution: institution || '',
      durationMinutes: Number(durationMinutes) || 15, passingScore: Number(passingScore) || 70,
      status: status === 'draft' ? 'draft' : 'published', questions: cleanQuestions,
      assignedStudents: validStudents.map(s => s._id)
    });
    res.status(201).json(adminQuiz(quiz));
  } catch (e) { next(e); }
};

const updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
    const { title, courseId, courseTitle, institution, durationMinutes, passingScore, status, questions } = req.body;
    if (title !== undefined) { if (!String(title).trim()) return res.status(400).json({ message: 'Quiz title is required.' }); quiz.title = String(title).trim(); }
    if (courseId !== undefined) quiz.courseId = courseId || undefined;
    if (courseTitle !== undefined) quiz.courseTitle = courseTitle;
    if (institution !== undefined) quiz.institution = institution;
    if (durationMinutes !== undefined) quiz.durationMinutes = Number(durationMinutes) || 15;
    if (passingScore !== undefined) quiz.passingScore = Number(passingScore) || 70;
    if (status !== undefined) quiz.status = status === 'draft' ? 'draft' : 'published';
    if (Array.isArray(questions)) quiz.questions = validateQuestions(questions).map((q, i) => ({ ...q, _id: req.body.questions[i]?.id && /^[a-f\d]{24}$/i.test(String(req.body.questions[i].id)) ? req.body.questions[i].id : undefined }));
    await quiz.save();
    await quiz.populate('assignedStudents', 'name email');
    res.json(adminQuiz(quiz));
  } catch (e) { next(e); }
};

const assignQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
    const ids = Array.isArray(req.body.studentIds) ? req.body.studentIds : [];
    const students = await User.find({ _id: { $in: ids }, role: 'student' }).select('_id');
    quiz.assignedStudents = students.map(s => s._id);
    await quiz.save(); await quiz.populate('assignedStudents', 'name email');
    res.json(adminQuiz(quiz));
  } catch (e) { next(e); }
};

const getQuizDashboard = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('assignedStudents', 'name email');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
    const attempts = await QuizAttempt.find({ quiz: quiz._id }).populate('student', 'name email').sort({ submittedAt: -1 });
    const attemptedIds = new Set(attempts.map(a => String(a.student?._id || a.student)));
    const total = attempts.length;
    const avg = total ? Math.round(attempts.reduce((s, a) => s + Number(a.scorePercentage || 0), 0) / total) : 0;
    const scores = attempts.map(a => Number(a.scorePercentage || 0));
    const passed = attempts.filter(a => Number(a.scorePercentage || 0) >= quiz.passingScore).length;
    res.json({
      quiz: adminQuiz(quiz),
      stats: { assigned: quiz.assignedStudents.length, attempted: attemptedIds.size, notAttempted: Math.max(0, quiz.assignedStudents.length - attemptedIds.size), attempts: total, average: avg, highest: total ? Math.max(...scores) : 0, lowest: total ? Math.min(...scores) : 0, passed, failed: total - passed },
      students: quiz.assignedStudents.map(s => {
        const sa = attempts.filter(a => String(a.student?._id || a.student) === String(s._id)); const latest = sa[0];
        return { id: String(s._id), name: s.name, email: s.email, attempts: sa.length, score: latest?.scorePercentage ?? null, submittedAt: latest?.submittedAt || null, status: latest ? (latest.scorePercentage >= quiz.passingScore ? 'Passed' : 'Failed') : 'Not Attempted' };
      }),
      attempts: attempts.map(a => ({ id: String(a._id), student: a.student ? { id: String(a.student._id), name: a.student.name, email: a.student.email } : null, scorePercentage: a.scorePercentage, correctCount: a.correctCount, totalCount: a.totalCount, submittedAt: a.submittedAt, answers: a.answers }))
    });
  } catch (e) { next(e); }
};

const deleteQuiz = async (req, res, next) => { try { const q = await Quiz.findByIdAndDelete(req.params.id); if (!q) return res.status(404).json({ message: 'Quiz not found.' }); res.json({ message: 'Quiz deleted.' }); } catch (e) { next(e); } };

const submitQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
    if (req.user.role !== 'admin' && (quiz.status !== 'published' || !quiz.assignedStudents.some(s => String(s) === String(req.user._id)))) return res.status(403).json({ message: 'This quiz is not assigned to your account.' });
    const answers = req.body.answers && typeof req.body.answers === 'object' ? req.body.answers : {};
    let correctCount = 0;
    quiz.questions.forEach(q => { if (Number(answers[String(q._id)]) === Number(q.correctAnswer)) correctCount++; });
    const totalCount = quiz.questions.length;
    const scorePercentage = totalCount ? Math.round(correctCount / totalCount * 100) : 0;
    const attempt = await QuizAttempt.create({ student: req.user._id, quiz: quiz._id, scorePercentage, correctCount, totalCount, answers });
    res.json({ correctCount, totalCount, scorePercentage, attemptId: String(attempt._id), passed: scorePercentage >= quiz.passingScore });
  } catch (e) { next(e); }
};

const getMyAttempts = async (req, res, next) => { try { res.json(await QuizAttempt.find({ student: req.user._id }).populate('quiz', 'title')); } catch (e) { next(e); } };

module.exports = { getQuizzes, getQuizById, createQuiz, updateQuiz, assignQuiz, getQuizDashboard, deleteQuiz, submitQuiz, getMyAttempts };
