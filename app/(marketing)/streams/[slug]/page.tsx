import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock, Sparkles } from "lucide-react";
import { STREAMS, getStream } from "@/lib/streams";
import type { Metadata } from "next";

export function generateStaticParams() {
  return STREAMS.map((stream) => ({ slug: stream.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stream = getStream(slug);
  if (!stream) return {};
  return {
    title: `${stream.name} | BrainPath`,
    description: stream.description,
  };
}

export default async function StreamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stream = getStream(slug);
  if (!stream) notFound();

  const liveCount = stream.subjects.filter((s) => s.status === "live").length;

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link
            href="/#streams"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All streams
          </Link>

          <div className="mt-6 flex items-start gap-5">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${stream.accent} text-white shadow-sm`}
            >
              <stream.icon className="h-6 w-6" strokeWidth={2.25} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                A/L Stream
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {stream.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500">
                {stream.description}
              </p>
            </div>
          </div>

          {liveCount === 0 && (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
              <Sparkles className="h-4 w-4 text-blue-600" />
              This stream is in early preview — subjects open as we build
              them.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Subjects in this stream
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stream.subjects.map((subject) => {
            const isLive = subject.status === "live";
            const card = (
              <div
                className={`flex h-full flex-col rounded-3xl border p-7 transition-all ${
                  isLive
                    ? "border-blue-200 bg-white shadow-[0_8px_30px_-16px_rgba(37,99,235,0.35)] hover:-translate-y-0.5"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      isLive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <subject.icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  {isLive ? (
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700">
                      Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                      <Lock className="h-3 w-3" />
                      Coming soon
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-base font-bold tracking-tight text-slate-900">
                  {subject.name}
                </h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {subject.code}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {subject.description}
                </p>

                {isLive ? (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                    Open dashboard
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className="mt-5 text-sm font-medium text-slate-400">
                    Notify me when this opens →{" "}
                    <Link href="/signup" className="text-blue-600 hover:text-blue-700">
                      sign up
                    </Link>
                  </span>
                )}
              </div>
            );

            return isLive ? (
              <Link key={subject.slug} href={subject.href!}>
                {card}
              </Link>
            ) : (
              <div key={subject.slug}>{card}</div>
            );
          })}
        </div>
      </section>
    </>
  );
}
