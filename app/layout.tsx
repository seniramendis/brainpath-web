import type { Metadata } from "next";
import "./globals.css";

// Global SEO and metadata for BrainPath
export const metadata: Metadata = {
  title: "BrainPath | SFT Readiness Platform",
  description:
    "The ultimate educational roadmap and timed practice platform for G.C.E. A/L Science for Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
