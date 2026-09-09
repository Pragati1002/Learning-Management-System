import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { GraduationCap, Sparkles, LogOut, Search, Sun, Moon } from 'lucide-react';

export const Navbar = ({ onOpenAITutor, onOpenAIQuiz }) => {
  const { currentUser, logout, setActiveTab, setCourseSearchQuery, darkMode, toggleDarkMode } = useLMS();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCourseSearchQuery(searchInput);
    setActiveTab('courses-catalog');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* RSR LMS Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('dashboard')}>
            <div className="bg-purple-700 text-white p-2.5 rounded-2xl shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  RSR LMS
                </span>
                <span className="bg-purple-50 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  PRO
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Smart Learning System</span>
            </div>
          </div>

          {/* Udemy-style global course search */}
          {currentUser?.role !== 'admin' && (
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search for anything — Python, React, Interview Prep..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-50 dark:bg-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors"
                />
              </div>
            </form>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">

            {/* Dark / Light mode toggle */}
            <button
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            {/* AI Tutor Assistant Button */}
            <button 
              onClick={onOpenAITutor}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 dark:bg-purple-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:bg-slate-800 dark:hover:bg-purple-600 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Learning Tutor</span>
            </button>

            {/* AI Quiz Generator */}
            <button 
              onClick={onOpenAIQuiz}
              className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">AI Quiz Generator</span>
            </button>

            {/* User Info & Role Badge */}
            {currentUser && (
              <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-8 h-8 rounded-full border-2 border-purple-500 object-cover shadow-sm" 
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{currentUser.name}</p>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                      {currentUser.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
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
