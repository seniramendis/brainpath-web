import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure the primary font
const inter = Inter({ subsets: ["latin"] });

// Global SEO and metadata for BrainPath
export const metadata: Metadata = {
  title: "BrainPath | SFT Readiness Platform",
  description: "The ultimate educational roadmap and timed practice platform for G.C.E. A/L Science for Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col bg-slate-50 text-slate-900`}>
        
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
          <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
            <a href="/" className="text-xl font-bold tracking-tight text-blue-600">
              BrainPath
            </a>
            <nav className="ml-auto flex gap-6 text-sm font-medium text-slate-600">
              <a href="/dashboard" className="transition-colors hover:text-blue-600">Dashboard</a>
              <a href="/practice" className="transition-colors hover:text-blue-600">Timed Practice</a>
              <a href="/analytics" className="transition-colors hover:text-blue-600">Readiness Score</a>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto flex-1 px-4 py-8 md:px-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t bg-white py-6">
          <div className="container mx-auto px-4 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} BrainPath. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}