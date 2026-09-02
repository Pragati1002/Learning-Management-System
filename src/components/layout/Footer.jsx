import React from 'react';
import { GraduationCap, ShieldCheck, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-blue-600 rounded text-white">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-700">LMS Learning Platform</span>
          <span>• Full Training Lifecycle & Academy Software</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-emerald-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>5 Roles Configured</span>
          </span>
          <span className="flex items-center space-x-1 text-indigo-600 font-medium">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Powered</span>
          </span>
        </div>
      </div>
    </footer>
  );
};