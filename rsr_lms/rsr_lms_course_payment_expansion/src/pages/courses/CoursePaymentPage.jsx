import React, { useMemo, useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { ArrowLeft, CheckCircle2, CreditCard, LockKeyhole, ShieldCheck, Smartphone, Wallet, Landmark, Loader2 } from 'lucide-react';

export const CoursePaymentPage = () => {
  const {
    selectedCourseForPayment: course,
    setSelectedCourseForPayment,
    completeCoursePayment,
    setActiveTab
  } = useLMS();

  const [method, setMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const discount = useMemo(() => {
    if (!course) return 0;
    return Math.max(0, (course.originalPrice || course.price || 0) - (course.price || 0));
  }, [course]);

  if (!course) {
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-slate-500 mb-4">No course is waiting for payment.</p>
        <button onClick={() => setActiveTab('courses-catalog')} className="px-4 py-2 rounded-xl bg-purple-700 text-white text-sm font-bold">Browse Courses</button>
      </div>
    );
  }

  const handlePay = async () => {
    setProcessing(true);
    // Demo checkout flow. Replace this callback with Razorpay order creation + signature verification
    // when live/test gateway credentials are configured on the server.
    await new Promise(resolve => setTimeout(resolve, 1200));
    const success = await completeCoursePayment(course.id);
    setProcessing(false);
    if (success) setPaid(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <button
        onClick={() => { setSelectedCourseForPayment(null); setActiveTab('courses-catalog'); }}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-purple-700"
      >
        <ArrowLeft className="w-4 h-4" /> Back to courses
      </button>

      <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-6">
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-2">
              <ShieldCheck className="w-4 h-4" /> Secure checkout
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Complete your enrollment</h1>
            <p className="text-sm text-slate-500 mt-1">Choose a payment method and unlock the full course.</p>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-3 gap-2">
              {[
                ['upi', Smartphone, 'UPI'],
                ['card', CreditCard, 'Card'],
                ['netbanking', Landmark, 'Net Banking']
              ].map(([id, Icon, label]) => (
                <button key={id} onClick={() => setMethod(id)} className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 ${method === id ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-600'}`}>
                  <Icon className="w-5 h-5" />{label}
                </button>
              ))}
            </div>

            {method === 'upi' && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700">UPI ID</label>
                <input placeholder="yourname@upi" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            )}
            {method === 'card' && (
              <div className="space-y-3">
                <input placeholder="Card number" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                <div className="grid grid-cols-2 gap-3"><input placeholder="MM / YY" className="rounded-xl border border-slate-300 px-4 py-3 text-sm" /><input placeholder="CVV" className="rounded-xl border border-slate-300 px-4 py-3 text-sm" /></div>
                <input placeholder="Card holder name" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
              </div>
            )}
            {method === 'netbanking' && (
              <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm bg-white">
                <option>Select your bank</option><option>HDFC Bank</option><option>ICICI Bank</option><option>State Bank of India</option><option>Axis Bank</option>
              </select>
            )}

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
              This project currently uses a simulated checkout so you can demonstrate the complete enrollment flow safely. No real money is charged.
            </div>

            <button disabled={processing} onClick={handlePay} className="w-full py-3.5 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-60 text-white font-extrabold text-sm flex items-center justify-center gap-2">
              {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing payment...</> : <><LockKeyhole className="w-4 h-4" /> Pay ₹{course.price}</>}
            </button>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400"><LockKeyhole className="w-3.5 h-3.5" /> Encrypted checkout • Secure payment flow</div>
          </div>
        </section>

        <aside className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-fit overflow-hidden">
          <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover" />
          <div className="p-5 space-y-4">
            <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded">{course.category}</span>
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">{course.title}</h2>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between"><span>Course price</span><b>₹{course.price}</b></div>
              {discount > 0 && <div className="flex justify-between text-emerald-600"><span>You save</span><b>₹{discount}</b></div>}
              <div className="pt-3 border-t flex justify-between text-base text-slate-900"><span className="font-bold">Total</span><b>₹{course.price}</b></div>
            </div>
            <div className="space-y-2 text-xs text-slate-500">
              {['Full course access', 'All modules and lessons', 'Practice & quizzes', 'Course completion certificate'].map(item => <div key={item} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{item}</div>)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
