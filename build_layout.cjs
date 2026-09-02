const fs = require('fs');
const path = require('path');

function write(filePath, content) {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Successfully wrote:', filePath);
}

// 1. Navbar.jsx
write('src/components/layout/Navbar.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { 
  GraduationCap, 
  Sparkles, 
  Bell, 
  UserCheck, 
  ChevronDown, 
  BookOpen, 
  Shield, 
  Laptop, 
  DollarSign, 
  Briefcase,
  Search,
  ExternalLink
} from 'lucide-react';

export const Navbar = ({ onOpenAITutor, onOpenAIQuiz }) => {
  const { currentUser, switchRole, activeTab, setActiveTab } = useLMS();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const roles = [
    { id: 'admin', label: 'Admin', desc: 'Manage system, users & settings', icon: Shield, color: 'text-purple-600' },
    { id: 'trainer', label: 'Trainer', desc: 'Courses, content, batches & exams', icon: Laptop, color: 'text-emerald-600' },
    { id: 'student', label: 'Student', desc: 'Courses, assignments, live classes', icon: BookOpen, color: 'text-blue-600' },
    { id: 'accountant', label: 'Accountant', desc: 'Fee, invoices & revenue', icon: DollarSign, color: 'text-amber-600' },
    { id: 'placement', label: 'Placement Officer', desc: 'Drives, companies & candidates', icon: Briefcase, color: 'text-rose-600' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white p-2.5 rounded-xl shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">LMS</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">SMART 2.0</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Institutes & Online Learning Hub</p>
            </div>
          </div>

          {/* Role Indicator Banner & Quick Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* AI Assistant Quick Launcher */}
            <button 
              onClick={onOpenAITutor}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm hover:shadow-md hover:opacity-95 transition-all ai-glow"
              title="Open AI Tutor & Code Explainer"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span className="hidden md:inline">AI Learning Tutor</span>
              <span className="md:hidden">AI</span>
            </button>

            {/* AI Quiz Generator */}
            <button 
              onClick={onOpenAIQuiz}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Quiz Generator</span>
            </button>

            {/* Public Certificate Verify Link */}
            <button
              onClick={() => setActiveTab('verify-cert')}
              className="hidden sm:flex items-center space-x-1 text-xs text-slate-600 hover:text-blue-600 font-medium px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Verify Certificate</span>
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-800 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="capitalize font-bold text-blue-700">{currentUser.role}</span>
                <span className="text-slate-400">|</span>
                <span className="hidden sm:inline text-slate-700">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Switch Testing Role</p>
                    <p className="text-xs text-slate-500">Instantly preview dashboard and permissions for any user type</p>
                  </div>
                  <div className="p-1 space-y-0.5">
                    {roles.map(r => {
                      const Icon = r.icon;
                      const isCurrent = currentUser.role === r.id;
                      return (
                        <button
                          key={r.id}
                          onClick={() => {
                            switchRole(r.id);
                            setRoleDropdownOpen(false);
                          }}
                          className={\`w-full flex items-start space-x-3 px-3 py-2 rounded-lg text-left transition-colors \${
                            isCurrent ? 'bg-blue-50/80 text-blue-700 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                          }\`}
                        >
                          <div className={\`p-1.5 rounded-md bg-slate-100 \${r.color}\`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-sm font-bold capitalize">{r.label}</span>
                              {isCurrent && <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-medium">Active</span>}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{r.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-8 h-8 rounded-full border-2 border-blue-500 object-cover shadow-sm" 
              />
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
`);

// 2. Sidebar.jsx
write('src/components/layout/Sidebar.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  Users,
  CalendarCheck,
  FileCheck2,
  DollarSign,
  Award,
  Sparkles,
  UserPlus,
  Briefcase,
  MessagesSquare,
  HelpCircle,
  BarChart3,
  ShieldAlert
} from 'lucide-react';

export const Sidebar = () => {
  const { currentUser, activeTab, setActiveTab } = useLMS();

  // Define navigation configuration by role
  const getNavItems = () => {
    switch (currentUser.role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
          { id: 'courses-manage', label: 'Course Catalog & Syllabus', icon: BookOpen },
          { id: 'batches', label: 'Batches & Rosters', icon: Users },
          { id: 'leads', label: 'Lead & Admission CRM', icon: UserPlus, badge: 'New Leads' },
          { id: 'fees', label: 'Fee & Revenue Ledger', icon: DollarSign },
          { id: 'placements', label: 'Placement Drives', icon: Briefcase },
          { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
          { id: 'tickets', label: 'Support Helpdesk', icon: HelpCircle }
        ];

      case 'trainer':
        return [
          { id: 'dashboard', label: 'Trainer Dashboard', icon: LayoutDashboard },
          { id: 'courses-manage', label: 'My Courses & Lessons', icon: BookOpen },
          { id: 'batches', label: 'Batch Attendance', icon: CalendarCheck, badge: 'Daily' },
          { id: 'live-classes', label: 'Live Classes (Zoom/Meet)', icon: Video },
          { id: 'assessments', label: 'Assessments & Grading', icon: FileCheck2 },
          { id: 'discussions', label: 'Class Discussions', icon: MessagesSquare }
        ];

      case 'student':
        return [
          { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
          { id: 'courses-catalog', label: 'Explore All Courses', icon: BookOpen },
          { id: 'my-learning', label: 'My Enrolled Courses', icon: Video, badge: 'Continue' },
          { id: 'live-classes', label: 'Live Lectures', icon: Video },
          { id: 'assessments', label: 'Quizzes & Assignments', icon: FileCheck2 },
          { id: 'certificates', label: 'Earned Certificates', icon: Award },
          { id: 'fees', label: 'Fees & Invoices', icon: DollarSign },
          { id: 'placements', label: 'Placement Portal', icon: Briefcase },
          { id: 'discussions', label: 'Discussion Forum', icon: MessagesSquare },
          { id: 'tickets', label: 'Helpdesk & Support', icon: HelpCircle }
        ];

      case 'accountant':
        return [
          { id: 'dashboard', label: 'Financial Dashboard', icon: LayoutDashboard },
          { id: 'fees', label: 'Fee Management & Invoices', icon: DollarSign },
          { id: 'analytics', label: 'Revenue & Audit Reports', icon: BarChart3 },
          { id: 'tickets', label: 'Billing Inquiries', icon: HelpCircle }
        ];

      case 'placement':
        return [
          { id: 'dashboard', label: 'Placement Dashboard', icon: LayoutDashboard },
          { id: 'placements', label: 'Campus Drives & Jobs', icon: Briefcase },
          { id: 'analytics', label: 'Placement Analytics', icon: BarChart3 }
        ];

      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      
      {/* Profile Header Widget */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center space-x-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" 
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-white truncate">{currentUser.name}</h4>
            <span className="inline-block uppercase tracking-wider text-[10px] font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>

      {/* Nav Link List */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 pb-2">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={\`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group \${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'
              }\`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={\`w-4 h-4 \${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}\`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={\`text-[10px] font-bold px-1.5 py-0.5 rounded \${
                  isActive ? 'bg-blue-700 text-white' : 'bg-slate-800 text-blue-400'
                }\`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* AI Assistant Banner at Bottom */}
      <div className="p-4 m-3 bg-gradient-to-br from-indigo-950/80 to-purple-950/80 rounded-2xl border border-indigo-800/40">
        <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold mb-1">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>AI Learning Suite</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          Need doubt clearance, code review, or dynamic quiz generation?
        </p>
        <button
          onClick={() => setActiveTab('discussions')}
          className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          Explore Community
        </button>
      </div>

      {/* Version footer */}
      <div className="p-3 text-center border-t border-slate-800/80 text-[11px] text-slate-500">
        LMS 2.0 • Complete Training Platform
      </div>
    </aside>
  );
};
`);

// 3. Footer.jsx
write('src/components/layout/Footer.jsx', `import React from 'react';
import { GraduationCap, Heart, ShieldCheck, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-blue-600 rounded text-white">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-700">LMS Platform 2.0</span>
          <span>• Complete Solution for Training Institutes & Online Learning</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-emerald-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Role-Based Access Verified</span>
          </span>
          <span className="flex items-center space-x-1 text-indigo-600 font-medium">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Powered</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
`);

console.log('Finished writing layout components.');
`;

write('src/components/layout/build_layout.cjs', 'console.log("Layout builder created")');
