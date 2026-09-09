import React, { useState, useEffect } from 'react';
import { useLMS } from '../../context/LMSContext';
import { PlayCircle, CheckCircle2, Circle, Download, ArrowLeft, Award, Sparkles, Check, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CoursePlayerPage = () => {
  const { 
    selectedCourseForPlayer, 
    courses, 
    currentUser, 
    toggleLessonComplete, 
    getCourseProgress, 
    issueCertificateForCourse,
    setActiveTab 
  } = useLMS();

  const course = selectedCourseForPlayer || courses[0];
  const allLessons = course.modules?.flatMap(m => m.lessons) || [];
  
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const activeLesson = allLessons[activeLessonIndex] || allLessons[0] || {};

  const isCurrentCompleted = currentUser?.completedLessons?.includes(activeLesson.id);
  const progress = getCourseProgress(course.id);

  // Auto trigger confetti when 100% reached
  useEffect(() => {
    if (progress === 100) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      issueCertificateForCourse(course.id, currentUser);
    }
  }, [progress]);

  const handleNextLesson = () => {
    if (!isCurrentCompleted) {
      toggleLessonComplete(activeLesson.id, course.id);
    }
    if (activeLessonIndex < allLessons.length - 1) {
      setActiveLessonIndex(prev => prev + 1);
    }
  };

  const handleCompleteAllAndUnlock = () => {
    allLessons.forEach(l => {
      if (!currentUser?.completedLessons?.includes(l.id)) {
        toggleLessonComplete(l.id, course.id);
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              {course.category}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">{course.title}</h2>
          </div>
        </div>

        {/* Progress Display */}
        <div className="flex items-center space-x-3 text-xs font-semibold">
          <div className="text-right">
            <span className="text-slate-500 block">Course Progress</span>
            <span className={`font-extrabold ${progress === 100 ? 'text-emerald-600' : 'text-purple-700'}`}>
              {progress}% Completed ({allLessons.filter(l => currentUser?.completedLessons?.includes(l.id)).length}/{allLessons.length} Lessons)
            </span>
          </div>
          <div className="w-28 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className={`h-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : 'bg-purple-600'}`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 100% Unlocked Certificate Notification Banner */}
      {progress === 100 ? (
        <div className="p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in zoom-in-95">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Award className="w-8 h-8 text-yellow-300 animate-bounce" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">🎉 Congratulations! 100% Course Finished!</h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                Your verified Certificate of Specialization is unlocked and ready to view and print.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('certificates')}
            className="px-5 py-2.5 bg-white text-emerald-900 font-extrabold text-xs rounded-xl shadow-lg hover:bg-emerald-50 transition-all shrink-0 flex items-center space-x-2"
          >
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Claim & View Certificate →</span>
          </button>
        </div>
      ) : (
        <div className="p-3.5 bg-purple-50/80 border border-purple-200 rounded-2xl flex items-center justify-between text-xs text-purple-900">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Finish all lesson videos below to automatically unlock your official certificate!</span>
          </div>
          <button
            onClick={handleCompleteAllAndUnlock}
            className="text-[11px] font-bold text-purple-700 hover:text-purple-900 underline ml-2 shrink-0"
          >
            Mark All as Done (Fast Unlock)
          </button>
        </div>
      )}

      {/* Main Video & Syllabus Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video border border-slate-800">
            <iframe
              src={activeLesson.videoUrl || 'https://www.youtube.com/embed/kUMe1FH4CHE'}
              title={activeLesson.title || 'Video Lecture'}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Lesson Action Controls */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Lesson {activeLessonIndex + 1} of {allLessons.length}</span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">{activeLesson.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Instructor: {course.instructor} • Duration: {activeLesson.duration || '20 min'}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleLessonComplete(activeLesson.id, course.id)}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isCurrentCompleted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCurrentCompleted ? 'Completed ✓' : 'Mark as Finished'}</span>
                </button>

                {activeLessonIndex < allLessons.length - 1 && (
                  <button
                    onClick={handleNextLesson}
                    className="flex items-center space-x-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 transition-all"
                  >
                    <span>Next Lesson</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Lesson Materials & PDF Downloads</h4>
              <div className="flex flex-wrap gap-2">
                {activeLesson.resources?.map((res, i) => (
                  <button key={i} className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors border border-slate-200">
                    <Download className="w-3.5 h-3.5 text-purple-600" />
                    <span>{res}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Course Syllabus Playlist */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 h-fit space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Course Syllabus Checklist</h3>
            <span className="text-xs text-purple-600 font-bold">{progress}% Completed</span>
          </div>

          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {course.modules?.map((m) => (
              <div key={m.id} className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {m.title}
                </h4>
                <div className="space-y-1.5">
                  {m.lessons?.map((l) => {
                    const lIndex = allLessons.findIndex(x => x.id === l.id);
                    const isSelected = activeLesson.id === l.id;
                    const isDone = currentUser?.completedLessons?.includes(l.id);
                    return (
                      <div
                        key={l.id}
                        onClick={() => setActiveLessonIndex(lIndex)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-50 text-purple-900 font-bold border border-purple-200 shadow-sm'
                            : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 overflow-hidden">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLessonComplete(l.id, course.id);
                            }}
                            className="shrink-0 p-0.5"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300 hover:text-purple-500" />
                            )}
                          </button>
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 shrink-0 ml-2">{l.duration}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
