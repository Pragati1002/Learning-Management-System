const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. AdminDashboard
save('src/pages/dashboards/AdminDashboard.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { Users, BookOpen, DollarSign, Award, ArrowUpRight, TrendingUp, ShieldCheck, UserPlus, FileCheck } from 'lucide-react';

export const AdminDashboard = () => {
  const { users, courses, batches, fees, leads, setActiveTab } = useLMS();

  const totalRevenue = fees
    .filter(f => f.status === 'Paid')
    .reduce((acc, curr) => acc + (curr.paidAmount || curr.amount), 0);

  const totalStudents = users.filter(u => u.role === 'student').length + 420;

  const stats = [
    { title: 'Total Enrolled Students', value: totalStudents.toLocaleString(), change: '+18% this month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active Courses & Batches', value: courses.length + ' Courses / ' + batches.length + ' Batches', change: '100% On Schedule', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Fee Revenue', value: '₹' + totalRevenue.toLocaleString(), change: '+24% vs last quarter', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'New Admissions Leads', value: leads.length.toString(), change: '12 scheduled demos', icon: UserPlus, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold rounded-full">
              INSTITUTE EXECUTIVE SUITE
            </span>
            <span className="text-xs text-slate-400">Live Campus Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">Admin & Director Portal</h1>
          <p className="text-sm text-slate-300 max-w-xl mt-1">
            Real-time management for curriculum lifecycle, admissions CRM, financial ledger, and instructor performance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveTab('courses-manage')} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
          >
            Manage Courses
          </button>
          <button 
            onClick={() => setActiveTab('leads')} 
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-all"
          >
            Admissions CRM
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{s.title}</span>
                <div className={\`p-2 rounded-xl \${s.bg} \${s.color}\`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-extrabold text-slate-900">{s.value}</h3>
                <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{s.change}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: User Roster & Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Course Overview & Users */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Courses */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Current Curriculum & Offerings</h3>
                <p className="text-xs text-slate-500">Live programs with syllabus modules</p>
              </div>
              <button onClick={() => setActiveTab('courses-manage')} className="text-xs text-blue-600 hover:underline font-semibold">
                View All Courses
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {courses.slice(0, 4).map(c => (
                <div key={c.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={c.thumbnail} alt={c.title} className="w-12 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1">{c.title}</h4>
                      <p className="text-[11px] text-slate-500">{c.category} • {c.duration} • ₹{c.price}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                    {c.enrolledCount} Students
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Directory */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Key Role Stakeholders</h3>
                <p className="text-xs text-slate-500">Institutional accounts and roles</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {users.map(u => (
                <div key={u.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-3">
                  <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{u.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{u.title}</p>
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
                      {u.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Recent Dues & Inquiries */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base mb-1">Recent Payments & Fees</h3>
            <p className="text-xs text-slate-500 mb-4">Live fee collection stream</p>
            <div className="space-y-3">
              {fees.slice(0, 4).map(f => (
                <div key={f.invoiceId} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">{f.studentName}</span>
                    <span className="text-slate-500 text-[11px]">{f.courseName.slice(0, 22)}...</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-slate-900 block">₹{f.paidAmount || f.amount}</span>
                    <span className={\`text-[10px] font-bold px-1.5 py-0.5 rounded \${
                      f.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }\`}>
                      {f.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setActiveTab('fees')}
              className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
            >
              Open Full Fee Ledger
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-5 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full System Compliance</span>
            </div>
            <h4 className="font-bold text-sm">Automated Training Lifecycle</h4>
            <p className="text-xs text-indigo-100 mt-1 leading-relaxed">
              Lead → Admission → Batches → Live Video Classes → Timed Assessments → Tamper-proof Verified Certificate → Placement Drives.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
`);

// 2. TrainerDashboard
save('src/pages/dashboards/TrainerDashboard.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { BookOpen, Users, Video, FileCheck2, CheckCircle2, ArrowRight } from 'lucide-react';

export const TrainerDashboard = ({ onOpenLiveClass }) => {
  const { courses, batches, assignments, liveClasses, setActiveTab } = useLMS();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold rounded-full">
            FACULTY & TRAINER HUB
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Instructor Workstation</h1>
          <p className="text-sm text-emerald-100 max-w-xl mt-1">
            Manage your batches, launch live Zoom/Meet lectures, evaluate student assignments, and track daily attendance.
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onOpenLiveClass(liveClasses[0])}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-1.5"
          >
            <Video className="w-4 h-4" />
            <span>Launch Live Class</span>
          </button>
        </div>
      </div>

      {/* Grid: Batches & Submissions needing grading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Batches */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">My Assigned Batches</h3>
            <button onClick={() => setActiveTab('batches')} className="text-xs text-emerald-600 font-semibold hover:underline">
              Mark Attendance
            </button>
          </div>
          <div className="space-y-3">
            {batches.map(b => (
              <div key={b.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{b.name}</h4>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {b.studentsCount} Students
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{b.schedule}</p>
                <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs">
                  <span className="text-slate-600 font-medium">Avg Attendance: 92%</span>
                  <button onClick={() => setActiveTab('batches')} className="text-blue-600 hover:text-blue-800 font-bold">
                    Take Roll Call →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Assignment Submissions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Assignment Grading Queue</h3>
            <button onClick={() => setActiveTab('assessments')} className="text-xs text-emerald-600 font-semibold hover:underline">
              View All Submissions
            </button>
          </div>
          <div className="space-y-3">
            {assignments.map(asg => (
              <div key={asg.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{asg.title}</h4>
                  <span className="text-[11px] text-slate-500 font-medium">Due: {asg.dueDate}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{asg.courseName}</p>
                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                  <span className="text-slate-500">{asg.submissions.length} Submissions</span>
                  <button onClick={() => setActiveTab('assessments')} className="text-emerald-700 hover:text-emerald-900 font-bold">
                    Evaluate & Grade →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
`);

// 3. StudentDashboard
save('src/pages/dashboards/StudentDashboard.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { BookOpen, Video, Award, Sparkles, CheckCircle, ArrowRight, PlayCircle, Clock } from 'lucide-react';

export const StudentDashboard = ({ onOpenLiveClass, onOpenCertificate }) => {
  const { currentUser, courses, certificates, getCourseProgress, setSelectedCourseForPlayer, setActiveTab } = useLMS();

  const enrolledCourseObjects = courses.filter(c => currentUser.enrolledCourses?.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold rounded-full">
              LEARNER DESK
            </span>
            <span className="text-xs text-yellow-300 font-semibold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentUser.points || 1250} Learning XP</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Welcome back, {currentUser.name}!</h1>
          <p className="text-sm text-blue-200 max-w-xl mt-1">
            You are enrolled in {enrolledCourseObjects.length} active specialization tracks. Keep learning to earn industry certificates!
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('courses-catalog')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Browse New Courses
          </button>
        </div>
      </div>

      {/* Enrolled Courses Learning Progress Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">My Active Courses</h3>
          <span className="text-xs text-slate-500 font-medium">Auto-synced progress</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {enrolledCourseObjects.map(c => {
            const progress = getCourseProgress(c.id);
            return (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <img src={c.thumbnail} alt={c.title} className="w-20 h-16 rounded-xl object-cover shadow-sm shrink-0" />
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {c.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1 line-clamp-1">{c.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{c.instructor}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Course Completion</span>
                      <span className="text-blue-700">{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500" 
                        style={{ width: \`\${progress}%\` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{c.duration}</span>
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCourseForPlayer(c);
                      setActiveTab('course-player');
                    }}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Resume Learning</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Earned Certificates & AI Study Path */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Certificates */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Earned Certifications</h3>
              <p className="text-xs text-slate-500">Verified credentials issued upon module passing</p>
            </div>
          </div>
          {certificates.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">Complete any course assessment with 70%+ score to earn your official certificate!</p>
          ) : (
            <div className="space-y-3">
              {certificates.map(cert => (
                <div key={cert.certificateId} className="p-4 bg-gradient-to-r from-amber-50/60 to-orange-50/60 border border-amber-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-sm">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{cert.courseName}</h4>
                      <p className="text-[11px] text-slate-500">Issued: {cert.issueDate} • Grade: {cert.grade}</p>
                      <p className="text-[10px] font-mono text-blue-700 font-bold">ID: {cert.certificateId}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenCertificate(cert)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    View & Print
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Study Recommendations */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white p-5 rounded-2xl shadow-md space-y-3">
          <div className="flex items-center space-x-2 text-yellow-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>AI Personalized Recommendation</span>
          </div>
          <h4 className="font-bold text-sm">Focus Topic: Async JS & Microtasks</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Based on your recent quiz attempts, revising Promise microtasks and Event Loop queues will boost your code execution score by +15%.
          </p>
          <button 
            onClick={() => setActiveTab('assessments')}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Take Practice Assessment
          </button>
        </div>

      </div>
    </div>
  );
};
`);

// 4. AccountantDashboard
save('src/pages/dashboards/AccountantDashboard.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { DollarSign, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

export const AccountantDashboard = ({ onOpenPayment }) => {
  const { fees, setActiveTab } = useLMS();

  const collected = fees.filter(f => f.status === 'Paid').reduce((a, c) => a + (c.paidAmount || c.amount), 0);
  const pending = fees.filter(f => f.status === 'Pending').reduce((a, c) => a + c.amount, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold rounded-full">
            FINANCE & ACCOUNTS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Fee Management & Billing</h1>
          <p className="text-sm text-amber-100 max-w-xl mt-1">
            Monitor institutional fee collections, pending student dues, automated receipts, and coupon discount campaigns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Collected Fees</span>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-2">₹{collected.toLocaleString()}</h3>
          <p className="text-xs text-slate-400 mt-1">Direct bank & UPI settlements</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Pending Dues Receivable</span>
          <h3 className="text-2xl font-extrabold text-amber-600 mt-2">₹{pending.toLocaleString()}</h3>
          <p className="text-xs text-slate-400 mt-1">1 active invoice pending</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Active Promo Coupons</span>
          <h3 className="text-2xl font-extrabold text-indigo-600 mt-2">LMS50 • TECH2026</h3>
          <p className="text-xs text-slate-400 mt-1">Up to ₹100 instant discount</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-4">Student Invoices Ledger</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Invoice ID</th>
                <th className="p-3">Student</th>
                <th className="p-3">Course</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees.map(f => (
                <tr key={f.invoiceId} className="hover:bg-slate-50/50">
                  <td className="p-3 font-mono font-bold text-blue-700">{f.invoiceId}</td>
                  <td className="p-3 font-semibold text-slate-800">{f.studentName}</td>
                  <td className="p-3 text-slate-600">{f.courseName}</td>
                  <td className="p-3 font-extrabold text-slate-900">₹{f.paidAmount || f.amount}</td>
                  <td className="p-3">
                    <span className={\`px-2 py-0.5 rounded font-bold text-[10px] \${
                      f.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }\`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {f.status === 'Pending' ? (
                      <button 
                        onClick={() => onOpenPayment(f)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-slate-400">Settled (TXN Verified)</span>
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

// 5. PlacementDashboard
save('src/pages/dashboards/PlacementDashboard.jsx', `import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { Briefcase, Building, CheckCircle, Clock } from 'lucide-react';

export const PlacementDashboard = () => {
  const { placements, setActiveTab } = useLMS();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold rounded-full">
            CORPORATE RELATIONS & PLACEMENTS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Campus Placement Drives</h1>
          <p className="text-sm text-rose-100 max-w-xl mt-1">
            Connect students with Tier-1 technology companies, schedule interviews, and track recruitment conversion rates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {placements.map(job => (
          <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-3">
                <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{job.company}</h4>
                  <p className="text-xs text-slate-500">{job.location}</p>
                </div>
              </div>
              <h3 className="font-extrabold text-blue-700 text-sm mt-3">{job.role}</h3>
              <p className="text-xs font-bold text-emerald-700 mt-1">Package: {job.package}</p>
              <p className="text-xs text-slate-500 mt-2">{job.eligibility}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{job.applicants.length} Applicants</span>
              <button onClick={() => setActiveTab('placements')} className="font-bold text-blue-600 hover:underline">
                View Drive →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
`);
