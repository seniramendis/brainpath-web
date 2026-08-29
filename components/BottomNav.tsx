"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Microscope, BarChart3, FolderOpen, Settings } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/dashboard", icon: LayoutGrid },
  { label: "Practice", href: "/practice", icon: Microscope },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Resources", href: "/resources", icon: FolderOpen },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.06] bg-white/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-6xl items-stretch justify-between px-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10.5px]"
            >
              <Icon
                className={`h-[21px] w-[21px] transition-colors ${
                  active ? "text-[#0071e3]" : "text-[#1d1d1f]/40"
                }`}
                strokeWidth={active ? 2 : 1.75}
                fill={active ? "currentColor" : "none"}
                fillOpacity={active ? 0.12 : 0}
              />
              <span
                className={`font-medium transition-colors ${
                  active ? "text-[#0071e3]" : "text-[#1d1d1f]/45"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
