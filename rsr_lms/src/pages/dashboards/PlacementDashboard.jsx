import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { Briefcase, Building, CheckCircle, Clock } from 'lucide-react';

export const PlacementDashboard = () => {
  const { placements, setActiveTab } = useLMS();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-purple-950 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold rounded-full">
            CORPORATE RELATIONS & PLACEMENTS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Campus Placement Drives</h1>
          <p className="text-sm text-rose-100 max-w-xl mt-1">
            Connect students with Tier-1 technology companies, schedule interviews, and track recruitment conversion rates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {placements.map(job => (
          <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-3">
                <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{job.company}</h4>
                  <p className="text-xs text-slate-500">{job.location}</p>
                </div>
              </div>
              <h3 className="font-extrabold text-purple-700 text-sm mt-3">{job.role}</h3>
              <p className="text-xs font-bold text-emerald-700 mt-1">Package: {job.package}</p>
              <p className="text-xs text-slate-500 mt-2">{job.eligibility}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{job.applicants.length} Applicants</span>
              <button onClick={() => setActiveTab('placements')} className="font-bold text-purple-600 hover:underline">
                View Drive →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
