const InterviewTrack = require('../models/InterviewTrack');
const InterviewResult = require('../models/InterviewResult');

const getInterviewTracks = async (req, res, next) => {
  try {
    const tracks = await InterviewTrack.find();
    res.json(tracks);
  } catch (err) { next(err); }
};

// @route POST /api/interviews/:trackId/submit
// body: { responses: [{ questionId, answer }], durationSeconds }
// NOTE: scoring here is a simple rule-based heuristic (answered count + avg answer length),
// not a real AI evaluation - wire in an LLM API call here later for genuine feedback.
const submitInterview = async (req, res, next) => {
  try {
    const track = await InterviewTrack.findById(req.params.trackId);
    if (!track) return res.status(404).json({ message: 'Interview track not found' });

    const { responses = [], durationSeconds = 0 } = req.body;
    const answered = responses.filter(r => r.answer && r.answer.trim().length > 0);
    const avgLength = answered.reduce((sum, r) => sum + r.answer.trim().length, 0) / (track.questions.length || 1);

    let score = Math.round((answered.length / track.questions.length) * 60 + Math.min(avgLength / 3, 40));
    score = Math.max(30, Math.min(score, 98));

    const strengths = [];
    const improvements = [];
    if (answered.length === track.questions.length) strengths.push('Answered every question in the interview');
    if (avgLength > 120) strengths.push('Gave detailed, well-elaborated answers');
    if (avgLength > 40) strengths.push('Communicated clearly and stayed on topic');
    if (strengths.length === 0) strengths.push('Completed the mock interview session');

    if (avgLength < 60) improvements.push('Give more structured, detailed answers');
    if (answered.length < track.questions.length) improvements.push('Try to answer every question, even briefly');
    improvements.push('Practice explaining technical concepts with real examples');

    const result = await InterviewResult.create({
      student: req.user._id,
      track: track._id,
      role: track.role,
      responses,
      score,
      strengths,
      improvements,
      durationSeconds
    });

    res.json(result);
  } catch (err) { next(err); }
};

const getMyInterviewResults = async (req, res, next) => {
  try {
    const results = await InterviewResult.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) { next(err); }
};

module.exports = { getInterviewTracks, submitInterview, getMyInterviewResults };
