import React from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  FileCheck2,
  Award,
  MessagesSquare,
  Sparkles,
  ClipboardList,
  UserCog
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
      { id: 'practice-quizzes', label: 'Practice & Quizzes', icon: FileCheck2 },
      { id: 'mock-test', label: 'Mock Tests', icon: ClipboardList },
      { id: 'mock-interview', label: 'Mock Interviews', icon: UserCog },
      { id: 'assessments', label: 'Assignments', icon: FileCheck2 },
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
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
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
