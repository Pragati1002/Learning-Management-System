import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { FileCheck2, Clock, ArrowLeft, CheckCircle2, XCircle, Trophy } from 'lucide-react';

export const PracticeQuizPage = () => {
  const { quizzes, submitQuizResult } = useLMS();

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setQIndex(0);
    setAnswers({});
    setSubmitted(false);
    setResult(null);
  };

  const backToList = () => setActiveQuiz(null);

  const question = activeQuiz?.questions?.[qIndex];

  const selectOption = (optIdx) => {
    setAnswers(prev => ({ ...prev, [question.id]: optIdx }));
  };

  const handleNext = () => {
    if (qIndex < activeQuiz.questions.length - 1) {
      setQIndex(prev => prev + 1);
    } else {
      let correct = 0;
      activeQuiz.questions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) correct++;
      });
      const percentage = Math.round((correct / activeQuiz.questions.length) * 100);
      setResult({ correct, total: activeQuiz.questions.length, percentage });
      submitQuizResult(activeQuiz.id, percentage, correct, activeQuiz.questions.length);
      setSubmitted(true);
    }
  };

  // --- Quiz List ---
  if (!activeQuiz) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Practice & Quizzes</h1>
          <p className="text-sm text-slate-500 mt-1">Sharpen your understanding with short topic-wise quizzes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {quizzes?.map(q => (
            <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-2.5 bg-purple-50 rounded-xl">
                  <FileCheck2 className="w-5 h-5 text-purple-600" />
                </div>
                <span className="flex items-center space-x-1 text-[11px] font-bold text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{q.durationMinutes} min</span>
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{q.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{q.courseTitle} • {q.questions.length} Questions</p>
              </div>
              <button
                onClick={() => startQuiz(q)}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Result Screen ---
  if (submitted) {
    const passed = result.percentage >= (activeQuiz.passingScore || 60);
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
        <Trophy className={`w-12 h-12 mx-auto ${passed ? 'text-amber-500' : 'text-slate-300'}`} />
        <h2 className="text-xl font-extrabold text-slate-900">{passed ? 'Great Job! 🎉' : 'Keep Practicing'}</h2>
        <p className="text-sm text-slate-600">
          You scored <span className="font-bold text-slate-900">{result.correct}/{result.total}</span> ({result.percentage}%)
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button onClick={() => startQuiz(activeQuiz)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl">
            Retry Quiz
          </button>
          <button onClick={backToList} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl">
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  // --- Question Screen ---
  const optionLabels = ['A', 'B', 'C', 'D'];
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <button onClick={backToList} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold text-slate-500">Question {qIndex + 1} of {activeQuiz.questions.length}</span>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-purple-600 rounded-full transition-all" style={{ width: `${((qIndex + 1) / activeQuiz.questions.length) * 100}%` }}></div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base">{question.question}</h3>
        <div className="space-y-2.5">
          {question.options.map((opt, idx) => {
            const isSelected = answers[question.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => selectOption(idx)}
                className={`w-full flex items-center space-x-3 p-3.5 rounded-2xl text-left text-sm transition-all border ${
                  isSelected ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                  isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
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
        {qIndex < activeQuiz.questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
      </button>
    </div>
  );
};
