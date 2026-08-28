"use client";

import { Search, Flame, Bell, ChevronDown } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-[68px] shrink-0 items-center gap-4 border-b border-black/[0.06] bg-white/80 px-8 backdrop-blur-xl">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#1d1d1f]/30" />
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full rounded-full border border-transparent bg-black/[0.04] py-2 pl-9 pr-4 text-[13.5px] text-[#1d1d1f] placeholder:text-[#1d1d1f]/35 outline-none transition-colors focus:border-[#0071e3]/30 focus:bg-white focus:ring-4 focus:ring-[#0071e3]/[0.08]"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          aria-label="Streak"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#1d1d1f]/45 transition-colors hover:bg-black/[0.04] hover:text-orange-500"
        >
          <Flame className="h-[17px] w-[17px]" strokeWidth={1.75} />
        </button>

        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-full text-[#1d1d1f]/45 transition-colors hover:bg-black/[0.04] hover:text-[#1d1d1f]"
        >
          <Bell className="h-[17px] w-[17px]" strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <div className="h-5 w-px bg-black/[0.08]" />

        <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-black/[0.04]">
          <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[#0071e3] text-xs font-medium text-white">
            S
          </span>
          <span className="text-[13.5px] font-medium text-[#1d1d1f]">Profile</span>
          <ChevronDown className="h-3.5 w-3.5 text-[#1d1d1f]/35" />
        </button>
      </div>
    </header>
  );
}
