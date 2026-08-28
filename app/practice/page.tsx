"use client";

import { useState } from "react";
import Link from "next/link";
import { FlaskConical, Clock, X, Shuffle, ArrowLeft, ArrowRight } from "lucide-react";

type QuestionStatus = "answered" | "current" | "unanswered";

const QUESTION_MAP: { id: number; status: QuestionStatus }[] = [
  { id: 1, status: "answered" },
  { id: 2, status: "answered" },
  { id: 3, status: "current" },
  { id: 4, status: "unanswered" },
  { id: 5, status: "unanswered" },
  { id: 6, status: "unanswered" },
  { id: 7, status: "unanswered" },
  { id: 8, status: "unanswered" },
  { id: 9, status: "unanswered" },
  { id: 10, status: "unanswered" },
];

const OPTIONS = [
  {
    id: "A",
    text: "The static frictional force is 25 N, and the block remains stationary.",
  },
  {
    id: "B",
    text: "The static frictional force reaches its maximum of 19.6 N, the block begins to move, and kinetic friction of 14.7 N acts on it while in motion.",
  },
  {
    id: "C",
    text: "The block does not move because the applied force is less than the weight of the block.",
  },
  {
    id: "D",
    text: "Kinetic friction of 19.6 N acts on the block immediately, keeping it at constant velocity.",
  },
];

function statusClasses(status: QuestionStatus) {
  switch (status) {
    case "answered":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "current":
      return "bg-blue-600 text-white shadow-sm shadow-blue-600/30";
    default:
      return "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50";
  }
}

export default function PracticeSimulatorPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>("B");

  const answeredCount = QUESTION_MAP.filter((q) => q.status === "answered").length;
  const unansweredCount = QUESTION_MAP.filter((q) => q.status === "unanswered").length;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="flex h-[68px] shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-extrabold text-blue-600">
          <FlaskConical className="h-5 w-5" strokeWidth={2.25} />
          BrainPath SFT
        </Link>
        <span className="h-5 w-px bg-slate-200" />
        <span className="text-sm font-medium text-slate-500">
          Physics Unit 2: Practice Set Alpha
        </span>
        <Link
          href="/dashboard"
          className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700"
        >
          <X className="h-4 w-4" />
          Exit Simulator
        </Link>
      </header>

      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-6 px-8 py-6 lg:grid-cols-[300px_1fr]">
        {/* Left Sidebar */}
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* Time Remaining */}
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-rose-500">
                <Clock className="h-3.5 w-3.5" />
                Time Remaining
              </p>
              <p className="font-mono text-3xl font-bold tabular-nums text-slate-900">
                00:59:42
              </p>
            </div>

            {/* Method Marks Tracker */}
            <div className="border-t border-slate-100 pt-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">Method Marks Tracker</p>
                <p className="text-sm font-bold text-blue-600">
                  4.5<span className="font-medium text-slate-400"> / 10 pts</span>
                </p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[45%] rounded-full bg-blue-600" />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Marks awarded for correct intermediate steps even if final answer
                is wrong.
              </p>
            </div>

            {/* Question Navigator */}
            <div className="border-t border-slate-100 pt-4">
              <p className="mb-3 text-sm font-semibold text-slate-800">
                Question Navigator
              </p>
              <div className="grid grid-cols-5 gap-2">
                {QUESTION_MAP.map((q) => (
                  <button
                    key={q.id}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-colors ${statusClasses(
                      q.status
                    )}`}
                  >
                    {q.id}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                  Answered ({answeredCount})
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-slate-300 bg-white" />
                  Unanswered ({unansweredCount})
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Shuffle className="h-3.5 w-3.5" />
                Tier 1: Force &amp; its Effects
              </span>
            </div>

            <h1 className="mb-4 text-2xl font-bold text-slate-900">Question 3</h1>

            <p className="mb-6 text-base leading-relaxed text-slate-700">
              A solid block of mass <span className="font-semibold">5.0 kg</span>{" "}
              rests on a rough horizontal laboratory bench. The coefficient of
              static friction between the block and the bench is{" "}
              <span className="font-semibold">0.4</span>, and the coefficient of
              kinetic friction is <span className="font-semibold">0.3</span>.
              (Assume <span className="italic">g</span> = 9.8 m/s
              <sup>2</sup>)
            </p>

            <p className="mb-6 text-base leading-relaxed text-slate-700">
              A student applies a constant horizontal force of{" "}
              <span className="font-semibold">25 N</span> to the block to the
              right. Determine the nature of the frictional force acting on the
              block and the subsequent state of motion of the block.
            </p>

            {/* Free body diagram */}
            <div className="mb-8 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-6">
              <svg viewBox="0 0 560 300" className="h-64 w-full max-w-lg">
                {/* surface */}
                <line x1="40" y1="220" x2="520" y2="220" stroke="#334155" strokeWidth="2" />
                {/* block */}
                <rect x="210" y="150" width="140" height="70" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
                <text x="280" y="192" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">
                  5.0 kg
                </text>

                {/* Normal force up */}
                <line x1="280" y1="150" x2="280" y2="70" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="280" y="55" textAnchor="middle" fontSize="14" fontWeight="600" fill="#0f172a">
                  Normal Force (N)
                </text>

                {/* Weight down */}
                <line x1="280" y1="220" x2="280" y2="285" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="280" y="300" textAnchor="middle" fontSize="14" fontWeight="600" fill="#0f172a">
                  Weight (W = mg)
                </text>

                {/* Applied force right */}
                <line x1="350" y1="185" x2="430" y2="185" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="440" y="180" fontSize="14" fontWeight="600" fill="#0f172a">
                  25 N
                </text>
                <text x="440" y="198" fontSize="14" fontWeight="600" fill="#0f172a">
                  Applied Force
                </text>

                {/* Friction left */}
                <line x1="210" y1="220" x2="130" y2="220" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="120" y="215" textAnchor="end" fontSize="14" fontWeight="600" fill="#0f172a">
                  Friction
                </text>

                <text x="450" y="238" fontSize="13" fill="#475569">
                  Rough Horizontal Surface
                </text>

                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#0f172a" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {OPTIONS.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/60 ring-1 ring-blue-500"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        isSelected ? "border-blue-600" : "border-slate-300"
                      }`}
                    >
                      {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                    </span>
                    <span
                      className={`text-sm leading-relaxed sm:text-base ${
                        isSelected ? "font-medium text-slate-900" : "text-slate-600"
                      }`}
                    >
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800">
              <ArrowLeft className="h-4 w-4" />
              Previous Question
            </button>

            <div className="flex items-center gap-3">
              <button className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800">
                Skip for now
              </button>
              <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 hover:bg-blue-700">
                Save &amp; Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
