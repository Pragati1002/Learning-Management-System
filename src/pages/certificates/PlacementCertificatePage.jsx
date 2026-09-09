import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { Trophy, Download, Award, Sparkles } from 'lucide-react';

export const PlacementCertificatePage = () => {
  const { currentUser, placements, certificates } = useLMS();

  const myPlacement = placements
    ?.flatMap(job => (job.applicants || []).filter(a => a.studentId === currentUser?.id).map(a => ({ ...a, company: job.company, role: job.role })))
    ?.find(a => a.status === 'Placed' || a.status === 'Offer Accepted') || null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {myPlacement ? (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
          <Trophy className="w-14 h-14 text-amber-500 mx-auto" />
          <h1 className="text-2xl font-extrabold text-emerald-600">Congratulations!</h1>
          <p className="text-sm text-slate-600">
            You have been placed at <span className="font-bold text-slate-900">{myPlacement.company}</span> as{' '}
            <span className="font-bold text-slate-900">{myPlacement.role}</span>
          </p>
          <p className="text-xs text-slate-400">Best wishes for your bright future!</p>
          <button className="mt-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all inline-flex items-center space-x-1.5">
            <Download className="w-4 h-4" />
            <span>Download Placement Letter</span>
          </button>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm text-center space-y-2">
          <Sparkles className="w-10 h-10 text-purple-400 mx-auto" />
          <h2 className="font-bold text-slate-900 text-base">Your Placement Journey Continues</h2>
          <p className="text-xs text-slate-500">Keep applying and practicing — your placement status will appear here once confirmed.</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm">My Certificates</h3>
        {certificates?.length === 0 ? (
          <p className="text-xs text-slate-500">No certificates earned yet — complete a course to unlock one.</p>
        ) : (
          <div className="space-y-2">
            {certificates.map(cert => (
              <div key={cert.certificateId} className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 rounded-xl">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{cert.courseName}</p>
                    <p className="text-[11px] text-slate-500">Issued on {cert.issueDate}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-xl text-purple-600">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
