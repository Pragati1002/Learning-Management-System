import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Download, X, ShieldCheck } from 'lucide-react';

export const CertificateModal = ({ certificate, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 my-8">
        
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-sm">Official RSR LMS Certificate of Completion</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handlePrint} className="flex items-center space-x-1 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-xs font-semibold rounded-xl transition-colors shadow">
              <Download className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-amber-50/50 via-white to-purple-50/50 border-8 border-amber-500/30 m-4 rounded-2xl relative shadow-inner">
          <div className="text-center space-y-6 relative z-10">
            <div className="flex items-center justify-center space-x-2 text-purple-900 font-extrabold text-2xl tracking-widest uppercase font-serif">
              <span>RSR ACADEMY OF EXCELLENCE</span>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Certificate of Specialization & Mastery</p>
            
            <div className="py-2">
              <p className="text-sm text-slate-600 italic">This is proudly presented to</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif mt-2 underline decoration-amber-500/50 decoration-2 underline-offset-8">
                {certificate.studentName}
              </h1>
            </div>

            <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
              for successfully completing all curriculum modules, lesson videos, and standardized assessments in
            </p>

            <div className="inline-block px-6 py-2.5 bg-purple-50 border border-purple-200 rounded-2xl">
              <h3 className="text-lg sm:text-xl font-extrabold text-purple-950">{certificate.courseName}</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-left text-xs">
              <div>
                <p className="text-slate-400 font-medium">Issue Date</p>
                <p className="font-bold text-slate-800">{certificate.issueDate}</p>
                <p className="text-slate-400 font-medium mt-2">Final Grade</p>
                <p className="font-bold text-emerald-700">{certificate.grade} ({certificate.score})</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-gradient-to-tr from-purple-900 to-purple-900 text-white rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-md">
                  <Award className="w-7 h-7 text-yellow-400" />
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">Verified</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 font-medium">Issuing Authority</p>
                <p className="font-bold text-slate-800">{certificate.instructor || 'Administrator'}</p>
                <p className="text-slate-400 font-medium mt-2">Certificate ID</p>
                <p className="font-mono font-bold text-purple-700">{certificate.certificateId}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Token: {certificate.certificateId}</span>
          </div>
          <span>Public Token Verification: rsr-lms.edu/verify/{certificate.certificateId}</span>
        </div>
      </div>
    </div>
  );
};
