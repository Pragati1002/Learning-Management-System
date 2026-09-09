const express=require('express');
const router=express.Router();
const {getDiscussions,createDiscussion,deleteDiscussion,addReply}=require('../controllers/discussionController');
const {protect}=require('../middleware/auth');
router.get('/',protect,getDiscussions);
router.post('/',protect,createDiscussion);
router.post('/:id/reply',protect,addReply);
router.delete('/:id',protect,deleteDiscussion);
module.exports=router;
