import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { CheckCircle2, TrendingUp, RotateCcw, LayoutDashboard } from 'lucide-react';

export const AIInterviewFeedbackPage = () => {
  const { lastInterviewFeedback, setActiveTab } = useLMS();

  if (!lastInterviewFeedback) {
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
        <p className="text-sm text-slate-500">No interview feedback yet — complete a mock interview first.</p>
        <button
          onClick={() => setActiveTab('mock-interview')}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl"
        >
          Start a Mock Interview
        </button>
      </div>
    );
  }

  const { role, score, strengths, improvements, questionCount } = lastInterviewFeedback;
  const grade = score >= 85 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Fair' : 'Needs Work';
  const ringColor = score >= 85 ? '#10b981' : score >= 70 ? '#9333ea' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Interview Feedback</h1>
        <p className="text-sm text-slate-500 mt-1">{role} • {questionCount} Questions Answered</p>
      </div>

      {/* Score Circle */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center space-y-3">
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center relative"
          style={{ background: `conic-gradient(${ringColor} ${score * 3.6}deg, #e2e8f0 0deg)` }}
        >
          <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-slate-900">{score}</span>
            <span className="text-[10px] font-bold text-slate-400">/100</span>
          </div>
        </div>
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ringColor }}>Overall Performance: {grade}</p>
      </div>

      {/* Strengths */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <h3 className="font-extrabold text-slate-900 text-sm">Strengths</h3>
        </div>
        <ul className="space-y-1.5">
          {strengths.map((s, i) => (
            <li key={i} className="text-sm text-slate-600 flex items-start space-x-2">
              <span className="text-emerald-500 mt-0.5">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Improvements */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-amber-600" />
          <h3 className="font-extrabold text-slate-900 text-sm">Areas to Improve</h3>
        </div>
        <ul className="space-y-1.5">
          {improvements.map((s, i) => (
            <li key={i} className="text-sm text-slate-600 flex items-start space-x-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('mock-interview')}
          className="flex-1 flex items-center justify-center space-x-1.5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Another Interview</span>
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex-1 flex items-center justify-center space-x-1.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
};
