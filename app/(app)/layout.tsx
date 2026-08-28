import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function AppShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
