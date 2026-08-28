import {
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  History,
  ChevronRight,
  ClipboardList,
  BookOpenCheck,
  FileText,
} from "lucide-react";

const RISK_TIERS = [
  {
    tier: "Tier 1: Severe Risk",
    barColor: "bg-rose-500",
    badgeClass: "bg-rose-50 text-rose-700",
    icon: AlertTriangle,
    pct: "8%",
    description:
      "Critical knowledge gaps identified. Requires immediate intervention.",
    listLabel: "Focus Areas:",
    dotColor: "bg-rose-500",
    items: ["Fluid Mechanics", "AC Circuits"],
  },
  {
    tier: "Tier 2: Moderate Risk",
    barColor: "bg-amber-500",
    badgeClass: "bg-amber-50 text-amber-700",
    icon: ChevronRight,
    pct: "45%",
    description:
      "Solid foundational understanding, but struggles with complex applications.",
    listLabel: "Focus Areas:",
    dotColor: "bg-amber-500",
    items: ["Thermodynamics", "Electronics"],
  },
  {
    tier: "Tier 3: Low Risk",
    barColor: "bg-emerald-500",
    badgeClass: "bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
    pct: "88%",
    description: "High mastery achieved. Ready for exam-level evaluation.",
    listLabel: "Strong Areas:",
    dotColor: "bg-emerald-500",
    items: ["IT Foundations", "Basic Mechanics"],
  },
];

const ACTIVITY = [
  {
    icon: ClipboardList,
    name: "SFT Model Paper 01",
    date: "Today, 10:30 AM",
    score: 76,
    barColor: "bg-blue-600",
  },
  {
    icon: BookOpenCheck,
    name: "Unit 4 Quiz",
    date: "Yesterday, 2:15 PM",
    score: 92,
    barColor: "bg-emerald-500",
  },
  {
    icon: FileText,
    name: "Past Paper 2022",
    date: "Oct 24, 2023",
    score: 64,
    barColor: "bg-amber-500",
  },
];

export default function AnalyticsOverviewPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Analytics Overview
          </h1>
          <p className="mt-1 text-slate-500">
            Track your G.C.E. A/L SFT readiness across all modules.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      {/* Weighted Exam Readiness */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <TrendingUp className="h-3.5 w-3.5" />
              Performance Metric
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Weighted Exam Readiness
            </h2>
            <p className="mt-3 text-slate-500">
              Based on your recent model papers, quizzes, and historical data,
              you are currently on track for a high-tier grade.
            </p>
            <div className="mt-6 flex gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Target Goal
                </p>
                <p className="text-xl font-bold text-slate-900">85%</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Proj. Grade
                </p>
                <p className="text-xl font-bold text-blue-600">A-</p>
              </div>
            </div>
          </div>

          {/* Circular progress */}
          <div className="relative flex h-56 w-56 shrink-0 items-center justify-center">
            <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="16"
              />
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="#2563eb"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - 0.72)}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-extrabold text-slate-900">
                72<span className="text-2xl align-top">%</span>
              </span>
              <span className="mt-1 text-sm font-medium text-slate-400">
                Readiness Score
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Risk Assessment */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
          <AlertTriangle className="h-5 w-5 text-slate-700" />
          Syllabus Risk Assessment
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {RISK_TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.tier}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className={`h-1.5 w-full ${tier.barColor}`} />
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tier.badgeClass}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {tier.tier}
                    </span>
                    <span className="text-xl font-extrabold text-slate-900">
                      {tier.pct}
                    </span>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-slate-500">
                    {tier.description}
                  </p>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="mb-2 text-xs font-semibold text-slate-500">
                      {tier.listLabel}
                    </p>
                    <ul className="space-y-1.5">
                      {tier.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm font-medium text-slate-700"
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${tier.dotColor}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
          <History className="h-5 w-5 text-slate-700" />
          Recent Activity
        </h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-3.5">Assessment Name</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Score</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ACTIVITY.map((row) => {
                const Icon = row.icon;
                return (
                  <tr key={row.name}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-slate-800">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-900">
                          {row.score}%
                        </span>
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${row.barColor}`}
                            style={{ width: `${row.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                        Review
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
