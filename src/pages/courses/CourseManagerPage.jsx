import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Plus, Trash2, BookOpen } from 'lucide-react';

export const CourseManagerPage = () => {
  const { courses, addCourse, deleteCourse, currentUser } = useLMS();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [duration, setDuration] = useState('12 Weeks');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/kUMe1FH4CHE');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addCourse({
      title,
      category,
      price: 0,
      originalPrice: 0,
      duration,
      description: description || 'Comprehensive course modules and lessons.',
      videoUrl,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'
    });
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  const handleDelete = (courseId, courseTitle) => {
    if (window.confirm(`Are you sure you want to delete course "${courseTitle}"?`)) {
      deleteCourse(courseId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Curriculum & Course Management</h1>
          <p className="text-sm text-slate-500 mt-1">Add new courses, configure lesson videos, and remove courses.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map(c => (
          <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <img src={c.thumbnail} alt={c.title} className="w-full h-36 rounded-xl object-cover mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  {c.category}
                </span>
                <button
                  onClick={() => handleDelete(c.id, c.title)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-1">{c.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">{c.description}</p>
            </div>
            
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">{c.modules?.length || 1} Modules • {c.duration}</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">{c.enrolledCount} Learners</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create & Publish Course</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Next.js 14 Fullstack Masterclass"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-white"
                  >
                    <option>Web Development</option>
                    <option>Python & AI</option>
                    <option>Tools & DevOps</option>
                    <option>Data Structures</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    placeholder="e.g. 8 Weeks"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">YouTube Embed / Video Link</label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Course Summary</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows="3"
                  className="w-full border border-slate-300 rounded-xl p-2 text-xs"
                  placeholder="Describe course topics..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold">
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
