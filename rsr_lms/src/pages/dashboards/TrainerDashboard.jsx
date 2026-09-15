import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { BookOpen, Users, Video, FileCheck2, Calendar, ExternalLink } from 'lucide-react';

export const TrainerDashboard = () => {
  const { courses, batches, assignments, liveClasses, setActiveTab } = useLMS();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold rounded-full">FACULTY & TRAINER HUB</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Instructor Workstation</h1>
          <p className="text-sm text-emerald-100 max-w-xl mt-1">Manage batches, schedule live lectures, evaluate assignments, and share meeting links with enrolled students.</p>
        </div>
        <button onClick={() => setActiveTab('live-classes-manage')} className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-1.5">
          <Video className="w-4 h-4" /><span>Schedule Live Class</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between"><h3 className="font-bold text-slate-900 text-base">My Assigned Batches</h3><button onClick={() => setActiveTab('batches')} className="text-xs text-emerald-600 font-semibold hover:underline">Manage Batches</button></div>
          {batches.length === 0 ? <p className="text-xs text-slate-500">No batches assigned yet.</p> : batches.map(b => (
            <div key={b.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200"><div className="flex items-center justify-between"><h4 className="font-bold text-sm text-slate-900">{b.name}</h4><span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">{b.studentsCount} Students</span></div><p className="text-xs text-slate-500 mt-1">{b.schedule}</p></div>
          ))}
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between"><h3 className="font-bold text-slate-900 text-base">Assignment Grading Queue</h3><button onClick={() => setActiveTab('assessments')} className="text-xs text-emerald-600 font-semibold hover:underline">View All</button></div>
          {assignments.length === 0 ? <p className="text-xs text-slate-500">No assignments available.</p> : assignments.slice(0, 5).map(asg => (
            <div key={asg.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200"><div className="flex items-center justify-between"><h4 className="font-bold text-xs sm:text-sm text-slate-900">{asg.title}</h4><span className="text-[11px] text-slate-500">Due: {asg.dueDate}</span></div><p className="text-xs text-slate-600 mt-1">{asg.courseName}</p></div>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between"><h3 className="font-extrabold text-slate-900 flex items-center gap-2"><Video className="w-5 h-5 text-emerald-600" /> Live Classes</h3><button onClick={() => setActiveTab('live-classes-manage')} className="text-xs text-emerald-700 font-bold hover:underline">Manage All</button></div>
        {liveClasses.length === 0 ? <p className="text-xs text-slate-500">No live classes scheduled.</p> : liveClasses.slice(0, 6).map(lc => (
          <div key={lc.id} className="p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div><p className="text-sm font-bold text-slate-900">{lc.title}</p><p className="text-[11px] text-slate-500 mt-1">{lc.courseTitle} • {lc.date} • {lc.time} • {lc.platform}</p></div>
            <a href={lc.meetingLink} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1"><span>Join</span><ExternalLink className="w-3.5 h-3.5" /></a>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"><BookOpen className="w-5 h-5 text-purple-600" /><p className="text-2xl font-extrabold text-slate-900 mt-2">{courses.length}</p><p className="text-xs text-slate-500">Courses</p></div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"><Calendar className="w-5 h-5 text-emerald-600" /><p className="text-2xl font-extrabold text-slate-900 mt-2">{liveClasses.length}</p><p className="text-xs text-slate-500">Live Sessions</p></div>
      </div>
    </div>
  );
};
