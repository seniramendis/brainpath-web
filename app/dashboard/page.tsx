import React from 'react';

export default function DashboardPage() {
  // Mock data for the initial UI build
  const readinessScore = 42; // Out of 100
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back!</h1>
        <p className="text-slate-500 mt-1">Here is your SFT exam readiness breakdown.</p>
      </div>

      {/* Primary KPI: Weighted Readiness Score */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Weighted Exam Readiness</h2>
          <span className="text-2xl font-bold text-blue-600">{readinessScore}%</span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
          <div 
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${readinessScore}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-slate-500">
          This score is weighted against the official syllabus module percentages.
        </p>
      </div>

      {/* Priority Risk Rings / Tier Breakdown */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Tier 1 Card */}
        <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-red-900">Tier 1: High Priority</h3>
            <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
              Severe Risk
            </span>
          </div>
          <p className="mb-4 text-sm text-red-700">
            Compulsory Part A topics like Cellular Organization (8.33%) and Force & its Effects[cite: 1].
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-red-200">
            <div className="h-full w-1/4 rounded-full bg-red-600" />
          </div>
          <p className="mt-2 text-right text-xs font-medium text-red-700">25% Mastered</p>
        </div>

        {/* Tier 2 Card */}
        <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-amber-900">Tier 2: Core Build</h3>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
              Moderate Risk[cite: 1]
            </span>
          </div>
          <p className="mb-4 text-sm text-amber-700">
            High-value Part B/C/D topics like Descriptive Statistics (7.50%) and Heat[cite: 1].
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-amber-200">
            <div className="h-full w-1/2 rounded-full bg-amber-500" />
          </div>
          <p className="mt-2 text-right text-xs font-medium text-amber-700">50% Mastered</p>
        </div>

        {/* Tier 3 Card */}
        <div className="rounded-xl border border-green-100 bg-green-50/50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-green-900">Tier 3: Fill-In</h3>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
              Low Risk[cite: 1]
            </span>
          </div>
          <p className="mb-4 text-sm text-green-700">
            Smaller syllabus modules like Area & Volume and Pythagoras Relationship[cite: 1].
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-green-200">
            <div className="h-full w-3/4 rounded-full bg-green-600" />
          </div>
          <p className="mt-2 text-right text-xs font-medium text-green-700">75% Mastered</p>
        </div>

      </div>
    </div>
  );
}