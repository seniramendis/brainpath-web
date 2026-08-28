import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white py-24 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black/[0.04] text-[#1d1d1f]/40">
        <Settings className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <h1 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">Settings</h1>
      <p className="mt-1 text-[15px] text-[#1d1d1f]/50">This section is coming soon.</p>
    </div>
  );
}
