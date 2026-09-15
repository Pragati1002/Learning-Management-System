const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. CertificateModal
save('src/components/certificates/CertificateModal.jsx', `import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Download, X, ShieldCheck } from 'lucide-react';

export const CertificateModal = ({ certificate, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 75,
        spread: 70,
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 my-8">
        
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-sm">Official Certificate of Completion</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handlePrint} className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-xs font-semibold rounded-lg transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-amber-50/50 via-white to-sky-50/50 border-8 border-amber-600/30 m-4 rounded-xl relative shadow-inner">
          <div className="text-center space-y-6 relative z-10">
            <div className="flex items-center justify-center space-x-2 text-blue-800 font-extrabold text-xl tracking-widest uppercase">
              <span>LMS ACADEMY OF EXCELLENCE</span>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Certificate of Specialization & Mastery</p>
            
            <div className="py-2">
              <p className="text-sm text-slate-600 italic">This is proudly presented to</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif mt-2 underline decoration-amber-500/50 decoration-2 underline-offset-8">
                {certificate.studentName}
              </h1>
            </div>

            <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
              for successfully completing all rigorous course modules, assignments, and standardized assessments in
            </p>

            <div className="inline-block px-6 py-2 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900">{certificate.courseName}</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-left text-xs">
              <div>
                <p className="text-slate-400 font-medium">Issue Date</p>
                <p className="font-bold text-slate-800">{certificate.issueDate}</p>
                <p className="text-slate-400 font-medium mt-2">Final Grade</p>
                <p className="font-bold text-emerald-700">{certificate.grade} ({certificate.score})</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-slate-900 text-white rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-md">
                  <Award className="w-7 h-7 text-yellow-400" />
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">Verified</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 font-medium">Instructor</p>
                <p className="font-bold text-slate-800">{certificate.instructor || 'Prof. Priya Menon'}</p>
                <p className="text-slate-400 font-medium mt-2">Certificate ID</p>
                <p className="font-mono font-bold text-blue-700">{certificate.certificateId}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Token: {certificate.certificateId}</span>
          </div>
          <span>Public Verification: lms.edu/verify/{certificate.certificateId}</span>
        </div>
      </div>
    </div>
  );
};
`);

// 2. PaymentModal
save('src/components/payment/PaymentModal.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { CreditCard, CheckCircle2, ArrowRight, X } from 'lucide-react';

export const PaymentModal = ({ invoice, isOpen, onClose }) => {
  const { payFeeInvoice } = useLMS();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !invoice) return null;

  const applyCoupon = () => {
    const c = coupon.trim().toUpperCase();
    if (c === 'LMS50') setDiscount(50);
    else if (c === 'TECH2026') setDiscount(100);
    else setDiscount(0);
  };

  const finalPrice = Math.max(0, invoice.amount - discount);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      payFeeInvoice(invoice.invoiceId, coupon);
      setProcessing(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in zoom-in-95">
        <div className="p-5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <CreditCard className="w-5 h-5" />
            <h3 className="font-bold text-base">Secure Fee Payment Gateway</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Invoice ID:</span>
              <span className="font-mono font-bold text-slate-800">{invoice.invoiceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Student:</span>
              <span className="font-bold text-slate-800">{invoice.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Course:</span>
              <span className="font-bold text-slate-800">{invoice.courseName}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Discount Coupon</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Try 'LMS50' or 'TECH2026'"
                className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={applyCoupon}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Apply
              </button>
            </div>
            {discount > 0 && (
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Coupon Applied! ₹{discount} Instant Discount</span>
              </p>
            )}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Course Fee:</span>
              <span>₹{invoice.amount}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>Discounts:</span>
              <span>- ₹{discount}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Payable:</span>
              <span className="text-blue-700">₹{finalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={processing}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            {processing ? (
              <span>Processing Payment Gateway...</span>
            ) : (
              <>
                <span>Pay ₹{finalPrice} & Confirm</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
`);

// 3. LiveClassModal
save('src/components/learning/LiveClassModal.jsx', `import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, MessageSquare, Users, ScreenShare, X, Send } from 'lucide-react';

export const LiveClassModal = ({ liveClass, isOpen, onClose }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Prof. Priya Menon', text: 'Welcome everyone to today live deep-dive session!' },
    { id: 2, user: 'Aarav Patel', text: 'Audio and screen are crystal clear maam!' }
  ]);
  const [msgInput, setMsgInput] = useState('');

  if (!isOpen || !liveClass) return null;

  const handleSend = () => {
    if (!msgInput.trim()) return;
    setChatMessages(prev => [...prev, { id: Date.now(), user: 'You', text: msgInput }]);
    setMsgInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in fade-in">
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
          <h3 className="font-bold text-sm sm:text-base truncate max-w-md">{liveClass.title}</h3>
          <span className="bg-red-950/80 text-red-400 text-xs px-2 py-0.5 rounded font-semibold border border-red-800">LIVE NOW</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-400 flex items-center space-x-1">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>34 Active Participants</span>
          </span>
          <button onClick={onClose} className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors">
            Leave Class
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 bg-slate-900 p-4 flex flex-col justify-between items-center relative">
          <div className="w-full h-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center relative">
            {screenSharing ? (
              <div className="w-full h-full bg-slate-900 p-6 flex flex-col font-mono text-emerald-400 text-xs overflow-y-auto">
                <p className="text-slate-400 mb-2">// Live Code Demonstration - Redis PubSub Microservice Architecture</p>
                <p>const redis = require("ioredis");</p>
                <p>const pub = new redis();</p>
                <p>const sub = new redis();</p>
                <p>sub.subscribe("order_notifications", (err, count) =&gt; &#123;</p>
                <p>&nbsp;&nbsp;console.log("Listening on active order queue...");</p>
                <p>&#125;);</p>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                  alt="Trainer Speaker"
                  className="w-28 h-28 rounded-full border-4 border-emerald-500 mx-auto object-cover shadow-xl"
                />
                <h4 className="text-white font-bold text-lg">{liveClass.trainer} (Instructor)</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">{liveClass.agenda}</p>
              </div>
            )}

            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center space-x-2 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Speaking: {liveClass.trainer}</span>
            </div>
          </div>
        </div>

        <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
          <div className="p-3 border-b border-slate-800 text-white text-xs font-bold flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>Live Classroom Chat</span>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {chatMessages.map(m => (
              <div key={m.id} className="text-xs bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <span className="font-bold text-blue-400 block mb-0.5">{m.user}:</span>
                <span className="text-slate-200">{m.text}</span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-slate-800 flex space-x-2">
            <input
              type="text"
              value={msgInput}
              onChange={e => setMsgInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask question live..."
              className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-16 bg-slate-950 border-t border-slate-800 px-6 flex items-center justify-center space-x-4 text-white">
        <button
          onClick={() => setMicOn(!micOn)}
          className={\`p-3 rounded-full \${micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-600 text-white'}\`}
        >
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setVideoOn(!videoOn)}
          className={\`p-3 rounded-full \${videoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-600 text-white'}\`}
        >
          {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setScreenSharing(!screenSharing)}
          className={\`p-3 rounded-full \${screenSharing ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}\`}
          title="Toggle Screen Share"
        >
          <ScreenShare className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
`);
