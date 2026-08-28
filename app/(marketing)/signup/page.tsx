"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, FlaskConical, ShieldCheck, Zap, Route } from "lucide-react";

const PERKS = [
  { icon: Route, text: "A roadmap sequenced by exam priority weight" },
  { icon: Zap, text: "Timed practice that mirrors real exam pressure" },
  { icon: ShieldCheck, text: "Free while the Technology stream is in beta" },
];

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Accounts aren't wired up to a backend yet — this drops straight into
    // the live SFT demo so the flow can be reviewed end to end.
    router.push("/dashboard");
  }

  return (
    <section className="mx-auto flex max-w-6xl flex-col-reverse gap-0 px-6 py-12 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
      {/* Left: perks */}
      <div className="mt-10 flex-1 lg:mt-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm shadow-blue-600/30">
          <FlaskConical className="h-5 w-5" strokeWidth={2.25} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          One account,
          <br />
          every A/L stream.
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-500">
          Start with the live Science for Technology roadmap. Your account
          carries over as we open the rest of the streams.
        </p>

        <ul className="mt-8 space-y-4">
          {PERKS.map((perk) => (
            <li key={perk.text} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <perk.icon className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <span className="text-sm font-medium text-slate-600">{perk.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: form */}
      <div className="flex-1">
        <div className="mx-auto w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_-16px_rgba(15,23,42,0.12)]">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Create your account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Free — no card required.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="text-xs font-semibold text-slate-600">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Nimal Perera"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
              />
            </div>

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
              <label htmlFor="password" className="text-xs font-semibold text-slate-600">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
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
              {submitting ? "Setting up your account…" : "Create account"}
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-5 text-center text-xs leading-relaxed text-slate-400">
            Account sync is still in development — this takes you straight
            into the live SFT dashboard for now.
          </p>

          <p className="mt-4 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
