const fs = require('fs');
const path = require('path');
const appPath = path.join(__dirname, 'src/App.jsx');

const code = `import React, { useState } from 'react';
import { useLMS } from './context/LMSContext';
import { AuthPage } from './pages/auth/AuthPage';
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

import { CheckCircle2, AlertCircle, Lock, Award, PlayCircle, ArrowRight, Sparkles } from 'lucide-react';

export function LMSApp() {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    toastMessage, 
    courses, 
    certificates, 
    getCourseProgress, 
    setSelectedCourseForPlayer,
    toggleLessonComplete
  } = useLMS();

  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [aiQuizOpen, setAiQuizOpen] = useState(false);
  const [selectedCertModal, setSelectedCertModal] = useState(null);
  const [lockedCoursePrompt, setLockedCoursePrompt] = useState(null);

  if (!currentUser) {
    return <AuthPage />;
  }

  const handleOpenCertificate = (course) => {
    const progress = getCourseProgress(course.id);
    const existingCert = certificates.find(c => c.courseId === course.id && c.studentId === currentUser.id);

    if (progress === 100 || existingCert) {
      const certToView = existingCert || {
        certificateId: 'LMS-CERT-2026-' + Math.floor(100 + Math.random() * 900),
        studentId: currentUser.id,
        studentName: currentUser.name,
        courseId: course.id,
        courseName: course.title,
        issueDate: new Date().toISOString().split('T')[0],
        score: '100%',
        grade: 'A+ (Excellence)',
        instructor: course.instructor || 'Administrator',
        verified: true
      };
      setSelectedCertModal(certToView);
    } else {
      setLockedCoursePrompt({
        course,
        progress
      });
    }
  };

  const handleFastCompleteAndUnlock = (course) => {
    const allLessons = course.modules?.flatMap(m => m.lessons) || [];
    allLessons.forEach(l => {
      if (!currentUser?.completedLessons?.includes(l.id)) {
        toggleLessonComplete(l.id, course.id);
      }
    });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentUser.role === 'admin') return <AdminDashboard />;
        return <StudentDashboard onOpenCertificate={handleOpenCertificate} />;

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
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Course Certificates & Credentials</h1>
              <p className="text-sm text-slate-500 mt-1">
                Certificates are unlocked and generated once you complete 100% of the lessons in a course.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {courses.map(course => {
                const progress = getCourseProgress(course.id);
                const isUnlocked = progress === 100 || certificates.some(c => c.courseId === course.id && c.studentId === currentUser.id);

                return (
                  <div key={course.id} className={\`p-6 rounded-3xl border shadow-sm flex flex-col justify-between space-y-4 transition-all \${
                    isUnlocked ? 'bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/70 border-emerald-300 shadow-emerald-500/10' : 'bg-white border-slate-200'
                  }\`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {course.category}
                        </span>
                        {isUnlocked ? (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>100% Completed (Unlocked)</span>
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center space-x-1">
                            <Lock className="w-3.5 h-3.5" />
                            <span>{progress}% Completed (Locked)</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-lg mt-2.5">{course.title}</h3>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-500">Progress</span>
                          <span className={isUnlocked ? 'text-emerald-700 font-bold' : 'text-blue-700 font-bold'}>{progress}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
                          <div 
                            className={\`h-full transition-all duration-500 \${isUnlocked ? 'bg-emerald-500' : 'bg-blue-600'}\`} 
                            style={{ width: \`\${progress}%\` }}
                          ></div>
                        </div>
                      </div>

                      {!isUnlocked ? (
                        <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-900 mt-4 space-y-1.5">
                          <p>
                            🔒 <strong>Certificate Locked:</strong> Finish all course video lessons ({progress}% finished) to generate your verified certificate.
                          </p>
                          <button
                            onClick={() => handleFastCompleteAndUnlock(course)}
                            className="text-[11px] font-bold text-amber-700 hover:text-amber-900 underline block"
                          >
                            ⚡ Quick Test: Auto-Complete & Unlock Now
                          </button>
                        </div>
                      ) : (
                        <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs text-emerald-900 mt-4 flex items-center space-x-2">
                          <Award className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>
                            🎓 <strong>Certificate Unlocked & Verified:</strong> Official credential token issued for {currentUser.name}.
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      {isUnlocked ? (
                        <button
                          onClick={() => handleOpenCertificate(course)}
                          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2"
                        >
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span>View Official Certificate & Print</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedCourseForPlayer(course);
                            setActiveTab('course-player');
                          }}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Complete Course Lessons ({progress}%) →</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return currentUser.role === 'admin' ? <AdminDashboard /> : <StudentDashboard onOpenCertificate={handleOpenCertificate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
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

      <Navbar
        onOpenAITutor={() => setAiTutorOpen(true)}
        onOpenAIQuiz={() => setAiQuizOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {renderActiveView()}
        </main>
      </div>

      {lockedCoursePrompt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Finish Course to Unlock Certificate</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your current progress in <strong>{lockedCoursePrompt.course.title}</strong> is <strong>{lockedCoursePrompt.progress}%</strong>. Finish all lesson videos to unlock your certificate.
            </p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full" style={{ width: \`\${lockedCoursePrompt.progress}%\` }}></div>
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setLockedCoursePrompt(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCourseForPlayer(lockedCoursePrompt.course);
                  setLockedCoursePrompt(null);
                  setActiveTab('course-player');
                }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center space-x-1"
              >
                <span>Resume Lessons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <CertificateModal
        certificate={selectedCertModal}
        isOpen={!!selectedCertModal}
        onClose={() => setSelectedCertModal(null)}
      />

      <AITutorDrawer
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
      />

      <AIQuizModal
        isOpen={aiQuizOpen}
        onClose={() => setAiQuizOpen(false)}
      />

      <Footer />
    </div>
  );
}

export default function App() {
  return <LMSApp />;
}
`;

fs.writeFileSync(appPath, code, 'utf8');
console.log('App.jsx updated with dynamic unlock.');
