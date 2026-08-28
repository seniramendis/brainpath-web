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
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white px-6 py-16 text-center sm:px-12 sm:py-20 animate-fade-up"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(0,113,227,0.06),transparent)]" />

        <div className="relative mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-[#0071e3]/[0.08] px-4 py-1.5 text-[11px] font-medium text-[#0071e3]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
          2024 SFT Curriculum Updated
        </div>

        <h1 className="relative text-4xl font-semibold tracking-tightest text-[#1d1d1f] sm:text-6xl">
          <span className="text-[#0071e3]">Master SFT</span>
          <br className="hidden sm:block" /> with BrainPath.
        </h1>

        <p className="relative mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-[#1d1d1f]/55">
          The elite academic simulator for G.C.E. A/L Science for Technology.
          Pinpoint your weaknesses, master the method-marks, and conquer the
          exam risk profile.
        </p>

        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button className="rounded-full bg-[#0071e3] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#0077ed]">
            Start Simulator Now
          </button>
          <button className="rounded-full border border-black/10 bg-white px-6 py-3 text-[14px] font-medium text-[#1d1d1f] transition-colors hover:bg-black/[0.03]">
            View Syllabus Maps
          </button>
        </div>
      </section>

      {/* Stats row */}
      <div
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-black/[0.06] bg-white px-6 py-4 text-[13px] font-medium text-[#1d1d1f]/60 sm:flex-row sm:gap-10 animate-fade-up"
        style={{ animationDelay: "0.05s" }}
      >
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-2">
              {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-black/15 sm:block" />}
              <Icon className="h-4 w-4 text-[#0071e3]" strokeWidth={1.75} />
              <span>{stat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Core Analytics Engine */}
      <section
        className="space-y-2 pt-6 text-center animate-fade-up"
        style={{ animationDelay: "0.1s" }}
      >
        <p className="text-[13px] font-semibold text-[#0071e3]">Analytics Engine</p>
        <h2 className="text-3xl font-semibold tracking-tightest text-[#1d1d1f] sm:text-4xl">
          Built to close the gap.
        </h2>
        <p className="text-[#1d1d1f]/55">Data-driven learning designed specifically for SFT.</p>
      </section>

      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-fade-up"
        style={{ animationDelay: "0.15s" }}
      >
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-6 transition-colors hover:border-[#0071e3]/20"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#0071e3]/[0.05] transition-transform duration-500 group-hover:scale-125" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071e3] text-white">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </div>
              <h3 className="relative mt-4 text-[15px] font-semibold tracking-tight text-[#1d1d1f]">
                {feature.title}
              </h3>
              <p className="relative mt-2 text-[13.5px] leading-relaxed text-[#1d1d1f]/55">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
