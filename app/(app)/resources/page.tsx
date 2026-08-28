"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, FileText, Atom, Dna, FlaskConical, Sigma } from "lucide-react";

const TABS = ["All", "Biology", "Physics", "Chemistry", "Maths"];

const RESOURCES = [
  {
    subject: "Physics",
    subjectIcon: Atom,
    image:
      "https://images.unsplash.com/photo-1633493702341-4d04841df53b?auto=format&fit=crop&w=1200&q=80",
    priority: "High Priority",
    priorityClass: "text-rose-600",
    title: "Force & Motion",
    weightage: 95,
  },
  {
    subject: "Biology",
    subjectIcon: Dna,
    image:
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=1200&q=80",
    priority: "Medium Priority",
    priorityClass: "text-orange-600",
    title: "Cellular Structures",
    weightage: 70,
  },
  {
    subject: "Chemistry",
    subjectIcon: FlaskConical,
    image:
      "https://images.unsplash.com/photo-1694230155228-cdde50083573?auto=format&fit=crop&w=1200&q=80",
    priority: "High Priority",
    priorityClass: "text-rose-600",
    title: "Chemical Bonding",
    weightage: 85,
  },
];

const TAB_ICONS: Record<string, typeof Atom> = {
  Biology: Dna,
  Physics: Atom,
  Chemistry: FlaskConical,
  Maths: Sigma,
};

export default function ResourceHubPage() {
  const [activeTab, setActiveTab] = useState("All");

  const visible =
    activeTab === "All"
      ? RESOURCES
      : RESOURCES.filter((r) => r.subject === activeTab);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="animate-fade-up">
        <h1 className="text-3xl font-semibold tracking-tightest text-[#1d1d1f] sm:text-4xl">
          Resource Hub
        </h1>
        <p className="mt-1.5 text-[15px] text-[#1d1d1f]/55">
          Explore study modules, lectures, and revision notes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-black/[0.06]">
        {TABS.map((tab) => {
          const active = tab === activeTab;
          const Icon = TAB_ICONS[tab];
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-[13.5px] font-medium transition-colors ${
                active
                  ? "border-[#0071e3] text-[#0071e3]"
                  : "border-transparent text-[#1d1d1f]/45 hover:text-[#1d1d1f]"
              }`}
            >
              {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />}
              {tab}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((res) => {
          return (
            <div
              key={res.title}
              className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-colors hover:border-[#0071e3]/20"
            >
              {/* Thumbnail — real photo, Apple product-card style */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={res.image}
                  alt={res.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <span
                  className={`absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium backdrop-blur ${res.priorityClass}`}
                >
                  ● {res.priority}
                </span>
                <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#1d1d1f] backdrop-blur">
                  {res.subject}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-[15px] font-semibold tracking-tight text-[#1d1d1f]">
                  {res.title}
                </h3>
                <div className="mt-3 flex items-center justify-between text-[13px]">
                  <span className="text-[#1d1d1f]/40">Weightage</span>
                  <span className="font-semibold text-[#1d1d1f]">{res.weightage}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
                  <div
                    className="h-full rounded-full bg-[#0071e3]"
                    style={{ width: `${res.weightage}%` }}
                  />
                </div>

                <div className="mt-5 flex gap-2.5">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0071e3] py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#0077ed]">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Watch
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black/[0.05] py-2.5 text-[13px] font-medium text-[#1d1d1f] transition-colors hover:bg-black/[0.08]">
                    <FileText className="h-3.5 w-3.5" />
                    Notes
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
