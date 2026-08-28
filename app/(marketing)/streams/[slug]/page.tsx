import Image from "next/image";
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
      <section className="relative overflow-hidden bg-[#0b0b0d]">
        <div className="absolute inset-0">
          <Image
            src={stream.image}
            alt={stream.name}
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/70 to-[#0b0b0d]/20" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <Link
            href="/#streams"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All streams
          </Link>

          <p className="mt-8 text-sm font-semibold text-blue-400">A/L Stream</p>
          <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tightest text-white sm:text-6xl">
            {stream.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
            {stream.description}
          </p>

          {liveCount === 0 && (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur">
              <Sparkles className="h-4 w-4 text-blue-400" />
              This stream is in early preview — subjects open as we build
              them.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">
          Subjects in this stream
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stream.subjects.map((subject) => {
            const isLive = subject.status === "live";
            const card = (
              <div
                className={`flex h-full flex-col rounded-[1.5rem] border p-7 transition-all ${
                  isLive
                    ? "border-black/5 bg-white shadow-[0_20px_50px_-20px_rgba(0,113,227,0.35)] hover:-translate-y-0.5"
                    : "border-black/5 bg-[#f5f5f7]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      isLive ? "bg-[#0071e3] text-white" : "bg-white text-[#1d1d1f]/30"
                    }`}
                  >
                    <subject.icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  {isLive ? (
                    <span className="rounded-full bg-[#0071e3]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0071e3]">
                      Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#1d1d1f]/40">
                      <Lock className="h-3 w-3" />
                      Coming soon
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-base font-semibold tracking-tight text-[#1d1d1f]">
                  {subject.name}
                </h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-[#1d1d1f]/40">
                  {subject.code}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#1d1d1f]/55">
                  {subject.description}
                </p>

                {isLive ? (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0071e3]">
                    Open dashboard
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className="mt-5 text-sm font-medium text-[#1d1d1f]/40">
                    Notify me when this opens →{" "}
                    <Link href="/signup" className="text-[#0071e3] hover:text-[#0077ed]">
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
