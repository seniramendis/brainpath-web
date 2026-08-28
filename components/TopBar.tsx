"use client";

import { Search, Flame, Bell, ChevronDown } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-[73px] shrink-0 items-center gap-4 border-b border-slate-200 bg-white/95 px-8 backdrop-blur">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 focus:bg-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          aria-label="Streak"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-50 hover:text-orange-500"
        >
          <Flame className="h-[18px] w-[18px]" />
        </button>

        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <button className="flex items-center gap-2 rounded-full bg-slate-50 py-1 pl-1 pr-3 transition-colors hover:bg-slate-100">
          <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-xs font-bold text-white">
            S
          </span>
          <span className="text-sm font-semibold text-slate-700">Profile</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
