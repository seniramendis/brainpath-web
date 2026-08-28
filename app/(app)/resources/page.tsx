"use client";

import { useState } from "react";
import { Play, FileText, Atom, Dna, FlaskConical, Sigma } from "lucide-react";

const TABS = ["All", "Biology", "Physics", "Chemistry", "Maths"];

const RESOURCES = [
  {
    subject: "Physics",
    subjectIcon: Atom,
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    priority: "High Priority",
    priorityClass: "text-rose-600",
    title: "Force & Motion",
    weightage: 95,
    barClass: "bg-blue-600",
  },
  {
    subject: "Biology",
    subjectIcon: Dna,
    gradient: "from-cyan-700 via-teal-800 to-slate-900",
    priority: "Medium Priority",
    priorityClass: "text-orange-600",
    title: "Cellular Structures",
    weightage: 70,
    barClass: "bg-orange-600",
  },
  {
    subject: "Chemistry",
    subjectIcon: FlaskConical,
    gradient: "from-blue-800 via-indigo-900 to-slate-950",
    priority: "High Priority",
    priorityClass: "text-rose-600",
    title: "Chemical Bonding",
    weightage: 85,
    barClass: "bg-blue-600",
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
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Resource Hub
        </h1>
        <p className="mt-1 text-slate-500">
          Explore study modules, lectures, and revision notes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200">
        {TABS.map((tab) => {
          const active = tab === activeTab;
          const Icon = TAB_ICONS[tab];
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {tab}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((res) => {
          const SubjectIcon = res.subjectIcon;
          return (
            <div
              key={res.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Thumbnail */}
              <div
                className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${res.gradient}`}
              >
                <SubjectIcon className="h-16 w-16 text-white/15" strokeWidth={1} />
                <span
                  className={`absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold ${res.priorityClass}`}
                >
                  ● {res.priority}
                </span>
                <span className="absolute bottom-3 left-3 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-800">
                  {res.subject}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">{res.title}</h3>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-400">Weightage</span>
                  <span className="font-bold text-slate-800">{res.weightage}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${res.barClass}`}
                    style={{ width: `${res.weightage}%` }}
                  />
                </div>

                <div className="mt-5 flex gap-3">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 hover:bg-blue-700">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Watch
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200">
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
