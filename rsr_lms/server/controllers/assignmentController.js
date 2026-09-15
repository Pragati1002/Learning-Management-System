const Assignment=require('../models/Assignment');
const getAssignments=async(req,res,next)=>{try{const filter=req.query.courseId?{courseId:req.query.courseId}:{};res.json(await Assignment.find(filter));}catch(e){next(e)}};
const createAssignment=async(req,res,next)=>{try{res.status(201).json(await Assignment.create(req.body));}catch(e){next(e)}};
const deleteAssignment=async(req,res,next)=>{try{const a=await Assignment.findByIdAndDelete(req.params.id);if(!a)return res.status(404).json({message:'Assignment not found'});res.json({message:'Assignment deleted'});}catch(e){next(e)}};
module.exports={getAssignments,createAssignment,deleteAssignment};
