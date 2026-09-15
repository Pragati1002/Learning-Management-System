import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { BookOpen, Users, Award, PlusCircle, Video, Search } from 'lucide-react';

export const AdminDashboard = () => {
  const { courses, batches, users, certificates, liveClasses, quizzes, setActiveTab } = useLMS();
  const [quizSearch, setQuizSearch] = useState('');
  const matchedQuizzes = (quizzes || []).filter(q => { const t=quizSearch.trim().toLowerCase(); return !t || [q.title,q.courseTitle,q.institution].some(v=>String(v||'').toLowerCase().includes(t)); });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-purple-950 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-bold rounded-full">
            ADMINISTRATOR WORKSPACE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Admin Learning & Course Manager</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
            Create new learning courses, manage structured lesson video links, track student enrollments, and issue certificates.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('courses-manage')}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0"
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
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
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

      {/* Quiz Search & Management */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-3"><div><h3 className="font-extrabold text-slate-900 text-base">Quiz Management</h3><p className="text-xs text-slate-500 mt-1">Search, edit, assign and open dashboards for quizzes.</p></div><button onClick={() => setActiveTab('assessments')} className="text-xs font-bold text-purple-700">Manage All →</button></div>
        <div className="relative"><Search className="absolute left-3 top-3 w-4 h-4 text-slate-400"/><input value={quizSearch} onChange={e=>setQuizSearch(e.target.value)} placeholder="Search quiz by name, course or institution..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm"/></div>
        <div className="space-y-2">{matchedQuizzes.slice(0,8).map(q=><div key={q.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border"><div><b className="text-sm">{q.title}</b><p className="text-[11px] text-slate-500">{q.courseTitle} • {q.assignedStudents?.length||0} assigned</p></div><button onClick={()=>setActiveTab('assessments')} className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold">Open</button></div>)}{!matchedQuizzes.length&&<p className="text-xs text-slate-400">No quiz matches your search.</p>}</div>
      </div>

      {/* Live Classes */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2"><Video className="w-5 h-5 text-purple-600" /> Live Classes</h3>
            <p className="text-xs text-slate-500 mt-1">{liveClasses.length} sessions currently stored in MongoDB.</p>
          </div>
          <button onClick={() => setActiveTab('live-classes-manage')} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl">Manage Live Classes</button>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base">Current Published Courses</h3>
          <button onClick={() => setActiveTab('courses-manage')} className="text-xs text-purple-600 font-bold hover:underline">
            Manage All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map(c => (
            <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <img src={c.thumbnail} alt={c.title} className="w-full h-32 rounded-xl object-cover mb-2" />
                <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
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
