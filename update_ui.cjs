const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. Navbar.jsx
save('src/components/layout/Navbar.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { GraduationCap, Sparkles, LogOut, User, Shield, BookOpen } from 'lucide-react';

export const Navbar = ({ onOpenAITutor, onOpenAIQuiz }) => {
  const { currentUser, logout, setActiveTab } = useLMS();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">LMS Portal</span>
              <span className="text-[11px] text-slate-500 block font-medium">Smart Learning System</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* AI Tutor Assistant Button */}
            <button 
              onClick={onOpenAITutor}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:opacity-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Learning Tutor</span>
            </button>

            {/* AI Quiz Generator */}
            <button 
              onClick={onOpenAIQuiz}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl hover:bg-emerald-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Quiz</span>
            </button>

            {/* User Info & Role Badge */}
            {currentUser && (
              <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
                <div className="flex items-center space-x-2">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-8 h-8 rounded-full border border-slate-300 object-cover" 
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
                    <span className={\`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded \${
                      currentUser.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }\`}>
                      {currentUser.role}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
`);

// 2. Sidebar.jsx
save('src/components/layout/Sidebar.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  FileCheck2,
  Award,
  MessagesSquare,
  Sparkles
} from 'lucide-react';

export const Sidebar = () => {
  const { currentUser, activeTab, setActiveTab } = useLMS();

  const getNavItems = () => {
    if (currentUser?.role === 'admin') {
      return [
        { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
        { id: 'courses-manage', label: 'Course Creator & Manager', icon: PlusCircle },
        { id: 'courses-catalog', label: 'Explore All Courses', icon: BookOpen },
        { id: 'batches', label: 'Batches & Attendance', icon: Users },
        { id: 'assessments', label: 'Assessments & Quizzes', icon: FileCheck2 },
        { id: 'discussions', label: 'Community Forum', icon: MessagesSquare }
      ];
    }

    return [
      { id: 'dashboard', label: 'My Learning Desk', icon: LayoutDashboard },
      { id: 'courses-catalog', label: 'Browse Courses', icon: BookOpen },
      { id: 'my-learning', label: 'Active Course Player', icon: BookOpen },
      { id: 'assessments', label: 'Quizzes & Certification', icon: FileCheck2 },
      { id: 'certificates', label: 'My Earned Certificates', icon: Award },
      { id: 'discussions', label: 'Community Forum', icon: MessagesSquare }
    ];
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 text-slate-700 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      
      {/* Profile summary */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center space-x-3">
          <img 
            src={currentUser?.avatar} 
            alt={currentUser?.name} 
            className="w-10 h-10 rounded-full border border-slate-200 object-cover" 
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-slate-900 truncate">{currentUser?.name}</h4>
            <p className="text-xs text-slate-500 capitalize">{currentUser?.role === 'admin' ? 'Administrator' : 'Student Learner'}</p>
          </div>
        </div>
      </div>

      {/* Navigation list */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2">
          {currentUser?.role === 'admin' ? 'Administration' : 'Learning Navigation'}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={\`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all \${
                isActive 
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }\`}
            >
              <Icon className={\`w-4 h-4 \${isActive ? 'text-white' : 'text-slate-400'}\`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* AI Box in Sidebar */}
      <div className="p-4 m-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/60">
        <div className="flex items-center space-x-1.5 text-blue-700 text-xs font-bold mb-1">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Interactive AI Tutor</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5">
          Ask questions, get step-by-step coding explanations, and generate custom practice tests.
        </p>
        <button
          onClick={() => setActiveTab('discussions')}
          className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          Community Forum
        </button>
      </div>

    </aside>
  );
};
`);

// 3. AdminDashboard.jsx (Simplified & Practical)
save('src/pages/dashboards/AdminDashboard.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { BookOpen, Users, Award, PlusCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const AdminDashboard = () => {
  const { courses, batches, users, certificates, setActiveTab } = useLMS();

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold rounded-full">
            ADMINISTRATOR WORKSPACE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Admin Learning & Course Manager</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
            Create new learning courses, manage structured lesson video links, track student enrollments, and issue certificates.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('courses-manage')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Published Courses</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{courses.length} Courses</h3>
          <p className="text-xs text-slate-500 mt-1">Ready for student learning</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Registered Users</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{users.length} Users</h3>
          <p className="text-xs text-slate-500 mt-1">Admin & Student accounts</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Issued Certificates</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{certificates.length} Verified</h3>
          <p className="text-xs text-slate-500 mt-1">Authentic completion tokens</p>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base">Current Published Courses</h3>
          <button onClick={() => setActiveTab('courses-manage')} className="text-xs text-blue-600 font-bold hover:underline">
            Manage All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map(c => (
            <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <img src={c.thumbnail} alt={c.title} className="w-full h-32 rounded-xl object-cover mb-2" />
                <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {c.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1 line-clamp-1">{c.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{c.modules?.length || 0} Modules • {c.duration}</p>
              </div>
              <button
                onClick={() => setActiveTab('courses-manage')}
                className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Edit / View Lessons
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
`);

// 4. StudentDashboard.jsx (Simplified & Focused on Learning)
save('src/pages/dashboards/StudentDashboard.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { BookOpen, Award, PlayCircle, Clock, Sparkles } from 'lucide-react';

export const StudentDashboard = ({ onOpenCertificate }) => {
  const { currentUser, courses, certificates, getCourseProgress, setSelectedCourseForPlayer, setActiveTab } = useLMS();

  const enrolledCourses = courses.filter(c => currentUser?.enrolledCourses?.includes(c.id));

  return (
    <div className="space-y-6">
      
      {/* Learner Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-white/20 text-white text-xs font-bold rounded-full">
            STUDENT DASHBOARD
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Welcome, {currentUser?.name}!</h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
            Pick up right where you left off. Watch video tutorials, follow along with resources, and complete certification exams.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('courses-catalog')}
          className="px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
        >
          Explore All Courses
        </button>
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg">My Enrolled Courses</h3>
        
        {enrolledCourses.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
            <p className="text-sm text-slate-500">You have not enrolled in any courses yet.</p>
            <button
              onClick={() => setActiveTab('courses-catalog')}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolledCourses.map(course => {
              const progress = getCourseProgress(course.id);
              return (
                <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3.5">
                    <img src={course.thumbnail} alt={course.title} className="w-20 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {course.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1 line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{course.modules?.length || 0} Modules • {course.duration}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Progress</span>
                      <span className="text-blue-700">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: \`\${progress}%\` }}></div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourseForPlayer(course);
                      setActiveTab('course-player');
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Open Classroom Video Player</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Earned Certificates */}
      {certificates.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-900 text-base">Earned Verified Credentials</h3>
          </div>

          <div className="space-y-3">
            {certificates.map(cert => (
              <div key={cert.certificateId} className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{cert.courseName}</h4>
                  <p className="text-xs text-slate-600">Issued: {cert.issueDate} • Grade: {cert.grade}</p>
                  <p className="text-xs font-mono font-bold text-blue-700">Token ID: {cert.certificateId}</p>
                </div>
                <button
                  onClick={() => onOpenCertificate(cert)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  View & Print
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
`);

// 5. App.jsx (Clean & Authenticated)
save('src/App.jsx', `import React, { useState } from 'react';
import { useLMS } from './context/LMSContext';
import { LoginPage } from './pages/auth/LoginPage';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Modals
import { AITutorDrawer } from './components/ai/AITutorDrawer';
import { AIQuizModal } from './components/ai/AIQuizModal';
import { CertificateModal } from './components/certificates/CertificateModal';

// Dashboards
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { StudentDashboard } from './pages/dashboards/StudentDashboard';

// Pages
import { CourseCatalogPage } from './pages/courses/CourseCatalogPage';
import { CoursePlayerPage } from './pages/courses/CoursePlayerPage';
import { CourseManagerPage } from './pages/courses/CourseManagerPage';
import { BatchAttendancePage } from './pages/batches/BatchAttendancePage';
import { AssessmentPage } from './pages/assessments/AssessmentPage';
import { DiscussionPage } from './pages/crm/DiscussionPage';

import { CheckCircle2, AlertCircle } from 'lucide-react';

export function LMSApp() {
  const { currentUser, activeTab, toastMessage, certificates } = useLMS();

  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [aiQuizOpen, setAiQuizOpen] = useState(false);
  const [selectedCertModal, setSelectedCertModal] = useState(null);

  // If user is not logged in, show the clean Login Page
  if (!currentUser) {
    return <LoginPage />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentUser.role === 'admin') return <AdminDashboard />;
        return <StudentDashboard onOpenCertificate={setSelectedCertModal} />;

      case 'courses-catalog':
        return <CourseCatalogPage />;

      case 'my-learning':
      case 'course-player':
        return <CoursePlayerPage />;

      case 'courses-manage':
        return <CourseManagerPage />;

      case 'batches':
        return <BatchAttendancePage />;

      case 'assessments':
        return <AssessmentPage />;

      case 'discussions':
        return <DiscussionPage />;

      case 'certificates':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Earned Verified Credentials</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {certificates.map(c => (
                <div key={c.certificateId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Verified Credential</span>
                  <h3 className="font-bold text-slate-900 text-base">{c.courseName}</h3>
                  <p className="text-xs text-slate-500">Issued: {c.issueDate} • Grade: {c.grade}</p>
                  <p className="text-xs font-mono font-bold text-blue-700">Token ID: {c.certificateId}</p>
                  <button
                    onClick={() => setSelectedCertModal(c)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    View Official Certificate & Print
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return currentUser.role === 'admin' ? <AdminDashboard /> : <StudentDashboard onOpenCertificate={setSelectedCertModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className={\`flex items-center space-x-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-semibold \${
            toastMessage.type === 'error'
              ? 'bg-red-600 text-white border-red-700 shadow-red-500/20'
              : 'bg-slate-900 text-white border-slate-800 shadow-slate-900/30'
          }\`}>
            {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        onOpenAITutor={() => setAiTutorOpen(true)}
        onOpenAIQuiz={() => setAiQuizOpen(true)}
      />

      {/* App Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Modals & AI Tools */}
      <AITutorDrawer
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
      />

      <AIQuizModal
        isOpen={aiQuizOpen}
        onClose={() => setAiQuizOpen(false)}
      />

      <CertificateModal
        certificate={selectedCertModal}
        isOpen={!!selectedCertModal}
        onClose={() => setSelectedCertModal(null)}
      />

      <Footer />
    </div>
  );
}

export default function App() {
  return <LMSApp />;
}
`);

console.log('UI & App.jsx successfully updated.');
