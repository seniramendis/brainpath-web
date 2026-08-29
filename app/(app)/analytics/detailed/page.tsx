import {
  Calendar,
  Download,
  Timer,
  ScanSearch,
  Lightbulb,
  Target,
  ArrowRight,
  FlaskConical,
  Wrench,
  Zap,
} from "lucide-react";

const PRIORITY_MODULES = [
  {
    icon: FlaskConical,
    name: "Bio-systems Technology",
    unit: "Unit 4: Plant Physiology",
    priority: "HIGH",
    priorityClass: "bg-rose-50 text-rose-600",
    dotClass: "bg-rose-500",
    accuracy: 12,
    barClass: "bg-rose-500",
    action: "Practice",
  },
  {
    icon: Wrench,
    name: "Applied Mechanics",
    unit: "Unit 2: Kinematics",
    priority: "MED",
    priorityClass: "bg-amber-50 text-amber-600",
    dotClass: "bg-amber-500",
    accuracy: 45,
    barClass: "bg-amber-500",
    action: "Review",
  },
  {
    icon: Zap,
    name: "Electrical Circuits",
    unit: "Unit 3: AC/DC Fundamentals",
    priority: "MED",
    priorityClass: "bg-amber-50 text-amber-600",
    dotClass: "bg-amber-500",
    accuracy: 52,
    barClass: "bg-amber-500",
    action: "Review",
  },
];

export default function DetailedAnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tightest text-[#1d1d1f] sm:text-4xl">
            Performance Deep Dive
          </h1>
          <p className="mt-1.5 max-w-xl text-[15px] text-[#1d1d1f]/55">
            Analyze your pacing, accuracy, and subject-specific metrics to
            optimize your study strategy for the SFT examination.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2.5 text-[13px] font-medium text-[#1d1d1f] hover:bg-black/[0.03] sm:flex-none">
            <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
            Last 30 Days
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#0071e3] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#0077ed] sm:flex-none">
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Pacing Analysis */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">
          <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
            <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[#1d1d1f]">
              <Timer className="h-[18px] w-[18px] text-[#1d1d1f]/60" strokeWidth={1.75} />
              Pacing Analysis
            </h2>
            <span className="whitespace-nowrap rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#1d1d1f]/50">
              OPTIMAL: 1.5–2.5M
            </span>
          </div>
          <p className="mb-6 text-[13.5px] text-[#1d1d1f]/55">
            Average time spent per question by paper type.
          </p>

          {/* Paper I */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13.5px] font-medium text-[#1d1d1f]">Paper I (MCQ)</span>
              <span className="text-[13px] text-[#1d1d1f]/50">
                Avg: <span className="font-semibold text-[#1d1d1f]">1m 45s</span> / q
              </span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-black/[0.06]">
              <div className="h-full w-[70%] rounded-full bg-[#0071e3]" />
              <div className="absolute top-1/2 left-[55%] h-3.5 w-0.5 -translate-y-1/2 bg-black/25" />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-[#1d1d1f]/35">
              <span>Fast (Sub 1m)</span>
              <span className="font-semibold text-rose-500">Target: 2m</span>
              <span>Slow (3m+)</span>
            </div>
          </div>

          {/* Paper II */}
          <div className="mb-6">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-1">
              <span className="text-[13.5px] font-medium text-[#1d1d1f]">
                Paper II (Structured/Essay)
              </span>
              <span className="text-[13px] text-[#1d1d1f]/50">
                Avg: <span className="font-semibold text-[#1d1d1f]">18m 20s</span> / q
              </span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-black/[0.06]">
              <div className="h-full w-[80%] rounded-full bg-orange-500" />
              <div className="absolute top-1/2 left-[65%] h-3.5 w-0.5 -translate-y-1/2 bg-black/25" />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-[#1d1d1f]/35">
              <span>Fast</span>
              <span className="font-semibold text-rose-500">Target: 15m</span>
              <span>Slow</span>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl bg-rose-50/70 p-4">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" strokeWidth={1.75} />
            <p className="text-[13px] leading-relaxed text-[#1d1d1f]/70">
              <span className="font-semibold text-[#1d1d1f]">Observation:</span> You
              are pacing well on Paper I but spending ~20% longer than
              recommended on Paper II structured essays. Consider reviewing
              drafting techniques for Applied Mechanics sections.
            </p>
          </div>
        </div>

        {/* Error Typology */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">
          <h2 className="mb-1 flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[#1d1d1f]">
            <ScanSearch className="h-[18px] w-[18px] text-[#1d1d1f]/60" strokeWidth={1.75} />
            Error Typology
          </h2>
          <p className="mb-8 text-[13.5px] text-[#1d1d1f]/55">
            Concept vs. calculation failures.
          </p>

          <div className="flex h-44 items-end justify-center gap-10 sm:h-52 sm:gap-16">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-32 w-12 flex-col justify-end overflow-hidden rounded-lg bg-black/[0.05] sm:h-40 sm:w-14">
                <div className="h-[88%] w-full rounded-t-lg bg-[#0071e3]" />
              </div>
              <span className="text-center text-[11.5px] font-medium text-[#1d1d1f]/55">
                Concept
                <br className="sm:hidden" /> Accuracy
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-32 w-12 flex-col justify-end overflow-hidden rounded-lg bg-black/[0.05] sm:h-40 sm:w-14">
                <div className="h-[64%] w-full bg-[#0071e3]" />
                <div className="h-[20%] w-full bg-rose-500" />
              </div>
              <span className="text-center text-[11.5px] font-medium text-[#1d1d1f]/55">
                Calculation
                <br className="sm:hidden" /> Accuracy
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-black/[0.06] pt-4 text-center text-[13.5px] text-[#1d1d1f]/55">
            You lose the most marks due to{" "}
            <span className="font-semibold text-rose-500">calculation errors</span>,
            despite understanding the core concepts.
          </div>
        </div>
      </div>

      {/* Priority Focus Areas */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[#1d1d1f]">
              <Target className="h-[18px] w-[18px] text-[#1d1d1f]/60" strokeWidth={1.75} />
              Priority Focus Areas
            </h2>
            <p className="mt-1 text-[13.5px] text-[#1d1d1f]/55">
              Syllabus modules ranked by required intervention.
            </p>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-[13px] font-medium text-[#0071e3] hover:text-[#0077ed]"
          >
            View Syllabus Map
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Desktop / tablet table */}
        <table className="hidden w-full text-left sm:table">
          <thead>
            <tr className="border-b border-black/[0.06] text-[11px] font-medium uppercase tracking-wide text-[#1d1d1f]/40">
              <th className="pb-3">Module</th>
              <th className="pb-3">Priority Level</th>
              <th className="pb-3">Overall Accuracy</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.05]">
            {PRIORITY_MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <tr key={m.name}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0071e3]/[0.08] text-[#0071e3]">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <div>
                        <p className="text-[13.5px] font-medium text-[#1d1d1f]">{m.name}</p>
                        <p className="text-[12px] text-[#1d1d1f]/40">{m.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${m.priorityClass}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${m.dotClass}`} />
                      {m.priority}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[13px] font-semibold ${
                          m.accuracy < 20 ? "text-rose-600" : "text-[#1d1d1f]"
                        }`}
                      >
                        {m.accuracy}%
                      </span>
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-black/[0.06]">
                        <div
                          className={`h-full rounded-full ${m.barClass}`}
                          style={{ width: `${m.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <button className="rounded-full border border-black/10 px-4 py-1.5 text-[12px] font-medium text-[#1d1d1f] hover:bg-black/[0.03]">
                      {m.action}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile card list */}
        <div className="-mx-1 divide-y divide-black/[0.05] sm:hidden">
          {PRIORITY_MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.name} className="flex items-start gap-3 px-1 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0071e3]/[0.08] text-[#0071e3]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] font-medium text-[#1d1d1f]">{m.name}</p>
                      <p className="truncate text-[12px] text-[#1d1d1f]/40">{m.unit}</p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${m.priorityClass}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${m.dotClass}`} />
                      {m.priority}
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span
                      className={`text-[12px] font-semibold ${
                        m.accuracy < 20 ? "text-rose-600" : "text-[#1d1d1f]"
                      }`}
                    >
                      {m.accuracy}%
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                      <div
                        className={`h-full rounded-full ${m.barClass}`}
                        style={{ width: `${m.accuracy}%` }}
                      />
                    </div>
                    <button className="shrink-0 rounded-full border border-black/10 px-3 py-1 text-[11px] font-medium text-[#1d1d1f] hover:bg-black/[0.03]">
                      {m.action}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
