const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. CourseManagerPage.jsx (Add & Delete Course)
save('src/pages/courses/CourseManagerPage.jsx', `import React, { useState } from 'react';
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
    if (window.confirm(\`Are you sure you want to delete course "\${courseTitle}"?\`)) {
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
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 self-start"
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
                <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
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
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold">
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
`);

// 2. BatchAttendancePage.jsx (Add & Delete Batch, Add & Remove Student)
save('src/pages/batches/BatchAttendancePage.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Users, Plus, Trash2, UserPlus } from 'lucide-react';

export const BatchAttendancePage = () => {
  const { batches, courses, addBatch, deleteBatch, addStudentToBatch, removeStudentFromBatch, markAttendance, currentUser } = useLMS();
  
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || '');
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  const [batchName, setBatchName] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [schedule, setSchedule] = useState('Mon, Wed, Fri (06:00 PM - 07:30 PM)');

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentRoll, setNewStudentRoll] = useState('');

  const selectedBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!batchName.trim()) return;
    const matchedCourse = courses.find(c => c.id === courseId);
    addBatch({
      name: batchName,
      courseId,
      courseName: matchedCourse?.title || 'General Course',
      schedule
    });
    setShowAddBatchModal(false);
    setBatchName('');
  };

  const handleDeleteBatch = (bId, bName) => {
    if (window.confirm(\`Are you sure you want to delete batch "\${bName}"?\`)) {
      deleteBatch(bId);
      if (selectedBatchId === bId && batches.length > 1) {
        setSelectedBatchId(batches.find(b => b.id !== bId)?.id || '');
      }
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !selectedBatch) return;
    addStudentToBatch(selectedBatch.id, newStudentName, newStudentRoll);
    setShowAddStudentModal(false);
    setNewStudentName('');
    setNewStudentRoll('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Batch & Attendance Management</h1>
          <p className="text-sm text-slate-500 mt-1">Create cohorts, add students, take attendance, and delete batches.</p>
        </div>
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setShowAddBatchModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Batch</span>
          </button>
        )}
      </div>

      {batches.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
          <p className="text-sm text-slate-500">No batches created yet.</p>
          <button
            onClick={() => setShowAddBatchModal(true)}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
          >
            Create First Batch
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {batches.map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedBatchId(b.id)}
                className={\`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all \${
                  (selectedBatch?.id === b.id)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }\`}
              >
                {b.name}
              </button>
            ))}
          </div>

          {selectedBatch && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{selectedBatch.name}</h3>
                  <p className="text-xs text-slate-500">Course: {selectedBatch.courseName} • Schedule: {selectedBatch.schedule}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAddStudentModal(true)}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 flex items-center space-x-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Student</span>
                  </button>

                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => handleDeleteBatch(selectedBatch.id, selectedBatch.name)}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl border border-red-200 flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Batch</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Attendance Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Roll No</th>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Classes Present</th>
                      <th className="p-3">Total Classes</th>
                      <th className="p-3">Attendance %</th>
                      <th className="p-3 text-center">Mark Attendance</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedBatch.attendance?.map(att => (
                      <tr key={att.studentId} className="hover:bg-slate-50/50">
                        <td className="p-3 font-mono font-bold text-slate-600">{att.rollNo}</td>
                        <td className="p-3 font-bold text-slate-900">{att.studentName}</td>
                        <td className="p-3 font-semibold text-emerald-600">{att.present}</td>
                        <td className="p-3 text-slate-500">{att.total}</td>
                        <td className="p-3">
                          <span className={\`px-2 py-0.5 rounded font-bold text-[10px] \${
                            att.percentage >= 85 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }\`}>
                            {att.percentage}%
                          </span>
                        </td>
                        <td className="p-3 text-center space-x-2">
                          <button
                            onClick={() => markAttendance(selectedBatch.id, att.studentId, true)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
                          >
                            Present (P)
                          </button>
                          <button
                            onClick={() => markAttendance(selectedBatch.id, att.studentId, false)}
                            className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg text-xs"
                          >
                            Absent (A)
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => removeStudentFromBatch(selectedBatch.id, att.studentId)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Remove Student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Batch Modal */}
      {showAddBatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create New Cohort / Batch</h3>
            <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Batch Name *</label>
                <input
                  type="text"
                  required
                  value={batchName}
                  onChange={e => setBatchName(e.target.value)}
                  placeholder="e.g. Batch WebDev-2026-B"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Course</label>
                <select
                  value={courseId}
                  onChange={e => setCourseId(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Schedule & Timings</label>
                <input
                  type="text"
                  value={schedule}
                  onChange={e => setSchedule(e.target.value)}
                  placeholder="e.g. Tue & Thu (07:00 PM - 09:00 PM)"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAddBatchModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-md">
                  Create Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add Student to Batch</h3>
            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  placeholder="e.g. Sneha Verma"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Roll Number</label>
                <input
                  type="text"
                  value={newStudentRoll}
                  onChange={e => setNewStudentRoll(e.target.value)}
                  placeholder="e.g. LMS-002"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAddStudentModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold">
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
`);

console.log('Courses & Batches CRUD updated.');
