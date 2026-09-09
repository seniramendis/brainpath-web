"use client";

import { useMemo, useState } from "react";
import {
  Play,
  FileText,
  Download,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Atom,
  Dna,
  FlaskConical,
  Sigma,
  BookOpen,
  Newspaper,
  Film,
} from "lucide-react";
import type { ModuleResource } from "@/lib/dal";

// "Chem/Env" modules render under the Chemistry group so the roadmap stays
// simple for students.
function subjectGroup(subject: string) {
  return subject.startsWith("Chem") ? "Chemistry" : subject;
}

const SUBJECT_ICON: Record<string, typeof Atom> = {
  Biology: Dna,
  Physics: Atom,
  Chemistry: FlaskConical,
  Maths: Sigma,
};

const SUBJECT_BLURB: Record<string, string> = {
  Biology: "Cells, systems & the living world",
  Physics: "Forces, energy & measurement",
  Chemistry: "Reactions, materials & industry",
  Maths: "Statistics, geometry & problem solving",
};

function priorityMeta(tier: number) {
  if (tier === 1) return { label: "High Priority", dot: "bg-rose-500", text: "text-rose-600" };
  if (tier === 2) return { label: "Medium Priority", dot: "bg-orange-500", text: "text-orange-600" };
  return { label: "Low Priority", dot: "bg-slate-400", text: "text-slate-500" };
}

/** Converts a normal YouTube watch/share URL into an /embed/ URL. Returns
 * null if the string isn't a recognizable YouTube link. */
function toYoutubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
    return null;
  } catch {
    return null;
  }
}

function isPdf(url: string) {
  return url.toLowerCase().endsWith(".pdf");
}

type ResourceTab = "video" | "articles" | "materials";

export default function ResourceHub({ modules }: { modules: ModuleResource[] }) {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<ModuleResource | null>(null);
  const [activeTab, setActiveTab] = useState<ResourceTab>("video");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Group + A-Z sort every subject that has at least one module.
  const subjects = useMemo(() => {
    const map = new Map<string, ModuleResource[]>();
    for (const mod of modules) {
      const group = subjectGroup(mod.subject);
      if (!map.has(group)) map.set(group, []);
      map.get(group)!.push(mod);
    }
    return Array.from(map.entries())
      .map(([name, mods]) => ({ name, mods }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [modules]);

  // Modules for the active subject, A-Z by name -- this is the roadmap path.
  const roadmapModules = useMemo(() => {
    if (!activeSubject) return [];
    const group = subjects.find((s) => s.name === activeSubject);
    return (group?.mods ?? []).slice().sort((a, b) => a.name.localeCompare(b.name));
  }, [activeSubject, subjects]);

  function openModule(mod: ModuleResource) {
    setActiveModule(mod);
    setPreviewUrl(null);
    setActiveTab(mod.videoUrl ? "video" : "materials");
  }

  function closeModule() {
    setActiveModule(null);
    setPreviewUrl(null);
  }

  // ---------------------------------------------------------------------
  // Level 1: subject picker (roadmap.sh-style "choose your path" grid)
  // ---------------------------------------------------------------------
  if (!activeSubject) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {subjects.map((s) => {
          const Icon = SUBJECT_ICON[s.name] ?? BookOpen;
          const total = s.mods.length;
          const resourceCount = s.mods.reduce(
            (n, m) => n + m.pastPapers.length + m.studyMaterials.length,
            0
          );
          return (
            <button
              key={s.name}
              onClick={() => setActiveSubject(s.name)}
              className="group flex flex-col items-start rounded-2xl border border-black/[0.06] bg-white p-6 text-left transition-all hover:-translate-y-0.5 hover:border-[#0071e3]/25 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0071e3]/10 text-[#0071e3]">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-[#1d1d1f]">
                {s.name}
              </h3>
              <p className="mt-1 text-[12.5px] text-[#1d1d1f]/45">
                {SUBJECT_BLURB[s.name] ?? "Syllabus modules & resources"}
              </p>
              <div className="mt-4 flex items-center gap-3 text-[11.5px] text-[#1d1d1f]/40">
                <span>{total} {total === 1 ? "module" : "modules"}</span>
                <span>·</span>
                <span>{resourceCount} resources</span>
              </div>
              <span className="mt-4 flex items-center gap-1 text-[12.5px] font-medium text-[#0071e3] opacity-0 transition-opacity group-hover:opacity-100">
                View roadmap <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // Level 2: roadmap.sh-style vertical path of modules for the subject
  // ---------------------------------------------------------------------
  return (
    <>
      <button
        onClick={() => setActiveSubject(null)}
        className="flex items-center gap-1 text-[13px] font-medium text-[#1d1d1f]/50 transition-colors hover:text-[#0071e3]"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        All subjects
      </button>

      <div className="mt-5 flex items-center gap-3">
        {(() => {
          const Icon = SUBJECT_ICON[activeSubject] ?? BookOpen;
          return (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071e3]/10 text-[#0071e3]">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
          );
        })()}
        <div>
          <h2 className="text-[19px] font-semibold tracking-tight text-[#1d1d1f]">
            {activeSubject} roadmap
          </h2>
          <p className="text-[12.5px] text-[#1d1d1f]/45">
            {roadmapModules.length} modules, A–Z · tap a node for video, articles & PDFs
          </p>
        </div>
      </div>

      {/* Roadmap path */}
      <div className="relative mt-8 pb-4 pl-2">
        <div className="absolute top-2 bottom-2 left-[19px] w-px bg-black/[0.08] sm:left-[23px]" />
        <div className="flex flex-col gap-3">
          {roadmapModules.map((mod, i) => {
            const priority = priorityMeta(mod.tier);
            const resourceCount = mod.pastPapers.length + mod.studyMaterials.length;
            return (
              <button
                key={mod.id}
                onClick={() => openModule(mod)}
                className="group relative flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white py-3.5 pr-4 pl-3 text-left transition-all hover:border-[#0071e3]/25 hover:shadow-[0_6px_20px_-10px_rgba(0,0,0,0.15)] sm:pl-4"
              >
                <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#f5f5f7] text-[11px] font-semibold text-[#1d1d1f]/50 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-colors group-hover:border-[#0071e3]/20 group-hover:bg-[#0071e3]/10 group-hover:text-[#0071e3]">
                  {i + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${priority.dot}`} />
                    <span className={`text-[11px] font-medium ${priority.text}`}>
                      {priority.label}
                    </span>
                  </div>
                  <h3 className="mt-0.5 truncate text-[14.5px] font-semibold text-[#1d1d1f]">
                    {mod.name}
                  </h3>
                  <p className="mt-0.5 text-[12px] text-[#1d1d1f]/40">
                    {mod.priorityPercent}% weightage · Part {mod.examPart} ·{" "}
                    {resourceCount} resources
                    {mod.videoUrl ? " · video available" : ""}
                  </p>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-[#1d1d1f]/20 transition-colors group-hover:text-[#0071e3]" />
              </button>
            );
          })}
        </div>

        {roadmapModules.length === 0 && (
          <p className="py-16 text-center text-[13.5px] text-[#1d1d1f]/40">
            No modules in this subject yet.
          </p>
        )}
      </div>

      {/* Module detail panel with Video / Articles / Materials tabs */}
      {activeModule && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={closeModule}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModule}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.05] text-[#1d1d1f]/60 backdrop-blur transition-colors hover:bg-black/[0.1]"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-black/[0.06] px-6 pt-6 pb-0">
              <p className="text-[11px] font-medium text-[#0071e3]">
                {activeModule.subject} · Part {activeModule.examPart}
              </p>
              <h3 className="mt-0.5 pr-8 text-[18px] font-semibold tracking-tight text-[#1d1d1f]">
                {activeModule.name}
              </h3>

              {/* Tabs */}
              <div className="mt-4 flex items-center gap-1">
                {(
                  [
                    ["video", "Video", Film],
                    ["articles", "Articles", Newspaper],
                    ["materials", "Materials", FileText],
                  ] as [ResourceTab, string, typeof Film][]
                ).map(([id, label, Icon]) => {
                  const active = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setActiveTab(id);
                        setPreviewUrl(null);
                      }}
                      className={`flex items-center gap-1.5 rounded-t-lg border-b-2 px-3.5 py-2 text-[13px] font-medium transition-colors ${
                        active
                          ? "border-[#0071e3] text-[#0071e3]"
                          : "border-transparent text-[#1d1d1f]/45 hover:text-[#1d1d1f]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Video tab */}
              {activeTab === "video" && (
                <div>
                  <div className="aspect-video w-full bg-black">
                    {activeModule.videoUrl && toYoutubeEmbedUrl(activeModule.videoUrl) ? (
                      <iframe
                        className="h-full w-full"
                        src={toYoutubeEmbedUrl(activeModule.videoUrl)!}
                        title={activeModule.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/60">
                        <Play className="h-8 w-8" strokeWidth={1.5} />
                        <p className="text-[13px]">
                          {activeModule.videoUrl
                            ? "This link isn't a playable YouTube video."
                            : "Lecture video coming soon for this module."}
                        </p>
                      </div>
                    )}
                  </div>
                  {activeModule.videoUrl && (
                    <div className="p-5">
                      <a
                        href={activeModule.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[12.5px] text-[#0071e3] hover:underline"
                      >
                        Open on YouTube <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Articles tab */}
              {activeTab === "articles" && (
                <div className="p-6">
                  {(() => {
                    const articles = activeModule.studyMaterials.filter(
                      (m: { type: string }) => m.type === "Article"
                    );
                    if (articles.length === 0) {
                      return (
                        <p className="py-10 text-center text-[13px] text-[#1d1d1f]/40">
                          No articles linked for this module yet.
                        </p>
                      );
                    }
                    return (
                      <ul className="divide-y divide-black/[0.06] rounded-xl border border-black/[0.06]">
                        {articles.map((a: { id: string; title: string; fileUrl: string }) => (
                          <li key={a.id}>
                            <a
                              href={a.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-black/[0.02]"
                            >
                              <span className="flex items-center gap-2.5 text-[13.5px] text-[#1d1d1f]">
                                <Newspaper className="h-4 w-4 shrink-0 text-[#1d1d1f]/35" strokeWidth={1.75} />
                                {a.title}
                              </span>
                              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#1d1d1f]/30" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    );
                  })()}
                </div>
              )}

              {/* Materials tab: past papers + notes/slides, with inline PDF preview */}
              {activeTab === "materials" && (
                <div className="p-6">
                  {(() => {
                    const materials = [
                      ...activeModule.pastPapers.map((p: { id: string; title: string; year: number; fileUrl: string }) => ({
                        id: p.id,
                        title: p.title,
                        type: `Past Paper · ${p.year}`,
                        fileUrl: p.fileUrl,
                      })),
                      ...activeModule.studyMaterials
                        .filter((m: { type: string }) => m.type !== "Article")
                        .map((m: { id: string; title: string; type: string; fileUrl: string }) => ({
                          id: m.id,
                          title: m.title,
                          type: m.type,
                          fileUrl: m.fileUrl,
                        })),
                    ];

                    if (materials.length === 0) {
                      return (
                        <p className="py-10 text-center text-[13px] text-[#1d1d1f]/40">
                          No past papers or notes added yet.
                        </p>
                      );
                    }

                    return (
                      <ul className="space-y-2.5">
                        {materials.map((m) => {
                          const open = previewUrl === m.fileUrl;
                          return (
                            <li
                              key={m.id}
                              className="overflow-hidden rounded-xl border border-black/[0.06]"
                            >
                              <div className="flex items-center justify-between gap-3 px-4 py-3">
                                <div className="min-w-0">
                                  <p className="truncate text-[13.5px] text-[#1d1d1f]">
                                    {m.title}
                                  </p>
                                  <span className="mt-0.5 inline-block rounded-full bg-black/[0.05] px-2 py-0.5 text-[10.5px] font-medium text-[#1d1d1f]/50">
                                    {m.type}
                                  </span>
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                  {isPdf(m.fileUrl) && (
                                    <button
                                      onClick={() =>
                                        setPreviewUrl(open ? null : m.fileUrl)
                                      }
                                      className="flex items-center gap-1.5 rounded-full bg-black/[0.05] px-3 py-1.5 text-[12px] font-medium text-[#1d1d1f] transition-colors hover:bg-black/[0.08]"
                                    >
                                      <Eye className="h-3 w-3" />
                                      {open ? "Hide" : "Preview"}
                                    </button>
                                  )}
                                  <a
                                    href={m.fileUrl}
                                    download
                                    className="flex items-center gap-1.5 rounded-full bg-[#0071e3] px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[#0077ed]"
                                  >
                                    <Download className="h-3 w-3" />
                                    Download
                                  </a>
                                </div>
                              </div>
                              {open && (
                                <iframe
                                  src={m.fileUrl}
                                  title={m.title}
                                  className="h-[420px] w-full border-t border-black/[0.06] bg-[#f5f5f7]"
                                />
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
