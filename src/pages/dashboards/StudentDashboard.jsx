import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { BookOpen, Award, PlayCircle, Clock, Sparkles, GraduationCap, ListChecks, ClipboardCheck, Radio, ExternalLink, Calendar, PlusCircle } from 'lucide-react';

export const StudentDashboard = ({ onOpenCertificate }) => {
  const { currentUser, courses, certificates, quizzes, liveClasses, getCourseProgress, setSelectedCourseForPlayer, setActiveTab, startCourseEnrollment } = useLMS();

  const enrolledIds = (currentUser?.enrolledCourses || []).map(id => String(id?.id || id?._id || id));
  const paidIds = (currentUser?.paidCourseIds || []).map(String);
  const enrolledCourses = courses.filter(c => enrolledIds.includes(String(c.id)) && (Number(c.price || 0) === 0 || paidIds.includes(String(c.id))));
  const discoverCourses = courses.filter(c => !enrolledIds.includes(String(c.id)));

  const myLiveClasses = liveClasses?.filter(lc => enrolledIds.includes(String(lc.courseId))) || [];

  const totalLessons = enrolledCourses.reduce((sum, c) => sum + (c.modules?.flatMap(m => m.lessons)?.length || 0), 0);
  const completedLessons = currentUser?.completedLessons?.length || 0;
  const testsTaken = quizzes?.filter(q => q.attempts?.some(a => a.studentId === currentUser?.id))?.length ?? 0;

  const statCards = [
    { label: 'Courses Enrolled', value: enrolledCourses.length, icon: BookOpen, color: 'text-purple-700 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300' },
    { label: 'Lessons Completed', value: `${completedLessons}/${totalLessons}`, icon: ListChecks, color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-300' },
    { label: 'Tests Taken', value: testsTaken, icon: ClipboardCheck, color: 'text-amber-700 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-300' },
    { label: 'Certificates', value: certificates.length, icon: Award, color: 'text-purple-700 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Learner Welcome Header */}
      <div className="bg-purple-700 dark:bg-purple-800 text-white p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-white/15 text-white text-xs font-bold rounded-full">
            STUDENT DASHBOARD
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Hi {currentUser?.name?.split(' ')[0]} 👋</h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl mt-1">
            Welcome back! Keep learning — pick up right where you left off.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('courses-catalog')}
          className="px-5 py-2.5 bg-white text-purple-700 hover:bg-purple-50 font-bold text-xs rounded-xl shadow-sm shrink-0"
        >
          Explore All Courses
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl shrink-0 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight truncate">{value}</p>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">My Enrolled Courses</h3>
        
        {enrolledCourses.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">You have not enrolled in any courses yet.</p>
            <button
              onClick={() => setActiveTab('courses-catalog')}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolledCourses.map(course => {
              const progress = getCourseProgress(course.id);
              return (
                <div key={course.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3.5">
                    <img src={course.thumbnail} alt={course.title} className="w-20 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded">
                        {course.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1 line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{course.modules?.length || 0} Modules • {course.duration}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Progress</span>
                      <span className="text-purple-700 dark:text-purple-300">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-700 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourseForPlayer(course);
                      setActiveTab('course-content');
                    }}
                    className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-1.5"
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

      {/* Upcoming Live Classes */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Radio className="w-5 h-5 text-purple-700 dark:text-purple-400" />
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Upcoming Live Classes</h3>
        </div>
        {myLiveClasses.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">No live classes scheduled for your enrolled courses right now.</p>
        ) : (
          <div className="space-y-2.5">
            {myLiveClasses.map(lc => (
              <div key={lc.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{lc.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{lc.courseTitle}</p>
                  <p className="flex items-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lc.date} • {lc.time} • {lc.platform}</span>
                  </p>
                </div>
                <a
                  href={lc.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shrink-0"
                >
                  <span>Join Class</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discover More Courses */}
      {discoverCourses.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-purple-700 dark:text-purple-400" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Discover More Courses</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {discoverCourses.slice(0, 6).map(course => (
              <div key={course.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded">
                  {course.category}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2">{course.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{course.duration} • {course.level}</p>
                <button
                  onClick={() => startCourseEnrollment(course)}
                  className="w-full py-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-bold text-xs rounded-xl"
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Earned Certificates */}
      {certificates.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Earned Verified Credentials</h3>
          </div>

          <div className="space-y-3">
            {certificates.map(cert => (
              <div key={cert.certificateId} className="p-4 bg-amber-50/60 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{cert.courseName}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Issued: {cert.issueDate} • Grade: {cert.grade}</p>
                  <p className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">Token ID: {cert.certificateId}</p>
                </div>
                <button
                  onClick={() => onOpenCertificate(cert)}
                  className="px-3.5 py-1.5 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white text-xs font-bold rounded-xl"
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
