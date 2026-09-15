import React, { useState, useEffect } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Download, Pencil, Mail, Phone, Plus, X, GraduationCap, Briefcase } from 'lucide-react';

const SUGGESTED_SKILLS = [
  'React JS', 'Node.js', 'JavaScript', 'Python', 'Java', 'HTML5 & CSS3',
  'SQL', 'MongoDB', 'Git & GitHub', 'AWS', 'Docker', 'Kubernetes',
  'REST APIs', 'Android (Kotlin)', 'Figma / UI-UX', 'Machine Learning',
  'Linux', 'Selenium Testing', 'C++', 'Data Structures & Algorithms'
];

const SUGGESTED_PROJECTS = [
  'E-Commerce Website — MERN stack',
  'Personal Portfolio Website',
  'To-Do List App with Local Storage',
  'Student Result Management System',
  'Weather App using a Public API',
  'Blog Platform with User Authentication',
  'Machine Learning Model for Prediction',
  'Android Notes App with Room Database'
];

const defaultResume = () => ({
  name: '',
  email: '',
  phone: '',
  summary: '',
  skills: [],
  projects: [],
  education: ''
});

export const ResumeBuilderPage = () => {
  const { currentUser, resumeData, updateResumeData } = useLMS();

  const [form, setForm] = useState(resumeData || defaultResume());
  const [editing, setEditing] = useState(!resumeData);
  const [skillInput, setSkillInput] = useState('');
  const [projectInput, setProjectInput] = useState('');
  const [showSkillOptions, setShowSkillOptions] = useState(false);
  const [showProjectOptions, setShowProjectOptions] = useState(false);

  useEffect(() => {
    if (resumeData) setForm(resumeData);
  }, [resumeData]);

  const addSkill = (value) => {
    const v = (value ?? skillInput).trim();
    if (!v) { setShowSkillOptions(prev => !prev); return; }
    if (form.skills.includes(v)) { setSkillInput(''); setShowSkillOptions(false); return; }
    setForm(prev => ({ ...prev, skills: [...prev.skills, v] }));
    setSkillInput('');
    setShowSkillOptions(false);
  };
  const removeSkill = (i) => setForm(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }));

  const addProject = (value) => {
    const v = (value ?? projectInput).trim();
    if (!v) { setShowProjectOptions(prev => !prev); return; }
    if (form.projects.includes(v)) { setProjectInput(''); setShowProjectOptions(false); return; }
    setForm(prev => ({ ...prev, projects: [...prev.projects, v] }));
    setProjectInput('');
    setShowProjectOptions(false);
  };
  const removeProject = (i) => setForm(prev => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }));

  const saveResume = () => {
    updateResumeData(form);
    setEditing(false);
  };

  const downloadResume = () => {
    updateResumeData(form);
    // The printable resume only exists in the preview (non-editing) view,
    // so switch to it first, then print on the next paint.
    setEditing(false);
    setTimeout(() => window.print(), 50);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-black tracking-tight">Resume Builder</h1>
          <p className="text-sm text-slate-500 mt-1">Build a clean, ATS-friendly resume to attach to job applications.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadResume} className="flex items-center space-x-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-black font-bold text-xs rounded-xl transition-all">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={() => editing ? saveResume() : setEditing(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all"
          >
            <Pencil className="w-4 h-4" />
            <span>{editing ? 'Save Resume' : 'Edit Resume'}</span>
          </button>
        </div>
      </div>

      {editing ? (
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-5 print:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input autoComplete="off" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone</label>
              <input autoComplete="off" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
            <input autoComplete="off" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Professional Summary</label>
            <textarea autoComplete="off" value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} rows={3} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Skills</label>
            <div className="flex gap-2 mb-2">
              <input autoComplete="off" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="e.g. React JS, or click + for suggestions" className="flex-1 p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
              <button type="button" onClick={() => addSkill()} title="Add skill, or show suggestions" className="px-3 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl"><Plus className="w-4 h-4" /></button>
            </div>
            {showSkillOptions && (
              <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">Suggested Skills — tap to add</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_SKILLS.filter(s => !form.skills.includes(s)).map(s => (
                    <button type="button" key={s} onClick={() => addSkill(s)} className="px-2.5 py-1 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-800 text-xs font-semibold rounded-full border border-slate-200 hover:border-purple-200 transition-colors">
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {form.skills.map((s, i) => (
                <span key={i} className="flex items-center space-x-1 px-2.5 py-1 bg-purple-50 text-purple-800 text-xs font-semibold rounded-full border border-purple-200">
                  <span>{s}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(i)} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Projects</label>
            <div className="flex gap-2 mb-2">
              <input autoComplete="off" value={projectInput} onChange={e => setProjectInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addProject())} placeholder="e.g. E-Commerce Website — MERN stack, or click + for ideas" className="flex-1 p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
              <button type="button" onClick={() => addProject()} title="Add project, or show ideas" className="px-3 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl"><Plus className="w-4 h-4" /></button>
            </div>
            {showProjectOptions && (
              <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">Project Ideas — tap to add</p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_PROJECTS.filter(p => !form.projects.includes(p)).map(p => (
                    <button type="button" key={p} onClick={() => addProject(p)} className="text-left px-2.5 py-1.5 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-800 text-xs font-semibold rounded-lg border border-slate-200 hover:border-purple-200 transition-colors">
                      + {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <ul className="space-y-1">
              {form.projects.map((p, i) => (
                <li key={i} className="flex items-center justify-between text-sm bg-slate-50 px-3 py-2 rounded-xl">
                  <span>{p}</span>
                  <X className="w-3.5 h-3.5 cursor-pointer text-slate-400" onClick={() => removeProject(i)} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Education</label>
            <input autoComplete="off" value={form.education} onChange={e => setForm({ ...form, education: e.target.value })} placeholder="e.g. MCA — LNCT Bhopal" className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
          </div>

          <button onClick={saveResume} className="px-5 py-2.5 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-xl">Save Resume</button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm max-w-2xl mx-auto space-y-5" id="print-area">
          <div className="flex items-center space-x-4 pb-4 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-extrabold text-xl">
              {form.name?.charAt(0) || 'S'}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-black">{form.name}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                {form.email && <span className="flex items-center space-x-1"><Mail className="w-3.5 h-3.5" /><span>{form.email}</span></span>}
                {form.phone && <span className="flex items-center space-x-1"><Phone className="w-3.5 h-3.5" /><span>{form.phone}</span></span>}
              </div>
            </div>
          </div>

          {form.summary && (
            <div>
              <h3 className="text-xs font-bold uppercase text-purple-700 mb-1">Summary</h3>
              <p className="text-sm text-slate-700">{form.summary}</p>
            </div>
          )}

          {form.skills?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase text-purple-700 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {form.skills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 bg-purple-50 text-purple-800 text-xs font-semibold rounded-full border border-purple-200">{s}</span>
                ))}
              </div>
            </div>
          )}

          {form.projects?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase text-purple-700 mb-2 flex items-center space-x-1.5"><Briefcase className="w-3.5 h-3.5" /><span>Projects</span></h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {form.projects.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}

          {form.education && (
            <div>
              <h3 className="text-xs font-bold uppercase text-purple-700 mb-1 flex items-center space-x-1.5"><GraduationCap className="w-3.5 h-3.5" /><span>Education</span></h3>
              <p className="text-sm text-slate-700">{form.education}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
