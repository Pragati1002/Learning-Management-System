import React from 'react';
import { useLMS } from '../../context/LMSContext';

export const AnalyticsPage = () => {
  const { courses, batches } = useLMS();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Institutional Analytics & Reports</h1>
        <p className="text-sm text-slate-500 mt-1">Cross-cohort analytics, course completion rates, and attendance trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Cohort Attendance Breakdown</h3>
          <div className="space-y-3">
            {batches.map(b => (
              <div key={b.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{b.name}</span>
                  <span className="text-emerald-700 font-bold">94% Attendance</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Course Enrollment Distribution</h3>
          <div className="space-y-3">
            {courses.slice(0, 4).map(c => (
              <div key={c.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 truncate max-w-[200px]">{c.title}</span>
                  <span className="text-purple-700 font-bold">{c.enrolledCount} Learners</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${Math.min(100, c.enrolledCount / 15)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
