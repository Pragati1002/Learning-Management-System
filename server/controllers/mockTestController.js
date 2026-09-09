const MockTest = require('../models/MockTest');

const getMockTests = async (req, res, next) => {
  try {
    const tests = await MockTest.find();
    res.json(tests);
  } catch (err) { next(err); }
};

const getMockTestById = async (req, res, next) => {
  try {
    const test = await MockTest.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Mock test not found' });
    res.json(test);
  } catch (err) { next(err); }
};

// @route POST /api/mock-tests/:id/submit  body: { answers: { [questionId]: selectedOptionIndex } }
const submitMockTest = async (req, res, next) => {
  try {
    const test = await MockTest.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Mock test not found' });

    const { answers } = req.body;
    let correctCount = 0;
    let totalCount = 0;
    test.sections.forEach(section => {
      section.questions.forEach(q => {
        totalCount++;
        if (answers[q._id] === q.correctAnswer) correctCount++;
      });
    });

    res.json({ correctCount, totalCount, percentage: Math.round((correctCount / totalCount) * 100) });
  } catch (err) { next(err); }
};

module.exports = { getMockTests, getMockTestById, submitMockTest };
