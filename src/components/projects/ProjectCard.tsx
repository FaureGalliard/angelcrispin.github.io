'use client';
import React, { useState } from 'react';
import type { Project, FeatureGroup, PipelineStep, Gesture, Video } from '@/data/Projects';

// ─── Icons ───────────────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ─── Type badge ───────────────────────────────────────────────────────────────


// ─── Video media ──────────────────────────────────────────────────────────────
function VideoMedia({
  videos, currentVideo, setCurrentVideo,
}: {
  videos: Video[];
  currentVideo: number;
  setCurrentVideo: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="relative w-full h-full group cursor-pointer">
      <div className="absolute inset-0 bg-emerald-500/15 mix-blend-multiply z-10 transition-all duration-500 group-hover:bg-transparent" />
      <video
        key={videos[currentVideo].url}
        src={videos[currentVideo].url}
        autoPlay muted playsInline
        onEnded={() => setCurrentVideo((p) => (p + 1) % videos.length)}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
      />
      {/* current label */}
      <div className="absolute top-3 left-3 z-20">
        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-emerald-400 text-xs font-mono border border-emerald-500/30">
          {videos[currentVideo].label}
        </span>
      </div>
      {/* dot indicators */}
      {videos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {videos.map((_, i) => (
            <button key={i} onClick={() => setCurrentVideo(i)}
              className={`h-1 rounded-full transition-all ${i === currentVideo ? 'w-6 bg-emerald-500' : 'w-2 bg-white/30 hover:bg-white/50'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Placeholder ──────────────────────────────────────────────────────────────
function PlaceholderMedia({ type }: { type: string }) {
  const icons: Record<string, string> = { game: '🎮', ml: '🤖', automation: '⚙️' };
  return (
    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex flex-col items-center justify-center gap-2">
      <span className="text-5xl opacity-20">{icons[type] ?? '📁'}</span>
      <span className="text-zinc-600 text-xs font-mono">sin preview</span>
    </div>
  );
}

// ─── GameFeaturePanel ─────────────────────────────────────────────────────────
function GameFeaturePanel({
  featureGroups, activeGroup, onSelect,
}: { featureGroups: FeatureGroup[]; activeGroup: number; onSelect: (i: number) => void }) {
  const group = featureGroups[activeGroup];
  if (!group) return null;
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex gap-1.5 flex-wrap">
        {featureGroups.map((g, idx) => (
          <button key={g.label} onClick={() => onSelect(idx)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] transition-all border"
            style={idx === activeGroup
              ? { backgroundColor: g.color + '20', borderColor: g.color + '60', color: g.color }
              : { backgroundColor: 'transparent', borderColor: 'rgb(63,63,70)', color: 'rgb(113,113,122)' }}>
            <span>{g.icon}</span><span className="font-medium">{g.label}</span>
          </button>
        ))}
      </div>
      <div className="rounded-lg p-3 border" style={{ borderColor: group.color + '30', backgroundColor: group.color + '08' }}>
        <ul className="space-y-1.5">
          {group.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
              <span className="mt-1 shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: group.color }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── PipelineRow ──────────────────────────────────────────────────────────────
function PipelineRow({ pipeline }: { pipeline: PipelineStep[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {pipeline.map((step, i) => (
        <span key={step.label} className="flex items-center gap-1">
          <span className="flex flex-col items-center px-2 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60">
            <span className="text-sm">{step.icon}</span>
            <span className="text-zinc-300 text-[9px] font-medium">{step.label}</span>
            <span className="text-zinc-600 text-[8px]">{step.sub}</span>
          </span>
          {i < pipeline.length - 1 && <span className="text-zinc-700 text-xs">→</span>}
        </span>
      ))}
    </div>
  );
}

// ─── GestureChips ─────────────────────────────────────────────────────────────
function GestureChips({ gestures }: { gestures: Gesture[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {gestures.map((g) => (
        <span key={g.key} className="px-2 py-0.5 rounded-full text-[10px] font-mono border"
          style={{ borderColor: g.color + '55', backgroundColor: g.color + '15', color: g.color }}>
          {g.label}
        </span>
      ))}
    </div>
  );
}

// ─── ProjectCard (exported) ───────────────────────────────────────────────────
export interface ProjectCardProps {
  project: Project;
  index:   number; // even → image left | odd → image right
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [currentVideo,  setCurrentVideo]  = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  const reversed  = index % 2 !== 0;
  const hasVideos = project.videos.length > 0;
  const isGame    = project.type === 'game';
  const isML      = project.type === 'ml';

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

      {/* ── Media ─────────────────────────────────────────────────────────── */}
      <div className={`lg:col-span-7 relative aspect-video rounded-xl overflow-hidden border border-zinc-800 shadow-2xl ${reversed ? 'lg:col-start-6 lg:order-2' : ''}`}>
        {hasVideos
          ? <VideoMedia videos={project.videos} currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
          : <PlaceholderMedia type={project.type} />
        }
        {/* video tab buttons */}
        {hasVideos && project.videos.length > 1 && (
          <div className="absolute bottom-10 left-3 z-20 hidden lg:flex gap-1.5">
            {project.videos.map((v, i) => (
              <button key={i} onClick={() => setCurrentVideo(i)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono border backdrop-blur-sm transition-all ${
                  i === currentVideo
                    ? 'bg-emerald-500/30 border-emerald-500/60 text-emerald-300'
                    : 'bg-black/50 border-zinc-700 text-zinc-500 hover:text-zinc-300'
                }`}>
               
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Info ──────────────────────────────────────────────────────────── */}
      <div className={`lg:col-span-5 flex flex-col z-20 ${reversed ? 'lg:col-start-1 lg:row-start-1 lg:items-start' : 'lg:items-end lg:text-right'}`}>

        <p className="font-mono text-emerald-500 text-xs mb-1.5 uppercase tracking-widest">
          Featured Project
        </p>

        <h3 className="text-2xl font-bold text-white mb-2 hover:text-emerald-400 transition-colors cursor-default">
          {project.title}
        </h3>

       

        {/* floating description card — overlaps media on lg */}
        <div className={`bg-zinc-900/95 backdrop-blur-sm p-5 rounded-xl shadow-2xl border border-zinc-800 mb-4 text-sm leading-relaxed relative z-20 ${reversed ? 'lg:-mr-16' : 'lg:-ml-16'}`}>
          <p className="text-zinc-400 mb-3">{project.description}</p>

          {/* game features */}
          {isGame && project.featureGroups.length > 0 && (
            <GameFeaturePanel featureGroups={project.featureGroups} activeGroup={activeFeature} onSelect={setActiveFeature} />
          )}

          {/* ml details */}
          {isML && (
            <>
              {project.pipeline.length > 0 && (
                <div className="mb-3 space-y-1.5">
                  <p className="text-zinc-600 text-[10px] uppercase tracking-widest">Pipeline</p>
                  <PipelineRow pipeline={project.pipeline} />
                </div>
              )}
              {project.highlights.length > 0 && (
                <ul className="space-y-1 mb-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="text-zinc-400 flex items-start text-xs">
                      <span className="text-emerald-500 mr-1.5 mt-0.5 shrink-0">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              {project.gestures.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-zinc-600 text-[10px] uppercase tracking-widest">Gestos detectados</p>
                  <GestureChips gestures={project.gestures} />
                </div>
              )}
            </>
          )}

          {/* default highlights */}
          {!isGame && !isML && project.highlights.length > 0 && (
            <ul className="space-y-1">
              {project.highlights.map((h) => (
                <li key={h} className="text-zinc-400 flex items-start text-xs">
                  <span className="text-emerald-500 mr-1.5 mt-0.5 shrink-0">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* tech stack */}
        <ul className={`flex flex-wrap gap-3 text-xs font-mono text-zinc-500 mb-4 ${reversed ? '' : 'lg:justify-end'}`}>
          {project.tech.map((t) => <li key={t}>{t}</li>)}
        </ul>

        {/* action icons */}
        <div className={`flex gap-4 text-zinc-400 ${reversed ? '' : 'lg:justify-end'}`}>
          {project.github && (
            <a href={`https://github.com/${project.github}`} target="_blank" rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors" title="Ver en GitHub">
              <GithubIcon />
            </a>
          )}
        </div>
      </div>

    </div>
  );
}