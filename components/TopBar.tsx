"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Flame, Bell, ChevronDown, X, LogOut } from "lucide-react";
import { LOGO_URL } from "@/lib/brand";
import { logoutAction } from "@/app/actions/auth";
import type { CurrentUser } from "@/lib/dal";

export default function TopBar({ user }: { user?: CurrentUser }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const initial = (user?.name?.trim()?.[0] ?? user?.email?.[0] ?? "?").toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-[60px] shrink-0 items-center gap-3 border-b border-black/[0.06] bg-white/80 px-4 backdrop-blur-xl sm:h-[68px] sm:gap-4 sm:px-8">
      {/* Mobile logo — sidebar is hidden below lg, so brand lives here instead */}
      <Link href="/dashboard" className="flex shrink-0 items-center lg:hidden">
        <div className="relative h-8 w-8">
          <Image src={LOGO_URL} alt="BrainPath" fill className="object-contain" sizes="32px" priority />
        </div>
      </Link>

      {/* Search — full width on desktop, collapses to an icon on mobile */}
      <div className="relative hidden w-full max-w-sm sm:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#1d1d1f]/30" />
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full rounded-full border border-transparent bg-black/[0.04] py-2 pl-9 pr-4 text-[13.5px] text-[#1d1d1f] placeholder:text-[#1d1d1f]/35 outline-none transition-colors focus:border-[#0071e3]/30 focus:bg-white focus:ring-4 focus:ring-[#0071e3]/[0.08]"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
        <button
          aria-label="Search"
          onClick={() => setMobileSearchOpen((v) => !v)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#1d1d1f]/45 transition-colors hover:bg-black/[0.04] hover:text-[#1d1d1f] sm:hidden"
        >
          {mobileSearchOpen ? (
            <X className="h-[17px] w-[17px]" strokeWidth={1.75} />
          ) : (
            <Search className="h-[17px] w-[17px]" strokeWidth={1.75} />
          )}
        </button>

        <button
          aria-label="Streak"
          className="hidden h-8 w-8 items-center justify-center rounded-full text-[#1d1d1f]/45 transition-colors hover:bg-black/[0.04] hover:text-orange-500 sm:flex"
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

        <div className="hidden h-5 w-px bg-black/[0.08] sm:block" />

        <div className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-1 transition-colors hover:bg-black/[0.04] sm:pr-3"
          >
            <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[#0071e3] text-xs font-medium text-white">
              {initial}
            </span>
            <span className="hidden max-w-[120px] truncate text-[13.5px] font-medium text-[#1d1d1f] sm:inline">
              {user?.name ?? "Profile"}
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-[#1d1d1f]/35 sm:block" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-black/[0.06] bg-white p-1.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]">
                <div className="px-3 py-2">
                  <p className="truncate text-[13px] font-medium text-[#1d1d1f]">
                    {user?.name ?? "Your account"}
                  </p>
                  <p className="truncate text-[12px] text-[#1d1d1f]/45">{user?.email}</p>
                </div>
                <div className="my-1 h-px bg-black/[0.06]" />
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-rose-500 transition-colors hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.75} />
                    Log out
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-black/[0.06] bg-white/95 p-3 backdrop-blur-xl sm:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#1d1d1f]/30" />
            <input
              type="text"
              autoFocus
              placeholder="Search resources..."
              className="w-full rounded-full border border-transparent bg-black/[0.04] py-2.5 pl-9 pr-4 text-[14px] text-[#1d1d1f] placeholder:text-[#1d1d1f]/35 outline-none transition-colors focus:border-[#0071e3]/30 focus:bg-white focus:ring-4 focus:ring-[#0071e3]/[0.08]"
            />
          </div>
        </div>
      )}
    </header>
  );
}
