import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { FileCheck2, Clock, Trash2, Plus, ArrowRight } from 'lucide-react';

export const AssessmentPage = () => {
  const { quizzes, assignments, courses, addQuiz, deleteQuiz, addAssignment, deleteAssignment, submitQuizResult, currentUser } = useLMS();
  
  const [activeTabSub, setActiveTabSub] = useState('quizzes');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  // Modal states
  const [showAddQuizModal, setShowAddQuizModal] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizCourseId, setQuizCourseId] = useState(courses[0]?.id || '');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [passingScore, setPassingScore] = useState(70);

  const [qText, setQText] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctOpt, setCorrectOpt] = useState(0);

  const [showAddAsgModal, setShowAddAsgModal] = useState(false);
  const [asgTitle, setAsgTitle] = useState('');
  const [asgCourseId, setAsgCourseId] = useState(courses[0]?.id || '');
  const [asgDueDate, setAsgDueDate] = useState('2026-09-30');
  const [asgDesc, setAsgDesc] = useState('');

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

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    if (!quizTitle.trim() || !qText.trim() || !opt0.trim() || !opt1.trim()) return;
    
    const matchedCourse = courses.find(c => c.id === quizCourseId);
    addQuiz({
      title: quizTitle,
      courseId: quizCourseId,
      courseTitle: matchedCourse?.title || 'General Course',
      durationMinutes,
      passingScore,
      questions: [
        {
          id: 1,
          question: qText,
          options: [opt0, opt1, opt2 || 'None of the above', opt3 || 'All of the above'],
          correctAnswer: Number(correctOpt),
          explanation: 'Verified course question criteria.'
        }
      ]
    });
    setShowAddQuizModal(false);
    setQuizTitle('');
    setQText('');
    setOpt0('');
    setOpt1('');
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!asgTitle.trim()) return;
    const matchedCourse = courses.find(c => c.id === asgCourseId);
    addAssignment({
      title: asgTitle,
      courseId: asgCourseId,
      courseName: matchedCourse?.title || 'General Course',
      dueDate: asgDueDate,
      totalPoints: 100,
      description: asgDesc || 'Complete all tasks and submit repository.'
    });
    setShowAddAsgModal(false);
    setAsgTitle('');
    setAsgDesc('');
  };

  const handleDeleteQuiz = (qId, qTitle) => {
    if (window.confirm(`Delete quiz "${qTitle}"?`)) {
      deleteQuiz(qId);
    }
  };

  const handleDeleteAssignment = (asgId, asgTitle) => {
    if (window.confirm(`Delete assignment "${asgTitle}"?`)) {
      deleteAssignment(asgId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Assessments & Quizzes</h1>
          <p className="text-sm text-slate-500 mt-1">Take certification tests, create assessments, and delete quizzes.</p>
        </div>
        
        {currentUser?.role === 'admin' && (
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAddQuizModal(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Quiz / Exam</span>
            </button>
            <button
              onClick={() => setShowAddAsgModal(true)}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Assignment</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex space-x-2 border-b border-slate-200">
        <button
          onClick={() => { setActiveTabSub('quizzes'); setActiveQuiz(null); }}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
            activeTabSub === 'quizzes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Certification Quizzes ({quizzes.length})
        </button>
        <button
          onClick={() => { setActiveTabSub('assignments'); setActiveQuiz(null); }}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
            activeTabSub === 'assignments' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Practical Assignments ({(assignments || []).length})
        </button>
      </div>

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
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
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
                Score: {quizScore.percentage}% ({quizScore.correct} / {quizScore.total} Correct)
              </h3>
              <p className="text-xs text-emerald-700">
                {quizScore.percentage >= activeQuiz.passingScore
                  ? '🎉 Outstanding! Passing score met. Official certificate auto-issued!'
                  : 'Score was below passing threshold. Review the lessons and retry.'}
              </p>
            </div>
          )}
        </div>
      ) : activeTabSub === 'quizzes' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quizzes.map(q => (
            <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                    {q.courseTitle}
                  </span>
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => handleDeleteQuiz(q.id, q.title)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Quiz"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
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
        <div className="space-y-4">
          {(assignments || []).map(asg => (
            <div key={asg.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{asg.title}</h3>
                  <p className="text-xs text-slate-500">{asg.courseName} • Due: {asg.dueDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded">
                    Max: {asg.totalPoints} Pts
                  </span>
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => handleDeleteAssignment(asg.id, asg.title)}
                      className="p-1 text-slate-400 hover:text-red-600"
                      title="Delete Assignment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-600">{asg.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add Quiz Modal */}
      {showAddQuizModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-8">
            <h3 className="text-base font-bold text-slate-900">Create Assessment Exam</h3>
            <form onSubmit={handleCreateQuiz} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Exam / Quiz Title *</label>
                <input
                  type="text"
                  required
                  value={quizTitle}
                  onChange={e => setQuizTitle(e.target.value)}
                  placeholder="e.g. JavaScript Async Mastery Quiz"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Course</label>
                  <select
                    value={quizCourseId}
                    onChange={e => setQuizCourseId(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-white"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={e => setDurationMinutes(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">Question 1 Setup</span>
                <input
                  type="text"
                  required
                  value={qText}
                  onChange={e => setQText(e.target.value)}
                  placeholder="Question text..."
                  className="w-full border border-slate-300 rounded-xl p-2 text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={opt0}
                    onChange={e => setOpt0(e.target.value)}
                    placeholder="Option A"
                    className="border border-slate-300 rounded-xl p-2 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={opt1}
                    onChange={e => setOpt1(e.target.value)}
                    placeholder="Option B"
                    className="border border-slate-300 rounded-xl p-2 text-xs"
                  />
                  <input
                    type="text"
                    value={opt2}
                    onChange={e => setOpt2(e.target.value)}
                    placeholder="Option C (Optional)"
                    className="border border-slate-300 rounded-xl p-2 text-xs"
                  />
                  <input
                    type="text"
                    value={opt3}
                    onChange={e => setOpt3(e.target.value)}
                    placeholder="Option D (Optional)"
                    className="border border-slate-300 rounded-xl p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Correct Option</label>
                  <select
                    value={correctOpt}
                    onChange={e => setCorrectOpt(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2 text-xs bg-white"
                  >
                    <option value={0}>Option A is Correct</option>
                    <option value={1}>Option B is Correct</option>
                    <option value={2}>Option C is Correct</option>
                    <option value={3}>Option D is Correct</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAddQuizModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold">
                  Publish Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Assignment Modal */}
      {showAddAsgModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add Practical Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  value={asgTitle}
                  onChange={e => setAsgTitle(e.target.value)}
                  placeholder="e.g. Build an E-Commerce Cart UI"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Course</label>
                  <select
                    value={asgCourseId}
                    onChange={e => setAsgCourseId(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-white"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={asgDueDate}
                    onChange={e => setAsgDueDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Instructions</label>
                <textarea
                  rows="3"
                  value={asgDesc}
                  onChange={e => setAsgDesc(e.target.value)}
                  placeholder="List assignment instructions..."
                  className="w-full border border-slate-300 rounded-xl p-2 text-xs"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAddAsgModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold">
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
