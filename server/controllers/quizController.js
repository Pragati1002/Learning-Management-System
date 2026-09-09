const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const getQuizzes = async (req,res,next)=>{try{res.json(await Quiz.find());}catch(e){next(e)}};
const createQuiz = async (req,res,next)=>{try{res.status(201).json(await Quiz.create(req.body));}catch(e){next(e)}};
const deleteQuiz = async (req,res,next)=>{try{const q=await Quiz.findByIdAndDelete(req.params.id);if(!q)return res.status(404).json({message:'Quiz not found'});res.json({message:'Quiz deleted'});}catch(e){next(e)}};
const submitQuiz = async (req,res,next)=>{try{const quiz=await Quiz.findById(req.params.id);if(!quiz)return res.status(404).json({message:'Quiz not found'});const answers=req.body.answers||{};let correctCount=0;quiz.questions.forEach(q=>{if(answers[String(q._id)]===q.correctAnswer)correctCount++});const totalCount=quiz.questions.length;const scorePercentage=totalCount?Math.round(correctCount/totalCount*100):0;const attempt=await QuizAttempt.create({student:req.user._id,quiz:quiz._id,scorePercentage,correctCount,totalCount});res.json({correctCount,totalCount,scorePercentage,attemptId:attempt._id});}catch(e){next(e)}};
const getMyAttempts=async(req,res,next)=>{try{res.json(await QuizAttempt.find({student:req.user._id}).populate('quiz','title'));}catch(e){next(e)}};
module.exports={getQuizzes,createQuiz,deleteQuiz,submitQuiz,getMyAttempts};
