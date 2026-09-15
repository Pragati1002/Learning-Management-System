import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Lock, Unlock, ShieldCheck, BookOpen } from 'lucide-react';

export const ModuleAccessPage = () => {
  const { courses, updateModuleAccess, currentUser } = useLMS();
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');

  if (currentUser?.role !== 'admin') {
    return <div className="p-8 bg-white rounded-3xl border text-center text-sm text-slate-500">Administrator access required.</div>;
  }

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];

  const setAccess = async (module, released) => {
    await updateModuleAccess(course.id, module.id || module.moduleId, released);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Institution Module Access</h1>
        <p className="text-sm text-slate-500 mt-1">Release only the sessions completed by the institution. Students cannot change these controls.</p>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <label className="text-xs font-bold text-slate-700 block mb-2">Select Course</label>
        <select value={course?.id || ''} onChange={e => setSelectedCourseId(e.target.value)}
          className="w-full max-w-xl border border-slate-300 rounded-xl p-3 text-sm bg-white">
          {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </div>

      {course ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <div>
              <h2 className="font-extrabold text-slate-900">{course.title}</h2>
              <p className="text-xs text-slate-500">Students can access released modules only.</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {(course.modules || []).map((module, index) => {
              const released = module.released !== false;
              return (
                <div key={module.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-extrabold text-slate-400 uppercase">Module {index + 1}</p>
                    <h3 className="font-bold text-slate-900 mt-1">{module.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{module.lessons?.length || 0} lessons</p>
                  </div>
                  <button onClick={() => setAccess(module, !released)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 ${
                      released ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                    {released ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    {released ? 'Released to Students' : 'Locked — Release Module'}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Access is enforced by the server, not only by the student interface.</span>
          </div>
        </div>
      ) : <div className="p-8 text-center text-sm text-slate-500">No courses found.</div>}
    </div>
  );
};
