const Discussion=require('../models/Discussion');
const getDiscussions=async(req,res,next)=>{try{res.json(await Discussion.find().sort({createdAt:-1}));}catch(e){next(e)}};
const createDiscussion=async(req,res,next)=>{try{res.status(201).json(await Discussion.create({...req.body,author:req.user.name,authorId:req.user._id}));}catch(e){next(e)}};
const deleteDiscussion=async(req,res,next)=>{try{const d=await Discussion.findById(req.params.id);if(!d)return res.status(404).json({message:'Discussion not found'});if(d.authorId&&d.authorId.toString()!==req.user._id.toString()&&req.user.role!=='admin')return res.status(403).json({message:'You cannot delete this discussion'});await d.deleteOne();res.json({message:'Discussion deleted'});}catch(e){next(e)}};
const addReply=async(req,res,next)=>{try{const d=await Discussion.findById(req.params.id);if(!d)return res.status(404).json({message:'Discussion not found'});d.replies.push({author:req.user.name,content:req.body.content,createdAt:new Date().toISOString()});await d.save();res.json(d);}catch(e){next(e)}};
module.exports={getDiscussions,createDiscussion,deleteDiscussion,addReply};
