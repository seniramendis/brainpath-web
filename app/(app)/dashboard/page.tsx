import {
  History,
  Grid3x3,
  Target,
  RefreshCw,
  BrainCircuit,
  Route,
  ScanSearch,
} from "lucide-react";

const STATS = [
  { icon: History, label: "10 Years of Categorized Papers" },
  { icon: Grid3x3, label: "25 Syllabus Modules" },
  { icon: Target, label: "100% Exam Risk Coverage" },
];

const FEATURES = [
  {
    icon: RefreshCw,
    title: "Weighted Readiness",
    description:
      "Real-time mastery scores weighted exactly against the A/L exam blueprint and historical question frequency.",
  },
  {
    icon: BrainCircuit,
    title: "Exam Simulation",
    description:
      "Timed, pressure-tested environments mimicking true exam conditions to build cognitive endurance.",
  },
  {
    icon: Route,
    title: "Method-Mark Grading",
    description:
      "Don't just get the answer right. Learn the exact stepwise methodology required to secure full marks.",
  },
  {
    icon: ScanSearch,
    title: "Weak-Topic Analytics",
    description:
      "Algorithmic detection of your most vulnerable syllabus areas with targeted remedial resources.",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50/40 px-6 py-16 text-center shadow-[0_8px_30px_-12px_rgba(15,23,42,0.08)] sm:px-12">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          2024 SFT Curriculum Updated
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          <span className="text-blue-600">Master SFT</span> with BrainPath
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
          The elite academic simulator for G.C.E. A/L Science for Technology.
          Pinpoint your weaknesses, master the method-marks, and conquer the
          exam risk profile.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-colors hover:bg-blue-700">
            Start Simulator Now
          </button>
          <button className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            View Syllabus Maps
          </button>
        </div>
      </section>

      {/* Stats row */}
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 px-6 py-4 text-sm font-medium text-slate-600 sm:flex-row sm:gap-10">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-2">
              {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />}
              <Icon className="h-4 w-4 text-blue-600" />
              <span>{stat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Core Analytics Engine */}
      <section className="space-y-2 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Core Analytics Engine
        </h2>
        <p className="text-slate-500">Data-driven learning designed specifically for SFT.</p>
      </section>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blue-50" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="relative mt-4 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
