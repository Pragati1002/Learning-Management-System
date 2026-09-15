const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. CourseCatalogPage
save('src/pages/courses/CourseCatalogPage.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Search, Star, Clock, BookOpen, CheckCircle2, DollarSign, Filter } from 'lucide-react';

export const CourseCatalogPage = () => {
  const { courses, currentUser, enrollCourse, setSelectedCourseForPlayer, setActiveTab } = useLMS();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Software Engineering', 'Artificial Intelligence', 'Cloud & Infrastructure', 'Design & Product', 'Security'];

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || c.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Course Catalog & Curriculum</h1>
        <p className="text-sm text-slate-500 mt-1">Explore all industry-led certifications, modules, video lessons, and syllabus tracks.</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by course title, skills, instructor..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={\`text-xs px-3 py-2 rounded-xl whitespace-nowrap font-semibold transition-all \${
                category === cat ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isEnrolled = currentUser.enrolledCourses?.includes(course.id);
          return (
            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover" />
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{course.rating} ({course.reviewsCount})</span>
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{course.description}</p>
                  
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{course.modules?.length || 3} Modules</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through">₹{course.originalPrice}</span>
                  <span className="text-lg font-extrabold text-slate-900 ml-1.5">₹{course.price}</span>
                </div>
                {isEnrolled ? (
                  <button
                    onClick={() => {
                      setSelectedCourseForPlayer(course);
                      setActiveTab('course-player');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Enrolled • Learn</span>
                  </button>
                ) : (
                  <button
                    onClick={() => enrollCourse(course.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
`);

// 2. CoursePlayerPage
save('src/pages/courses/CoursePlayerPage.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { PlayCircle, CheckCircle2, Circle, FileText, Download, Sparkles, ArrowLeft, BookOpen } from 'lucide-react';

export const CoursePlayerPage = () => {
  const { selectedCourseForPlayer, courses, currentUser, toggleLessonComplete, getCourseProgress, setActiveTab } = useLMS();

  const course = selectedCourseForPlayer || courses[0];
  const allLessons = course.modules.flatMap(m => m.lessons);
  const [activeLesson, setActiveLesson] = useState(allLessons[0]);
  const [activeTabSub, setActiveTabSub] = useState('overview');

  const isCurrentCompleted = currentUser.completedLessons?.includes(activeLesson.id);
  const progress = getCourseProgress(course.id);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setActiveTab('my-learning')}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
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
          <span className="text-slate-600">Course Progress: {progress}%</span>
          <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: \`\${progress}%\` }}></div>
          </div>
        </div>
      </div>

      {/* Main Player Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Video Canvas & Tabs (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video border border-slate-800">
            <iframe
              src={activeLesson.videoUrl || 'https://www.youtube.com/embed/kUMe1FH4CHE'}
              title={activeLesson.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{activeLesson.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Instructor: {course.instructor} • Duration: {activeLesson.duration}</p>
              </div>
              <button
                onClick={() => toggleLessonComplete(activeLesson.id)}
                className={\`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all \${
                  isCurrentCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                }\`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCurrentCompleted ? 'Completed ✓ (+50 XP)' : 'Mark Lesson Complete'}</span>
              </button>
            </div>

            {/* Lesson Resources & Summary */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Downloadable Resources & Notes</h4>
              <div className="flex flex-wrap gap-2">
                {activeLesson.resources?.map((res, i) => (
                  <button key={i} className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors border border-slate-200">
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>{res}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Playlist Syllabus (1 Col) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-fit space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Course Syllabus & Lessons</h3>
            <span className="text-xs text-slate-500 font-semibold">{allLessons.length} Lessons</span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {course.modules.map((m, mIdx) => (
              <div key={m.id} className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-slate-50 p-2 rounded-lg">
                  {m.title}
                </h4>
                <div className="space-y-1">
                  {m.lessons.map(l => {
                    const isSelected = activeLesson.id === l.id;
                    const isDone = currentUser.completedLessons?.includes(l.id);
                    return (
                      <button
                        key={l.id}
                        onClick={() => setActiveLesson(l)}
                        className={\`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all \${
                          isSelected
                            ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }\`}
                      >
                        <div className="flex items-center space-x-2.5 overflow-hidden">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                          )}
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 shrink-0 ml-2">{l.duration}</span>
                      </button>
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
`);

// 3. BatchAttendancePage
save('src/pages/batches/BatchAttendancePage.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Users, CalendarCheck, Check, X, Clock, FileSpreadsheet, Plus } from 'lucide-react';

export const BatchAttendancePage = () => {
  const { batches, markAttendance } = useLMS();
  const [selectedBatch, setSelectedBatch] = useState(batches[0]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Batch & Attendance Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage class rosters, schedule batches, and record daily attendance registers.</p>
        </div>
      </div>

      {/* Batch Select Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {batches.map(b => (
          <button
            key={b.id}
            onClick={() => setSelectedBatch(b)}
            className={\`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all \${
              selectedBatch.id === b.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }\`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">{selectedBatch.name}</h3>
            <p className="text-xs text-slate-500">Instructor: {selectedBatch.trainerName} • Schedule: {selectedBatch.schedule}</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            {selectedBatch.studentsCount} Registered Students
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Roll No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Classes Present</th>
                <th className="p-3">Total Classes</th>
                <th className="p-3">Attendance %</th>
                <th className="p-3 text-right">Today's Attendance Action</th>
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
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => markAttendance(selectedBatch.id, att.studentId, true)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
                    >
                      Present (P)
                    </button>
                    <button
                      onClick={() => markAttendance(selectedBatch.id, att.studentId, false)}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg text-xs"
                    >
                      Absent (A)
                    </button>
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

// 4. AssessmentPage
save('src/pages/assessments/AssessmentPage.jsx', `import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { FileCheck2, Award, Clock, CheckCircle2, XCircle, ArrowRight, Github } from 'lucide-react';

export const AssessmentPage = () => {
  const { quizzes, assignments, submitQuizResult, submitAssignment, currentUser, showToast } = useLMS();
  const [activeTabSub, setActiveTabSub] = useState('quizzes');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [repoUrl, setRepoUrl] = useState('');

  const handleStartQuiz = (q) => {
    setActiveQuiz(q);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    activeQuiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct++;
    });
    const percentage = Math.round((correct / activeQuiz.questions.length) * 100);
    setQuizScore({ correct, total: activeQuiz.questions.length, percentage });
    setQuizSubmitted(true);
    submitQuizResult(activeQuiz.id, percentage, correct, activeQuiz.questions.length);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Standardized Assessments & Exams</h1>
        <p className="text-sm text-slate-500 mt-1">Timed standardized exams, auto-evaluated multiple-choice tests, and coding assignments.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200">
        <button
          onClick={() => { setActiveTabSub('quizzes'); setActiveQuiz(null); }}
          className={\`pb-3 px-4 text-sm font-bold border-b-2 transition-all \${
            activeTabSub === 'quizzes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }\`}
        >
          Standardized Quizzes & Exams
        </button>
        <button
          onClick={() => { setActiveTabSub('assignments'); setActiveQuiz(null); }}
          className={\`pb-3 px-4 text-sm font-bold border-b-2 transition-all \${
            activeTabSub === 'assignments' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }\`}
        >
          Practical Assignments
        </button>
      </div>

      {/* Interactive Quiz Taking Screen */}
      {activeQuiz ? (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                {activeQuiz.courseTitle}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">{activeQuiz.title}</h2>
            </div>
            <button onClick={() => setActiveQuiz(null)} className="text-xs text-slate-500 hover:text-slate-800 font-semibold">
              ← Back to List
            </button>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {activeQuiz.questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              return (
                <div key={q.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">
                    {idx + 1}. {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      let btnStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700';
                      if (userAns === oIdx) btnStyle = 'bg-blue-50 border-blue-500 text-blue-800 font-semibold ring-1 ring-blue-500';
                      if (quizSubmitted) {
                        if (oIdx === q.correctAnswer) btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                        else if (userAns === oIdx && oIdx !== q.correctAnswer) btnStyle = 'bg-red-50 border-red-400 text-red-800';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={\`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all \${btnStyle}\`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className="text-xs p-3 bg-blue-50 text-blue-900 rounded-lg">
                      <span className="font-bold">Explanation: </span>{q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
            >
              Submit Exam for Instant Evaluation
            </button>
          ) : (
            <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <h3 className="text-xl font-extrabold text-emerald-800">
                Evaluation Complete: {quizScore.percentage}% ({quizScore.correct} / {quizScore.total} Correct)
              </h3>
              <p className="text-xs text-emerald-700">
                {quizScore.percentage >= activeQuiz.passingScore
                  ? '🎉 Outstanding! Passing criteria met. Official certificate auto-issued!'
                  : 'Score was below 70% passing threshold. Review the explanations and retry.'}
              </p>
            </div>
          )}
        </div>
      ) : activeTabSub === 'quizzes' ? (
        /* Quizzes List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quizzes.map(q => (
            <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                  {q.courseTitle}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-2">{q.title}</h3>
                <div className="flex items-center space-x-4 text-xs text-slate-500 mt-2">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{q.durationMinutes} Minutes</span>
                  </span>
                  <span>{q.totalQuestions} Questions</span>
                  <span>Pass: {q.passingScore}%</span>
                </div>
              </div>
              <button
                onClick={() => handleStartQuiz(q)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Take Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Assignments List */
        <div className="space-y-4">
          {assignments.map(asg => (
            <div key={asg.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{asg.title}</h3>
                  <p className="text-xs text-slate-500">{asg.courseName} • Due: {asg.dueDate}</p>
                </div>
                <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded">
                  Max: {asg.totalPoints} Pts
                </span>
              </div>
              <p className="text-xs text-slate-600">{asg.description}</p>
              
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Paste GitHub Repository URL..."
                  value={repoUrl}
                  onChange={e => setRepoUrl(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (!repoUrl.trim()) return;
                    submitAssignment(asg.id, repoUrl);
                    setRepoUrl('');
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
                >
                  Submit Code Solution
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
`);
