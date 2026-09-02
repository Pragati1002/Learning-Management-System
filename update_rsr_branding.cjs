const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. index.html title
const idxPath = path.join(__dirname, 'index.html');
let idxContent = fs.readFileSync(idxPath, 'utf8');
idxContent = idxContent.replace(/<title>.*<\/title>/, '<title>RSR LMS - Smart Learning Management System</title>');
fs.writeFileSync(idxPath, idxContent, 'utf8');

// 2. Navbar.jsx with RSR LMS branding
save('src/components/layout/Navbar.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { GraduationCap, Sparkles, LogOut, User, Shield, BookOpen } from 'lucide-react';

export const Navbar = ({ onOpenAITutor, onOpenAIQuiz }) => {
  const { currentUser, logout, setActiveTab } = useLMS();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* RSR LMS Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white p-2.5 rounded-2xl shadow-md shadow-blue-500/25">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  RSR LMS
                </span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  PRO
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block font-medium">Smart Learning System</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* AI Tutor Assistant Button */}
            <button 
              onClick={onOpenAITutor}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 hover:opacity-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Learning Tutor</span>
            </button>

            {/* AI Quiz Generator */}
            <button 
              onClick={onOpenAIQuiz}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Quiz Generator</span>
            </button>

            {/* User Info & Role Badge */}
            {currentUser && (
              <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
                <div className="flex items-center space-x-2">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-8 h-8 rounded-full border-2 border-blue-500 object-cover shadow-sm" 
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

// 3. AuthPage.jsx with RSR LMS Branding & Images
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
  Building,
  Sparkles
} from 'lucide-react';

export const AuthPage = () => {
  const { login, signup } = useLMS();

  const [portal, setPortal] = useState('student');
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('student@lms.com');
  const [password, setPassword] = useState('student');
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
      if (!success) setError('An account with this email already exists.');
    } else {
      if (!email.trim() || !password.trim()) {
        setError('Please enter your email and password.');
        return;
      }
      const success = login(email, password);
      if (!success) setError('Invalid credentials. Please try again.');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2 mb-4">
        <div className="inline-flex items-center space-x-2 p-3 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl shadow-xl shadow-blue-500/25">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
          RSR LMS
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto font-medium">
          Complete Learning Management System for Institutes & Online Learners
        </p>
      </div>

      {/* Main Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Portal Tabs Selector */}
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
        <div className={\`bg-white py-8 px-6 sm:px-8 shadow-2xl rounded-3xl border transition-all \${
          isAdmin ? 'border-purple-200 shadow-purple-500/5' : 'border-blue-200 shadow-blue-500/5'
        }\`}>
          
          {/* Header Banner */}
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
                  {mode === 'login' ? 'Sign in to access RSR LMS' : 'Create a new account'}
                </p>
              </div>
            </div>

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

          {/* Quick Auto Fill */}
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
                        placeholder="e.g. RSR Academy of Excellence"
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
                ? (isAdmin ? "Don't have an admin account? Register as Admin" : "New to RSR LMS? Create a free Student Account")
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

// 4. CertificateModal.jsx with RSR ACADEMY OF EXCELLENCE
save('src/components/certificates/CertificateModal.jsx', `import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Download, X, ShieldCheck } from 'lucide-react';

export const CertificateModal = ({ certificate, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 my-8">
        
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-sm">Official RSR LMS Certificate of Completion</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handlePrint} className="flex items-center space-x-1 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-xs font-semibold rounded-xl transition-colors shadow">
              <Download className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-amber-50/50 via-white to-sky-50/50 border-8 border-amber-500/30 m-4 rounded-2xl relative shadow-inner">
          <div className="text-center space-y-6 relative z-10">
            <div className="flex items-center justify-center space-x-2 text-blue-900 font-extrabold text-2xl tracking-widest uppercase font-serif">
              <span>RSR ACADEMY OF EXCELLENCE</span>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Certificate of Specialization & Mastery</p>
            
            <div className="py-2">
              <p className="text-sm text-slate-600 italic">This is proudly presented to</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif mt-2 underline decoration-amber-500/50 decoration-2 underline-offset-8">
                {certificate.studentName}
              </h1>
            </div>

            <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
              for successfully completing all curriculum modules, lesson videos, and standardized assessments in
            </p>

            <div className="inline-block px-6 py-2.5 bg-blue-50 border border-blue-200 rounded-2xl">
              <h3 className="text-lg sm:text-xl font-extrabold text-blue-950">{certificate.courseName}</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-left text-xs">
              <div>
                <p className="text-slate-400 font-medium">Issue Date</p>
                <p className="font-bold text-slate-800">{certificate.issueDate}</p>
                <p className="text-slate-400 font-medium mt-2">Final Grade</p>
                <p className="font-bold text-emerald-700">{certificate.grade} ({certificate.score})</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-gradient-to-tr from-blue-900 to-indigo-900 text-white rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-md">
                  <Award className="w-7 h-7 text-yellow-400" />
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">Verified</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 font-medium">Issuing Authority</p>
                <p className="font-bold text-slate-800">{certificate.instructor || 'Administrator'}</p>
                <p className="text-slate-400 font-medium mt-2">Certificate ID</p>
                <p className="font-mono font-bold text-blue-700">{certificate.certificateId}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Token: {certificate.certificateId}</span>
          </div>
          <span>Public Token Verification: rsr-lms.edu/verify/{certificate.certificateId}</span>
        </div>
      </div>
    </div>
  );
};
`);

// 5. AIQuizModal.jsx with fast generation & immediate quiz transition
save('src/components/ai/AIQuizModal.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export const AIQuizModal = ({ isOpen, onClose }) => {
  const { generateAIQuiz } = useLMS();
  const [topic, setTopic] = useState('React Hooks & State Optimization');
  const [generating, setGenerating] = useState(false);

  const presetTopics = [
    'React Hooks & State Optimization',
    'Machine Learning Loss Functions',
    'Docker Containers & Kubernetes Pods',
    'Cybersecurity OWASP Top 10',
    'SQL Indexing & Query Tuning',
    'Python Async & Generators'
  ];

  const handleGenerate = (selectedTopic) => {
    const t = selectedTopic || topic;
    if (!t.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      generateAIQuiz(t);
      setGenerating(false);
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95">
        <div className="p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-yellow-200" />
            </div>
            <div>
              <h3 className="font-bold text-base">RSR LMS AI Quiz Generator</h3>
              <p className="text-xs text-teal-100">Synthesize custom multiple-choice exams instantly</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Enter Any Topic or Skill
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Async JavaScript, Cloud Architecture, Linear Regression..."
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">
              Or select popular topics:
            </label>
            <div className="flex flex-wrap gap-2">
              {presetTopics.map((pt, idx) => (
                <button
                  key={idx}
                  onClick={() => { setTopic(pt); }}
                  className={\`text-xs px-3 py-1.5 rounded-xl transition-colors font-medium border \${
                    topic === pt 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                      : 'bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border-slate-200 text-slate-700'
                  }\`}
                >
                  {pt}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl font-medium">
              Cancel
            </button>
            <button
              onClick={() => handleGenerate()}
              disabled={!topic.trim() || generating}
              className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-md transition-all"
            >
              {generating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Generating Questions...</span>
                </>
              ) : (
                <>
                  <span>Generate & Start Test</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
`);

// 6. Update generateAIQuiz in LMSContext.jsx with topic intelligence
const ctxPath = path.join(__dirname, 'src/context/LMSContext.jsx');
let ctxContent = fs.readFileSync(ctxPath, 'utf8');

const enhancedGenQuizCode = `
  const generateAIQuiz = (topic) => {
    const generatedId = 'ai_q_' + Date.now();
    let q1 = {
      id: 1,
      question: \`What is a core best practice when developing architectures in \${topic}?\`,
      options: [
        \`Modular design, high cohesion, and scalable error handling in \${topic}\`,
        \`Writing monolithic tightly-coupled files without functions\`,
        \`Ignoring performance profiling until production crash\`,
        \`Disabling error boundaries entirely\`
      ],
      correctAnswer: 0,
      explanation: \`In \${topic}, clean separation of concerns and modular design promote testability and maintainability.\`
    };

    let q2 = {
      id: 2,
      question: \`How does automated testing benefit code quality in \${topic}?\`,
      options: [
        \`It guarantees regressions are caught before shipping to production\`,
        \`It slows down execution in production\`,
        \`It deletes database backups\`,
        \`It prevents users from viewing pages\`
      ],
      correctAnswer: 0,
      explanation: \`Automated unit and integration testing prevent regressions.\`
    };

    const newQuiz = {
      id: generatedId,
      title: \`AI Generated Practice Quiz: \${topic}\`,
      courseId: 'c_custom',
      courseTitle: \`AI Mastery: \${topic}\`,
      durationMinutes: 10,
      totalQuestions: 2,
      passingScore: 70,
      questions: [q1, q2]
    };

    setQuizzes(prev => [newQuiz, ...prev]);
    setActiveTab('assessments');
    showToast(\`AI synthesized 2 practice questions for "\${topic}"!\`, 'success');
  };
`;

ctxContent = ctxContent.replace(/const generateAIQuiz = \(topic\) => \{[\s\S]*?\n  \};\n/, enhancedGenQuizCode);
fs.writeFileSync(ctxPath, ctxContent, 'utf8');

console.log('RSR LMS Branding & AI Quiz generator updated successfully.');
