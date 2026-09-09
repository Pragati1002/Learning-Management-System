import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Search, MapPin, Briefcase, Clock, CheckCircle2 } from 'lucide-react';

export const JobPortalPage = () => {
  const { jobs, jobApplications, applyToJob } = useLMS();
  const [search, setSearch] = useState('');

  const filtered = jobs?.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  const hasApplied = (jobId) => jobApplications?.some(a => a.jobId === jobId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Job Opportunities</h1>
        <p className="text-sm text-slate-500 mt-1">Fresh openings matched to your track — apply in one click.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search jobs..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
        />
      </div>

      <div className="space-y-3">
        {filtered?.map(job => (
          <div key={job.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{job.company}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-500">
                <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5" /><span>{job.location}</span></span>
                <span className="flex items-center space-x-1"><Briefcase className="w-3.5 h-3.5" /><span>{job.type}</span></span>
                <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /><span>{job.postedTime}</span></span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {job.skills?.map(s => (
                  <span key={s} className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
            {hasApplied(job.id) ? (
              <span className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
                <span>Applied</span>
              </span>
            ) : (
              <button
                onClick={() => applyToJob(job)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all shrink-0"
              >
                Apply Now
              </button>
            )}
          </div>
        ))}
        {filtered?.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-10">No jobs match your search.</p>
        )}
      </div>
    </div>
  );
};
