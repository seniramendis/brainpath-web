import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, Sparkles, Target, Layers, TrendingUp } from "lucide-react";
import { STREAMS } from "@/lib/streams";

export default function LandingPage() {
  const totalSubjects = STREAMS.reduce((n, s) => n + s.subjects.length, 0);
  const liveStreams = STREAMS.filter((s) => s.subjects.some((sub) => sub.status === "live"));

  return (
    <>
      {/* Hero — full-bleed dark, Apple product-page style */}
      <section className="relative overflow-hidden bg-[#0b0b0d]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,113,227,0.25),transparent)]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-0 pt-24 text-center sm:pt-32">
          <div className="mx-auto mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            {liveStreams.length === 1 ? "1 stream live" : `${liveStreams.length} streams live`} · {STREAMS.length - liveStreams.length} in preview
          </div>

          <h1
            className="mx-auto animate-fade-up text-balance text-5xl font-semibold tracking-tightest text-white sm:text-7xl"
            style={{ animationDelay: "0.05s" }}
          >
            One roadmap.
            <br />
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Every A/L stream.
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/50"
            style={{ animationDelay: "0.1s" }}
          >
            Sri Lanka has five G.C.E. A/L streams. BrainPath is building a
            weighted, exam-blueprint roadmap for each one — starting with
            Science for Technology.
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "0.15s" }}
          >
            <Link
              href="#streams"
              className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#0077ed]"
            >
              Find your stream
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
            >
              Create free account
            </Link>
          </div>
        </div>

        {/* Product shot bleeding off the hero, Apple-style */}
        <div className="relative mx-auto mt-16 max-w-6xl px-6 sm:mt-20">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-t-[2rem] border-x border-t border-white/10 shadow-[0_-20px_80px_-20px_rgba(0,113,227,0.35)] sm:aspect-[16/7]">
            <Image
              src="https://images.unsplash.com/photo-1581093577421-f561a654a353?auto=format&fit=crop&w=2000&q=80"
              alt="A student working through a weighted A/L exam roadmap"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-transparent to-black/10" />
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-4 px-6 py-12 text-center sm:py-16">
          <div>
            <p className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">5</p>
            <p className="mt-1 text-sm text-[#1d1d1f]/50">G.C.E. A/L streams</p>
          </div>
          <div className="border-x border-black/5">
            <p className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
              {totalSubjects}
            </p>
            <p className="mt-1 text-sm text-[#1d1d1f]/50">subjects mapped</p>
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">100%</p>
            <p className="mt-1 text-sm text-[#1d1d1f]/50">exam-blueprint weighted</p>
          </div>
        </div>
      </section>

      {/* Streams — bento-style, image-forward cards */}
      <section id="streams" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold text-[#0071e3]">Streams</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tightest text-[#1d1d1f] sm:text-5xl">
            Choose your stream.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#1d1d1f]/55">
            {totalSubjects} subjects across 5 streams. Tap a stream to see its
            subjects.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
          {STREAMS.map((stream, i) => {
            const liveCount = stream.subjects.filter((s) => s.status === "live").length;
            const isOpen = liveCount > 0;
            const spanClass = i === 0 ? "lg:col-span-4 lg:row-span-2" : "lg:col-span-2";
            const aspect = i === 0 ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/3]";

            return (
              <Link
                key={stream.slug}
                href={`/streams/${stream.slug}`}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-[1.75rem] ${aspect} ${spanClass} transition-transform duration-500 hover:scale-[1.01]`}
              >
                <Image
                  src={stream.image}
                  alt={stream.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/0" />

                <div className="relative flex items-start justify-between p-6 sm:p-7">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md ${
                      isOpen
                        ? "bg-emerald-400/20 text-emerald-300"
                        : "bg-white/15 text-white/80"
                    }`}
                  >
                    {isOpen ? (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Open now
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3" />
                        Preview
                      </>
                    )}
                  </span>
                </div>

                <div className="relative -mt-16 p-6 sm:p-7">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {stream.name}
                  </h3>
                  <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/70">
                    {stream.tagline}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-white">
                    {stream.subjects.length} subjects
                    {isOpen ? `, ${liveCount} live` : ""}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA tile */}
        <div className="mt-5 flex flex-col items-center justify-between gap-5 rounded-[1.75rem] border border-black/5 bg-[#f5f5f7] px-8 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
              Not sure which stream is yours?
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-[#1d1d1f]/55">
              Create an account and every stream stays in one place as we
              open it.
            </p>
          </div>
          <Link
            href="/signup"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#0077ed]"
          >
            Get started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Feature story — alternating image/text blocks, Apple-style */}
      <section className="border-t border-black/5 bg-[#f5f5f7] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold text-[#0071e3]">How it works</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tightest text-[#1d1d1f] sm:text-5xl">
              Built around the exam. Not the syllabus.
            </h2>
          </div>

          <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0071e3] text-white">
                <Target className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                Every topic, weighted the way examiners actually mark it.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-[#1d1d1f]/55">
                We reverse-engineered past papers, question by question, so
                your study time maps directly onto how marks are actually
                distributed — not just how the textbook is organised.
              </p>
            </div>
            <div className="order-1 relative aspect-[4/3] overflow-hidden rounded-[1.75rem] lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&w=1600&q=80"
                alt="A bright lab bench with analytical instruments"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              <Image
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1600&q=80"
                alt="A laptop for self-paced timed practice"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1d1d1f] text-white">
                <Layers className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight text-[#1d1d1f]">
                One account. Every stream, as it opens.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-[#1d1d1f]/55">
                Science for Technology is live today. Physical Science,
                Biological Science, Commerce and Arts are all in active
                development — sign up once and they simply appear as we
                ship them.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                title: "Track real progress",
                body: "See exactly which topics are exam-ready and which need another pass, at a glance.",
              },
              {
                icon: Target,
                title: "Timed practice",
                body: "Sit past-paper-style sets under real exam timing, not endless untimed quizzes.",
              },
              {
                icon: Layers,
                title: "Built for A/L, not adapted",
                body: "Every roadmap is written from the current G.C.E. A/L syllabus and marking scheme.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-black/5 bg-white p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#1d1d1f]">
                  <f.icon className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <h4 className="mt-5 text-base font-semibold text-[#1d1d1f]">
                  {f.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]/55">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — full-bleed dark */}
      <section className="bg-[#0b0b0d] py-28 text-center sm:py-36">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-4xl font-semibold tracking-tightest text-white sm:text-5xl">
            Start with Science for Technology today.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/50">
            It&apos;s the only stream that&apos;s fully open right now. Create
            a free account and you&apos;ll already have a seat when the rest
            unlock.
          </p>
          <Link
            href="/signup"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#0077ed]"
          >
            Create your free account
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
