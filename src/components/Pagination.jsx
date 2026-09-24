import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination() {
  return (
    <div className="flex items-center justify-center space-x-2 text-xs font-semibold">
      <button className="p-1.5 border border-slate-300 rounded-lg text-slate-500 hover:bg-slate-100">
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button className="w-8 h-8 rounded-lg bg-blue-600 text-white">1</button>
      <button className="w-8 h-8 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100">2</button>
      <button className="w-8 h-8 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100">3</button>
      <button className="w-8 h-8 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100">4</button>
      <button className="w-8 h-8 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100">5</button>
      
      <span className="px-1 text-slate-400">...</span>
      
      <button className="w-8 h-8 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100">12</button>

      <button className="p-1.5 border border-slate-300 rounded-lg text-slate-500 hover:bg-slate-100">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
