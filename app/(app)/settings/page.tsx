import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-24 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <Settings className="h-6 w-6" />
      </div>
      <h1 className="text-xl font-bold text-slate-900">Settings</h1>
      <p className="mt-1 text-slate-500">This section is coming soon.</p>
    </div>
  );
}
