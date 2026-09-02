import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { ArrowLeft, Video, FileText, Download, Headphones, CheckCircle2, Play, Pause } from 'lucide-react';

const TABS = [
  { id: 'video', label: 'Video', icon: Video },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'pdf', label: 'PDF', icon: Download },
  { id: 'audio', label: 'Audio', icon: Headphones },
];

export const StudyMaterialsPage = () => {
  const {
    selectedLessonForMaterials,
    selectedCourseForPlayer,
    courses,
    currentUser,
    toggleLessonComplete,
    setActiveTab,
  } = useLMS();

  const course = selectedLessonForMaterials?.course || selectedCourseForPlayer || courses[0];
  const lesson = selectedLessonForMaterials?.lesson || course.modules?.[0]?.lessons?.[0] || {};

  const [tab, setTab] = useState('video');
  const isCompleted = currentUser?.completedLessons?.includes(lesson.id);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('course-content')}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
            title="Back to Course Content"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {course.category}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">{lesson.title}</h2>
          </div>
        </div>
        <button
          onClick={() => toggleLessonComplete(lesson.id, course.id)}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Completed ✓' : 'Mark as Finished'}</span>
        </button>
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
      {tab === 'video' && (
        <div className="bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video border border-slate-800">
          <iframe
            src={lesson.videoUrl || 'https://www.youtube.com/embed/kUMe1FH4CHE'}
            title={lesson.title || 'Video Lecture'}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {tab === 'notes' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-extrabold text-slate-900 text-base">Lesson Notes</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {lesson.notes || `Key notes and reference material for "${lesson.title}" will appear here — covering the core concepts, syntax, and examples discussed in the video.`}
          </p>
          <button className="text-xs font-bold text-blue-700 hover:underline flex items-center space-x-1.5 pt-2">
            <Download className="w-3.5 h-3.5" />
            <span>Download Notes (PDF)</span>
          </button>
        </div>
      )}

      {tab === 'pdf' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
          <FileText className="w-10 h-10 text-blue-500 mx-auto" />
          <h3 className="font-bold text-slate-900 text-sm">Lesson Resources</h3>
          {lesson.resources?.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {lesson.resources.map((res, i) => (
                <button key={i} className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors">
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>{res}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">No downloadable PDF attached to this lesson yet.</p>
          )}
        </div>
      )}

      {tab === 'audio' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Audio Explanation</h3>
          <audio controls className="w-full" src={lesson.audioUrl || ''}>
            Your browser does not support the audio element.
          </audio>
          {!lesson.audioUrl && (
            <p className="text-xs text-slate-500">An audio walkthrough for this lesson hasn't been uploaded yet.</p>
          )}
        </div>
      )}

    </div>
  );
};
