import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { MapPin, CheckCircle2 } from 'lucide-react';

export const PlacementPortalPage = () => {
  const { placements, applyPlacementJob, currentUser } = useLMS();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Campus Placements & Career Drives</h1>
        <p className="text-sm text-slate-500 mt-1">Exclusive recruitment opportunities with leading tech partners.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {placements.map(job => {
          const hasApplied = job.applicants?.some(a => a.studentId === currentUser.id);
          return (
            <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-3.5">
                  <img src={job.logo} alt={job.company} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{job.company}</h3>
                    <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-extrabold text-lg text-slate-900">{job.role}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Salary: {job.package}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {job.openings} Openings
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <span className="font-bold">Eligibility: </span>{job.eligibility}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Deadline: {job.deadline}</span>
                {hasApplied ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Application Active</span>
                  </span>
                ) : (
                  <button
                    onClick={() => applyPlacementJob(job.id)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Apply Now (1-Click)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
