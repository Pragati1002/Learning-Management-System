import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { BookOpen, Award, PlayCircle, Clock, Sparkles, GraduationCap, ListChecks, ClipboardCheck } from 'lucide-react';

export const StudentDashboard = ({ onOpenCertificate }) => {
  const { currentUser, courses, certificates, quizzes, getCourseProgress, setSelectedCourseForPlayer, setActiveTab } = useLMS();

  const enrolledCourses = courses.filter(c => currentUser?.enrolledCourses?.includes(c.id));

  const totalLessons = enrolledCourses.reduce((sum, c) => sum + (c.modules?.flatMap(m => m.lessons)?.length || 0), 0);
  const completedLessons = currentUser?.completedLessons?.length || 0;
  const testsTaken = quizzes?.filter(q => q.attempts?.some(a => a.studentId === currentUser?.id))?.length ?? 0;

  const statCards = [
    { label: 'Courses Enrolled', value: enrolledCourses.length, icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
    { label: 'Lessons Completed', value: `${completedLessons}/${totalLessons}`, icon: ListChecks, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Tests Taken', value: testsTaken, icon: ClipboardCheck, color: 'text-amber-600 bg-amber-50' },
    { label: 'Certificates', value: certificates.length, icon: Award, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Learner Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-white/20 text-white text-xs font-bold rounded-full">
            STUDENT DASHBOARD
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Hi {currentUser?.name?.split(' ')[0]} 👋</h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
            Welcome back! Keep learning — pick up right where you left off.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('courses-catalog')}
          className="px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
        >
          Explore All Courses
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl shrink-0 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-lg font-extrabold text-slate-900 leading-tight truncate">{value}</p>
              <p className="text-[11px] font-semibold text-slate-500 truncate">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg">My Enrolled Courses</h3>
        
        {enrolledCourses.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
            <p className="text-sm text-slate-500">You have not enrolled in any courses yet.</p>
            <button
              onClick={() => setActiveTab('courses-catalog')}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolledCourses.map(course => {
              const progress = getCourseProgress(course.id);
              return (
                <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3.5">
                    <img src={course.thumbnail} alt={course.title} className="w-20 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {course.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1 line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{course.modules?.length || 0} Modules • {course.duration}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Progress</span>
                      <span className="text-blue-700">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourseForPlayer(course);
                      setActiveTab('course-content');
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Continue Learning</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Earned Certificates */}
      {certificates.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-900 text-base">Earned Verified Credentials</h3>
          </div>

          <div className="space-y-3">
            {certificates.map(cert => (
              <div key={cert.certificateId} className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{cert.courseName}</h4>
                  <p className="text-xs text-slate-600">Issued: {cert.issueDate} • Grade: {cert.grade}</p>
                  <p className="text-xs font-mono font-bold text-blue-700">Token ID: {cert.certificateId}</p>
                </div>
                <button
                  onClick={() => onOpenCertificate(cert)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  View & Print
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
