import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Code2, CheckCircle2 } from 'lucide-react';

export const AITutorDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your AI Learning Assistant. You can ask me to explain difficult concepts, generate practice code, summarize lessons, or diagnose weak topics in your courses. What would you like to explore today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'Explain React useEffect dependency array in simple terms',
    'How does Gradient Descent work in Machine Learning?',
    'Write an Express middleware snippet for JWT authorization',
    'Top 5 interview questions on Next.js Server Components'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('useeffect') || qLower.includes('react')) {
        aiResponseText = 'In React 18, useEffect handles side effects after DOM paint. If you pass an empty array [], it executes once on mount. If you pass [stateVar], it re-runs only when stateVar changes. Never mutate state inside useEffect without proper dependencies!';
      } else if (qLower.includes('gradient') || qLower.includes('machine learning') || qLower.includes('ai')) {
        aiResponseText = 'Gradient Descent is an optimization algorithm used to minimize the Loss Function J(w, b). It calculates the partial derivative (slope) of the loss with respect to each parameter and steps in the opposite direction by learning rate alpha.';
      } else if (qLower.includes('jwt') || qLower.includes('express') || qLower.includes('middleware')) {
        aiResponseText = 'Here is a clean Express JWT middleware pattern: Check authorization header Bearer token, verify with jwt.verify(), and attach user payload to req.user before calling next().';
      } else {
        aiResponseText = 'Great question regarding ' + query + '! In modern development, focus on foundational architecture principles, write modular testable code, and monitor performance bottlenecks.';
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiResponseText }]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      <div className="p-4 bg-gradient-to-r from-purple-700 via-purple-700 to-purple-800 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base">LMS AI Tutor & Copilot</h3>
            <p className="text-[11px] text-purple-200">Smart Context-Aware Learning Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/80 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto whitespace-nowrap space-x-2 flex">
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="text-[11px] bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-700 hover:text-purple-700 px-3 py-1.5 rounded-full transition-all shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start space-x-2.5 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              m.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gradient-to-tr from-purple-600 to-purple-600 text-white shadow-sm'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`p-3.5 rounded-2xl max-w-[82%] text-xs sm:text-sm leading-relaxed shadow-sm ${
              m.sender === 'user'
                ? 'bg-purple-600 text-white rounded-tr-none'
                : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none font-normal'
            }`}>
              <p className="whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs italic p-2">
            <Sparkles className="w-4 h-4 text-purple-500 animate-spin" />
            <span>AI Tutor is formulating answer...</span>
          </div>
        )}
      </div>

      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input autoComplete="off"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything about your courses..."
            className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl shadow-sm transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
