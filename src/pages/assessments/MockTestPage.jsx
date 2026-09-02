import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { ClipboardList, Clock, ArrowLeft, Trophy, ListChecks } from 'lucide-react';

export const MockTestPage = () => {
  const { mockTests } = useLMS();

  const [activeTest, setActiveTest] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [qFlatIndex, setQFlatIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allQuestions = activeTest ? activeTest.sections.flatMap(s => s.questions.map(q => ({ ...q, sectionTitle: s.title }))) : [];
  const totalQuestions = allQuestions.length;
  const totalMinutes = activeTest?.sections.reduce((sum, s) => sum + s.durationMinutes, 0) || 0;

  const selectTest = (test) => {
    setActiveTest(test);
    setInProgress(false);
    setSubmitted(false);
    setAnswers({});
    setQFlatIndex(0);
  };

  const startTest = () => setInProgress(true);

  const question = allQuestions[qFlatIndex];

  const handleNext = () => {
    if (qFlatIndex < totalQuestions - 1) {
      setQFlatIndex(prev => prev + 1);
    } else {
      setSubmitted(true);
      setInProgress(false);
    }
  };

  const correctCount = allQuestions.filter(q => answers[q.id] === q.correctAnswer).length;

  // --- Test List ---
  if (!activeTest) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mock Tests</h1>
          <p className="text-sm text-slate-500 mt-1">Full-length timed tests across multiple sections, just like the real thing.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {mockTests?.map(t => {
            const questionCount = t.sections.reduce((sum, s) => sum + s.questions.length, 0);
            const minutes = t.sections.reduce((sum, s) => sum + s.durationMinutes, 0);
            return (
              <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="p-2.5 bg-purple-50 rounded-xl w-fit">
                  <ClipboardList className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{t.title}</h3>
                <p className="text-xs text-slate-500">{questionCount} Questions • {minutes} min • {t.totalMarks} Marks</p>
                <button
                  onClick={() => selectTest(t)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
                >
                  View Test
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- Result Screen ---
  if (submitted) {
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
        <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-extrabold text-slate-900">Test Completed!</h2>
        <p className="text-sm text-slate-600">
          You scored <span className="font-bold text-slate-900">{correctCount}/{totalQuestions}</span> ({Math.round((correctCount / totalQuestions) * 100)}%)
        </p>
        <button onClick={() => setActiveTest(null)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl">
          Back to Mock Tests
        </button>
      </div>
    );
  }

  // --- Start Screen (matches the mockup: sections list + Start Test) ---
  if (!inProgress) {
    return (
      <div className="max-w-lg mx-auto bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center space-x-3">
          <button onClick={() => setActiveTest(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-extrabold text-slate-900 text-lg">{activeTest.title}</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-slate-50 rounded-2xl">
            <p className="text-lg font-extrabold text-slate-900">{totalQuestions}</p>
            <p className="text-[10px] font-bold uppercase text-slate-500">Total Questions</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <p className="text-lg font-extrabold text-slate-900">{totalMinutes}</p>
            <p className="text-[10px] font-bold uppercase text-slate-500">Time (Min)</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <p className="text-lg font-extrabold text-slate-900">{activeTest.totalMarks}</p>
            <p className="text-[10px] font-bold uppercase text-slate-500">Total Marks</p>
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Sections</h4>
          {activeTest.sections.map(s => (
            <div key={s.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm">
              <span className="flex items-center space-x-2 text-slate-800 font-semibold">
                <ListChecks className="w-4 h-4 text-purple-500" />
                <span>{s.title}</span>
              </span>
              <span className="text-xs text-slate-500">{s.questions.length} • {s.durationMinutes}min</span>
            </div>
          ))}
        </div>

        <button
          onClick={startTest}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all"
        >
          Start Test
        </button>
      </div>
    );
  }

  // --- Question Screen ---
  const optionLabels = ['A', 'B', 'C', 'D'];
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">{question.sectionTitle}</span>
        <span className="flex items-center space-x-1.5 text-xs font-bold text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>Question {qFlatIndex + 1} of {totalQuestions}</span>
        </span>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-purple-600 rounded-full transition-all" style={{ width: `${((qFlatIndex + 1) / totalQuestions) * 100}%` }}></div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base">{question.question}</h3>
        <div className="space-y-2.5">
          {question.options.map((opt, idx) => {
            const isSelected = answers[question.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => setAnswers(prev => ({ ...prev, [question.id]: idx }))}
                className={`w-full flex items-center space-x-3 p-3.5 rounded-2xl text-left text-sm transition-all border ${
                  isSelected ? 'bg-purple-50 border-purple-300 text-purple-900 font-semibold' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                  isSelected ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>{optionLabels[idx]}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={answers[question.id] === undefined}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm rounded-xl transition-all"
      >
        {qFlatIndex < totalQuestions - 1 ? 'Next Question' : 'Submit Test'}
      </button>
    </div>
  );
};
