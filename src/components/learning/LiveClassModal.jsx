import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, MessageSquare, Users, ScreenShare, X, Send } from 'lucide-react';

export const LiveClassModal = ({ liveClass, isOpen, onClose }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Prof. Priya Menon', text: 'Welcome everyone to today live deep-dive session!' },
    { id: 2, user: 'Aarav Patel', text: 'Audio and screen are crystal clear maam!' }
  ]);
  const [msgInput, setMsgInput] = useState('');

  if (!isOpen || !liveClass) return null;

  const handleSend = () => {
    if (!msgInput.trim()) return;
    setChatMessages(prev => [...prev, { id: Date.now(), user: 'You', text: msgInput }]);
    setMsgInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in fade-in">
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
          <h3 className="font-bold text-sm sm:text-base truncate max-w-md">{liveClass.title}</h3>
          <span className="bg-red-950/80 text-red-400 text-xs px-2 py-0.5 rounded font-semibold border border-red-800">LIVE NOW</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-400 flex items-center space-x-1">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>34 Active Participants</span>
          </span>
          <button onClick={onClose} className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors">
            Leave Class
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 bg-slate-900 p-4 flex flex-col justify-between items-center relative">
          <div className="w-full h-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center relative">
            {screenSharing ? (
              <div className="w-full h-full bg-slate-900 p-6 flex flex-col font-mono text-emerald-400 text-xs overflow-y-auto">
                <p className="text-slate-400 mb-2">// Live Code Demonstration - Redis PubSub Microservice Architecture</p>
                <p>const redis = require("ioredis");</p>
                <p>const pub = new redis();</p>
                <p>const sub = new redis();</p>
                <p>sub.subscribe("order_notifications", (err, count) =&gt; &#123;</p>
                <p>&nbsp;&nbsp;console.log("Listening on active order queue...");</p>
                <p>&#125;);</p>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                  alt="Trainer Speaker"
                  className="w-28 h-28 rounded-full border-4 border-emerald-500 mx-auto object-cover shadow-xl"
                />
                <h4 className="text-white font-bold text-lg">{liveClass.trainer} (Instructor)</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">{liveClass.agenda}</p>
              </div>
            )}

            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center space-x-2 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Speaking: {liveClass.trainer}</span>
            </div>
          </div>
        </div>

        <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
          <div className="p-3 border-b border-slate-800 text-white text-xs font-bold flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>Live Classroom Chat</span>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {chatMessages.map(m => (
              <div key={m.id} className="text-xs bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <span className="font-bold text-blue-400 block mb-0.5">{m.user}:</span>
                <span className="text-slate-200">{m.text}</span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-slate-800 flex space-x-2">
            <input
              type="text"
              value={msgInput}
              onChange={e => setMsgInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask question live..."
              className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-16 bg-slate-950 border-t border-slate-800 px-6 flex items-center justify-center space-x-4 text-white">
        <button
          onClick={() => setMicOn(!micOn)}
          className={`p-3 rounded-full ${micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-600 text-white'}`}
        >
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setVideoOn(!videoOn)}
          className={`p-3 rounded-full ${videoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-600 text-white'}`}
        >
          {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setScreenSharing(!screenSharing)}
          className={`p-3 rounded-full ${screenSharing ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
          title="Toggle Screen Share"
        >
          <ScreenShare className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
