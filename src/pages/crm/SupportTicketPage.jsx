import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Plus } from 'lucide-react';

export const SupportTicketPage = () => {
  const { tickets, createSupportTicket } = useLMS();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Academic / Recordings');
  const [priority, setPriority] = useState('Normal');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) return;
    createSupportTicket(subject, category, priority);
    setShowModal(false);
    setSubject('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Helpdesk & Support Ticketing</h1>
          <p className="text-sm text-slate-500 mt-1">Raise inquiries regarding class recordings, syllabus, and certificates.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Ticket</span>
        </button>
      </div>

      <div className="space-y-4">
        {tickets.map(t => (
          <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-purple-700 text-xs">{t.id}</span>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">{t.category}</span>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {t.status}
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-900">{t.subject}</h3>
            <p className="text-xs text-slate-500">Raised by {t.studentName} on {t.createdAt}</p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-100">
              <span className="font-bold">Admin Response: </span>{t.resolutionNotes}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create Support Ticket</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Describe your issue..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-white"
                >
                  <option>Academic / Recordings</option>
                  <option>Billing & Accounts</option>
                  <option>Certificate Verification</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold">
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
