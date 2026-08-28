import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { STREAMS } from "@/lib/streams";

export default function LandingPage() {
  const totalSubjects = STREAMS.reduce((n, s) => n + s.subjects.length, 0);
  const liveStreams = STREAMS.filter((s) => s.subjects.some((sub) => sub.status === "live"));

  return (
    <>
      {/* Hero — sells the platform, not any one subject (that's the dashboard's job) */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50/60 via-white to-white">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-20 text-center sm:pt-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            {liveStreams.length === 1 ? "1 stream live" : `${liveStreams.length} streams live`} · {STREAMS.length - liveStreams.length} in preview
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            One roadmap. <span className="text-blue-600">Every A/L stream.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Sri Lanka has five G.C.E. A/L streams. BrainPath is building a
            weighted, exam-blueprint roadmap for each one — starting with
            Science for Technology.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#streams"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition-colors hover:bg-blue-700"
            >
              Find your stream
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Create free account
            </Link>
          </div>
        </div>
      </section>

      {/* Streams — the single decision point on this page */}
      <section id="streams" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Choose your stream
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500">
            {totalSubjects} subjects across 5 streams. Tap a stream to see its
            subjects.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STREAMS.map((stream) => {
            const liveCount = stream.subjects.filter((s) => s.status === "live").length;
            const isOpen = liveCount > 0;
            return (
              <Link
                key={stream.slug}
                href={`/streams/${stream.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_-16px_rgba(15,23,42,0.1)] transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_40px_-16px_rgba(15,23,42,0.16)]"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${stream.accent} text-white shadow-sm`}
                >
                  <stream.icon className="h-5 w-5" strokeWidth={2.25} />
                </div>

                <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-900">
                  {stream.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {stream.tagline}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-medium text-slate-400">
                    {stream.subjects.length} subjects
                    {isOpen ? `, ${liveCount} live` : ""}
                  </span>
                  {isOpen ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Open now
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                      <Lock className="h-3 w-3" />
                      Preview
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* CTA tile fills the 6th grid slot */}
          <div className="flex flex-col justify-between rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-7">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">
                Not sure which stream is yours?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Create an account and every stream stays in one place as we
                open it.
              </p>
            </div>
            <Link
              href="/signup"
              className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Get started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="overflow-hidden rounded-3xl bg-slate-900 px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Start with Science for Technology today
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-300">
            It&apos;s the only stream that&apos;s fully open right now. Create
            a free account and you&apos;ll already have a seat when the rest
            unlock.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            Create your free account
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
