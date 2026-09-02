const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. CourseManagerPage
save('src/pages/courses/CourseManagerPage.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Plus } from 'lucide-react';

export const CourseManagerPage = () => {
  const { courses, addCourse } = useLMS();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Software Engineering');
  const [price, setPrice] = useState(499);
  const [duration, setDuration] = useState('12 Weeks');
  const [description, setDescription] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addCourse({
      title,
      category,
      price: Number(price),
      originalPrice: Number(price) + 200,
      duration,
      description,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'
    });
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Curriculum & Course Management</h1>
          <p className="text-sm text-slate-500 mt-1">Design courses, publish syllabus structures, configure pricing and lesson media.</p>
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
              <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {c.category}
              </span>
              <h3 className="font-bold text-slate-900 text-sm mt-1.5 line-clamp-1">{c.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">{c.description}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">₹{c.price} • {c.duration}</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">{c.enrolledCount} Students</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create New Course</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Next.js 14 Microservices"
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
                    <option>Software Engineering</option>
                    <option>Artificial Intelligence</option>
                    <option>Cloud & Infrastructure</option>
                    <option>Design & Product</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  placeholder="e.g. 14 Weeks"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows="3"
                  className="w-full border border-slate-300 rounded-xl p-2 text-xs"
                  placeholder="Summary..."
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
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

// 2. FeeManagementPage
save('src/pages/fees/FeeManagementPage.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { CheckCircle2 } from 'lucide-react';

export const FeeManagementPage = ({ onOpenPayment }) => {
  const { fees } = useLMS();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fee & Payment Processing</h1>
        <p className="text-sm text-slate-500 mt-1">Manage course fees, invoice receipts, and promo discounts.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Invoice Number</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Course</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees.map(f => (
                <tr key={f.invoiceId} className="hover:bg-slate-50/50">
                  <td className="p-3 font-mono font-bold text-blue-700">{f.invoiceId}</td>
                  <td className="p-3 font-bold text-slate-900">{f.studentName}</td>
                  <td className="p-3 text-slate-600">{f.courseName}</td>
                  <td className="p-3 font-extrabold text-slate-900">₹{f.paidAmount || f.amount}</td>
                  <td className="p-3 text-emerald-600 font-semibold">{f.discount ? \`-₹\${f.discount}\` : '₹0'}</td>
                  <td className="p-3">
                    <span className={\`px-2.5 py-0.5 rounded-full font-bold text-[10px] \${
                      f.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }\`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{f.paymentMethod || 'Pending Gateway'}</td>
                  <td className="p-3 text-right">
                    {f.status === 'Pending' ? (
                      <button
                        onClick={() => onOpenPayment(f)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs"
                      >
                        Checkout / Pay
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center justify-end space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Receipt Ready</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
`);
