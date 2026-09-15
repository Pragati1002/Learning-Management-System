require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Course = require('../models/Course');

async function run() {
  await connectDB();
  const email = process.env.SEED_STUDENT_EMAIL || 'student@example.com';
  const title = process.env.SEED_STUDENT_COURSE_TITLE;
  if (!title) throw new Error('Set SEED_STUDENT_COURSE_TITLE in server/.env before running this repair.');

  const student = await User.findOne({ email, role: 'student' });
  if (!student) throw new Error(`Student not found: ${email}`);
  const course = await Course.findOne({ title });
  if (!course) throw new Error(`Course not found: ${title}`);

  student.enrolledCourses = [course._id];
  student.paidCourseIds = (student.paidCourseIds || []).filter(id => String(id) === String(course._id));
  await student.save();

  console.log(`Student: ${student.email}`);
  console.log(`Enrollment repaired to exactly ONE course: ${course.title}`);
  console.log(`Course ID: ${course._id}`);
  console.log('Practice & Quizzes will now be limited to this course.');
  await mongoose.connection.close();
}
run().catch(async err => {
  console.error(err.message);
  try { await mongoose.connection.close(); } catch (_) {}
  process.exitCode = 1;
});
