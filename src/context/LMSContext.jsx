import React, { createContext, useContext, useEffect, useState } from 'react';
import request from '../api/client';
import {
  INITIAL_COURSES,
  INITIAL_BATCHES,
  INITIAL_REVIEWS
} from '../data/mockData';

const LMSContext = createContext();
const TOKEN_KEY = 'lms_token';
const USER_KEY = 'lms_user_v3';
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    id: String(user.id || user._id),
    enrolledCourses: (user.enrolledCourses || []).map(c => String(c?.id || c?._id || c)),
    completedLessons: (user.completedLessons || []).map(String),
    lessonCompletions: (user.lessonCompletions || []).map(lc => ({
      ...lc,
      courseId: String(lc.courseId?.id || lc.courseId?._id || lc.courseId || '')
    })),
    avatar: user.avatar || DEFAULT_AVATAR,
    title: user.title || (user.role === 'admin' ? 'Platform Administrator & Instructor' : 'Registered Student'),
    points: Number(user.points || 0)
  };
};

const normalizeCourse = (course) => ({
  ...course,
  id: String(course.id || course._id),
  thumbnail: course.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
  price: course.price ?? 0,
  originalPrice: course.originalPrice ?? course.price ?? 0,
  enrolledCount: course.enrolledCount ?? 0,
  modules: (course.modules || []).map(m => ({
    ...m,
    id: String(m.id || m.moduleId || m._id),
    lessons: (m.lessons || []).map(l => ({
      ...l,
      id: String(l.id || l.lessonId || l._id)
    }))
  }))
});

const normalizeQuiz = (quiz) => ({
  ...quiz,
  id: String(quiz.id || quiz._id),
  questions: (quiz.questions || []).map(q => ({ ...q, id: String(q.id || q._id) }))
});

const normalizeMockTest = (test) => ({
  ...test,
  id: String(test.id || test._id),
  sections: (test.sections || []).map(s => ({
    ...s,
    id: String(s.id || s._id),
    questions: (s.questions || []).map(q => ({ ...q, id: String(q.id || q._id) }))
  }))
});

const normalizeInterview = (track) => ({
  ...track,
  id: String(track.id || track._id),
  questions: (track.questions || []).map(q => ({ ...q, id: String(q.id || q._id) }))
});

const normalizeJob = (job) => ({
  ...job,
  id: String(job.id || job._id),
  postedTime: job.postedTime || 'Recently posted'
});

const normalizePlacement = (placement) => ({
  ...placement,
  id: String(placement.id || placement._id),
  logo: placement.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80',
  applicants: (placement.applicants || []).map(a => ({
    ...a,
    studentId: String(a.studentId || a.student?.id || a.student?._id || a.student)
  }))
});

const normalizeCertificate = (cert) => ({
  ...cert,
  id: String(cert.id || cert._id || cert.certificateId),
  studentId: String(cert.studentId || cert.student?.id || cert.student?._id || cert.student),
  courseId: String(cert.courseId || cert.course?.id || cert.course?._id || cert.course)
});

const normalizeApplication = (app) => ({
  ...app,
  id: String(app.id || app._id),
  jobId: String(app.jobId || app.job?.id || app.job?._id || app.job),
  appliedDate: app.appliedDate || (app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '')
});

const normalizeAssignment = (a) => ({
  ...a,
  id: String(a.id || a._id),
  courseId: String(a.courseId || a.course?.id || a.course?._id || a.course),
  courseName: a.courseName || a.course?.title || 'Course',
  totalPoints: a.totalPoints ?? 100
});

const normalizeDiscussion = (d) => ({
  ...d,
  id: String(d.id || d._id),
  authorId: d.authorId ? String(d.authorId) : undefined,
  replies: (d.replies || []).map(r => ({ ...r, id: String(r.id || r._id) }))
});

const normalizeLiveClass = (liveClass) => ({
  ...liveClass,
  id: String(liveClass.id || liveClass._id),
  courseId: String(liveClass.courseId?.id || liveClass.courseId?._id || liveClass.courseId),
  courseTitle: liveClass.courseTitle || liveClass.courseId?.title || 'Course',
  time: liveClass.time || `${liveClass.startTime || ''} - ${liveClass.endTime || ''}`
});

const normalizeBatch = (batch) => {
  const students = batch.students || [];
  const attendanceRecords = batch.attendance || [];
  const today = new Date().toISOString().split('T')[0];
  const record = attendanceRecords.find(a => a.date === today) || attendanceRecords[attendanceRecords.length - 1];
  const presentIds = new Set((record?.presentStudentIds || []).map(x => String(x?.id || x?._id || x)));

  return {
    ...batch,
    id: String(batch.id || batch._id),
    courseId: batch.courseId ? String(batch.courseId?.id || batch.courseId?._id || batch.courseId) : '',
    courseName: batch.courseName || 'Course',
    schedule: batch.schedule || `${batch.startDate || ''}${batch.endDate ? ` - ${batch.endDate}` : ''}`,
    status: batch.status || 'Active',
    studentsCount: students.length,
    attendance: students.map((student, index) => {
      const studentId = String(student?.id || student?._id || student);
      return {
        studentId,
        studentName: student?.name || 'Student',
        rollNo: student?.rollNo || `LMS-${String(index + 1).padStart(3, '0')}`,
        present: presentIds.has(studentId) ? 1 : 0,
        total: record ? 1 : 0,
        percentage: record ? (presentIds.has(studentId) ? 100 : 0) : 100
      };
    })
  };
};

export const LMSProvider = ({ children }) => {
  const savedToken = localStorage.getItem(TOKEN_KEY);
  const savedUser = savedToken ? localStorage.getItem(USER_KEY) : null;

  const [currentUser, setCurrentUser] = useState(() => savedUser ? normalizeUser(JSON.parse(savedUser)) : null);
  const [users, setUsers] = useState(() => currentUser ? [currentUser] : []);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [batches, setBatches] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('lms_reviews_v3');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });
  const [platformFeedback, setPlatformFeedback] = useState(() => {
    const saved = localStorage.getItem('lms_platform_feedback_v3');
    return saved ? JSON.parse(saved) : [];
  });
  const [placements, setPlacements] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [mockTests, setMockTests] = useState([]);
  const [interviewTracks, setInterviewTracks] = useState([]);
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('lms_resume_v3');
    return saved ? JSON.parse(saved) : null;
  });
  const [fees, setFees] = useState(() => JSON.parse(localStorage.getItem('lms_fees_v3') || '[]'));
  const [leads, setLeads] = useState(() => JSON.parse(localStorage.getItem('lms_leads_v3') || '[]'));
  const [tickets, setTickets] = useState(() => JSON.parse(localStorage.getItem('lms_tickets_v3') || '[]'));

  const [activeTab, setActiveTab] = useState('dashboard');
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('lms_theme_v3') === 'dark');
  const [selectedCourseForPlayer, setSelectedCourseForPlayer] = useState(null);
  const [selectedLessonForMaterials, setSelectedLessonForMaterials] = useState(null);
  const [selectedMockTest, setSelectedMockTest] = useState(null);
  const [selectedInterviewTrack, setSelectedInterviewTrack] = useState(null);
  const [lastInterviewFeedback, setLastInterviewFeedback] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const token = () => localStorage.getItem(TOKEN_KEY);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const refreshUser = async () => {
    const data = await request('/auth/me', { token: token() });
    const user = normalizeUser(data.user);
    setCurrentUser(user);
    setUsers([user]);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  };

  const loadData = async (user = currentUser) => {
    if (!user || !token()) return;

    const tasks = [
      request('/courses', { token: token() }).then(data => setCourses((data || []).map(normalizeCourse))),
      request('/quizzes', { token: token() }).then(data => setQuizzes((data || []).map(normalizeQuiz))),
      request('/mock-tests', { token: token() }).then(data => setMockTests((data || []).map(normalizeMockTest))),
      request('/interviews', { token: token() }).then(data => setInterviewTracks((data || []).map(normalizeInterview))),
      request('/jobs', { token: token() }).then(data => setJobs((data || []).map(normalizeJob))),
      request('/placements', { token: token() }).then(data => setPlacements((data || []).map(normalizePlacement))),
      request('/assignments', { token: token() }).then(data => setAssignments((data || []).map(normalizeAssignment))),
      request('/discussions', { token: token() }).then(data => setDiscussions((data || []).map(normalizeDiscussion))),
      request('/certificates/mine', { token: token() }).then(data => setCertificates((data || []).map(normalizeCertificate))),
      request('/jobs/applications/mine', { token: token() }).then(data => setJobApplications((data || []).map(normalizeApplication))),
      request('/live-classes', { token: token() }).then(data => setLiveClasses((data || []).map(normalizeLiveClass)))
    ];

    if (user.role === 'admin' || user.role === 'trainer') {
      tasks.push(request('/batches', { token: token() }).then(data => setBatches((data || []).map(normalizeBatch))));
    } else {
      setBatches([]);
    }

    const results = await Promise.allSettled(tasks);
    const failures = results.filter(r => r.status === 'rejected');
    if (failures.length) console.warn('Some LMS data could not be loaded:', failures.map(f => f.reason?.message));
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('lms_theme_v3', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const loadPublicCourses = async () => {
      try {
        const data = await request('/courses');
        setCourses((data || []).map(normalizeCourse));
      } catch (err) {
        console.warn('Could not load public courses:', err.message);
      }
    };

    loadPublicCourses();

    if (currentUser && token()) {
      loadData(currentUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    else localStorage.removeItem(USER_KEY);
  }, [currentUser]);

  useEffect(() => localStorage.setItem('lms_reviews_v3', JSON.stringify(reviews)), [reviews]);
  useEffect(() => localStorage.setItem('lms_platform_feedback_v3', JSON.stringify(platformFeedback)), [platformFeedback]);
  useEffect(() => localStorage.setItem('lms_resume_v3', JSON.stringify(resumeData)), [resumeData]);
  useEffect(() => localStorage.setItem('lms_fees_v3', JSON.stringify(fees)), [fees]);
  useEffect(() => localStorage.setItem('lms_leads_v3', JSON.stringify(leads)), [leads]);
  useEffect(() => localStorage.setItem('lms_tickets_v3', JSON.stringify(tickets)), [tickets]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const login = async (email, password) => {
    try {
      const data = await request('/auth/login', {
        method: 'POST',
        body: { email, password }
      });

      localStorage.setItem(TOKEN_KEY, data.token);

      const user = normalizeUser(data.user);

      setCurrentUser(user);
      setUsers([user]);
      setActiveTab('dashboard');

      showToast(`Welcome back, ${user.name}!`);

      await loadData(user);

      return {
        success: true,
        user,
        message: 'Login successful.'
      };
    } catch (err) {
      showToast(err.message || 'Invalid credentials', 'error');

      return {
        success: false,
        message: err.message || 'Invalid credentials'
      };
    }
  };

  const signup = async (
  name,
  email,
  password,
  role = 'student',
  chosenCourse = ''
) => {
  try {
    const data = await request('/auth/register', {
      method: 'POST',
      body: {
        name,
        email,
        password,
        role,
        chosenCourse
      }
    });

    localStorage.setItem(
      TOKEN_KEY,
      data.token
    );

    const user = normalizeUser(data.user);

    setCurrentUser(user);
    setUsers([user]);
    setActiveTab('dashboard');

    showToast(
      'Account created successfully! Welcome to LMS.'
    );

    // Load all LMS data after registration.
    await loadData(user);

    return {
      success: true,
      user,
      message: 'Account created successfully.'
    };

  } catch (err) {
    showToast(
      err.message || 'Registration failed',
      'error'
    );

    return {
      success: false,
      message:
        err.message || 'Registration failed'
    };
  }
};

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setCurrentUser(null);
    setUsers([]);
    setCertificates([]);
    setJobApplications([]);
    showToast('You have been logged out.');
  };

  const getCourseProgress = (courseId, user = currentUser) => {
    if (!user) return 0;
    const course = courses.find(c => c.id === String(courseId));
    if (!course) return 0;
    const allLessonIds = course.modules?.flatMap(m => m.lessons?.map(l => String(l.id)) || []) || [];
    if (!allLessonIds.length) return 0;
    const completed = new Set((user.completedLessons || []).map(String));
    return Math.round((allLessonIds.filter(id => completed.has(id)).length / allLessonIds.length) * 100);
  };

  const enrollCourse = async (courseId) => {
    if (!currentUser) return false;
    try {
      const data = await request(`/courses/${courseId}/enroll`, { method: 'POST', token: token() });
      const updated = normalizeUser({ ...currentUser, enrolledCourses: data.enrolledCourses });
      setCurrentUser(updated);
      const course = courses.find(c => c.id === String(courseId));
      showToast(`Enrolled in ${course?.title || 'course'}!`);
      return true;
    } catch (err) {
      showToast(err.message, 'error');
      return false;
    }
  };

  const toggleLessonComplete = async (lessonId, courseId) => {
    if (!currentUser) return;
    try {
      const data = await request(`/courses/${courseId}/lessons/${encodeURIComponent(lessonId)}/complete`, { method: 'POST', token: token() });
      const updated = normalizeUser({
        ...currentUser,
        completedLessons: data.completedLessons,
        lessonCompletions: data.lessonCompletions,
        points: data.points ?? currentUser.points
      });
      setCurrentUser(updated);
      if (data.certificateIssued) {
        const cert = normalizeCertificate(data.certificateIssued);
        setCertificates(prev => [cert, ...prev.filter(c => c.certificateId !== cert.certificateId)]);
        showToast(`🎓 Course finished! Certificate ${cert.certificateId} issued!`);
      } else {
        const done = updated.completedLessons.includes(String(lessonId));
        showToast(done ? 'Lesson finished! +25 Learning XP ⭐' : 'Marked lesson as uncompleted', done ? 'success' : 'info');
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const issueCertificateForCourse = (courseId, student = currentUser) => {
    if (!student) return null;
    return certificates.find(c => c.courseId === String(courseId) && c.studentId === String(student.id)) || null;
  };

  const getCourseReviews = (courseId) => {
    const course = courses.find(c => c.id === String(courseId));
    const list = reviews.filter(r => String(r.courseId) === String(courseId)).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
    if (!list.length) return { list, average: course?.rating || 0, count: course?.reviewsCount || 0 };
    const average = Math.round((list.reduce((sum, r) => sum + Number(r.rating || 0), 0) / list.length) * 10) / 10;
    return { list, average, count: list.length };
  };

  const submitReview = (courseId, rating, comment) => {
    if (!currentUser) return;
    setReviews(prev => {
      const index = prev.findIndex(r => String(r.courseId) === String(courseId) && String(r.studentId) === String(currentUser.id));
      const entry = { id: index >= 0 ? prev[index].id : `rev_${Date.now()}`, courseId: String(courseId), studentId: currentUser.id, studentName: currentUser.name, rating, comment, createdAt: new Date().toISOString().split('T')[0] };
      if (index >= 0) { const next = [...prev]; next[index] = entry; return next; }
      return [entry, ...prev];
    });
    showToast('Thanks for your review!');
  };

  const addCourse = async (data) => {
    try {
      const stamp = Date.now();
      const payload = {
        title: data.title,
        category: data.category,
        description: data.description,
        duration: data.duration,
        level: data.level || 'Beginner to Advanced',
        instructor: currentUser?.name || 'Administrator',
        instructorId: currentUser?.id,
        thumbnail: data.thumbnail,
        price: data.price ?? 0,
        originalPrice: data.originalPrice ?? data.price ?? 0,
        rating: 5,
        reviewsCount: 0,
        enrolledCount: 0,
        modules: [{
          moduleId: `mod_${stamp}`,
          title: 'Module 1: Getting Started',
          lessons: [{ lessonId: `les_${stamp}`, title: '1. Introduction & Overview', duration: '15 min', videoUrl: data.videoUrl || '', resources: ['Course_Overview.pdf'] }]
        }]
      };
      const created = normalizeCourse(await request('/courses', { method: 'POST', body: payload, token: token() }));
      setCourses(prev => [created, ...prev]);
      showToast(`Course "${created.title}" created successfully!`);
      return created;
    } catch (err) { showToast(err.message, 'error'); return null; }
  };

  const deleteCourse = async (courseId) => {
    try {
      await request(`/courses/${courseId}`, { method: 'DELETE', token: token() });
      setCourses(prev => prev.filter(c => c.id !== String(courseId)));
      showToast('Course removed.', 'info');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const addQuiz = async (data) => {
    try {
      const payload = {
        title: data.title,
        courseId: data.courseId || undefined,
        courseTitle: data.courseTitle,
        durationMinutes: Number(data.durationMinutes) || 15,
        passingScore: Number(data.passingScore) || 70,
        questions: (data.questions || []).map(q => ({ question: q.question, options: q.options, correctAnswer: Number(q.correctAnswer) }))
      };
      const created = normalizeQuiz(await request('/quizzes', { method: 'POST', body: payload, token: token() }));
      setQuizzes(prev => [created, ...prev]);
      showToast(`Assessment "${created.title}" created!`);
      return created;
    } catch (err) { showToast(err.message, 'error'); return null; }
  };

  const deleteQuiz = async (quizId) => {
    try {
      await request(`/quizzes/${quizId}`, { method: 'DELETE', token: token() });
      setQuizzes(prev => prev.filter(q => q.id !== String(quizId)));
      showToast('Assessment removed.');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const submitQuizResult = async (quizId, scorePercentage, correctCount, totalCount, answers = null) => {
    if (!currentUser) return null;
    try {
      let result;
      if (answers) {
        result = await request(`/quizzes/${quizId}/submit`, { method: 'POST', body: { answers }, token: token() });
      } else {
        result = { scorePercentage, correctCount, totalCount };
      }
      const quiz = quizzes.find(q => q.id === String(quizId));
      const score = result.scorePercentage ?? scorePercentage;
      if (score >= (quiz?.passingScore || 70)) showToast(`Passed ${quiz?.title || 'quiz'}! Score: ${score}%`, 'success');
      else showToast(`Score: ${score}%. Minimum passing is ${quiz?.passingScore || 70}%.`, 'error');
      return result;
    } catch (err) { showToast(err.message, 'error'); return null; }
  };

  const submitMockTest = async (testId, answers) => {
    try {
      const result = await request(`/mock-tests/${testId}/submit`, {
        method: 'POST',
        body: { answers },
        token: token()
      });
      showToast(`Mock test submitted! Score: ${result.percentage}%`, 'success');
      return result;
    } catch (err) {
      showToast(err.message, 'error');
      return null;
    }
  };

  const submitMockInterview = async (trackId, responses, durationSeconds) => {
    try {
      const result = await request(`/interviews/${trackId}/submit`, {
        method: 'POST',
        body: { responses, durationSeconds },
        token: token()
      });
      return result;
    } catch (err) {
      showToast(err.message, 'error');
      return null;
    }
  };

  const addAssignment = async (data) => {
    try {
      const created = normalizeAssignment(await request('/assignments', { method: 'POST', body: { courseId: data.courseId, title: data.title, description: data.description, dueDate: data.dueDate }, token: token() }));
      setAssignments(prev => [created, ...prev]);
      showToast('Assignment created!');
      return created;
    } catch (err) { showToast(err.message, 'error'); return null; }
  };

  const deleteAssignment = async (id) => {
    try {
      await request(`/assignments/${id}`, { method: 'DELETE', token: token() });
      setAssignments(prev => prev.filter(a => a.id !== String(id)));
      showToast('Assignment deleted.');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const addDiscussionPost = async (title, content, tags = []) => {
    try {
      const created = normalizeDiscussion(await request('/discussions', { method: 'POST', body: { title, content, tags }, token: token() }));
      setDiscussions(prev => [created, ...prev]);
      showToast('Discussion question posted.');
      return created;
    } catch (err) { showToast(err.message, 'error'); return null; }
  };

  const deleteDiscussionPost = async (id) => {
    try {
      await request(`/discussions/${id}`, { method: 'DELETE', token: token() });
      setDiscussions(prev => prev.filter(d => d.id !== String(id)));
      showToast('Post deleted.');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const replyDiscussionPost = async (id, content) => {
    try {
      const updated = normalizeDiscussion(await request(`/discussions/${id}/reply`, { method: 'POST', body: { content }, token: token() }));
      setDiscussions(prev => prev.map(d => d.id === String(id) ? updated : d));
      showToast('Reply posted.');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const applyToJob = async (job) => {
    try {
      const application = normalizeApplication(await request(`/jobs/${job.id}/apply`, { method: 'POST', token: token() }));
      setJobApplications(prev => [application, ...prev.filter(a => a.jobId !== String(job.id))]);
      showToast(`Applied to ${job.title} at ${job.company}!`);
    } catch (err) { showToast(err.message, 'error'); }
  };

  const applyPlacementJob = async (placementId) => {
    try {
      const updated = normalizePlacement(await request(`/placements/${placementId}/apply`, { method: 'POST', token: token() }));
      setPlacements(prev => prev.map(p => p.id === String(placementId) ? updated : p));
      showToast('Placement application submitted!');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const updateResumeData = data => setResumeData(prev => ({ ...(prev || {}), ...data }));

  const submitPlatformFeedback = (message, rating) => {
    if (!currentUser || !message?.trim()) return;
    setPlatformFeedback(prev => [{ id: `fb_${Date.now()}`, studentId: currentUser.id, studentName: currentUser.name, message: message.trim(), rating: rating || 0, createdAt: new Date().toISOString() }, ...prev]);
    showToast('Thanks for your feedback!');
  };

  const addLiveClass = async (data) => {
    try {
      const created = normalizeLiveClass(await request('/live-classes', {
        method: 'POST',
        body: {
          courseId: data.courseId,
          title: data.title,
          instructor: data.instructor || currentUser?.name || 'Administrator',
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
          platform: data.platform || 'Google Meet',
          meetingLink: data.meetingLink,
          description: data.description || '',
          status: data.status || 'Scheduled'
        },
        token: token()
      }));
      setLiveClasses(prev => [created, ...prev]);
      showToast(`Live class "${created.title}" scheduled!`);
      return created;
    } catch (err) {
      showToast(err.message, 'error');
      return null;
    }
  };

  const updateLiveClass = async (id, data) => {
    try {
      const updated = normalizeLiveClass(await request(`/live-classes/${id}`, {
        method: 'PUT',
        body: data,
        token: token()
      }));
      setLiveClasses(prev => prev.map(item => item.id === String(id) ? updated : item));
      showToast('Live class updated successfully.');
      return updated;
    } catch (err) {
      showToast(err.message, 'error');
      return null;
    }
  };

  const deleteLiveClass = async (id) => {
    try {
      await request(`/live-classes/${id}`, { method: 'DELETE', token: token() });
      setLiveClasses(prev => prev.filter(item => item.id !== String(id)));
      showToast('Live class deleted.', 'info');
      return true;
    } catch (err) {
      showToast(err.message, 'error');
      return false;
    }
  };

  const addBatch = async data => {
    try {
      const created = normalizeBatch(await request('/batches', { method: 'POST', body: { name: data.name, courseId: data.courseId, courseName: data.courseName, schedule: data.schedule, status: 'Active', trainer: currentUser?.name }, token: token() }));
      setBatches(prev => [created, ...prev]);
      showToast(`Batch "${created.name}" created!`);
      return created;
    } catch (err) { showToast(err.message, 'error'); return null; }
  };

  const deleteBatch = async id => {
    try {
      await request(`/batches/${id}`, { method: 'DELETE', token: token() });
      setBatches(prev => prev.filter(b => b.id !== String(id)));
      showToast('Batch removed.');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const addStudentToBatch = async (batchId, studentName, rollNo) => {
    try {
      const updated = normalizeBatch(await request(`/batches/${batchId}/students`, { method: 'POST', body: { studentName, rollNo }, token: token() }));
      setBatches(prev => prev.map(b => b.id === String(batchId) ? updated : b));
      showToast(`Student \"${studentName}\" added to batch.`);
    } catch (err) { showToast(err.message, 'error'); }
  };

  const removeStudentFromBatch = async (batchId, studentId) => {
    try {
      const updated = normalizeBatch(await request(`/batches/${batchId}/students/${studentId}`, { method: 'DELETE', token: token() }));
      setBatches(prev => prev.map(b => b.id === String(batchId) ? updated : b));
      showToast('Student removed from batch.');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const markAttendance = async (batchId, studentId, isPresent) => {
    const batch = batches.find(b => b.id === String(batchId));
    if (!batch) return;
    const today = new Date().toISOString().split('T')[0];
    const presentStudentIds = (batch.attendance || []).filter(a => a.present > 0).map(a => a.studentId);
    const set = new Set(presentStudentIds);
    if (isPresent) set.add(String(studentId)); else set.delete(String(studentId));
    try {
      const updated = await request(`/batches/${batchId}/attendance`, { method: 'POST', body: { date: today, presentStudentIds: [...set] }, token: token() });
      setBatches(prev => prev.map(b => b.id === String(batchId) ? normalizeBatch(updated) : b));
      showToast('Attendance updated.');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const payFeeInvoice = (invoiceId, coupon) => setFees(prev => prev.map(f => f.invoiceId === invoiceId ? { ...f, status: 'Paid', coupon } : f));
  const updateLeadStage = (leadId, stage) => setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage } : l));
  const createSupportTicket = data => setTickets(prev => [{ id: `ticket_${Date.now()}`, ...data, createdAt: new Date().toISOString() }, ...prev]);

  return (
    <LMSContext.Provider value={{
      currentUser, users, courses, batches, quizzes, assignments, certificates, discussions, reviews,
      getCourseReviews, submitReview,
      liveClasses,
      addLiveClass, updateLiveClass, deleteLiveClass,
      platformFeedback, submitPlatformFeedback,
      activeTab, setActiveTab, courseSearchQuery, setCourseSearchQuery,
      darkMode, toggleDarkMode,
      selectedCourseForPlayer, setSelectedCourseForPlayer,
      selectedLessonForMaterials, setSelectedLessonForMaterials,
      mockTests, selectedMockTest, setSelectedMockTest, submitMockTest, submitMockInterview,
      interviewTracks, selectedInterviewTrack, setSelectedInterviewTrack,
      lastInterviewFeedback, setLastInterviewFeedback,
      jobs, jobApplications, applyToJob,
      placements, applyPlacementJob,
      resumeData, updateResumeData,
      fees, payFeeInvoice, leads, updateLeadStage, tickets, createSupportTicket,
      toastMessage, showToast,
      login, signup, logout,
      addCourse, deleteCourse,
      addBatch, deleteBatch, addStudentToBatch, removeStudentFromBatch, markAttendance,
      addQuiz, deleteQuiz, addAssignment, deleteAssignment,
      addDiscussionPost, deleteDiscussionPost, replyDiscussionPost,
      enrollCourse, toggleLessonComplete, getCourseProgress, issueCertificateForCourse, submitQuizResult
    }}>
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = () => useContext(LMSContext);
