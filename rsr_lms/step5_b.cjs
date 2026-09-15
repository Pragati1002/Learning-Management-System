const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. LeadManagementPage
save('src/pages/crm/LeadManagementPage.jsx', `import React from 'react';
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
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {lead.stage}
                </span>
              </div>
              <p className="text-xs font-bold text-blue-600 mt-1">{lead.courseInterest}</p>
              
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
                className="w-full border border-slate-200 rounded-lg p-2 text-xs bg-slate-50 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
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
`);

// 2. PlacementPortalPage
save('src/pages/crm/PlacementPortalPage.jsx', `import React from 'react';
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
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
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
`);

// 3. DiscussionPage
save('src/pages/crm/DiscussionPage.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Plus, Send } from 'lucide-react';

export const DiscussionPage = () => {
  const { discussions, addDiscussionPost, replyDiscussionPost } = useLMS();
  const [showAskModal, setShowAskModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [replyInput, setReplyInput] = useState({});

  const handlePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addDiscussionPost(newTitle, newContent);
    setShowAskModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleReply = (discId) => {
    const text = replyInput[discId];
    if (!text?.trim()) return;
    replyDiscussionPost(discId, text);
    setReplyInput(prev => ({ ...prev, [discId]: '' }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Community Discussion Forum</h1>
          <p className="text-sm text-slate-500 mt-1">Ask doubt questions, share code snippets, and collaborate with peer students and trainers.</p>
        </div>
        <button
          onClick={() => setShowAskModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Ask Question</span>
        </button>
      </div>

      <div className="space-y-5">
        {discussions.map(d => (
          <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <img src={d.avatar} alt={d.author} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
              <div>
                <h4 className="font-bold text-xs text-slate-900">{d.author}</h4>
                <p className="text-[10px] text-slate-400">{d.createdAt}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">{d.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{d.content}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {d.tags?.map(t => (
                  <span key={t} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {d.replies?.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-slate-100">
                {d.replies.map((r, rIdx) => (
                  <div key={rIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <span className="font-bold text-blue-700 block mb-0.5">{r.author}:</span>
                    <span className="text-slate-700">{r.content}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex space-x-2">
              <input
                type="text"
                value={replyInput[d.id] || ''}
                onChange={e => setReplyInput({ ...replyInput, [d.id]: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleReply(d.id)}
                placeholder="Write an answer or reply..."
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={() => handleReply(d.id)}
                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Ask Question</h3>
            <form onSubmit={handlePost} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. How to optimize React Server Component renders?"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Details</label>
                <textarea
                  rows="4"
                  required
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Explain context..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAskModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold">
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
`);

// 4. SupportTicketPage
save('src/pages/crm/SupportTicketPage.jsx', `import React, { useState } from 'react';
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
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 self-start"
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
                <span className="font-mono font-bold text-blue-700 text-xs">{t.id}</span>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">{t.category}</span>
              </div>
              <span className={\`text-[10px] font-bold px-2.5 py-0.5 rounded-full \${
                t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }\`}>
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
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold">
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
`);

// 5. CertificateVerifyPage
save('src/pages/certificates/CertificateVerifyPage.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Search, ShieldCheck, XCircle, CheckCircle2 } from 'lucide-react';

export const CertificateVerifyPage = ({ onOpenCertificate }) => {
  const { certificates } = useLMS();
  const [certCode, setCertCode] = useState('LMS-CERT-2026-8841');
  const [searched, setSearched] = useState(false);
  const [matchedCert, setMatchedCert] = useState(null);

  const handleSearch = (e) => {
    e?.preventDefault();
    const match = certificates.find(c => c.certificateId.trim().toUpperCase() === certCode.trim().toUpperCase());
    setMatchedCert(match || null);
    setSearched(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-blue-100 text-blue-700 rounded-2xl mb-1">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Public Certificate Verification Registry
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Verify authentic certificates issued by LMS Academy of Excellence. Enter the unique certificate token.
        </p>
      </div>

      <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={certCode}
            onChange={e => setCertCode(e.target.value)}
            placeholder="Enter Certificate ID (e.g. LMS-CERT-2026-8841)"
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
        >
          Verify ID
        </button>
      </form>

      {searched && (
        <div className="animate-in fade-in">
          {matchedCert ? (
            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-lg space-y-4">
              <div className="flex items-center space-x-2.5 text-emerald-700">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-extrabold text-base">Verified & Authentic Credential</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-semibold">Recipient Name:</span>
                  <p className="font-bold text-sm text-slate-900 mt-0.5">{matchedCert.studentName}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Course:</span>
                  <p className="font-bold text-sm text-slate-900 mt-0.5">{matchedCert.courseName}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Date of Issuance:</span>
                  <p className="font-bold text-slate-800 mt-0.5">{matchedCert.issueDate}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Final Grade / Score:</span>
                  <p className="font-bold text-emerald-700 mt-0.5">{matchedCert.grade} ({matchedCert.score})</p>
                </div>
              </div>
              <button
                onClick={() => onOpenCertificate(matchedCert)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                Inspect Official Certificate View
              </button>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border-2 border-red-300 shadow-md text-center space-y-2">
              <XCircle className="w-8 h-8 text-red-500 mx-auto" />
              <h3 className="font-bold text-slate-900 text-sm">No Certificate Found</h3>
              <p className="text-xs text-slate-500">The token "{certCode}" was not found in the verified registry.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
`);

// 6. AnalyticsPage
save('src/pages/reports/AnalyticsPage.jsx', `import React from 'react';
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
                  <span className="text-blue-700 font-bold">{c.enrolledCount} Learners</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: \`\${Math.min(100, c.enrolledCount / 15)}%\` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
`);
