const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');

const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) { next(err); }
};

const createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) { next(err); }
};

// @route POST /api/quizzes/:id/submit  body: { answers: { [questionId]: selectedOptionIndex } }
const submitQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const { answers } = req.body;
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (answers[q._id] === q.correctAnswer) correctCount++;
    });
    const totalCount = quiz.questions.length;
    const scorePercentage = Math.round((correctCount / totalCount) * 100);

    const attempt = await QuizAttempt.create({
      student: req.user._id,
      quiz: quiz._id,
      scorePercentage,
      correctCount,
      totalCount
    });

    res.json({ correctCount, totalCount, scorePercentage, attemptId: attempt._id });
  } catch (err) { next(err); }
};

const getMyAttempts = async (req, res, next) => {
  try {
    const attempts = await QuizAttempt.find({ student: req.user._id }).populate('quiz', 'title');
    res.json(attempts);
  } catch (err) { next(err); }
};

module.exports = { getQuizzes, createQuiz, submitQuiz, getMyAttempts };
