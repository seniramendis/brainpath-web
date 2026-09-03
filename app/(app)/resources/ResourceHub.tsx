"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Play,
  FileText,
  Download,
  X,
  Atom,
  Dna,
  FlaskConical,
  Sigma,
  Leaf,
  ClipboardList,
} from "lucide-react";
import type { ModuleResource } from "@/lib/dal";

const TABS = ["All", "Biology", "Physics", "Chemistry", "Maths"];

// "Chem/Env" modules render under the Chemistry tab so the filter stays
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

const SUBJECT_IMAGE: Record<string, string> = {
  Physics:
    "https://images.unsplash.com/photo-1633493702341-4d04841df53b?auto=format&fit=crop&w=1200&q=80",
  Biology:
    "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=1200&q=80",
  Chemistry:
    "https://images.unsplash.com/photo-1694230155228-cdde50083573?auto=format&fit=crop&w=1200&q=80",
  Maths:
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
};

function priorityMeta(tier: number) {
  if (tier === 1) return { label: "High Priority", className: "text-rose-600" };
  if (tier === 2) return { label: "Medium Priority", className: "text-orange-600" };
  return { label: "Low Priority", className: "text-slate-500" };
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

function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.05] text-[#1d1d1f]/60 transition-colors hover:bg-black/[0.1]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function ResourceHub({ modules }: { modules: ModuleResource[] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [videoModule, setVideoModule] = useState<ModuleResource | null>(null);
  const [resourceModule, setResourceModule] = useState<ModuleResource | null>(null);

  const visible =
    activeTab === "All"
      ? modules
      : modules.filter((m) => subjectGroup(m.subject) === activeTab);

  return (
    <>
      {/* Tabs */}
      <div className="-mx-4 flex items-center gap-1 overflow-x-auto border-b border-black/[0.06] px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => {
          const active = tab === activeTab;
          const Icon = SUBJECT_ICON[tab];
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-[13.5px] font-medium whitespace-nowrap transition-colors sm:px-4 ${
                active
                  ? "border-[#0071e3] text-[#0071e3]"
                  : "border-transparent text-[#1d1d1f]/45 hover:text-[#1d1d1f]"
              }`}
            >
              {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />}
              {tab}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((mod) => {
          const group = subjectGroup(mod.subject);
          const SubjectIcon = SUBJECT_ICON[group] ?? Leaf;
          const image = SUBJECT_IMAGE[group] ?? SUBJECT_IMAGE.Chemistry;
          const priority = priorityMeta(mod.tier);
          const resourceCount = mod.pastPapers.length + mod.studyMaterials.length;

          return (
            <div
              key={mod.id}
              className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-colors hover:border-[#0071e3]/20"
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={image}
                  alt={mod.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <span
                  className={`absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium backdrop-blur ${priority.className}`}
                >
                  ● {priority.label}
                </span>
                <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#1d1d1f] backdrop-blur">
                  <SubjectIcon className="h-3 w-3" strokeWidth={1.75} />
                  {mod.subject}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-[15px] font-semibold tracking-tight text-[#1d1d1f]">
                  {mod.name}
                </h3>
                <div className="mt-3 flex items-center justify-between text-[13px]">
                  <span className="text-[#1d1d1f]/40">Weightage</span>
                  <span className="font-semibold text-[#1d1d1f]">
                    {mod.priorityPercent}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
                  <div
                    className="h-full rounded-full bg-[#0071e3]"
                    style={{ width: `${Math.min(mod.priorityPercent * 4, 100)}%` }}
                  />
                </div>

                <p className="mt-3 text-[12px] text-[#1d1d1f]/40">
                  {mod.pastPapers.length} past{" "}
                  {mod.pastPapers.length === 1 ? "paper" : "papers"} ·{" "}
                  {mod.studyMaterials.length}{" "}
                  {mod.studyMaterials.length === 1 ? "material" : "materials"}
                </p>

                <div className="mt-5 flex gap-2.5">
                  <button
                    onClick={() => setVideoModule(mod)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0071e3] py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#0077ed]"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Watch
                  </button>
                  <button
                    onClick={() => setResourceModule(mod)}
                    disabled={resourceCount === 0}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black/[0.05] py-2.5 text-[13px] font-medium text-[#1d1d1f] transition-colors hover:bg-black/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Resources
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-[13.5px] text-[#1d1d1f]/40">
          No modules in this subject yet.
        </p>
      )}

      {/* Video player modal */}
      {videoModule && (
        <Modal onClose={() => setVideoModule(null)}>
          <div className="aspect-video w-full bg-black">
            {videoModule.videoUrl && toYoutubeEmbedUrl(videoModule.videoUrl) ? (
              <iframe
                className="h-full w-full"
                src={toYoutubeEmbedUrl(videoModule.videoUrl)!}
                title={videoModule.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/60">
                <Play className="h-8 w-8" strokeWidth={1.5} />
                <p className="text-[13px]">
                  {videoModule.videoUrl
                    ? "This link isn't a playable YouTube video."
                    : "Lecture video coming soon for this module."}
                </p>
              </div>
            )}
          </div>
          <div className="p-5">
            <p className="text-[11px] font-medium text-[#0071e3]">{videoModule.subject}</p>
            <h3 className="mt-0.5 text-[16px] font-semibold text-[#1d1d1f]">
              {videoModule.name}
            </h3>
            {videoModule.videoUrl && (
              <a
                href={videoModule.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[12.5px] text-[#0071e3] hover:underline"
              >
                Open on YouTube ↗
              </a>
            )}
          </div>
        </Modal>
      )}

      {/* Past papers + study material modal */}
      {resourceModule && (
        <Modal onClose={() => setResourceModule(null)}>
          <div className="max-h-[80vh] overflow-y-auto p-6">
            <p className="text-[11px] font-medium text-[#0071e3]">{resourceModule.subject}</p>
            <h3 className="mt-0.5 text-[18px] font-semibold text-[#1d1d1f]">
              {resourceModule.name}
            </h3>

            <div className="mt-6">
              <h4 className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1d1d1f]/70">
                <ClipboardList className="h-3.5 w-3.5" strokeWidth={1.75} />
                Past Papers
              </h4>
              {resourceModule.pastPapers.length === 0 ? (
                <p className="mt-2 text-[13px] text-[#1d1d1f]/40">
                  No past papers added yet.
                </p>
              ) : (
                <ul className="mt-2 divide-y divide-black/[0.06] rounded-xl border border-black/[0.06]">
                  {resourceModule.pastPapers.map((paper) => (
                    <li
                      key={paper.id}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <span className="text-[13.5px] text-[#1d1d1f]">{paper.title}</span>
                      <a
                        href={paper.fileUrl}
                        download
                        className="flex shrink-0 items-center gap-1.5 rounded-full bg-black/[0.05] px-3 py-1.5 text-[12px] font-medium text-[#1d1d1f] transition-colors hover:bg-black/[0.08]"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6">
              <h4 className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1d1d1f]/70">
                <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
                Study Material
              </h4>
              {resourceModule.studyMaterials.length === 0 ? (
                <p className="mt-2 text-[13px] text-[#1d1d1f]/40">
                  No study material added yet.
                </p>
              ) : (
                <ul className="mt-2 divide-y divide-black/[0.06] rounded-xl border border-black/[0.06]">
                  {resourceModule.studyMaterials.map((material) => (
                    <li
                      key={material.id}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <div>
                        <span className="text-[13.5px] text-[#1d1d1f]">{material.title}</span>
                        <span className="ml-2 rounded-full bg-black/[0.05] px-2 py-0.5 text-[10.5px] font-medium text-[#1d1d1f]/50">
                          {material.type}
                        </span>
                      </div>
                      <a
                        href={material.fileUrl}
                        download
                        className="flex shrink-0 items-center gap-1.5 rounded-full bg-black/[0.05] px-3 py-1.5 text-[12px] font-medium text-[#1d1d1f] transition-colors hover:bg-black/[0.08]"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
