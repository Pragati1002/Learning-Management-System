import React, { useMemo, useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Plus, Trash2, Search, Edit3, Users, BarChart3, X, Lock, Unlock, Save } from 'lucide-react';

const emptyQuestion = () => ({ question: '', options: ['', '', '', ''], correctAnswer: 0 });

export const AssessmentPage = () => {
  const { currentUser, quizzes, courses, users, assignments, addQuiz, updateQuiz, assignQuiz, getQuizDashboard, deleteQuiz, updateModuleAccess, setActiveTab } = useLMS();
  const isAdmin = currentUser?.role === 'admin';
  const [search, setSearch] = useState('');
  const [editor, setEditor] = useState(null);
  const [form, setForm] = useState(null);
  const [assigning, setAssigning] = useState(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [moduleCourse, setModuleCourse] = useState('');

  const visibleQuizzes = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (quizzes || []).filter(q => {
      const text = `${q.title || ''} ${q.courseTitle || ''} ${q.institution || ''}`.toLowerCase();
      return (!term || text.includes(term)) && (isAdmin || q.status === 'published');
    });
  }, [quizzes, search, isAdmin]);

  const openCreate = () => {
    setForm({ title: '', courseId: courses[0]?.id || '', institution: '', durationMinutes: 15, passingScore: 70, status: 'draft', questions: [emptyQuestion()] });
    setEditor('create');
  };
  const openEdit = q => {
    setForm({ title: q.title || '', courseId: q.courseId || '', institution: q.institution || '', durationMinutes: q.durationMinutes || 15, passingScore: q.passingScore ?? 70, status: q.status || 'published', questions: (q.questions || []).map(x => ({ id: x.id, question: x.question || '', options: [0,1,2,3].map(i => x.options?.[i] || ''), correctAnswer: Number(x.correctAnswer || 0) })) });
    setEditor(q);
  };
  const saveQuiz = async e => {
    e.preventDefault();
    const questions = form.questions.map(q => ({ id: q.id, question: q.question.trim(), options: q.options.map(x => x.trim()), correctAnswer: Number(q.correctAnswer) }));
    if (!form.title.trim() || questions.some(q => !q.question || q.options.filter(Boolean).length < 2 || q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) return;
    const course = courses.find(c => c.id === form.courseId);
    const payload = { ...form, courseTitle: course?.title || '', questions };
    const saved = editor === 'create' ? await addQuiz(payload) : await updateQuiz(editor.id, payload);
    if (saved) setEditor(null);
  };
  const openAssign = q => { setAssigning(q); setStudentSearch(''); setSelectedStudents((q.assignedStudents || []).map(s => String(s.id || s._id || s))); };
  const saveAssignment = async () => { if (await assignQuiz(assigning.id, selectedStudents)) setAssigning(null); };
  const openDashboard = async q => { const data = await getQuizDashboard(q.id); if (data) setDashboard(data); };
  const updateQ = (i, patch) => setForm(f => ({ ...f, questions: f.questions.map((q, idx) => idx === i ? { ...q, ...patch } : q) }));
  const updateOpt = (qi, oi, value) => setForm(f => ({ ...f, questions: f.questions.map((q, i) => i === qi ? { ...q, options: q.options.map((o, j) => j === oi ? value : o) } : q) }));

  if (!isAdmin) {
    const assigned = visibleQuizzes;
    return <div className="space-y-5">
      <div><h1 className="text-2xl font-extrabold text-slate-900">Assessments & Quizzes</h1><p className="text-sm text-slate-500 mt-1">Only quizzes assigned to your account are available.</p></div>
      <div className="relative"><Search className="absolute left-3 top-3 w-4 h-4 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search your assigned quizzes..." className="w-full bg-white border border-slate-200 rounded-2xl pl-10 p-3 text-sm outline-none focus:ring-2 focus:ring-purple-500"/></div>
      <div className="grid sm:grid-cols-2 gap-4">{assigned.map(q=><div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"><h3 className="font-bold text-sm">{q.title}</h3><p className="text-xs text-slate-500 mt-1">{q.courseTitle || 'General'} • {q.questions?.length || 0} Questions</p><button onClick={()=>setActiveTab('practice-quizzes')} className="mt-4 w-full py-2 bg-purple-700 text-white rounded-xl text-xs font-bold">Open Quiz</button></div>)}</div>
      {!assigned.length && <div className="bg-white border rounded-2xl p-10 text-center text-sm text-slate-500">No assigned quiz matches your search.</div>}
      <div className="bg-white p-5 rounded-2xl border border-slate-200"><h3 className="font-bold">Assignments</h3><p className="text-xs text-slate-500 mt-1">{assignments?.length || 0} assignments available.</p></div>
    </div>;
  }

  const students = (users || []).filter(u => u.role === 'student' && `${u.name} ${u.email}`.toLowerCase().includes(studentSearch.toLowerCase()));
  const selectedCourse = courses.find(c => c.id === moduleCourse);

  return <div className="space-y-6">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"><div><h1 className="text-2xl font-extrabold text-slate-900">Quiz & Assessment Management</h1><p className="text-sm text-slate-500 mt-1">Create, rename, add questions, assign and monitor college quizzes.</p></div><button onClick={openCreate} className="px-4 py-2.5 bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Create Quiz</button></div>
    <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search quiz by name, course or institution..." className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500"/></div>
    <div className="grid lg:grid-cols-2 gap-5">{visibleQuizzes.map(q=><div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4"><div className="flex justify-between gap-3"><div><span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded">{q.institution || 'All Institutions'}</span><h3 className="font-extrabold text-slate-900 mt-2">{q.title}</h3><p className="text-xs text-slate-500 mt-1">{q.courseTitle || 'General'} • {q.questions?.length || 0} Questions • {q.durationMinutes} min</p></div><span className="h-fit text-[10px] font-bold px-2 py-1 rounded bg-emerald-50 text-emerald-700">{q.status}</span></div><div className="flex flex-wrap gap-2"><button onClick={()=>openEdit(q)} className="px-3 py-2 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold flex gap-1.5 items-center"><Edit3 className="w-3.5 h-3.5"/> Edit / Add Questions</button><button onClick={()=>openAssign(q)} className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold flex gap-1.5 items-center"><Users className="w-3.5 h-3.5"/> Assign ({q.assignedStudents?.length || 0})</button><button onClick={()=>openDashboard(q)} className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex gap-1.5 items-center"><BarChart3 className="w-3.5 h-3.5"/> Dashboard</button><button onClick={()=>window.confirm(`Delete quiz "${q.title}"?`) && deleteQuiz(q.id)} className="px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold flex gap-1.5 items-center"><Trash2 className="w-3.5 h-3.5"/> Delete</button></div></div>)}</div>
    {!visibleQuizzes.length && <div className="bg-white rounded-2xl border p-10 text-center text-sm text-slate-500">No quizzes match your search.</div>}

    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4"><div><h2 className="font-extrabold text-slate-900">Institution Module Access</h2><p className="text-xs text-slate-500 mt-1">Only administrators can release modules completed in college sessions.</p></div><select value={moduleCourse} onChange={e=>setModuleCourse(e.target.value)} className="w-full border rounded-xl p-3 text-sm bg-white"><option value="">Select course</option>{courses.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}</select>{selectedCourse?.modules?.map(m=><div key={m.id} className="flex items-center justify-between gap-3 p-3 border rounded-xl"><div><b className="text-sm">{m.title}</b><p className="text-xs text-slate-500">{m.lessons?.length || 0} lessons</p></div><button onClick={()=>updateModuleAccess(selectedCourse.id, m.id, m.isReleased === false)} className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${m.isReleased === false?'bg-slate-100 text-slate-700':'bg-emerald-50 text-emerald-700'}`}>{m.isReleased === false?<><Lock className="w-3.5 h-3.5"/> Locked — Release</>:<><Unlock className="w-3.5 h-3.5"/> Released — Lock</>}</button></div>)}</div>

    {editor && <div className="fixed inset-0 z-50 bg-slate-900/60 overflow-y-auto p-4"><div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 my-6"><div className="flex justify-between mb-5"><div><h2 className="text-lg font-extrabold">{editor==='create'?'Create Quiz':'Edit Quiz'}</h2><p className="text-xs text-slate-500">Change the quiz name and add as many questions as needed.</p></div><button onClick={()=>setEditor(null)}><X/></button></div><form onSubmit={saveQuiz} className="space-y-4"><div className="grid md:grid-cols-2 gap-3"><input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Quiz name" className="border rounded-xl p-3 text-sm"/><input value={form.institution} onChange={e=>setForm({...form,institution:e.target.value})} placeholder="Institution e.g. Dayanand Sagar" className="border rounded-xl p-3 text-sm"/><select value={form.courseId} onChange={e=>setForm({...form,courseId:e.target.value})} className="border rounded-xl p-3 text-sm bg-white"><option value="">General</option>{courses.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}</select><div className="grid grid-cols-3 gap-2"><input type="number" min="1" value={form.durationMinutes} onChange={e=>setForm({...form,durationMinutes:e.target.value})} className="border rounded-xl p-3 text-sm"/><input type="number" min="0" max="100" value={form.passingScore} onChange={e=>setForm({...form,passingScore:e.target.value})} className="border rounded-xl p-3 text-sm"/><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="border rounded-xl p-3 text-sm bg-white"><option value="draft">Draft</option><option value="published">Published</option></select></div></div>{form.questions.map((q,qi)=><div key={qi} className="p-4 border rounded-2xl bg-slate-50 space-y-3"><div className="flex justify-between"><b>Question {qi+1}</b>{form.questions.length>1&&<button type="button" onClick={()=>setForm(f=>({...f,questions:f.questions.filter((_,i)=>i!==qi)}))} className="text-xs font-bold text-red-600">Remove</button>}</div><input required value={q.question} onChange={e=>updateQ(qi,{question:e.target.value})} placeholder="Question text" className="w-full border rounded-xl p-3 bg-white text-sm"/><div className="grid md:grid-cols-2 gap-2">{q.options.map((o,oi)=><input key={oi} value={o} onChange={e=>updateOpt(qi,oi,e.target.value)} placeholder={`Option ${String.fromCharCode(65+oi)}`} className="border rounded-xl p-3 bg-white text-sm"/>)}</div><select value={q.correctAnswer} onChange={e=>updateQ(qi,{correctAnswer:Number(e.target.value)})} className="border rounded-xl p-3 bg-white text-sm"><option value="0">Option A is correct</option><option value="1">Option B is correct</option><option value="2">Option C is correct</option><option value="3">Option D is correct</option></select></div>)}<button type="button" onClick={()=>setForm(f=>({...f,questions:[...f.questions,emptyQuestion()]}))} className="w-full py-3 border-2 border-dashed border-purple-300 text-purple-700 rounded-xl text-sm font-bold">+ Add Another Question</button><button type="submit" className="w-full py-3 bg-purple-700 text-white rounded-xl font-bold flex items-center justify-center gap-2"><Save className="w-4 h-4"/> Save Quiz</button></form></div></div>}
    {assigning && <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 max-w-lg w-full"><div className="flex justify-between"><h2 className="font-extrabold">Assign: {assigning.title}</h2><button onClick={()=>setAssigning(null)}><X/></button></div><input value={studentSearch} onChange={e=>setStudentSearch(e.target.value)} placeholder="Search student by name or email" className="w-full border rounded-xl p-3 text-sm mt-4"/><div className="max-h-72 overflow-y-auto space-y-2 mt-3">{students.map(u=><label key={u.id} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer"><input type="checkbox" checked={selectedStudents.includes(String(u.id))} onChange={e=>setSelectedStudents(s=>e.target.checked?[...new Set([...s,String(u.id)])]:s.filter(x=>x!==String(u.id)))} /><span><b className="text-sm">{u.name}</b><small className="block text-xs text-slate-500">{u.email}</small></span></label>)}</div><button onClick={saveAssignment} className="w-full mt-4 py-3 bg-purple-700 text-white rounded-xl text-xs font-bold">Save Assignment ({selectedStudents.length})</button></div></div>}
    {dashboard && <div className="fixed inset-0 z-50 bg-slate-900/60 overflow-y-auto p-4"><div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 my-6"><div className="flex justify-between"><div><span className="text-[10px] uppercase font-bold text-purple-700">ADMIN ONLY</span><h2 className="text-xl font-extrabold mt-1">{dashboard.quiz.title}</h2><p className="text-xs text-slate-500">{dashboard.quiz.institution || 'All Institutions'} • {dashboard.quiz.courseTitle || 'General'}</p></div><button onClick={()=>setDashboard(null)}><X/></button></div><div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mt-5">{Object.entries(dashboard.stats).map(([k,v])=><div key={k} className="p-3 bg-slate-50 border rounded-xl text-center"><p className="text-[10px] text-slate-500 capitalize">{k}</p><b className="text-sm">{typeof v==='number'&&['average','highest','lowest'].includes(k)?`${v}%`:v}</b></div>)}</div><div className="overflow-x-auto mt-5"><table className="w-full text-xs"><thead><tr className="border-b text-left"><th className="p-3">Student</th><th className="p-3">Email</th><th className="p-3">Attempts</th><th className="p-3">Score</th><th className="p-3">Status</th></tr></thead><tbody>{dashboard.students.map(s=><tr key={s.id} className="border-b"><td className="p-3 font-bold">{s.name}</td><td className="p-3">{s.email}</td><td className="p-3">{s.attempts}</td><td className="p-3">{s.score==null?'—':`${s.score}%`}</td><td className="p-3">{s.status}</td></tr>)}</tbody></table></div></div></div>}
  </div>;
};
