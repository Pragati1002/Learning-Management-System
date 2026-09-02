import React, { useState } from 'react';
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
