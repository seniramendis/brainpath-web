"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState, useState } from "react";
import { ArrowRight, Eye, EyeOff, ShieldCheck, Zap, Route } from "lucide-react";
import { LOGO_URL } from "@/lib/brand";
import { signupAction, type AuthFormState } from "@/app/actions/auth";
import GoogleButton from "@/components/GoogleButton";

const PERKS = [
  { icon: Route, text: "A roadmap sequenced by exam priority weight" },
  { icon: Zap, text: "Timed practice that mirrors real exam pressure" },
  { icon: ShieldCheck, text: "Free while the Technology stream is in beta" },
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    signupAction,
    undefined
  );

  return (
    <section className="mx-auto flex max-w-6xl flex-col px-5 py-8 sm:px-6 sm:py-12 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
      {/* Left: perks — full marketing panel, desktop only */}
      <div className="hidden flex-1 lg:block animate-fade-up">
        <div className="relative h-24 w-24">
          <Image src={LOGO_URL} alt="BrainPath" fill className="object-contain" sizes="96px" priority />
        </div>
        <h1 className="mt-6 text-left text-4xl font-semibold tracking-tightest text-[#1d1d1f]">
          One account,
          <br />
          every A/L stream.
        </h1>
        <p className="mt-4 max-w-sm text-left text-[15px] leading-relaxed text-[#1d1d1f]/55">
          Start with the live Science for Technology roadmap. Your account
          carries over as we open the rest of the streams.
        </p>

        <ul className="mt-8 max-w-sm space-y-4">
          {PERKS.map((perk) => (
            <li key={perk.text} className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0071e3]/[0.08] text-[#0071e3]">
                <perk.icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="pt-1.5 text-[13.5px] font-medium leading-snug text-[#1d1d1f]/70">
                {perk.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Compact header — mobile/tablet only */}
      <div className="mx-auto flex flex-col items-center lg:hidden animate-fade-up">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24">
          <Image src={LOGO_URL} alt="BrainPath" fill className="object-contain" sizes="96px" priority />
        </div>
        <h1 className="mt-4 text-center text-[26px] font-semibold tracking-tightest text-[#1d1d1f] sm:mt-5 sm:text-[30px]">
          One account,
          <br />
          every A/L stream.
        </h1>
        <p className="mx-auto mt-2.5 max-w-xs text-center text-[14px] leading-snug text-[#1d1d1f]/55 sm:max-w-sm sm:text-[15px]">
          Start with the live SFT roadmap — free, no card required.
        </p>
      </div>

      {/* Right: form */}
      <div
        className="mt-7 flex-1 animate-fade-up sm:mt-8 lg:mt-0"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="mx-auto w-full max-w-sm rounded-[1.5rem] border border-black/[0.06] bg-white p-5 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.08)] sm:rounded-[1.75rem] sm:p-8">
          <h2 className="text-[19px] font-semibold tracking-tight text-[#1d1d1f]">
            Create your account
          </h2>
          <p className="mt-1 text-[14px] text-[#1d1d1f]/50">
            Free — no card required.
          </p>

          <div className="mt-5">
            <GoogleButton />
          </div>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-black/[0.06]" />
            <span className="text-[12px] font-medium text-[#1d1d1f]/35">or</span>
            <div className="h-px flex-1 bg-black/[0.06]" />
          </div>

          {state?.error && (
            <p className="mb-4 rounded-xl bg-rose-50 px-3.5 py-2.5 text-[13px] font-medium text-rose-600">
              {state.error}
            </p>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-[13px] font-medium text-[#1d1d1f]/60">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Nimal Perera"
                className="mt-1.5 w-full rounded-xl border border-transparent bg-black/[0.04] px-4 py-3 text-[15px] text-[#1d1d1f] outline-none transition-colors placeholder:text-[#1d1d1f]/35 focus:border-[#0071e3]/30 focus:bg-white focus:ring-4 focus:ring-[#0071e3]/[0.08]"
              />
              {state?.fieldErrors?.name && (
                <p className="mt-1 text-[12px] text-rose-500">{state.fieldErrors.name[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-[13px] font-medium text-[#1d1d1f]/60">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-transparent bg-black/[0.04] px-4 py-3 text-[15px] text-[#1d1d1f] outline-none transition-colors placeholder:text-[#1d1d1f]/35 focus:border-[#0071e3]/30 focus:bg-white focus:ring-4 focus:ring-[#0071e3]/[0.08]"
              />
              {state?.fieldErrors?.email && (
                <p className="mt-1 text-[12px] text-rose-500">{state.fieldErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-[13px] font-medium text-[#1d1d1f]/60">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-transparent bg-black/[0.04] px-4 py-3 pr-11 text-[15px] text-[#1d1d1f] outline-none transition-colors placeholder:text-[#1d1d1f]/35 focus:border-[#0071e3]/30 focus:bg-white focus:ring-4 focus:ring-[#0071e3]/[0.08]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1d1d1f]/35 hover:text-[#1d1d1f]/60"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                  ) : (
                    <Eye className="h-4 w-4" strokeWidth={1.75} />
                  )}
                </button>
              </div>
              {state?.fieldErrors?.password && (
                <p className="mt-1 text-[12px] text-rose-500">{state.fieldErrors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0071e3] px-4 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-[#0077ed] disabled:opacity-60"
            >
              {pending ? "Setting up your account…" : "Create account"}
              {!pending && <ArrowRight className="h-4 w-4" strokeWidth={2} />}
            </button>
          </form>

          <p className="mt-4 text-center text-[14px] text-[#1d1d1f]/55">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#0071e3] hover:text-[#0077ed]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
