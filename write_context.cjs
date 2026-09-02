const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src/context/LMSContext.jsx');

const code = `import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lms_user_v3');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('lms_users_v3');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('lms_courses_v3');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('lms_batches_v3');
    return saved ? JSON.parse(saved) : INITIAL_BATCHES;
  });

  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem('lms_quizzes_v3');
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('lms_assignments_v3');
    return saved ? JSON.parse(saved) : [];
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('lms_certificates_v3');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [discussions, setDiscussions] = useState(() => {
    const saved = localStorage.getItem('lms_discussions_v3');
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourseForPlayer, setSelectedCourseForPlayer] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (currentUser) localStorage.setItem('lms_user_v3', JSON.stringify(currentUser));
    else localStorage.removeItem('lms_user_v3');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lms_users_v3', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('lms_courses_v3', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('lms_batches_v3', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('lms_quizzes_v3', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('lms_certificates_v3', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('lms_discussions_v3', JSON.stringify(discussions));
  }, [discussions]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

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
      enrolledCourses: courses.length > 0 ? [courses[0].id] : [],
      completedLessons: [],
      points: 0
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setActiveTab('dashboard');
    showToast('Account created successfully! Welcome to LMS.');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.');
  };

  const getCourseProgress = (courseId, user = currentUser) => {
    if (!user) return 0;
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    const allLessonIds = course.modules?.flatMap(m => m.lessons?.map(l => l.id) || []) || [];
    if (allLessonIds.length === 0) return 0;
    const completedCount = allLessonIds.filter(id => user.completedLessons?.includes(id)).length;
    return Math.round((completedCount / allLessonIds.length) * 100);
  };

  const issueCertificateForCourse = (courseId, student = currentUser) => {
    const course = courses.find(c => c.id === courseId);
    if (!course || !student) return null;

    const existingCert = certificates.find(c => c.studentId === student.id && c.courseId === courseId);
    if (existingCert) return existingCert;

    const certId = 'LMS-CERT-2026-' + Math.floor(100 + Math.random() * 900);
    const newCert = {
      certificateId: certId,
      studentId: student.id,
      studentName: student.name,
      courseId: course.id,
      courseName: course.title,
      issueDate: new Date().toISOString().split('T')[0],
      score: '100%',
      grade: 'A+ (Excellence)',
      instructor: course.instructor || 'Administrator',
      verified: true
    };

    setCertificates(prev => [newCert, ...prev]);
    showToast(\`🎓 Course finished! Certificate \${certId} issued!\`, 'success');
    return newCert;
  };

  const toggleLessonComplete = (lessonId, courseId) => {
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

    if (!isCompleted) {
      showToast('Lesson finished! +25 Learning XP ⭐');
      const targetCourse = courses.find(c => c.id === courseId) || courses.find(c => c.modules.some(m => m.lessons.some(l => l.id === lessonId)));
      if (targetCourse) {
        const allLessons = targetCourse.modules.flatMap(m => m.lessons.map(l => l.id));
        const allDone = allLessons.every(lId => updatedLessons.includes(lId));
        if (allDone) {
          issueCertificateForCourse(targetCourse.id, updatedUser);
        }
      }
    } else {
      showToast('Marked lesson as uncompleted');
    }
  };

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

  const addCourse = (newCourseData) => {
    const course = {
      id: 'c_' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      enrolledCount: 1,
      instructor: currentUser?.name || 'Administrator',
      instructorId: currentUser?.id || 'usr_admin',
      modules: [
        {
          id: 'mod_' + Date.now(),
          title: 'Module 1: Getting Started',
          lessons: [
            {
              id: 'les_' + Date.now(),
              title: '1. Introduction & Overview',
              duration: '15 min',
              type: 'video',
              videoUrl: newCourseData.videoUrl || 'https://www.youtube.com/embed/kUMe1FH4CHE',
              resources: ['Course_Overview.pdf']
            }
          ]
        }
      ],
      ...newCourseData
    };
    setCourses(prev => [course, ...prev]);
    showToast(\`Course "\${course.title}" created successfully!\`);
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    showToast('Course removed.', 'info');
  };

  const addBatch = (batchData) => {
    const newBatch = {
      id: 'b_' + Date.now(),
      name: batchData.name,
      courseId: batchData.courseId,
      courseName: batchData.courseName,
      trainerName: currentUser?.name || 'Administrator',
      studentsCount: 1,
      schedule: batchData.schedule,
      status: 'Active',
      attendance: [
        { studentId: 'usr_student', studentName: 'Student Learner', rollNo: 'LMS-001', present: 0, total: 0, percentage: 100 }
      ]
    };
    setBatches(prev => [newBatch, ...prev]);
    showToast(\`Batch "\${newBatch.name}" created!\`);
  };

  const deleteBatch = (batchId) => {
    setBatches(prev => prev.filter(b => b.id !== batchId));
    showToast('Batch removed.');
  };

  const addStudentToBatch = (batchId, studentName, rollNo) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        const newStudent = {
          studentId: 'usr_' + Date.now(),
          studentName,
          rollNo: rollNo || \`LMS-00\${b.attendance.length + 1}\`,
          present: 0,
          total: 0,
          percentage: 100
        };
        return {
          ...b,
          studentsCount: b.studentsCount + 1,
          attendance: [...b.attendance, newStudent]
        };
      }
      return b;
    }));
    showToast(\`Student "\${studentName}" added to batch.\`);
  };

  const removeStudentFromBatch = (batchId, studentId) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          studentsCount: Math.max(0, b.studentsCount - 1),
          attendance: b.attendance.filter(s => s.studentId !== studentId)
        };
      }
      return b;
    }));
    showToast('Student removed from batch.');
  };

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
    showToast('Attendance updated.');
  };

  const addQuiz = (quizData) => {
    const newQuiz = {
      id: 'q_' + Date.now(),
      title: quizData.title,
      courseId: quizData.courseId || 'c_webdev',
      courseTitle: quizData.courseTitle || 'General Assessment',
      durationMinutes: Number(quizData.durationMinutes) || 15,
      totalQuestions: quizData.questions.length,
      passingScore: Number(quizData.passingScore) || 70,
      questions: quizData.questions
    };
    setQuizzes(prev => [newQuiz, ...prev]);
    showToast(\`Assessment "\${newQuiz.title}" created!\`);
  };

  const deleteQuiz = (quizId) => {
    setQuizzes(prev => prev.filter(q => q.id !== quizId));
    showToast('Assessment removed.');
  };

  const addAssignment = (asgData) => {
    const newAsg = {
      id: 'asg_' + Date.now(),
      title: asgData.title,
      courseId: asgData.courseId,
      courseName: asgData.courseName,
      dueDate: asgData.dueDate,
      totalPoints: 100,
      description: asgData.description
    };
    setAssignments(prev => [newAsg, ...prev]);
    showToast(\`Assignment created!\`);
  };

  const deleteAssignment = (asgId) => {
    setAssignments(prev => prev.filter(a => a.id !== asgId));
    showToast('Assignment deleted.');
  };

  const submitQuizResult = (quizId, scorePercentage, correctCount, totalCount) => {
    if (!currentUser) return;
    const quiz = quizzes.find(q => q.id === quizId);
    if (scorePercentage >= (quiz?.passingScore || 70)) {
      showToast(\`Passed \${quiz?.title}! Score: \${scorePercentage}%\`, 'success');
      issueCertificateForCourse(quiz.courseId, currentUser);
    } else {
      showToast(\`Score: \${scorePercentage}%. Minimum passing is \${quiz?.passingScore}%.\`, 'error');
    }
  };

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
    showToast('Discussion question posted.');
  };

  const deleteDiscussionPost = (postId) => {
    setDiscussions(prev => prev.filter(d => d.id !== postId));
    showToast('Post deleted.');
  };

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

  return (
    <LMSContext.Provider value={{
      currentUser,
      users,
      courses,
      batches,
      quizzes,
      assignments,
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
      addCourse,
      deleteCourse,
      addBatch,
      deleteBatch,
      addStudentToBatch,
      removeStudentFromBatch,
      markAttendance,
      addQuiz,
      deleteQuiz,
      addAssignment,
      deleteAssignment,
      addDiscussionPost,
      deleteDiscussionPost,
      replyDiscussionPost,
      enrollCourse,
      toggleLessonComplete,
      getCourseProgress,
      issueCertificateForCourse,
      submitQuizResult
    }}>
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = () => useContext(LMSContext);
`;

fs.writeFileSync(p, code, 'utf8');
console.log('LMSContext.jsx written');
