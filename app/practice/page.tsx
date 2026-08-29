"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, X, Shuffle, ArrowLeft, ArrowRight } from "lucide-react";
import { LOGO_URL } from "@/lib/brand";

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
      return "bg-[#0071e3]/[0.08] text-[#0071e3] border border-[#0071e3]/20";
    case "current":
      return "bg-[#0071e3] text-white";
    default:
      return "border border-black/10 bg-white text-[#1d1d1f]/50 hover:bg-black/[0.03]";
  }
}

export default function PracticeSimulatorPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>("B");

  const answeredCount = QUESTION_MAP.filter((q) => q.status === "answered").length;
  const unansweredCount = QUESTION_MAP.filter((q) => q.status === "unanswered").length;

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      {/* Header */}
      <header className="flex h-[60px] shrink-0 items-center gap-3 border-b border-black/[0.06] bg-white/80 px-4 backdrop-blur-xl sm:h-[64px] sm:gap-4 sm:px-8">
        <Link href="/dashboard" className="flex shrink-0 items-center">
          <div className="relative h-8 w-8 shrink-0 sm:h-9 sm:w-9">
            <Image src={LOGO_URL} alt="BrainPath" fill className="object-contain" sizes="36px" />
          </div>
        </Link>
        <span className="hidden h-4 w-px bg-black/10 sm:block" />
        <span className="hidden truncate text-[13px] font-medium text-[#1d1d1f]/50 sm:block">
          Physics Unit 2: Practice Set Alpha
        </span>
        <Link
          href="/dashboard"
          className="ml-auto flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-rose-500 hover:text-rose-600"
        >
          <X className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Exit Simulator</span>
        </Link>
      </header>

      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-[300px_1fr] lg:px-8">
        {/* Left Sidebar */}
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <div className="space-y-5 rounded-2xl border border-black/[0.06] bg-white p-5">
            {/* Time Remaining */}
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-rose-500">
                <Clock className="h-3.5 w-3.5" />
                Time Remaining
              </p>
              <p className="font-mono text-3xl font-semibold tabular-nums text-[#1d1d1f]">
                00:59:42
              </p>
            </div>

            {/* Method Marks Tracker */}
            <div className="border-t border-black/[0.06] pt-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[13px] font-medium text-[#1d1d1f]">Method Marks Tracker</p>
                <p className="text-[13px] font-semibold text-[#0071e3]">
                  4.5<span className="font-normal text-[#1d1d1f]/40"> / 10 pts</span>
                </p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
                <div className="h-full w-[45%] rounded-full bg-[#0071e3]" />
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-[#1d1d1f]/40">
                Marks awarded for correct intermediate steps even if final answer
                is wrong.
              </p>
            </div>

            {/* Question Navigator */}
            <div className="border-t border-black/[0.06] pt-4">
              <p className="mb-3 text-[13px] font-medium text-[#1d1d1f]">
                Question Navigator
              </p>
              <div className="grid grid-cols-5 gap-2">
                {QUESTION_MAP.map((q) => (
                  <button
                    key={q.id}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-[12px] font-semibold transition-colors ${statusClasses(
                      q.status
                    )}`}
                  >
                    {q.id}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-[#1d1d1f]/50">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0071e3]" />
                  Answered ({answeredCount})
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-black/15 bg-white" />
                  Unanswered ({unansweredCount})
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0071e3]/[0.08] px-3 py-1 text-[11px] font-medium text-[#0071e3]">
                <Shuffle className="h-3.5 w-3.5" strokeWidth={1.75} />
                Tier 1: Force &amp; its Effects
              </span>
            </div>

            <h1 className="mb-4 text-2xl font-semibold tracking-tight text-[#1d1d1f]">Question 3</h1>

            <p className="mb-6 text-[15px] leading-relaxed text-[#1d1d1f]/75">
              A solid block of mass <span className="font-semibold text-[#1d1d1f]">5.0 kg</span>{" "}
              rests on a rough horizontal laboratory bench. The coefficient of
              static friction between the block and the bench is{" "}
              <span className="font-semibold text-[#1d1d1f]">0.4</span>, and the coefficient of
              kinetic friction is <span className="font-semibold text-[#1d1d1f]">0.3</span>.
              (Assume <span className="italic">g</span> = 9.8 m/s
              <sup>2</sup>)
            </p>

            <p className="mb-6 text-[15px] leading-relaxed text-[#1d1d1f]/75">
              A student applies a constant horizontal force of{" "}
              <span className="font-semibold text-[#1d1d1f]">25 N</span> to the block to the
              right. Determine the nature of the frictional force acting on the
              block and the subsequent state of motion of the block.
            </p>

            {/* Free body diagram */}
            <div className="mb-8 flex items-center justify-center rounded-xl border border-black/[0.06] bg-[#fafafa] p-6">
              <svg viewBox="0 0 560 300" className="h-64 w-full max-w-lg">
                {/* surface */}
                <line x1="40" y1="220" x2="520" y2="220" stroke="#1d1d1f" strokeWidth="2" />
                {/* block */}
                <rect x="210" y="150" width="140" height="70" fill="#eef0f2" stroke="#1d1d1f" strokeWidth="1.5" />
                <text x="280" y="192" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1d1d1f">
                  5.0 kg
                </text>

                {/* Normal force up */}
                <line x1="280" y1="150" x2="280" y2="70" stroke="#1d1d1f" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="280" y="55" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1d1d1f">
                  Normal Force (N)
                </text>

                {/* Weight down */}
                <line x1="280" y1="220" x2="280" y2="285" stroke="#1d1d1f" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="280" y="300" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1d1d1f">
                  Weight (W = mg)
                </text>

                {/* Applied force right */}
                <line x1="350" y1="185" x2="430" y2="185" stroke="#0071e3" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
                <text x="440" y="180" fontSize="14" fontWeight="600" fill="#0071e3">
                  25 N
                </text>
                <text x="440" y="198" fontSize="14" fontWeight="600" fill="#0071e3">
                  Applied Force
                </text>

                {/* Friction left */}
                <line x1="210" y1="220" x2="130" y2="220" stroke="#1d1d1f" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="120" y="215" textAnchor="end" fontSize="14" fontWeight="600" fill="#1d1d1f">
                  Friction
                </text>

                <text x="450" y="238" fontSize="13" fill="#1d1d1f" opacity="0.5">
                  Rough Horizontal Surface
                </text>

                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#1d1d1f" />
                  </marker>
                  <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#0071e3" />
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
                        ? "border-[#0071e3]/40 bg-[#0071e3]/[0.05] ring-1 ring-[#0071e3]/30"
                        : "border-black/[0.08] bg-white hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.02]"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        isSelected ? "border-[#0071e3]" : "border-black/15"
                      }`}
                    >
                      {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-[#0071e3]" />}
                    </span>
                    <span
                      className={`text-[13.5px] leading-relaxed sm:text-[14.5px] ${
                        isSelected ? "font-medium text-[#1d1d1f]" : "text-[#1d1d1f]/65"
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
          <div className="flex flex-col gap-4 rounded-2xl border border-black/[0.06] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#1d1d1f]/50 hover:text-[#1d1d1f]">
              <ArrowLeft className="h-4 w-4" />
              Previous Question
            </button>

            <div className="flex items-center gap-3">
              <button className="rounded-full px-4 py-2.5 text-[13px] font-medium text-[#1d1d1f]/50 hover:text-[#1d1d1f]">
                Skip for now
              </button>
              <button className="flex items-center gap-1.5 rounded-full bg-[#0071e3] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#0077ed]">
                Save &amp; Next
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
