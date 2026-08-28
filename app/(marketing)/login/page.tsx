"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, FlaskConical } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // No auth backend yet — drop straight into the live SFT demo.
    router.push("/dashboard");
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm shadow-blue-600/30">
        <FlaskConical className="h-5 w-5" strokeWidth={2.25} />
      </div>

      <h1 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-slate-900">
        Welcome back
      </h1>
      <p className="mt-1.5 text-center text-sm text-slate-500">
        Log in to pick up your roadmap where you left off.
      </p>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_-16px_rgba(15,23,42,0.12)]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-xs font-semibold text-slate-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-semibold text-slate-600">
                Password
              </label>
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative mt-1.5">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Your password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Logging in…" : "Log in"}
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <p className="mt-5 text-center text-xs leading-relaxed text-slate-400">
          Account sync is still in development — this takes you straight
          into the live SFT dashboard for now.
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
          Sign up for free
        </Link>
      </p>
    </section>
  );
}
