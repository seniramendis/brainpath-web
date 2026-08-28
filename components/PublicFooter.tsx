import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { STREAMS } from "@/lib/streams";

export default function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <FlaskConical className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <span className="text-[15px] font-bold tracking-tight text-slate-900">
              BrainPath
            </span>
          </div>
          <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-slate-500">
            The exam-blueprint-weighted roadmap for G.C.E. A/L students.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Streams
          </p>
          <ul className="mt-4 space-y-2.5">
            {STREAMS.map((stream) => (
              <li key={stream.slug}>
                <Link
                  href={`/streams/${stream.slug}`}
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  {stream.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Account
          </p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/signup" className="text-sm text-slate-600 hover:text-slate-900">
                Create account
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900">
                Log in
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
                SFT dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Status
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Science for Technology is live. Every other subject is in active
            development and open for early preview.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} BrainPath. Built for G.C.E. A/L students in Sri Lanka.
      </div>
    </footer>
  );
}
