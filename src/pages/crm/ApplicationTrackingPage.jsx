import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Briefcase, MapPin, ClipboardList } from 'lucide-react';

const STATUS_TABS = ['All', 'Applied', 'Shortlisted', 'Interview', 'Offered'];

const statusStyle = {
  Applied: 'bg-slate-100 text-slate-700',
  Shortlisted: 'bg-purple-100 text-purple-800',
  Interview: 'bg-amber-100 text-amber-800',
  Offered: 'bg-emerald-100 text-emerald-800',
};

export const ApplicationTrackingPage = () => {
  const { jobApplications } = useLMS();
  const [tab, setTab] = useState('All');

  const filtered = tab === 'All' ? jobApplications : jobApplications?.filter(a => a.status === tab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Applications</h1>
        <p className="text-sm text-slate-500 mt-1">Track the status of every job you've applied to.</p>
      </div>

      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-1.5 w-fit">
        {STATUS_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === t ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered?.length === 0 && (
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center space-y-2">
            <ClipboardList className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm text-slate-500">No applications in this status yet.</p>
          </div>
        )}
        {filtered?.map(app => (
          <div key={app.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{app.company} - {app.jobTitle}</h3>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5" /><span>{app.location}</span></span>
                <span>Applied on {app.appliedDate}</span>
              </div>
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 ${statusStyle[app.status] || 'bg-slate-100 text-slate-700'}`}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
