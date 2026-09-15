import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { ArrowLeft, CheckCircle2, CreditCard, Landmark, Loader2, LockKeyhole, ShieldCheck, Smartphone } from 'lucide-react';

export const CoursePaymentPage = () => {
  const { selectedCourseForPayment: course, setSelectedCourseForPayment, completeCoursePayment, setActiveTab } = useLMS();
  const [method, setMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  if (!course) return <div className="p-10 text-center"><p className="text-sm text-slate-500 mb-4">No course is waiting for payment.</p><button onClick={() => setActiveTab('courses-catalog')} className="px-4 py-2 rounded-xl bg-purple-700 text-white font-bold">Browse Courses</button></div>;

  const pay = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1000));
    await completeCoursePayment(course.id);
    setProcessing(false);
  };

  return <div className="max-w-5xl mx-auto space-y-5">
    <button onClick={() => { setSelectedCourseForPayment(null); setActiveTab('courses-catalog'); }} className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-purple-700"><ArrowLeft className="w-4 h-4" /> Back to courses</button>
    <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-6">
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-2"><ShieldCheck className="w-4 h-4" /> Secure checkout</div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Complete your enrollment</h1>
        <p className="text-sm text-slate-500 mt-1">Pay for <b>{course.title}</b> to unlock the course.</p>
        <div className="grid grid-cols-3 gap-2 mt-6">
          {[['upi',Smartphone,'UPI'],['card',CreditCard,'Card'],['netbanking',Landmark,'Net Banking']].map(([id,Icon,label]) => <button key={id} onClick={()=>setMethod(id)} className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 ${method===id?'border-purple-500 bg-purple-50 text-purple-700':'border-slate-200 text-slate-600'}`}><Icon className="w-5 h-5"/>{label}</button>)}
        </div>
        {method==='upi' && <div className="mt-5"><label className="text-xs font-bold">UPI ID</label><input className="w-full mt-2 rounded-xl border border-slate-300 px-4 py-3" placeholder="name@upi" /></div>}
        {method==='card' && <div className="mt-5 space-y-3"><input className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="Card number"/><div className="grid grid-cols-2 gap-3"><input className="rounded-xl border border-slate-300 px-4 py-3" placeholder="MM / YY"/><input className="rounded-xl border border-slate-300 px-4 py-3" placeholder="CVV"/></div><input className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="Card holder name"/></div>}
        {method==='netbanking' && <select className="w-full mt-5 rounded-xl border border-slate-300 px-4 py-3"><option>Select your bank</option><option>HDFC Bank</option><option>ICICI Bank</option><option>State Bank of India</option><option>Axis Bank</option></select>}
        <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">Demo/Test checkout — no real money is charged. After confirmation, the course is unlocked.</div>
        <button disabled={processing} onClick={pay} className="w-full mt-5 py-3.5 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-60 text-white font-extrabold flex items-center justify-center gap-2">{processing?<><Loader2 className="w-4 h-4 animate-spin"/>Processing...</>:<><LockKeyhole className="w-4 h-4"/>Pay ₹{course.price}</>}</button>
        <p className="text-[11px] text-center text-slate-400 mt-3">Secure checkout • Payment confirmation required before enrollment</p>
      </section>
      <aside className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-fit overflow-hidden"><img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover"/><div className="p-5 space-y-4"><span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded">{course.category}</span><h2 className="font-extrabold text-lg">{course.title}</h2><div className="pt-3 border-t flex justify-between text-base"><span className="font-bold">Total</span><b>₹{course.price}</b></div>{['Full course access','All modules and lessons','Practice & quizzes','Course completion certificate'].map(x=><div key={x} className="flex gap-2 text-xs text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500"/>{x}</div>)}</div></aside>
    </div>
  </div>;
};
