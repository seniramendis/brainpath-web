"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SPLASH_LOGO_URL } from "@/lib/brand";

const VISIBLE_MS = 3200; // logo fully shown
const FADE_MS = 600; // fade-out transition

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fadeTimer = setTimeout(() => setFadingOut(true), VISIBLE_MS);
    const hideTimer = setTimeout(() => setHidden(true), VISIBLE_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0b0b0d] transition-opacity ease-out"
      style={{
        opacity: fadingOut ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,113,227,0.28),transparent)]" />

      <div
        className="relative flex flex-col items-center transition-all ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1)" : "scale(0.85)",
          transitionDuration: "900ms",
        }}
      >
        <div className="relative h-56 w-56 sm:h-80 sm:w-80 animate-[splash-pulse_2.4s_ease-in-out_infinite]">
          <Image
            src={SPLASH_LOGO_URL}
            alt="BrainPath"
            fill
            priority
            className="object-contain drop-shadow-[0_0_30px_rgba(0,113,227,0.45)]"
            sizes="320px"
          />
        </div>
      </div>

      <style>{`
        @keyframes splash-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes splash-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
