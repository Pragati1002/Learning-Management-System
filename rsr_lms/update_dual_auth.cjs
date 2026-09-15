const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. AuthPage.jsx with dedicated Admin and Student Login & Register modes
save('src/pages/auth/AuthPage.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { 
  GraduationCap, 
  Shield, 
  BookOpen, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Building,
  KeyRound
} from 'lucide-react';

export const AuthPage = () => {
  const { login, signup } = useLMS();

  // Active Portal: 'student' | 'admin'
  const [portal, setPortal] = useState('student');
  // Active Mode: 'login' | 'register'
  const [mode, setMode] = useState('login');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [error, setError] = useState('');

  const handleSwitchPortal = (targetPortal) => {
    setPortal(targetPortal);
    setMode('login');
    setError('');
    setEmail(targetPortal === 'admin' ? 'admin@lms.com' : 'student@lms.com');
    setPassword(targetPortal === 'admin' ? 'admin' : 'student');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      const success = signup(name, email, password, portal);
      if (!success) {
        setError('An account with this email address already exists.');
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setError('Please provide both email and password.');
        return;
      }
      const success = login(email, password);
      if (!success) {
        setError('Invalid credentials. Please check your email and password.');
      }
    }
  };

  const handle1ClickFill = () => {
    if (portal === 'admin') {
      setEmail('admin@lms.com');
      setPassword('admin');
    } else {
      setEmail('student@lms.com');
      setPassword('student');
    }
  };

  const isAdmin = portal === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2 mb-4">
        <div className="inline-flex items-center space-x-2 p-2.5 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          LMS Learning Management Platform
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Choose your dedicated portal to sign in or create an account.
        </p>
      </div>

      {/* Main Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Portal Tabs Selector: Admin vs Student */}
        <div className="bg-slate-200/80 p-1.5 rounded-2xl flex space-x-1.5 mb-6 shadow-inner">
          <button
            type="button"
            onClick={() => handleSwitchPortal('student')}
            className={\`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 \${
              !isAdmin 
                ? 'bg-white text-blue-700 shadow-md shadow-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Student Portal</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchPortal('admin')}
            className={\`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 \${
              isAdmin 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'text-slate-600 hover:text-slate-900'
            }\`}
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span>Admin / Trainer Portal</span>
          </button>
        </div>

        {/* Auth Card */}
        <div className={\`bg-white py-8 px-6 sm:px-8 shadow-xl rounded-3xl border transition-all \${
          isAdmin ? 'border-purple-200 shadow-purple-500/5' : 'border-blue-200 shadow-blue-500/5'
        }\`}>
          
          {/* Portal Title Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center space-x-2.5">
              <div className={\`p-2 rounded-xl text-white \${isAdmin ? 'bg-purple-600' : 'bg-blue-600'}\`}>
                {isAdmin ? <Shield className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {isAdmin ? 'Administrator Portal' : 'Student Learner Portal'}
                </h2>
                <p className="text-xs text-slate-500">
                  {mode === 'login' ? 'Sign in to your account' : 'Register new account'}
                </p>
              </div>
            </div>

            {/* Mode Switch Pills */}
            <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-bold">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className={\`px-3 py-1 rounded-lg transition-all \${
                  mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }\`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); }}
                className={\`px-3 py-1 rounded-lg transition-all \${
                  mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }\`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Quick 1-Click Fill Helper */}
          {mode === 'login' && (
            <div className="mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-500 block">Default Credentials</span>
                <span className="text-xs font-semibold text-slate-800">
                  {isAdmin ? 'admin@lms.com • pwd: admin' : 'student@lms.com • pwd: student'}
                </span>
              </div>
              <button
                type="button"
                onClick={handle1ClickFill}
                className={\`px-3 py-1.5 text-xs font-bold text-white rounded-lg shadow-sm transition-all \${
                  isAdmin ? 'bg-purple-700 hover:bg-purple-800' : 'bg-blue-600 hover:bg-blue-700'
                }\`}
              >
                Auto Fill
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Registration Fields */}
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder={isAdmin ? 'e.g. Dr. Rajesh Sharma' : 'e.g. Aarav Patel'}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {isAdmin && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Institute / Academy Name</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={orgName}
                        onChange={e => setOrgName(e.target.value)}
                        placeholder="e.g. Apex Learning Institute"
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {isAdmin ? 'Administrator Email' : 'Student Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={isAdmin ? 'admin@lms.com' : 'student@lms.com'}
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

            <button
              type="submit"
              className={\`w-full py-3 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 \${
                isAdmin 
                  ? 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
              }\`}
            >
              <span>
                {mode === 'register' 
                  ? (isAdmin ? 'Register Admin Account' : 'Register Student Account')
                  : (isAdmin ? 'Sign In as Administrator' : 'Sign In as Student')
                }
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Mode Switch Footer */}
          <div className="text-center pt-4 border-t border-slate-100 mt-5">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
              }}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              {mode === 'login'
                ? (isAdmin ? "Don't have an admin account? Register as Admin" : "New to LMS? Create a free Student Account")
                : (isAdmin ? "Already registered as Admin? Sign In" : "Already have a Student account? Sign In")
              }
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
`);

// 2. Update App.jsx to use AuthPage
save('src/App.jsx', `import React, { useState } from 'react';
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

import { CheckCircle2, AlertCircle } from 'lucide-react';

export function LMSApp() {
  const { currentUser, activeTab, toastMessage, certificates } = useLMS();

  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [aiQuizOpen, setAiQuizOpen] = useState(false);
  const [selectedCertModal, setSelectedCertModal] = useState(null);

  // If user is not logged in, render the dedicated Admin & Student Auth Page
  if (!currentUser) {
    return <AuthPage />;
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

console.log('AuthPage & App.jsx created successfully.');
