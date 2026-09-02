import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { CheckCircle2, Circle, ArrowLeft, Video, Radio, ClipboardList, Info, ChevronRight } from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'content', label: 'Content', icon: Video },
  { id: 'live-classes', label: 'Live Classes', icon: Radio },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList },
];

export const CourseContentPage = () => {
  const {
    selectedCourseForPlayer,
    courses,
    currentUser,
    getCourseProgress,
    setActiveTab,
    setSelectedLessonForMaterials,
    assignments,
  } = useLMS();

  const course = selectedCourseForPlayer || courses[0];
  const progress = getCourseProgress(course.id);
  const [tab, setTab] = useState('content');

  const courseAssignments = assignments?.filter(a => a.courseId === course.id) || [];

  const openLesson = (lesson) => {
    setSelectedLessonForMaterials({ lesson, course });
    setActiveTab('study-materials');
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {course.category}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">{course.title}</h2>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-xs font-semibold">
          <span className="text-blue-700 font-extrabold">{progress}% Completed</span>
          <div className="w-28 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-1.5">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-lg">About This Course</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{course.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <p className="text-[11px] font-bold uppercase text-slate-400">Duration</p>
              <p className="text-sm font-bold text-slate-900">{course.duration}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase text-slate-400">Level</p>
              <p className="text-sm font-bold text-slate-900">{course.level}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase text-slate-400">Instructor</p>
              <p className="text-sm font-bold text-slate-900">{course.instructor}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase text-slate-400">Rating</p>
              <p className="text-sm font-bold text-slate-900">{course.rating} ★ ({course.reviewsCount})</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'content' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-4">
          {course.modules?.map(m => (
            <div key={m.id} className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-slate-50 p-3 rounded-xl border border-slate-100">
                {m.title}
              </h4>
              <div className="space-y-1">
                {m.lessons?.map(l => {
                  const isDone = currentUser?.completedLessons?.includes(l.id);
                  return (
                    <button
                      key={l.id}
                      onClick={() => openLesson(l)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl text-left text-xs hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                    >
                      <div className="flex items-center space-x-2.5">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                        )}
                        <span className="font-semibold text-slate-800">{l.title}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-400 shrink-0">
                        <span>{l.duration}</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'live-classes' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-2">
          <Radio className="w-8 h-8 text-blue-500 mx-auto" />
          <h3 className="font-bold text-slate-900 text-sm">No Live Classes Scheduled Yet</h3>
          <p className="text-xs text-slate-500">Your instructor will schedule live sessions here — check back soon.</p>
        </div>
      )}

      {tab === 'assignments' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-2">
          {courseAssignments.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <ClipboardList className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No assignments posted for this course yet.</p>
            </div>
          ) : (
            courseAssignments.map(a => (
              <div key={a.id} className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{a.title}</p>
                  <p className="text-slate-500 mt-0.5">Due: {a.dueDate}</p>
                </div>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-full">Pending</span>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
