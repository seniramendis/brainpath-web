import Link from "next/link";
import Image from "next/image";
import { STREAMS } from "@/lib/streams";
import { FOOTER_LOGO_URL } from "@/lib/brand";

export default function PublicFooter() {
  return (
    <footer className="border-t border-black/5 bg-[#f5f5f7]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="relative h-20 w-full max-w-[220px] origin-left">
            <Image src={FOOTER_LOGO_URL} alt="BrainPath" fill className="object-contain object-left" sizes="220px" />
          </div>
          <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-[#1d1d1f]/50">
            The exam-blueprint-weighted roadmap for G.C.E. A/L students.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1d1d1f]/40">
            Streams
          </p>
          <ul className="mt-4 space-y-2.5">
            {STREAMS.map((stream) => (
              <li key={stream.slug}>
                <Link
                  href={`/streams/${stream.slug}`}
                  className="text-sm text-[#1d1d1f]/60 hover:text-[#1d1d1f]"
                >
                  {stream.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1d1d1f]/40">
            Account
          </p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/signup" className="text-sm text-[#1d1d1f]/60 hover:text-[#1d1d1f]">
                Create account
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-sm text-[#1d1d1f]/60 hover:text-[#1d1d1f]">
                Log in
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-sm text-[#1d1d1f]/60 hover:text-[#1d1d1f]">
                SFT dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1d1d1f]/40">
            Status
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#1d1d1f]/50">
            Science for Technology is live. Every other subject is in active
            development and open for early preview.
          </p>
        </div>
      </div>

      <div className="border-t border-black/5 px-6 py-6 text-center text-xs text-[#1d1d1f]/40">
        © {new Date().getFullYear()} BrainPath. Built for G.C.E. A/L students in Sri Lanka.
      </div>
    </footer>
  );
}
