import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Star, MessageSquarePlus, Send } from 'lucide-react';

const StarRow = ({ value, onChange, size = 'w-6 h-6' }) => (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map(n => (
      <button key={n} type="button" onClick={() => onChange(n)}>
        <Star className={`${size} ${n <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
      </button>
    ))}
  </div>
);

export const FeedbackPage = () => {
  const { currentUser, platformFeedback, submitPlatformFeedback } = useLMS();
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const myFeedback = platformFeedback?.filter(f => f.studentId === currentUser?.id) || [];

  const handleSubmit = () => {
    if (!message.trim() || rating === 0) return;
    submitPlatformFeedback(message, rating);
    setMessage('');
    setRating(0);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Share Your Feedback</h1>
        <p className="text-sm text-slate-500 mt-1">Tell us what's working and what could be better — it goes straight to the team.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Overall Experience</label>
          <StarRow value={rating} onChange={setRating} />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Your Feedback</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={5}
            placeholder="What do you like? What's confusing or missing? Any feature you wish we had?"
            className="w-full p-3.5 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || rating === 0}
          className="flex items-center justify-center space-x-1.5 w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm rounded-xl transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Submit Feedback</span>
        </button>
      </div>

      {myFeedback.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
            <MessageSquarePlus className="w-4 h-4 text-purple-600" />
            <span>Your Past Feedback</span>
          </h3>
          {myFeedback.map(f => (
            <div key={f.id} className="p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
              <StarRow value={f.rating} onChange={() => {}} size="w-4 h-4" />
              <p className="text-sm text-slate-700">{f.message}</p>
              <p className="text-[11px] text-slate-400">{new Date(f.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
