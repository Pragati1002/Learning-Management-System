import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { Mail, Phone } from 'lucide-react';

export const LeadManagementPage = () => {
  const { leads, updateLeadStage } = useLMS();
  const stages = ['New', 'Contacted', 'Demo Scheduled', 'Enrolled', 'Lost'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Lead & Admission CRM</h1>
        <p className="text-sm text-slate-500 mt-1">Track student enquiries, schedule demo classes, and convert leads into enrolled batches.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {leads.map(lead => (
          <div key={lead.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">{lead.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                  {lead.stage}
                </span>
              </div>
              <p className="text-xs font-bold text-purple-600 mt-1">{lead.courseInterest}</p>
              
              <div className="mt-3 space-y-1 text-xs text-slate-500">
                <p className="flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{lead.email}</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lead.phone}</span>
                </p>
              </div>

              <div className="mt-3 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                <span className="font-bold">Counselor Note: </span>
                {lead.notes}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Update CRM Stage</label>
              <select
                value={lead.stage}
                onChange={e => updateLeadStage(lead.id, e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2 text-xs bg-slate-50 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                {stages.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
