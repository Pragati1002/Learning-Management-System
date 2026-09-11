import React, { useMemo, useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Plus, Video, Pencil, Trash2, ExternalLink, Calendar, Clock, X } from 'lucide-react';

const EMPTY_FORM = {
  courseId: '',
  title: '',
  instructor: '',
  date: '',
  startTime: '',
  endTime: '',
  platform: 'Google Meet',
  meetingLink: '',
  description: '',
  status: 'Scheduled'
};

const formatDate = (date) => {
  if (!date) return '—';
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const LiveClassManagerPage = () => {
  const { courses, liveClasses, currentUser, addLiveClass, updateLiveClass, deleteLiveClass } = useLMS();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const sortedClasses = useMemo(() => (
    [...(liveClasses || [])].sort((a, b) => {
      const aKey = `${a.date || ''} ${a.startTime || ''}`;
      const bKey = `${b.date || ''} ${b.startTime || ''}`;
      return aKey.localeCompare(bKey);
    })
  ), [liveClasses]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, instructor: currentUser?.name || '' });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      courseId: item.courseId || '',
      title: item.title || '',
      instructor: item.instructor || currentUser?.name || '',
      date: item.date || '',
      startTime: item.startTime || '',
      endTime: item.endTime || '',
      platform: item.platform || 'Google Meet',
      meetingLink: item.meetingLink || '',
      description: item.description || '',
      status: item.status || 'Scheduled'
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.courseId || !form.title.trim() || !form.date || !form.startTime || !form.endTime || !form.meetingLink.trim()) return;

    const payload = {
      ...form,
      title: form.title.trim(),
      instructor: form.instructor.trim() || currentUser?.name || 'Administrator',
      meetingLink: form.meetingLink.trim(),
      description: form.description.trim()
    };

    const result = editingId
      ? await updateLiveClass(editingId, payload)
      : await addLiveClass(payload);

    if (result) closeForm();
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete live class "${title}"?`)) return;
    await deleteLiveClass(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Live Class Management</h1>
          <p className="text-sm text-slate-500 mt-1">Schedule and manage live sessions. Changes are saved directly to MongoDB.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Live Class</span>
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Video className="w-5 h-5 text-purple-600" />
          <h2 className="font-extrabold text-slate-900">Scheduled Sessions</h2>
          <span className="text-xs font-bold bg-purple-50 text-purple-700 px-2 py-1 rounded-full">{sortedClasses.length}</span>
        </div>

        {sortedClasses.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-300 rounded-2xl">
            <Video className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No live classes yet</p>
            <p className="text-xs text-slate-500 mt-1">Schedule your first class using the button above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedClasses.map(item => (
              <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-slate-900 text-sm">{item.title}</h3>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        item.status === 'Live' ? 'bg-red-100 text-red-700' :
                        item.status === 'Completed' ? 'bg-slate-200 text-slate-700' :
                        item.status === 'Cancelled' ? 'bg-red-50 text-red-600' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>{item.status}</span>
                    </div>
                    <p className="text-xs text-purple-700 font-bold mt-1">{item.courseTitle}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(item.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.time}</span>
                      <span>{item.platform}</span>
                      <span>Instructor: {item.instructor}</span>
                    </div>
                    {item.description && <p className="text-xs text-slate-600 mt-2">{item.description}</p>}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={item.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                    >
                      Join <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button onClick={() => openEdit(item)} className="p-2 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-xl" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id, item.title)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl my-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">{editingId ? 'Edit Live Class' : 'Schedule Live Class'}</h2>
                <p className="text-xs text-slate-500 mt-1">This session will be stored in MongoDB and shown to enrolled students.</p>
              </div>
              <button onClick={closeForm} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Course *</label>
                <select name="courseId" value={form.courseId} onChange={handleChange} required className="w-full border border-slate-300 rounded-xl p-2.5 text-sm bg-white">
                  <option value="">Select course</option>
                  {courses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Title *</label>
                <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. React Hooks Doubt Clearing" className="w-full border border-slate-300 rounded-xl p-2.5 text-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date *</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full border border-slate-300 rounded-xl p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Time *</label>
                  <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required className="w-full border border-slate-300 rounded-xl p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Time *</label>
                  <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required className="w-full border border-slate-300 rounded-xl p-2.5 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instructor</label>
                  <input name="instructor" value={form.instructor} onChange={handleChange} placeholder="Instructor name" className="w-full border border-slate-300 rounded-xl p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Platform</label>
                  <select name="platform" value={form.platform} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm bg-white">
                    <option>Google Meet</option>
                    <option>Zoom</option>
                    <option>Microsoft Teams</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meeting Link *</label>
                  <input type="url" name="meetingLink" value={form.meetingLink} onChange={handleChange} required placeholder="https://meet.google.com/..." className="w-full border border-slate-300 rounded-xl p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select name="status" value={form.status} onChange={handleChange} className="w-full border border-slate-300 rounded-xl p-2.5 text-sm bg-white">
                    <option>Scheduled</option>
                    <option>Live</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description / Agenda</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Topics students should prepare for..." className="w-full border border-slate-300 rounded-xl p-2.5 text-sm resize-none" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeForm} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold">{editingId ? 'Save Changes' : 'Schedule Class'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
