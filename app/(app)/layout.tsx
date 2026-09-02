import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { requireUser } from "@/lib/dal";

export default async function AppShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Belt-and-suspenders: proxy.ts already redirects unauthenticated
  // requests, this ensures every (app) route also has a real user to render.
  const user = await requireUser();

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <Sidebar user={user} />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar user={user} />
        <main className="flex-1 px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-8 lg:py-10 lg:pb-10">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
