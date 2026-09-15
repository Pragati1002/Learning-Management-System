import React, { useMemo, useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Trash2, Plus, Search, Edit3, Users, BarChart3, X } from 'lucide-react';

const blankQuestion = () => ({ question: '', options: ['', '', '', ''], correctAnswer: 0 });

export const AssessmentPage = () => {
  const { quizzes, courses, users, addQuiz, updateQuiz, assignQuiz, getQuizDashboard, deleteQuiz, submitQuizResult, currentUser } = useLMS();
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [search, setSearch] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [institution, setInstitution] = useState('Dayanand Sagar');
  const [duration, setDuration] = useState(15);
  const [passing, setPassing] = useState(70);
  const [questions, setQuestions] = useState([blankQuestion()]);
  const [assigning, setAssigning] = useState(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  const isAdmin = currentUser?.role === 'admin';
  const visibleQuizzes = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (quizzes || []).filter(q => !term || [q.title, q.courseTitle, q.institution].some(v => String(v || '').toLowerCase().includes(term)));
  }, [quizzes, search]);

  const startQuiz = q => { setActiveQuiz(q); setAnswers({}); setResult(null); };

  const submit = async () => {
    const r = await submitQuizResult(activeQuiz.id, null, null, activeQuiz.questions.length, answers);
    if (r) setResult(r);
  };

  const openCreate = () => {
    setEditing(null); setTitle(''); setCourseId(courses[0]?.id || ''); setInstitution('Dayanand Sagar'); setDuration(15); setPassing(70); setQuestions([blankQuestion()]); setShowEditor(true);
  };

  const openEdit = q => {
    setEditing(q); setTitle(q.title || ''); setCourseId(q.courseId || ''); setInstitution(q.institution || 'Dayanand Sagar'); setDuration(q.durationMinutes || 15); setPassing(q.passingScore || 70);
    setQuestions((q.questions || []).map(x => ({ question: x.question || '', options: [...(x.options || [])].concat(['','','','']).slice(0,4), correctAnswer: Number(x.correctAnswer || 0) })));
    setShowEditor(true);
  };

  const saveQuiz = async e => {
    e.preventDefault();
    if (!title.trim() || !questions.length || questions.some(q => !q.question.trim() || q.options.some(o => !o.trim()))) return;
    const course = courses.find(c => c.id === courseId);
    const payload = { title: title.trim(), courseId: courseId || undefined, courseTitle: course?.title || 'General Course', institution: institution.trim(), durationMinutes: Number(duration), passingScore: Number(passing), status: editing?.status || 'published', questions: questions.map(q => ({ question: q.question.trim(), options: q.options, correctAnswer: Number(q.correctAnswer) })) };
    if (editing) await updateQuiz(editing.id, payload); else await addQuiz(payload);
    setShowEditor(false);
  };

  const openAssign = q => { setAssigning(q); setSelectedStudents((q.assignedStudents || []).map(x => String(x?.id || x?._id || x))); setStudentSearch(''); };
  const saveAssign = async () => { await assignQuiz(assigning.id, selectedStudents); setAssigning(null); };
  const openDashboard = async q => { const d = await getQuizDashboard(q.id); if (d) setDashboard(d); };

  if (activeQuiz && !isAdmin) {
    return <div className="space-y-5"><button onClick={() => setActiveQuiz(null)} className="text-sm font-bold text-purple-700">← Back to quizzes</button><div className="bg-white p-6 rounded-2xl border shadow-sm"><p className="text-xs text-purple-700 font-bold">{activeQuiz.courseTitle}</p><h1 className="text-xl font-extrabold mt-1">{activeQuiz.title}</h1><p className="text-xs text-slate-500 mt-1">{activeQuiz.questions.length} questions • {activeQuiz.durationMinutes} minutes</p><div className="mt-6 space-y-5">{activeQuiz.questions.map((q,i)=><div key={q.id} className="p-4 bg-slate-50 rounded-xl border"><p className="font-bold text-sm">{i+1}. {q.question}</p><div className="mt-3 space-y-2">{q.options.map((o,j)=><button key={j} disabled={!!result} onClick={() => setAnswers(a=>({...a,[q.id]:j}))} className={`w-full text-left p-3 rounded-xl border text-sm ${answers[q.id]===j?'border-purple-500 bg-purple-50':'bg-white border-slate-200'}`}>{o}</button>)}</div></div>)}</div>{!result?<button onClick={submit} className="w-full mt-6 py-3 rounded-xl bg-purple-700 text-white font-bold">Submit Quiz</button>:<div className="mt-6 p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center"><h2 className="text-xl font-extrabold">Score: {result.scorePercentage}%</h2><p className="text-sm mt-1">{result.correctCount} / {result.totalCount} correct • {result.passed?'Passed':'Not passed'}</p></div>}</div></div>;
  }

  return <div className="space-y-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3"><div><h1 className="text-2xl font-extrabold">Assessments & Quizzes</h1><p className="text-sm text-slate-500">{isAdmin?'Create, edit, assign and monitor every quiz.':'Only published quizzes belonging to your enrolled course are shown here.'}</p></div>{isAdmin&&<button onClick={openCreate} className="px-4 py-2.5 bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2"><Plus className="w-4 h-4"/>Create Quiz</button>}</div>
    <div className="relative"><Search className="absolute left-3 top-3 w-4 h-4 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={isAdmin?'Search quizzes by name, course or institution...':'Search quizzes from your enrolled courses...'} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm"/></div>
    <div className="grid md:grid-cols-2 gap-5">{visibleQuizzes.map(q=><div key={q.id} className="bg-white p-5 rounded-2xl border shadow-sm"><div className="flex justify-between gap-3"><div><span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-1 rounded">{q.institution || q.courseTitle}</span><h3 className="font-extrabold mt-2">{q.title}</h3><p className="text-xs text-slate-500 mt-1">{q.courseTitle} • {q.questions?.length || 0} questions • {q.status || 'published'}</p></div>{isAdmin&&<span className="text-[10px] font-bold text-slate-500">{q.assignedStudents?.length||0} assigned</span>}</div>{isAdmin?<div className="grid grid-cols-4 gap-2 mt-4"><button onClick={()=>openEdit(q)} className="py-2 rounded-lg bg-slate-100 text-xs font-bold flex justify-center"><Edit3 className="w-3.5 h-3.5 mr-1"/>Edit</button><button onClick={()=>openAssign(q)} className="py-2 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex justify-center"><Users className="w-3.5 h-3.5 mr-1"/>Assign</button><button onClick={()=>openDashboard(q)} className="py-2 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold flex justify-center"><BarChart3 className="w-3.5 h-3.5 mr-1"/>Dashboard</button><button onClick={()=>window.confirm(`Delete ${q.title}?`)&&deleteQuiz(q.id)} className="py-2 rounded-lg bg-red-50 text-red-600 text-xs font-bold flex justify-center"><Trash2 className="w-3.5 h-3.5"/></button></div>:<button onClick={()=>startQuiz(q)} className="w-full mt-4 py-2.5 rounded-xl bg-purple-700 text-white text-xs font-bold">Take Quiz</button>}</div>)}</div>
    {!visibleQuizzes.length&&<div className="bg-white border rounded-2xl p-10 text-center text-sm text-slate-500">No quizzes found.</div>}

    {showEditor&&<div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto"><form onSubmit={saveQuiz} className="bg-white rounded-2xl p-6 max-w-3xl w-full my-8 space-y-4"><div className="flex justify-between"><h2 className="text-lg font-extrabold">{editing?'Edit Quiz':'Create Quiz'}</h2><button type="button" onClick={()=>setShowEditor(false)}><X/></button></div><div className="grid md:grid-cols-2 gap-3"><input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Quiz name" className="border rounded-xl p-3 text-sm"/><select value={courseId} onChange={e=>setCourseId(e.target.value)} className="border rounded-xl p-3 text-sm"><option value="">General Course</option>{courses.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}</select><input value={institution} onChange={e=>setInstitution(e.target.value)} placeholder="Institution / College" className="border rounded-xl p-3 text-sm"/><input type="number" value={duration} onChange={e=>setDuration(e.target.value)} placeholder="Duration" className="border rounded-xl p-3 text-sm"/><input type="number" value={passing} onChange={e=>setPassing(e.target.value)} placeholder="Passing %" className="border rounded-xl p-3 text-sm"/></div><div className="flex items-center justify-between"><h3 className="font-bold">Questions ({questions.length})</h3><button type="button" onClick={()=>setQuestions(q=>[...q,blankQuestion()])} className="px-3 py-2 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold">+ Add Question</button></div><div className="space-y-4 max-h-[55vh] overflow-y-auto">{questions.map((q,qi)=><div key={qi} className="border rounded-xl p-4 space-y-2"><div className="flex justify-between"><b className="text-sm">Question {qi+1}</b>{questions.length>1&&<button type="button" onClick={()=>setQuestions(qs=>qs.filter((_,i)=>i!==qi))} className="text-xs text-red-600 font-bold">Remove</button>}</div><input required value={q.question} onChange={e=>setQuestions(qs=>qs.map((x,i)=>i===qi?{...x,question:e.target.value}:x))} placeholder="Question" className="w-full border rounded-xl p-2.5 text-sm"/>{q.options.map((o,oi)=><input key={oi} required value={o} onChange={e=>setQuestions(qs=>qs.map((x,i)=>i===qi?{...x,options:x.options.map((v,j)=>j===oi?e.target.value:v)}:x))} placeholder={`Option ${String.fromCharCode(65+oi)}`} className="w-full border rounded-xl p-2.5 text-sm"/>)}<select value={q.correctAnswer} onChange={e=>setQuestions(qs=>qs.map((x,i)=>i===qi?{...x,correctAnswer:Number(e.target.value)}:x))} className="w-full border rounded-xl p-2.5 text-sm">{q.options.map((_,oi)=><option key={oi} value={oi}>Correct: Option {String.fromCharCode(65+oi)}</option>)}</select></div>)}</div><div className="flex justify-end gap-2"><button type="button" onClick={()=>setShowEditor(false)} className="px-4 py-2 rounded-xl bg-slate-100">Cancel</button><button className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold">{editing?'Save Changes':'Create Quiz'}</button></div></form></div>}

    {assigning&&<div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4"><div className="flex justify-between"><h2 className="font-extrabold">Assign: {assigning.title}</h2><button onClick={()=>setAssigning(null)}><X/></button></div><input value={studentSearch} onChange={e=>setStudentSearch(e.target.value)} placeholder="Search student by name or email" className="w-full border rounded-xl p-3 text-sm"/><div className="max-h-64 overflow-y-auto space-y-1">{(users||[]).filter(u=>u.role==='student'&&(`${u.name} ${u.email}`).toLowerCase().includes(studentSearch.toLowerCase())).map(u=><label key={u.id} className="flex gap-3 items-center p-3 rounded-lg hover:bg-slate-50"><input type="checkbox" checked={selectedStudents.includes(String(u.id))} onChange={e=>setSelectedStudents(prev=>e.target.checked?[...new Set([...prev,String(u.id)])]:prev.filter(id=>id!==String(u.id)))} /><span className="text-sm">{u.name}<small className="block text-slate-400">{u.email}</small></span></label>)}</div><button onClick={saveAssign} className="w-full py-3 rounded-xl bg-purple-700 text-white font-bold">Save Assignment</button></div></div>}

    {dashboard&&<div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto"><div className="bg-white rounded-2xl p-6 max-w-5xl w-full my-8"><div className="flex justify-between"><div><h2 className="text-lg font-extrabold">{dashboard.quiz.title}</h2><p className="text-xs text-slate-500">Admin-only quiz dashboard</p></div><button onClick={()=>setDashboard(null)}><X/></button></div><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">{Object.entries(dashboard.stats).map(([k,v])=><div key={k} className="p-3 bg-slate-50 border rounded-xl"><p className="text-[10px] uppercase font-bold text-slate-500">{k}</p><b className="text-xl">{v}</b></div>)}</div><div className="mt-5 overflow-auto"><table className="w-full text-xs"><thead><tr className="border-b text-left"><th className="p-2">Student</th><th>Score</th><th>Correct</th><th>Date</th></tr></thead><tbody>{dashboard.attempts.map(a=><tr key={a._id} className="border-b"><td className="p-2">{a.student?.name||a.student?.email||'Student'}</td><td>{a.scorePercentage}%</td><td>{a.correctCount}/{a.totalCount}</td><td>{new Date(a.createdAt).toLocaleString()}</td></tr>)}</tbody></table></div></div></div>}
  </div>;
};
