import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Plus, Trash2, Send } from 'lucide-react';

export const DiscussionPage = () => {
  const { discussions, addDiscussionPost, deleteDiscussionPost, replyDiscussionPost, currentUser } = useLMS();
  const [showAskModal, setShowAskModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [replyInput, setReplyInput] = useState({});

  const handlePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addDiscussionPost(newTitle, newContent);
    setShowAskModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleReply = (discId) => {
    const text = replyInput[discId];
    if (!text?.trim()) return;
    replyDiscussionPost(discId, text);
    setReplyInput(prev => ({ ...prev, [discId]: '' }));
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this discussion post?')) {
      deleteDiscussionPost(postId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Community Discussion Forum</h1>
          <p className="text-sm text-slate-500 mt-1">Ask questions, share answers, and collaborate.</p>
        </div>
        <button
          onClick={() => setShowAskModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Ask Question</span>
        </button>
      </div>

      <div className="space-y-4">
        {discussions.map(d => (
          <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={d.avatar} alt={d.author} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{d.author}</h4>
                  <p className="text-[10px] text-slate-400">{d.createdAt}</p>
                </div>
              </div>

              {(currentUser?.role === 'admin' || currentUser?.name === d.author) && (
                <button
                  onClick={() => handleDeletePost(d.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">{d.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{d.content}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {d.tags?.map(t => (
                  <span key={t} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {d.replies?.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {d.replies.map((r, rIdx) => (
                  <div key={rIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <span className="font-bold text-blue-700 block mb-0.5">{r.author}:</span>
                    <span className="text-slate-700">{r.content}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex space-x-2">
              <input
                type="text"
                value={replyInput[d.id] || ''}
                onChange={e => setReplyInput({ ...replyInput, [d.id]: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleReply(d.id)}
                placeholder="Write a helpful response..."
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={() => handleReply(d.id)}
                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Ask Question</h3>
            <form onSubmit={handlePost} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Question Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. How to use React Context effectively?"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Context & Details</label>
                <textarea
                  rows="4"
                  required
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Explain context..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAskModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold">
                  Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
