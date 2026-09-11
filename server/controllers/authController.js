const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');
const generateToken = require('../utils/generateToken');

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

      enrolledCourses = [course._id];
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


module.exports = {
  register,
  login,
  getMe
};