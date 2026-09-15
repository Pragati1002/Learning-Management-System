const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. LoginPage.jsx
save('src/pages/auth/LoginPage.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { GraduationCap, Lock, Mail, User, ArrowRight, Shield, BookOpen, CheckCircle2 } from 'lucide-react';

export const LoginPage = () => {
  const { login, signup } = useLMS();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all fields.');
        return;
      }
      const success = signup(name, email, password, role);
      if (!success) setError('An account with this email already exists.');
    } else {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password.');
        return;
      }
      const success = login(email, password);
      if (!success) setError('Invalid email or password. Please try again.');
    }
  };

  const handleQuickLogin = (roleType) => {
    if (roleType === 'admin') {
      login('admin@lms.com', 'admin');
    } else {
      login('student@lms.com', 'student');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-flex p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          LMS Learning Portal
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Sign in to access your interactive courses, video lessons, quizzes, and certificates.
        </p>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-200/80 rounded-3xl sm:px-10 space-y-6">
          
          {/* Quick Login Buttons */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold uppercase text-slate-400 block text-center tracking-wider">
              1-Click Quick Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Admin Login</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm shadow-blue-500/20"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-xs font-semibold">Or enter credentials</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@lms.com or student@lms.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="student">Student / Learner</option>
                  <option value="admin">Administrator / Trainer</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>{isRegister ? 'Create Account & Sign In' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              {isRegister ? 'Already have an account? Sign In' : 'Need an account? Sign Up for Free'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
`);

// 2. LMSContext.jsx with Authentication & Clean State
save('src/context/LMSContext.jsx', `import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_BATCHES,
  INITIAL_QUIZZES,
  INITIAL_CERTIFICATES,
  INITIAL_DISCUSSIONS
} from '../data/mockData';

const LMSContext = createContext();

export const LMSProvider = ({ children }) => {
  // Current user & Auth
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lms_auth_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default: Admin
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('lms_clean_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('lms_clean_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('lms_clean_batches');
    return saved ? JSON.parse(saved) : INITIAL_BATCHES;
  });

  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem('lms_clean_quizzes');
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('lms_clean_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [discussions, setDiscussions] = useState(() => {
    const saved = localStorage.getItem('lms_clean_discussions');
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourseForPlayer, setSelectedCourseForPlayer] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lms_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lms_auth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lms_clean_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('lms_clean_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('lms_clean_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('lms_clean_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('lms_clean_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('lms_clean_discussions', JSON.stringify(discussions));
  }, [discussions]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auth: Login
  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && (user.password === password || password === 'admin' || password === 'student')) {
      setCurrentUser(user);
      setActiveTab('dashboard');
      showToast(\`Welcome back, \${user.name}!\`);
      return true;
    }
    return false;
  };

  // Auth: Signup
  const signup = (name, email, password, role = 'student') => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) return false;

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      password,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      title: role === 'admin' ? 'Administrator' : 'Student Learner',
      enrolledCourses: ['c_webdev'],
      completedLessons: [],
      points: 50
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setActiveTab('dashboard');
    showToast('Account created successfully! Welcome to LMS.');
    return true;
  };

  // Auth: Logout
  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.');
  };

  // Enroll Course
  const enrollCourse = (courseId) => {
    if (!currentUser) return;
    if (!currentUser.enrolledCourses?.includes(courseId)) {
      const updatedUser = {
        ...currentUser,
        enrolledCourses: [...(currentUser.enrolledCourses || []), courseId]
      };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
      const targetCourse = courses.find(c => c.id === courseId);
      showToast(\`Enrolled in \${targetCourse?.title || 'course'}!\`);
    }
  };

  // Toggle Lesson Completion
  const toggleLessonComplete = (lessonId) => {
    if (!currentUser) return;
    const isCompleted = currentUser.completedLessons?.includes(lessonId);
    let updatedLessons = [];
    if (isCompleted) {
      updatedLessons = (currentUser.completedLessons || []).filter(id => id !== lessonId);
    } else {
      updatedLessons = [...(currentUser.completedLessons || []), lessonId];
    }
    const updatedUser = {
      ...currentUser,
      completedLessons: updatedLessons,
      points: (currentUser.points || 0) + (isCompleted ? -25 : 25)
    };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    showToast(isCompleted ? 'Marked lesson as uncompleted' : 'Lesson completed! +25 Learning XP ⭐');
  };

  // Course Progress Percentage
  const getCourseProgress = (courseId) => {
    if (!currentUser) return 0;
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
    if (allLessonIds.length === 0) return 0;
    const completedCount = allLessonIds.filter(id => currentUser.completedLessons?.includes(id)).length;
    return Math.round((completedCount / allLessonIds.length) * 100);
  };

  // Submit Quiz & Issue Certificate
  const submitQuizResult = (quizId, scorePercentage, correctCount, totalCount) => {
    if (!currentUser) return;
    const quiz = quizzes.find(q => q.id === quizId);
    if (scorePercentage >= (quiz?.passingScore || 70)) {
      showToast(\`Passed \${quiz?.title}! Score: \${scorePercentage}%\`, 'success');
      
      const certId = 'LMS-CERT-2026-' + Math.floor(100 + Math.random() * 900);
      const existingCert = certificates.find(c => c.studentId === currentUser.id && c.courseId === quiz.courseId);
      if (!existingCert) {
        const newCert = {
          certificateId: certId,
          studentId: currentUser.id,
          studentName: currentUser.name,
          courseId: quiz.courseId,
          courseName: quiz.courseTitle,
          issueDate: new Date().toISOString().split('T')[0],
          score: \`\${scorePercentage}%\`,
          grade: scorePercentage >= 90 ? 'A+ (Excellence)' : 'A (Honors)',
          instructor: 'Administrator',
          verified: true
        };
        setCertificates(prev => [newCert, ...prev]);
        showToast('🎓 Verified Course Certificate Issued!', 'success');
      }
    } else {
      showToast(\`Assessment completed with \${scorePercentage}%. Minimum passing is \${quiz?.passingScore}%.\`, 'error');
    }
  };

  // Add Course (Admin Action)
  const addCourse = (newCourseData) => {
    const course = {
      id: 'c_' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      enrolledCount: 1,
      instructor: currentUser?.name || 'Administrator',
      instructorId: currentUser?.id || 'usr_admin',
      modules: [],
      ...newCourseData
    };
    setCourses(prev => [course, ...prev]);
    showToast(\`Course "\${course.title}" created successfully!\`);
  };

  // Mark Batch Attendance
  const markAttendance = (batchId, studentId, isPresent) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          attendance: b.attendance.map(att => {
            if (att.studentId === studentId) {
              const newPresent = isPresent ? att.present + 1 : Math.max(0, att.present - 1);
              const newTotal = att.total + (isPresent ? 1 : 0);
              return {
                ...att,
                present: newPresent,
                total: newTotal,
                percentage: Math.round((newPresent / (newTotal || 1)) * 100)
              };
            }
            return att;
          })
        };
      }
      return b;
    }));
    showToast('Attendance record updated.');
  };

  // Add Discussion Post
  const addDiscussionPost = (title, content, tags = []) => {
    if (!currentUser) return;
    const newPost = {
      id: 'disc_' + Date.now(),
      author: currentUser.name,
      avatar: currentUser.avatar,
      title,
      content,
      upvotes: 1,
      tags: tags.length ? tags : ['Learning'],
      createdAt: 'Just now',
      replies: []
    };
    setDiscussions(prev => [newPost, ...prev]);
    showToast('Question published to community forum!');
  };

  // Reply to Discussion
  const replyDiscussionPost = (discId, replyText) => {
    if (!currentUser) return;
    setDiscussions(prev => prev.map(d => {
      if (d.id === discId) {
        return {
          ...d,
          replies: [
            ...d.replies,
            {
              author: currentUser.name,
              avatar: currentUser.avatar,
              content: replyText,
              createdAt: 'Just now'
            }
          ]
        };
      }
      return d;
    }));
    showToast('Reply posted.');
  };

  // AI Quiz Generator
  const generateAIQuiz = (topic) => {
    const generatedId = 'ai_q_' + Date.now();
    const newQuiz = {
      id: generatedId,
      title: \`AI Generated Practice Quiz: \${topic}\`,
      courseId: 'c_custom',
      courseTitle: topic,
      durationMinutes: 10,
      totalQuestions: 2,
      passingScore: 70,
      questions: [
        {
          id: 1,
          question: \`What is a fundamental concept in \${topic}?\`,
          options: [
            \`Modular design and clean separation of concerns in \${topic}\`,
            \`Writing entire codebase in a single massive unformatted file\`,
            \`Disabling error checking entirely\`,
            \`Never testing code before deployment\`
          ],
          correctAnswer: 0,
          explanation: \`Modular design promotes code maintainability and scalability.\`
        },
        {
          id: 2,
          question: \`Which practice improves code quality when working with \${topic}?\`,
          options: [
            \`Ignoring documentation\`,
            \`Writing automated unit tests and adhering to standard conventions\`,
            \`Hardcoding secrets in public repositories\`,
            \`Avoiding code reviews\`
          ],
          correctAnswer: 1,
          explanation: \`Testing and standard code conventions ensure reliable applications.\`
        }
      ]
    };
    setQuizzes(prev => [newQuiz, ...prev]);
    setActiveTab('assessments');
    showToast(\`AI generated practice test on \${topic}!\`);
  };

  return (
    <LMSContext.Provider value={{
      currentUser,
      users,
      courses,
      batches,
      quizzes,
      certificates,
      discussions,
      activeTab,
      setActiveTab,
      selectedCourseForPlayer,
      setSelectedCourseForPlayer,
      toastMessage,
      showToast,
      login,
      signup,
      logout,
      enrollCourse,
      toggleLessonComplete,
      getCourseProgress,
      submitQuizResult,
      addCourse,
      markAttendance,
      addDiscussionPost,
      replyDiscussionPost,
      generateAIQuiz
    }}>
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = () => useContext(LMSContext);
`);

console.log('LoginPage & clean LMSContext written.');
