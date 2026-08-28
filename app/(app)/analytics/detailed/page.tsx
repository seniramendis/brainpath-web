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
    priorityClass: "bg-rose-50 text-rose-700",
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
    priorityClass: "bg-amber-50 text-amber-700",
    dotClass: "bg-amber-500",
    accuracy: 45,
    barClass: "bg-amber-600",
    action: "Review",
  },
  {
    icon: Zap,
    name: "Electrical Circuits",
    unit: "Unit 3: AC/DC Fundamentals",
    priority: "MED",
    priorityClass: "bg-amber-50 text-amber-700",
    dotClass: "bg-amber-500",
    accuracy: 52,
    barClass: "bg-amber-600",
    action: "Review",
  },
];

export default function DetailedAnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Performance Deep Dive
          </h1>
          <p className="mt-1 max-w-xl text-slate-500">
            Analyze your pacing, accuracy, and subject-specific metrics to
            optimize your study strategy for the SFT examination.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 hover:bg-blue-700">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pacing Analysis */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-1 flex items-start justify-between gap-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Timer className="h-5 w-5 text-slate-700" />
              Pacing Analysis
            </h2>
            <span className="whitespace-nowrap rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
              OPTIMAL RANGE: 1.5 - 2.5M
            </span>
          </div>
          <p className="mb-6 text-sm text-slate-500">
            Average time spent per question by paper type.
          </p>

          {/* Paper I */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">Paper I (MCQ)</span>
              <span className="text-sm text-slate-500">
                Avg: <span className="font-bold text-slate-900">1m 45s</span> / q
              </span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-slate-100">
              <div className="h-full w-[70%] rounded-full bg-blue-600" />
              <div className="absolute top-1/2 left-[55%] h-3.5 w-0.5 -translate-y-1/2 bg-slate-400" />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-slate-400">
              <span>Fast (Sub 1m)</span>
              <span className="font-semibold text-rose-500">Target: 2m</span>
              <span>Slow (3m+)</span>
            </div>
          </div>

          {/* Paper II */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">
                Paper II (Structured/Essay)
              </span>
              <span className="text-sm text-slate-500">
                Avg: <span className="font-bold text-slate-900">18m 20s</span> / q
              </span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-slate-100">
              <div className="h-full w-[80%] rounded-full bg-orange-700" />
              <div className="absolute top-1/2 left-[65%] h-3.5 w-0.5 -translate-y-1/2 bg-slate-400" />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-slate-400">
              <span>Fast</span>
              <span className="font-semibold text-rose-500">Target: 15m</span>
              <span>Slow</span>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl bg-rose-50/70 p-4">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
            <p className="text-sm leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-800">Observation:</span> You
              are pacing well on Paper I but spending ~20% longer than
              recommended on Paper II structured essays. Consider reviewing
              drafting techniques for Applied Mechanics sections.
            </p>
          </div>
        </div>

        {/* Error Typology */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-900">
            <ScanSearch className="h-5 w-5 text-slate-700" />
            Error Typology
          </h2>
          <p className="mb-8 text-sm text-slate-500">
            Concept vs. Calculation failures.
          </p>

          <div className="flex h-52 items-end justify-center gap-16">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-40 w-14 flex-col justify-end overflow-hidden rounded-lg bg-slate-100">
                <div className="h-[88%] w-full rounded-t-lg bg-blue-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Concept Accuracy
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-40 w-14 flex-col justify-end overflow-hidden rounded-lg bg-slate-100">
                <div className="h-[64%] w-full bg-blue-600" />
                <div className="h-[20%] w-full rounded-b-none bg-rose-600" />
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Calculation Accuracy
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-4 text-center text-sm text-slate-500">
            You lose the most marks due to{" "}
            <span className="font-semibold text-rose-600">calculation errors</span>,
            despite understanding the core concepts.
          </div>
        </div>
      </div>

      {/* Priority Focus Areas */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Target className="h-5 w-5 text-slate-700" />
              Priority Focus Areas
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Syllabus modules ranked by required intervention.
            </p>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View Syllabus Map
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="pb-3">Module</th>
              <th className="pb-3">Priority Level</th>
              <th className="pb-3">Overall Accuracy</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PRIORITY_MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <tr key={m.name}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{m.name}</p>
                        <p className="text-xs text-slate-400">{m.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${m.priorityClass}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${m.dotClass}`} />
                      {m.priority}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-bold ${
                          m.accuracy < 20 ? "text-rose-600" : "text-slate-700"
                        }`}
                      >
                        {m.accuracy}%
                      </span>
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${m.barClass}`}
                          style={{ width: `${m.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <button className="rounded-lg border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                      {m.action}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
