"use client";

import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";
import { LOGO_URL } from "@/lib/brand";

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
    <aside className="hidden h-screen w-[264px] shrink-0 flex-col border-r border-black/[0.06] bg-white lg:flex">
      {/* Logo */}
      <Link href="/" className="flex items-center px-6 pt-7 pb-6">
        <div className="relative h-14 w-14 shrink-0">
          <Image src={LOGO_URL} alt="BrainPath" fill className="object-contain" sizes="56px" priority />
        </div>
      </Link>

      {/* Start Daily Quiz */}
      <div className="px-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0071e3] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#0077ed]">
          <Play className="h-3 w-3 fill-current" />
          Start Daily Quiz
        </button>
      </div>

      {/* Nav */}
      <nav className="mt-7 flex flex-1 flex-col gap-0.5 px-4">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] transition-colors ${
                active
                  ? "bg-[#0071e3]/[0.08] font-medium text-[#0071e3]"
                  : "font-normal text-[#1d1d1f]/55 hover:bg-black/[0.03] hover:text-[#1d1d1f]"
              }`}
            >
              <Icon
                className={`h-[17px] w-[17px] ${active ? "text-[#0071e3]" : "text-[#1d1d1f]/35 group-hover:text-[#1d1d1f]/70"}`}
                strokeWidth={1.75}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-0.5 border-t border-black/[0.06] px-4 py-5">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-normal text-[#1d1d1f]/55 transition-colors hover:bg-black/[0.03] hover:text-[#1d1d1f]">
          <CircleHelp className="h-[17px] w-[17px] text-[#1d1d1f]/35" strokeWidth={1.75} />
          Help Center
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-normal text-rose-500 transition-colors hover:bg-rose-50">
          <LogOut className="h-[17px] w-[17px]" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </aside>
  );
}
