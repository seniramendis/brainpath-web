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
    badgeClass: "bg-rose-50 text-rose-600",
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
    badgeClass: "bg-amber-50 text-amber-600",
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
    badgeClass: "bg-emerald-50 text-emerald-600",
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
    barColor: "bg-[#0071e3]",
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between animate-fade-up">
        <div>
          <h1 className="text-3xl font-semibold tracking-tightest text-[#1d1d1f] sm:text-4xl">
            Analytics Overview
          </h1>
          <p className="mt-1.5 text-[15px] text-[#1d1d1f]/55">
            Track your G.C.E. A/L SFT readiness across all modules.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-[13px] font-medium text-[#1d1d1f] hover:bg-black/[0.03]">
            <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
            Last 30 Days
          </button>
          <button className="rounded-full bg-[#0071e3] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#0077ed]">
            Generate Report
          </button>
        </div>
      </div>

      {/* Weighted Exam Readiness */}
      <div
        className="rounded-2xl border border-black/[0.06] bg-white p-8 animate-fade-up"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0071e3]/[0.08] px-3 py-1 text-[11px] font-medium text-[#0071e3]">
              <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.75} />
              Performance Metric
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tightest text-[#1d1d1f] sm:text-4xl">
              Weighted Exam Readiness
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#1d1d1f]/55">
              Based on your recent model papers, quizzes, and historical data,
              you are currently on track for a high-tier grade.
            </p>
            <div className="mt-6 flex gap-10">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-[#1d1d1f]/35">
                  Target Goal
                </p>
                <p className="text-xl font-semibold text-[#1d1d1f]">85%</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-[#1d1d1f]/35">
                  Proj. Grade
                </p>
                <p className="text-xl font-semibold text-[#0071e3]">A-</p>
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
                stroke="#f0f0f2"
                strokeWidth="16"
              />
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="#0071e3"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - 0.72)}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-semibold tracking-tightest text-[#1d1d1f]">
                72<span className="text-2xl align-top">%</span>
              </span>
              <span className="mt-1 text-[13px] font-medium text-[#1d1d1f]/40">
                Readiness Score
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Risk Assessment */}
      <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight text-[#1d1d1f]">
          <AlertTriangle className="h-[18px] w-[18px] text-[#1d1d1f]/60" strokeWidth={1.75} />
          Syllabus Risk Assessment
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {RISK_TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.tier}
                className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white"
              >
                <div className={`h-1 w-full ${tier.barColor}`} />
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${tier.badgeClass}`}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {tier.tier}
                    </span>
                    <span className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
                      {tier.pct}
                    </span>
                  </div>
                  <p className="mb-5 text-[13.5px] leading-relaxed text-[#1d1d1f]/55">
                    {tier.description}
                  </p>
                  <div className="rounded-xl bg-[#fafafa] p-4">
                    <p className="mb-2 text-[11px] font-medium text-[#1d1d1f]/45">
                      {tier.listLabel}
                    </p>
                    <ul className="space-y-1.5">
                      {tier.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-[13px] font-medium text-[#1d1d1f]/80"
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
      <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight text-[#1d1d1f]">
          <History className="h-[18px] w-[18px] text-[#1d1d1f]/60" strokeWidth={1.75} />
          Recent Activity
        </h2>
        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#fafafa] text-[11px] font-medium uppercase tracking-wide text-[#1d1d1f]/40">
                <th className="px-6 py-3.5">Assessment Name</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Score</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05]">
              {ACTIVITY.map((row) => {
                const Icon = row.icon;
                return (
                  <tr key={row.name}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0071e3]/[0.08] text-[#0071e3]">
                          <Icon className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        <span className="text-[13.5px] font-medium text-[#1d1d1f]">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#1d1d1f]/50">{row.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] font-semibold text-[#1d1d1f]">
                          {row.score}%
                        </span>
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-black/[0.06]">
                          <div
                            className={`h-full rounded-full ${row.barColor}`}
                            style={{ width: `${row.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-1 rounded-full border border-black/10 px-3 py-1.5 text-[12px] font-medium text-[#1d1d1f] hover:bg-black/[0.03]">
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
