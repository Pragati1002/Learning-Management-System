const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

// @route POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      role,
      chosenCourse
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await User.findOne({
      email: normalizedEmail
    });

    if (existing) {
      return res.status(400).json({
        message: 'An account with this email already exists'
      });
    }

    // Public registration should only create student accounts.
    // Admin accounts should be created separately.
    const userRole = 'student';

    let enrolledCourses = [];

    // If a student selected a course during registration,
    // verify that the course actually exists.
    if (chosenCourse) {
      const course = await Course.findById(chosenCourse);

      if (!course) {
        return res.status(400).json({
          message: 'Selected course was not found'
        });
      }

      // Registration never enrolls a paid course. Payment is required first.
      if (Number(course.price || 0) <= 0) enrolledCourses = [course._id];
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      mobile,
      passwordHash,
      role: userRole,
      enrolledCourses
    });

    const token = generateToken(
      user._id,
      user.role
    );

    // Fire-and-forget registration confirmation email — never blocks or
    // fails the signup response if SMTP isn't configured or is slow.
    sendEmail({
      to: user.email,
      subject: 'Welcome to RSR LMS — Registration Successful',
      text: `Hi ${user.name},\n\nYour RSR LMS account has been created successfully with the email ${user.email}.\nYou can now log in and start learning.\n\n— RSR LMS Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #6d28d9;">Welcome to RSR LMS, ${user.name}! 🎓</h2>
          <p>Your account has been registered successfully with the email <b>${user.email}</b>.</p>
          <p>You can now log in and start exploring courses, mock tests, mock interviews and campus placements.</p>
          <p style="margin-top: 24px; color: #64748b; font-size: 12px;">If you didn't create this account, please ignore this email.</p>
        </div>
      `
    }).catch(() => {});

    // Optional admin notification. This is also fire-and-forget so a
    // registration never fails because SMTP is unavailable.
    if (process.env.REGISTRATION_ADMIN_EMAIL) {
      sendEmail({
        to: process.env.REGISTRATION_ADMIN_EMAIL,
        subject: `New RSR LMS Registration — ${user.name}`,
        text: `A new student registered on RSR LMS.

Name: ${user.name}
Email: ${user.email}
Mobile: ${user.mobile || 'Not provided'}
Role: ${user.role}
Registered: ${new Date().toISOString()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto;">
            <h2 style="color: #6d28d9;">New RSR LMS Registration</h2>
            <p>A new student account has been created.</p>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${user.name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${user.email}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Mobile</td><td style="padding:8px;">${user.mobile || 'Not provided'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Role</td><td style="padding:8px;">${user.role}</td></tr>
            </table>
          </div>
        `
      }).catch(() => {});
    }

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
        enrolledCourses: user.enrolledCourses
      }
    });

  } catch (err) {
    next(err);
  }
};


// @route POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(
      user._id,
      user.role
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
        enrolledCourses: user.enrolledCourses
      }
    });

  } catch (err) {
    next(err);
  }
};


// @route GET /api/auth/me
const getMe = async (req, res) => {
  res.json({
    user: req.user
  });
};



const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'student' }).select('_id name email mobile role');
    res.json(users);
  } catch (err) { next(err); }
};

module.exports = {
  register,
  login,
  getMe,
  getUsers
};