const express=require('express');
const router=express.Router();
const {getAssignments,createAssignment,deleteAssignment}=require('../controllers/assignmentController');
const {protect,requireRole}=require('../middleware/auth');
router.get('/',protect,getAssignments);
router.post('/',protect,requireRole('admin','trainer'),createAssignment);
router.delete('/:id',protect,requireRole('admin','trainer'),deleteAssignment);
module.exports=router;
