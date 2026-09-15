import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { TrendingUp, CheckCircle2, Clock, BookOpen, Award, History } from 'lucide-react';

export const ProgressTrackerPage = () => {
  const { currentUser, courses, getCourseProgress, certificates } = useLMS();

  const enrolledIds = (currentUser?.enrolledCourses || []).map(String);
  const paidIds = (currentUser?.paidCourseIds || []).map(String);
  const enrolledCourses = courses.filter(c => enrolledIds.includes(String(c.id)) && (Number(c.price || 0) === 0 || paidIds.includes(String(c.id))));

  const totalLessons = enrolledCourses.reduce((sum, c) => sum + (c.modules?.flatMap(m => m.lessons)?.length || 0), 0);
  const completedCount = currentUser?.completedLessons?.length || 0;
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const history = [...(currentUser?.lessonCompletions || [])].sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
  );

  const formatDate = (d) => new Date(d).toLocaleDateString(undefined, {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Progress Tracker</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">See how far along you are in every course, and your full completion history.</p>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-300 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase">Overall Progress</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{overallPercent}%</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase">Lessons Done</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{completedCount}/{totalLessons}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-300 mb-1">
            <BookOpen className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase">Active Courses</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{enrolledCourses.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-300 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase">Certificates</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{certificates?.length || 0}</p>
        </div>
      </div>

      {/* Per-course progress */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Course-wise Completion</h3>
        {enrolledCourses.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">You haven't enrolled in any courses yet.</p>
        ) : (
          <div className="space-y-4">
            {enrolledCourses.map(course => {
              const pct = getCourseProgress(course.id);
              return (
                <div key={course.id}>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-800 dark:text-slate-200">{course.title}</span>
                    <span className="text-purple-700 dark:text-purple-300">{pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-700 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Completion history */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-purple-700 dark:text-purple-300" />
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Completion History</h3>
        </div>
        {history.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">No lessons completed yet — your history will build up as you learn.</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {history.map((h, i) => (
              <div key={`${h.lessonId}_${i}`} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{h.lessonTitle}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{h.courseTitle}</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center space-x-1 shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(h.completedAt)}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
