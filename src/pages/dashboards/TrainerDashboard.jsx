import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { BookOpen, Users, Video, FileCheck2, CheckCircle2, ArrowRight } from 'lucide-react';

export const TrainerDashboard = ({ onOpenLiveClass }) => {
  const { courses, batches, assignments, liveClasses, setActiveTab } = useLMS();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold rounded-full">
            FACULTY & TRAINER HUB
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Instructor Workstation</h1>
          <p className="text-sm text-emerald-100 max-w-xl mt-1">
            Manage your batches, launch live Zoom/Meet lectures, evaluate student assignments, and track daily attendance.
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onOpenLiveClass(liveClasses[0])}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-1.5"
          >
            <Video className="w-4 h-4" />
            <span>Launch Live Class</span>
          </button>
        </div>
      </div>

      {/* Grid: Batches & Submissions needing grading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Batches */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">My Assigned Batches</h3>
            <button onClick={() => setActiveTab('batches')} className="text-xs text-emerald-600 font-semibold hover:underline">
              Mark Attendance
            </button>
          </div>
          <div className="space-y-3">
            {batches.map(b => (
              <div key={b.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{b.name}</h4>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {b.studentsCount} Students
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{b.schedule}</p>
                <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs">
                  <span className="text-slate-600 font-medium">Avg Attendance: 92%</span>
                  <button onClick={() => setActiveTab('batches')} className="text-purple-600 hover:text-purple-800 font-bold">
                    Take Roll Call →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Assignment Submissions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Assignment Grading Queue</h3>
            <button onClick={() => setActiveTab('assessments')} className="text-xs text-emerald-600 font-semibold hover:underline">
              View All Submissions
            </button>
          </div>
          <div className="space-y-3">
            {assignments.map(asg => (
              <div key={asg.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{asg.title}</h4>
                  <span className="text-[11px] text-slate-500 font-medium">Due: {asg.dueDate}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{asg.courseName}</p>
                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                  <span className="text-slate-500">{asg.submissions.length} Submissions</span>
                  <button onClick={() => setActiveTab('assessments')} className="text-emerald-700 hover:text-emerald-900 font-bold">
                    Evaluate & Grade →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
