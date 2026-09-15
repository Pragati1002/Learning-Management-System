import React, { useState, useEffect, useRef } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Mic, User, Clock, ArrowLeft, StopCircle, Sparkles } from 'lucide-react';

const formatTime = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export const MockInterviewPage = () => {
  const { interviewTracks, setActiveTab, setLastInterviewFeedback, submitMockInterview } = useLMS();

  const [activeTrack, setActiveTrack] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (activeTrack) {
      timerRef.current = setInterval(() => setElapsed(prev => prev + 1), 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [activeTrack]);

  const startInterview = (track) => {
    setActiveTrack(track);
    setQIndex(0);
    setResponses({});
    setCurrentAnswer('');
    setElapsed(0);
  };

  const question = activeTrack?.questions?.[qIndex];

  const saveAndNext = () => {
    const updated = { ...responses, [question.id]: currentAnswer };
    setResponses(updated);
    if (qIndex < activeTrack.questions.length - 1) {
      setQIndex(prev => prev + 1);
      setCurrentAnswer('');
    } else {
      finishInterview(updated);
    }
  };

  const finishInterview = async (finalResponses) => {
    clearInterval(timerRef.current);

    const responseList = Object.entries(finalResponses).map(([questionId, answer]) => ({
      questionId,
      answer
    }));

    try {
      const result = await submitMockInterview(
        activeTrack.id,
        responseList,
        elapsed
      );

      if (result) {
        setLastInterviewFeedback({
          role: result.role || activeTrack.role,
          score: result.score,
          strengths: result.strengths || [],
          improvements: result.improvements || [],
          questionCount: activeTrack.questions.length,
          durationSeconds: result.durationSeconds ?? elapsed
        });
        setActiveTab('interview-feedback');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const endInterviewNow = () => {
    const updated = { ...responses, [question.id]: currentAnswer };
    finishInterview(updated);
  };

  // --- Track Selection ---
  if (!activeTrack) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mock Interview Practice</h1>
          <p className="text-sm text-slate-500 mt-1">Practice with realistic role-based interview questions before the real thing.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {interviewTracks?.map(t => {
            const difficultyStyle = {
              Easy: 'bg-emerald-50 text-emerald-700',
              Medium: 'bg-amber-50 text-amber-700',
              Hard: 'bg-red-50 text-red-700'
            }[t.difficulty] || 'bg-slate-100 text-slate-600';
            return (
              <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-purple-50 rounded-xl w-fit">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${difficultyStyle}`}>
                    {t.difficulty || 'Medium'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{t.role}</h3>
                <p className="text-xs text-slate-500">
                  {t.questions.length} Questions • {t.durationMinutes || t.questions.length * 3} min
                </p>
                <button
                  onClick={() => startInterview(t)}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Start Mock Interview
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- Interview Session ---
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={() => setActiveTrack(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <p className="text-[10px] font-bold uppercase text-purple-600">Mock Interview</p>
            <h2 className="font-bold text-slate-900 text-sm">{activeTrack.role}</h2>
          </div>
        </div>
        <span className="flex items-center space-x-1.5 text-xs font-bold text-slate-500">
          <Clock className="w-4 h-4" />
          <span>{formatTime(elapsed)}</span>
        </span>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-purple-600" />
        </div>
        <p className="text-xs font-bold text-slate-400">{activeTrack.interviewerName || 'AI Interviewer'} • Question {qIndex + 1} of {activeTrack.questions.length}</p>
        <h3 className="text-lg font-bold text-slate-900">{question.question}</h3>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase">
          <Mic className="w-4 h-4 text-purple-500" />
          <span>Your Answer</span>
        </div>
        <textarea autoComplete="off"
          value={currentAnswer}
          onChange={e => setCurrentAnswer(e.target.value)}
          rows={5}
          placeholder="Type your answer here (in a real interview you'd speak it aloud)..."
          className="w-full p-3.5 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={endInterviewNow}
          className="flex items-center justify-center space-x-1.5 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl transition-all"
        >
          <StopCircle className="w-4 h-4" />
          <span>End Interview</span>
        </button>
        <button
          onClick={saveAndNext}
          className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-all"
        >
          {qIndex < activeTrack.questions.length - 1 ? 'Next Question' : 'Finish Interview'}
        </button>
      </div>
    </div>
  );
};
