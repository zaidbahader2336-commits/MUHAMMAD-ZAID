import React from 'react';
import { Search, Bell, Mic, ChevronDown } from 'lucide-react';

export function TopBar() {
  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center px-8 justify-between z-20 sticky top-0 shrink-0">
      <div className="relative w-full max-w-md">
        <input 
          type="text" 
          placeholder="Search items, categories..." 
          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-14 text-sm focus:ring-2 focus:ring-primary-500 transition-all text-slate-600 dark:text-slate-300"
        />
        <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
        <div className="absolute right-4 top-3 text-slate-400 hover:text-primary-500 cursor-pointer p-0.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <Mic size={18} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl text-[10px] font-bold text-slate-500">
          <span className="cursor-pointer hover:text-primary-600 transition-colors">EN</span>
          <span className="text-slate-200 dark:text-slate-700">|</span>
          <span className="text-slate-300 dark:text-slate-600 cursor-not-allowed">PK</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl text-[10px] font-bold text-slate-500 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <span>PKR</span>
          <ChevronDown size={14} />
        </div>

        <div className="relative cursor-pointer group">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <Bell size={20} className="text-slate-500 group-hover:text-primary-600 transition-colors" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
            3
          </span>
        </div>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-100 dark:border-slate-800">
          <div className="hidden md:block text-right">
            <div className="text-xs font-bold text-slate-800 dark:text-white">Zaid B.</div>
            <div className="text-[10px] text-slate-400 font-medium">Pro Member</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-0.5 shadow-sm">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Avatar"
              className="w-full h-full rounded-[10px] object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
