"use client";

import React, { useState } from "react";

type QuestionStatus = "correct" | "incorrect" | "unattempted" | "current";

interface QuestionMapItem {
  id: number;
  status: QuestionStatus;
}

const QUESTION_MAP: QuestionMapItem[] = [
  { id: 1, status: "correct" },
  { id: 2, status: "correct" },
  { id: 3, status: "incorrect" },
  { id: 4, status: "current" },
  { id: 5, status: "unattempted" },
  { id: 6, status: "unattempted" },
  { id: 7, status: "correct" },
  { id: 8, status: "unattempted" },
  { id: 9, status: "incorrect" },
  { id: 10, status: "unattempted" },
];

const OPTIONS = [
  {
    id: "A",
    text: "It lacks a true, membrane-bound nucleus and contains a single circular chromosome.",
  },
  {
    id: "B",
    text: "It possesses membrane-bound organelles including mitochondria and a Golgi apparatus.",
  },
  {
    id: "C",
    text: "Its genetic material is enclosed within a double-membraned nuclear envelope.",
  },
  {
    id: "D",
    text: "It contains a well-developed endoplasmic reticulum for protein synthesis.",
  },
];

function statusStyles(status: QuestionStatus) {
  switch (status) {
    case "correct":
      return "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30";
    case "incorrect":
      return "bg-rose-500 text-white shadow-sm shadow-rose-500/30";
    case "current":
      return "bg-blue-600 text-white ring-4 ring-blue-100";
    default:
      return "bg-slate-100 text-slate-500 hover:bg-slate-200";
  }
}

export default function TimedPracticePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showMethodMarks, setShowMethodMarks] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(4);

  const methodMarksEarned = 14;
  const methodMarksTotal = 20;
  const methodMarksPct = Math.round((methodMarksEarned / methodMarksTotal) * 100);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      {/* ---------------------------------------------------------- */}
      {/* Left Sidebar */}
      {/* ---------------------------------------------------------- */}
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="space-y-5 rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] backdrop-blur">
          {/* Paper label */}
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Paper I &middot; Tier 1
            </span>
            <span className="text-xs font-medium text-slate-400">MCQ Set 04</span>
          </div>

          {/* Countdown Timer */}
          <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-center shadow-inner">
            <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-slate-300">
              Time Remaining
            </p>
            <p className="font-mono text-4xl font-bold tabular-nums text-white">
              01:00:00
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-blue-400" />
            </div>
          </div>

          {/* Method Marks Score Tracker */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Method Marks
              </p>
              <p className="text-sm font-bold text-slate-900">
                {methodMarksEarned}
                <span className="font-medium text-slate-400">/{methodMarksTotal}</span>
              </p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${methodMarksPct}%` }}
              />
            </div>
            <p className="mt-2 text-right text-[11px] font-medium text-slate-400">
              {methodMarksPct}% partial credit captured
            </p>
          </div>

          {/* Question Map */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Question Map
            </p>
            <div className="grid grid-cols-5 gap-2.5">
              {QUESTION_MAP.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(q.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 ${statusStyles(
                    q.id === currentQuestion ? "current" : q.status
                  )}`}
                >
                  {q.id}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Correct
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Incorrect
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" /> Unattempted
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------------------------------------------------------- */}
      {/* Right Main Area */}
      {/* ---------------------------------------------------------- */}
      <div className="flex flex-col gap-6">
        {/* Question Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-slate-900 px-3 py-1 text-sm font-bold text-white">
                Q{currentQuestion}
              </span>
              <span className="text-sm font-medium text-slate-400">of 10</span>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              Cellular Organization
            </span>
          </div>

          <h2 className="mb-6 text-lg font-semibold leading-relaxed text-slate-900 sm:text-xl">
            The diagram below shows a cell observed under an electron
            microscope during a laboratory practical. Which of the following
            best describes a key structural feature of a{" "}
            <span className="italic">prokaryotic</span> cell, as illustrated?
          </h2>

          {/* Diagram Placeholder */}
          <div className="mb-8 flex h-56 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M3.75 8.25h16.5M3.75 8.25a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 3.75 3h16.5a2.25 2.25 0 0 1 2.25 2.25v.75a2.25 2.25 0 0 1-2.25 2.25M3.75 8.25v8.25a2.25 2.25 0 0 0 2.25 2.25h12a2.25 2.25 0 0 0 2.25-2.25V8.25"
              />
            </svg>
            <p className="text-sm font-medium">Diagram / Equation Placeholder</p>
            <p className="text-xs text-slate-300">Figure 4.2 &mdash; Cell Structure</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {OPTIONS.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/70 shadow-md shadow-blue-500/10 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-md"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors duration-200 ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700"
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span
                    className={`pt-1 text-sm leading-relaxed sm:text-base ${
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
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] sm:flex-row sm:items-center sm:justify-between">
          {/* Method Marks Toggle */}
          <label className="flex cursor-pointer items-center gap-3 select-none">
            <button
              type="button"
              role="switch"
              aria-checked={showMethodMarks}
              onClick={() => setShowMethodMarks((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                showMethodMarks ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  showMethodMarks ? "translate-x-[22px]" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-slate-600">
              Show Method Marks Grading
            </span>
          </label>

          {/* Navigation + Submit */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentQuestion((q) => Math.max(1, q - 1))}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={currentQuestion === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentQuestion((q) => Math.min(10, q + 1))}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={currentQuestion === 10}
            >
              Next
            </button>
            <button className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]">
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}