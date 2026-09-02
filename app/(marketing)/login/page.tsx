"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { LOGO_URL } from "@/lib/brand";
import { loginAction, type AuthFormState } from "@/app/actions/auth";
import GoogleButton from "@/components/GoogleButton";

const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
  google_not_configured: "Google sign-in isn't set up yet — use email and password for now.",
  google_state_mismatch: "That Google sign-in request expired. Please try again.",
  google_token_exchange_failed: "We couldn't verify that with Google. Please try again.",
  google_userinfo_failed: "We couldn't verify that with Google. Please try again.",
  google_no_email: "Your Google account needs a verified email to sign in.",
};

function LoginForm() {
  const searchParams = useSearchParams();
  const googleError = searchParams.get("error");
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    loginAction,
    undefined
  );

  return (
    <section className="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-md flex-col justify-center px-5 py-10 sm:min-h-[70vh] sm:px-6 sm:py-16">
      <div className="mx-auto flex flex-col items-center animate-fade-up">
        <div className="relative h-24 w-24 sm:h-28 sm:w-28">
          <Image src={LOGO_URL} alt="BrainPath" fill className="object-contain" sizes="112px" priority />
        </div>

        <h1 className="mt-3 text-center text-[26px] font-semibold tracking-tightest text-[#1d1d1f] sm:mt-4 sm:text-[32px]">
          Welcome back.
        </h1>
        <p className="mt-1.5 max-w-xs text-center text-[14px] leading-snug text-[#1d1d1f]/55 sm:text-[15px]">
          Log in to pick up your roadmap where you left off.
        </p>
      </div>

      <div
        className="mt-7 rounded-[1.5rem] border border-black/[0.06] bg-white p-5 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.08)] animate-fade-up sm:mt-8 sm:rounded-[1.75rem] sm:p-8"
        style={{ animationDelay: "0.05s" }}
      >
        <GoogleButton />

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/[0.06]" />
          <span className="text-[12px] font-medium text-[#1d1d1f]/35">or</span>
          <div className="h-px flex-1 bg-black/[0.06]" />
        </div>

        {(state?.error || googleError) && (
          <p className="mb-4 rounded-xl bg-rose-50 px-3.5 py-2.5 text-[13px] font-medium text-rose-600">
            {state?.error ?? GOOGLE_ERROR_MESSAGES[googleError ?? ""] ?? "Something went wrong. Please try again."}
          </p>
        )}

        <form action={formAction} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-[13px] font-medium text-[#1d1d1f]/60">
                Password
              </label>
              <button
                type="button"
                className="text-[13px] font-medium text-[#0071e3] hover:text-[#0077ed]"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative mt-1.5">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Your password"
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
            {pending ? "Logging in…" : "Log in"}
            {!pending && <ArrowRight className="h-4 w-4" strokeWidth={2} />}
          </button>
        </form>
      </div>

      <p
        className="mt-6 text-center text-[14px] text-[#1d1d1f]/55 animate-fade-up"
        style={{ animationDelay: "0.1s" }}
      >
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-[#0071e3] hover:text-[#0077ed]">
          Sign up for free
        </Link>
      </p>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
