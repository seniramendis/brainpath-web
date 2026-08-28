"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Microscope,
  BarChart3,
  FolderOpen,
  Settings,
  CircleHelp,
  LogOut,
  Play,
  FlaskConical,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Practice Simulator", href: "/practice", icon: Microscope },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Resource Hub", href: "/resources", icon: FolderOpen },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[266px] shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30">
          <FlaskConical className="h-5 w-5" strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <p className="text-lg font-bold tracking-tight text-slate-900">BrainPath</p>
          <p className="text-xs font-medium text-slate-400">SFT Excellence</p>
        </div>
      </div>

      {/* Start Daily Quiz */}
      <div className="px-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition-colors hover:bg-blue-700">
          <Play className="h-3.5 w-3.5 fill-current" />
          Start Daily Quiz
        </button>
      </div>

      {/* Nav */}
      <nav className="mt-6 flex flex-1 flex-col gap-1 px-4">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-blue-50 font-semibold text-blue-700"
                  : "font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] ${active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}
                strokeWidth={2}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-1 border-t border-slate-100 px-4 py-5">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800">
          <CircleHelp className="h-[18px] w-[18px] text-slate-400" />
          Help Center
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-500 transition-colors hover:bg-rose-50">
          <LogOut className="h-[18px] w-[18px]" />
          Logout
        </button>
      </div>
    </aside>
  );
}
