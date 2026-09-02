const fs = require('fs');
const path = require('path');

function write(filePath, content) {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Successfully wrote:', filePath);
}

const contextContent = `import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_BATCHES,
  INITIAL_QUIZZES,
  INITIAL_ASSIGNMENTS,
  INITIAL_FEES,
  INITIAL_CERTIFICATES,
  INITIAL_LEADS,
  INITIAL_PLACEMENTS,
  INITIAL_DISCUSSIONS,
  INITIAL_TICKETS,
  INITIAL_LIVE_CLASSES
} from '../data/mockData';

const LMSContext = createContext();

export const LMSProvider = ({ children }) => {
  // 1. Current Active User & Role
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lms_currentUser');
    return saved ? JSON.parse(saved) : INITIAL_USERS[2]; // Default: Student (Aarav Patel)
  });

  // 2. Core Entities with LocalStorage Persistence
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('lms_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('lms_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('lms_batches');
    return saved ? JSON.parse(saved) : INITIAL_BATCHES;
  });

  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem('lms_quizzes');
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('lms_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [fees, setFees] = useState(() => {
    const saved = localStorage.getItem('lms_fees');
    return saved ? JSON.parse(saved) : INITIAL_FEES;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('lms_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('lms_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [placements, setPlacements] = useState(() => {
    const saved = localStorage.getItem('lms_placements');
    return saved ? JSON.parse(saved) : INITIAL_PLACEMENTS;
  });

  const [discussions, setDiscussions] = useState(() => {
    const saved = localStorage.getItem('lms_discussions');
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('lms_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [liveClasses, setLiveClasses] = useState(() => {
    const saved = localStorage.getItem('lms_liveClasses');
    return saved ? JSON.parse(saved) : INITIAL_LIVE_CLASSES;
  });

  // UI state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourseForPlayer, setSelectedCourseForPlayer] = useState(null);
  const [selectedQuizForTake, setSelectedQuizForTake] = useState(null);
  const [activeLiveClass, setActiveLiveClass] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('lms_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lms_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('lms_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('lms_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('lms_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('lms_fees', JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem('lms_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('lms_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('lms_placements', JSON.stringify(placements));
  }, [placements]);

  useEffect(() => {
    localStorage.setItem('lms_discussions', JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem('lms_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Switch Role
  const switchRole = (role) => {
    const targetUser = users.find(u => u.role === role) || users[0];
    setCurrentUser(targetUser);
    setActiveTab('dashboard');
    showToast(\`Switched role to \${targetUser.role.toUpperCase()} (\${targetUser.name})\`, 'info');
  };

  // Course Enroll
  const enrollCourse = (courseId) => {
    if (!currentUser.enrolledCourses?.includes(courseId)) {
      const updatedUser = {
        ...currentUser,
        enrolledCourses: [...(currentUser.enrolledCourses || []), courseId]
      };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
      
      // Auto-generate invoice
      const targetCourse = courses.find(c => c.id === courseId);
      if (targetCourse) {
        const newInvoice = {
          invoiceId: 'INV-2026-' + Math.floor(1000 + Math.random() * 9000),
          studentId: currentUser.id,
          studentName: currentUser.name,
          courseName: targetCourse.title,
          amount: targetCourse.price,
          discount: 0,
          paidAmount: targetCourse.price,
          status: 'Paid',
          dueDate: new Date().toISOString().split('T')[0],
          paidDate: new Date().toISOString().split('T')[0],
          paymentMethod: 'Online / Gateway',
          transactionId: 'TXN_' + Math.floor(1000000000 + Math.random() * 9000000000)
        };
        setFees(prev => [newInvoice, ...prev]);
      }
      showToast(\`Successfully enrolled in \${courses.find(c => c.id === courseId)?.title}!\`);
    }
  };

  // Toggle Lesson Completion
  const toggleLessonComplete = (lessonId) => {
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
      points: (currentUser.points || 1000) + (isCompleted ? -50 : 50)
    };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    showToast(isCompleted ? 'Marked lesson as uncompleted' : 'Lesson completed! +50 Learning XP earned 🌟');
  };

  // Calculate Course Progress Percentage
  const getCourseProgress = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
    if (allLessonIds.length === 0) return 0;
    const completedCount = allLessonIds.filter(id => currentUser.completedLessons?.includes(id)).length;
    return Math.round((completedCount / allLessonIds.length) * 100);
  };

  // Submit Quiz & Auto Issue Certificate if 100% and passing
  const submitQuizResult = (quizId, scorePercentage, correctCount, totalCount) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (scorePercentage >= (quiz?.passingScore || 70)) {
      showToast(\`Passed \${quiz?.title}! Score: \${scorePercentage}% (\${correctCount}/\${totalCount})\`, 'success');
      // If eligible, auto create certificate
      const certId = 'LMS-CERT-2026-' + Math.floor(1000 + Math.random() * 9000);
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
          grade: scorePercentage >= 90 ? 'A+ (Distinction)' : 'A (Honors)',
          instructor: 'Prof. Priya Menon',
          verified: true,
          verificationUrl: \`https://lms.edu/verify/\${certId}\`
        };
        setCertificates(prev => [newCert, ...prev]);
        showToast('🎓 Congratulations! Official course certificate generated & verified!', 'success');
      }
    } else {
      showToast(\`Assessment completed with \${scorePercentage}%. Minimum passing is \${quiz?.passingScore}%. Try again!\`, 'error');
    }
  };

  // Submit Assignment
  const submitAssignment = (assignmentId, githubUrl) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        const existingSubs = asg.submissions.filter(s => s.studentId !== currentUser.id);
        return {
          ...asg,
          submissions: [
            ...existingSubs,
            {
              studentId: currentUser.id,
              studentName: currentUser.name,
              submittedAt: new Date().toISOString(),
              githubUrl,
              status: 'Submitted (Pending Review)',
              score: null,
              feedback: null
            }
          ]
        };
      }
      return asg;
    }));
    showToast('Assignment submitted successfully for instructor evaluation!');
  };

  // Grade Assignment (Trainer Action)
  const gradeAssignment = (assignmentId, studentId, score, feedback) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        return {
          ...asg,
          submissions: asg.submissions.map(sub => {
            if (sub.studentId === studentId) {
              return {
                ...sub,
                status: 'Graded',
                score: Number(score),
                feedback
              };
            }
            return sub;
          })
        };
      }
      return asg;
    }));
    showToast('Assignment graded and feedback sent to student.');
  };

  // Mark Batch Attendance (Trainer Action)
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
    showToast('Attendance record updated successfully.');
  };

  // Add New Course (Admin/Trainer Action)
  const addCourse = (newCourseData) => {
    const course = {
      id: 'c_' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      enrolledCount: 0,
      instructor: currentUser.name,
      instructorId: currentUser.id,
      modules: [],
      ...newCourseData
    };
    setCourses(prev => [course, ...prev]);
    showToast(\`Course "\${course.title}" created successfully!\`);
  };

  // Pay Fee with Coupon
  const payFeeInvoice = (invoiceId, couponCode) => {
    let discountAmount = 0;
    if (couponCode?.trim().toUpperCase() === 'LMS50') discountAmount = 50;
    if (couponCode?.trim().toUpperCase() === 'TECH2026') discountAmount = 100;

    setFees(prev => prev.map(f => {
      if (f.invoiceId === invoiceId) {
        const finalAmt = Math.max(0, f.amount - discountAmount);
        return {
          ...f,
          discount: discountAmount,
          paidAmount: finalAmt,
          status: 'Paid',
          paidDate: new Date().toISOString().split('T')[0],
          paymentMethod: 'Credit Card / UPI',
          transactionId: 'TXN_' + Math.floor(1000000000 + Math.random() * 9000000000)
        };
      }
      return f;
    }));
    showToast(\`Invoice \${invoiceId} payment completed successfully! Receipt generated.\`);
  };

  // Update Lead Stage (CRM)
  const updateLeadStage = (leadId, newStage) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
    showToast(\`Lead status changed to "\${newStage}"\`);
  };

  // Apply to Placement Drive (Student Action)
  const applyPlacementJob = (jobId) => {
    setPlacements(prev => prev.map(job => {
      if (job.id === jobId) {
        const hasApplied = job.applicants.some(a => a.studentId === currentUser.id);
        if (hasApplied) return job;
        return {
          ...job,
          applicants: [
            ...job.applicants,
            {
              studentId: currentUser.id,
              studentName: currentUser.name,
              appliedDate: new Date().toISOString().split('T')[0],
              status: 'Applied (Under Review)'
            }
          ]
        };
      }
      return job;
    }));
    showToast('Job application submitted to company recruitment portal!');
  };

  // Add Discussion Post
  const addDiscussionPost = (title, content, tags = []) => {
    const newPost = {
      id: 'disc_' + Date.now(),
      author: currentUser.name,
      avatar: currentUser.avatar,
      title,
      content,
      upvotes: 1,
      tags: tags.length ? tags : ['General', 'Learning'],
      createdAt: 'Just now',
      replies: []
    };
    setDiscussions(prev => [newPost, ...prev]);
    showToast('Discussion question published to LMS community!');
  };

  // Reply to Discussion
  const replyDiscussionPost = (discId, replyText) => {
    setDiscussions(prev => prev.map(d => {
      if (d.id === discId) {
        return {
          ...d,
          replies: [
            ...d.replies,
            {
              author: \`\${currentUser.name} (\${currentUser.role.toUpperCase()})\`,
              avatar: currentUser.avatar,
              content: replyText,
              createdAt: 'Just now'
            }
          ]
        };
      }
      return d;
    }));
    showToast('Reply posted successfully!');
  };

  // Create Helpdesk Ticket
  const createSupportTicket = (subject, category, priority) => {
    const newTicket = {
      id: 'TCK-' + Math.floor(1000 + Math.random() * 9000),
      subject,
      studentName: currentUser.name,
      studentId: currentUser.id,
      category,
      priority,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      resolutionNotes: 'Ticket assigned to department administrator.'
    };
    setTickets(prev => [newTicket, ...prev]);
    showToast('Support ticket logged. Response expected within 24 hours.');
  };

  // AI Instant Quiz Generator (Creates a dynamic quiz on any topic)
  const generateAIQuiz = (topic) => {
    const generatedId = 'ai_q_' + Date.now();
    const newQuiz = {
      id: generatedId,
      title: \`AI Generated Mastery Quiz: \${topic}\`,
      courseId: 'c_custom_ai',
      courseTitle: \`Custom Topic: \${topic}\`,
      durationMinutes: 10,
      totalQuestions: 3,
      passingScore: 70,
      questions: [
        {
          id: 1,
          question: \`Which core concept is most vital when designing architectures in \${topic}?\`,
          options: [
            \`Decoupled components, high cohesion, and scalable error boundaries in \${topic}\`,
            \`Monolithic tightly-coupled single file structure\`,
            \`Ignoring performance profiling until production crash\`,
            \`Running unoptimized synchronous loops\`
          ],
          correctAnswer: 0,
          explanation: \`In modern \${topic}, clean separation of concerns and resilient error handling ensure maintainability.\`
        },
        {
          id: 2,
          question: \`What is an industry standard best practice in modern \${topic} workflows?\`,
          options: [
            \`Manual server deployments without testing\`,
            \`Automated testing pipelines, CI/CD validation, and strict typing/linting\`,
            \`Storing plaintext API tokens in public repositories\`,
            \`Disabling caching mechanisms entirely\`
          ],
          correctAnswer: 1,
          explanation: \`Automation and testing ensure reliable releases and minimize downtime.\`
        },
        {
          id: 3,
          question: \`How does advanced telemetry and logging benefit \${topic} production environments?\`,
          options: [
            \`Provides real-time visibility into latency, bottlenecks, and error anomalies\`,
            \`Slows down CPU calculations deliberately\`,
            \`Deletes customer database logs every hour\`,
            \`Prevents users from logging in\`
          ],
          correctAnswer: 0,
          explanation: \`Telemetry metrics allow proactive incident diagnosis before users are impacted.\`
        }
      ]
    };
    setQuizzes(prev => [newQuiz, ...prev]);
    setSelectedQuizForTake(newQuiz);
    setActiveTab('assessment-take');
    showToast(\`AI synthesized 3 custom questions for "\${topic}"!\`, 'success');
  };

  return (
    <LMSContext.Provider value={{
      currentUser,
      setCurrentUser,
      users,
      courses,
      batches,
      quizzes,
      assignments,
      fees,
      certificates,
      leads,
      placements,
      discussions,
      tickets,
      liveClasses,
      activeTab,
      setActiveTab,
      selectedCourseForPlayer,
      setSelectedCourseForPlayer,
      selectedQuizForTake,
      setSelectedQuizForTake,
      activeLiveClass,
      setActiveLiveClass,
      toastMessage,
      showToast,
      switchRole,
      enrollCourse,
      toggleLessonComplete,
      getCourseProgress,
      submitQuizResult,
      submitAssignment,
      gradeAssignment,
      markAttendance,
      addCourse,
      payFeeInvoice,
      updateLeadStage,
      applyPlacementJob,
      addDiscussionPost,
      replyDiscussionPost,
      createSupportTicket,
      generateAIQuiz
    }}>
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = () => useContext(LMSContext);
`;

write('src/context/LMSContext.jsx', contextContent);
console.log('Finished writing LMSContext.jsx');
