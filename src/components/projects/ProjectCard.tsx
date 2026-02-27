'use client';
import React from 'react';

import type { Project, Video, Gesture, PipelineStep, FeatureGroup } from '@/data/projects';

// ─── GameFeaturePanel ────────────────────────────────────────────────────────
function GameFeaturePanel({
  featureGroups,
  activeGroup,
  onSelect,
}: {
  featureGroups: FeatureGroup[];
  activeGroup: number;
  onSelect: (i: number) => void;
}) {
  const group = featureGroups[activeGroup];
  if (!group) return null;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        {featureGroups.map((g, idx) => (
          <button
            key={g.label}
            onClick={() => onSelect(idx)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all border"
            style={
              idx === activeGroup
                ? { backgroundColor: g.color + '20', borderColor: g.color + '60', color: g.color }
                : { backgroundColor: 'transparent', borderColor: 'rgb(63,63,70)', color: 'rgb(113,113,122)' }
            }
          >
            <span>{g.icon}</span>
            <span className="font-medium">{g.label}</span>
          </button>
        ))}
      </div>
      <div
        className="rounded-xl p-4 border transition-all"
        style={{ borderColor: group.color + '30', backgroundColor: group.color + '08' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{group.icon}</span>
          <span className="font-semibold text-sm" style={{ color: group.color }}>
            {group.label}
          </span>
        </div>
        <ul className="space-y-2">
          {group.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
              <span className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── PipelineRow ─────────────────────────────────────────────────────────────
function PipelineRow({ pipeline }: { pipeline: PipelineStep[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {pipeline.map((step, i) => (
        <span key={step.label} className="flex items-center gap-1">
          <span className="flex flex-col items-center px-2.5 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/60 hover:border-emerald-500/40 transition-colors">
            <span className="text-base leading-none">{step.icon}</span>
            <span className="text-zinc-300 text-[10px] font-medium mt-0.5">{step.label}</span>
            <span className="text-zinc-600 text-[9px]">{step.sub}</span>
          </span>
          {i < pipeline.length - 1 && (
            <span className="text-zinc-700 text-xs select-none">→</span>
          )}
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
        <span
          key={g.key}
          className="px-2.5 py-1 rounded-full text-[11px] font-mono border"
          style={{ borderColor: g.color + '55', backgroundColor: g.color + '15', color: g.color }}
        >
          {g.label}
        </span>
      ))}
    </div>
  );
}

// ─── VideoPanel ───────────────────────────────────────────────────────────────
function VideoPanel({
  videos,
  currentVideo,
  onVideoEnd,
  onSelect,
  labelPrefix = '',
}: {
  videos: Video[];
  currentVideo: number;
  onVideoEnd: () => void;
  onSelect: (i: number) => void;
  labelPrefix?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
        <video
          key={videos[currentVideo].url}
          src={videos[currentVideo].url}
          autoPlay
          muted
          playsInline
          onEnded={onVideoEnd}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-emerald-400 text-xs font-mono border border-emerald-500/30">
            {labelPrefix}{videos[currentVideo].label}
          </span>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {videos.map((_, idx) => (
            <div
              key={idx}
              onClick={() => onSelect(idx)}
              className={`h-1 rounded-full transition-all cursor-pointer ${
                idx === currentVideo ? 'w-6 bg-emerald-500' : 'w-1 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {videos.map((v, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`px-3 py-1 rounded-lg text-xs transition-all border font-mono ${
              idx === currentVideo
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
export interface ProjectCardProps {
  project:          Project;
  currentVideo:     number;
  setCurrentVideo:  React.Dispatch<React.SetStateAction<number>>;
  activeFeature:    number;
  setActiveFeature: (i: number) => void;
}

export default function ProjectCard({
  project,
  currentVideo,
  setCurrentVideo,
  activeFeature,
  setActiveFeature,
}: ProjectCardProps) {
  const isGame    = project.type === 'game';
  const isML      = project.type === 'ml';
  const hasVideos = project.videos.length > 0;

  const handleVideoEnd = () => {
    if (hasVideos && project.videos.length > 1)
      setCurrentVideo((prev) => (prev + 1) % project.videos.length);
  };

  // ── Info (left column) ────────────────────────────────────────────────────
  const info = (
    <div className="flex flex-col justify-center space-y-5">
      {/* Title + badge */}
      <div>
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {isGame && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs">
              <span>🎮</span> C++ Engine
            </span>
          )}
          {isML && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Real-time ML
            </span>
          )}
        </div>
      </div>

      <p className="text-zinc-400 leading-relaxed text-sm">{project.description}</p>

      {/* Game: feature tabs */}
      {isGame && project.featureGroups.length > 0 && (
        <GameFeaturePanel
          featureGroups={project.featureGroups}
          activeGroup={activeFeature}
          onSelect={setActiveFeature}
        />
      )}

      {/* ML: pipeline + highlights + gestures */}
      {isML && (
        <>
          {project.pipeline.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-zinc-600 text-xs uppercase tracking-wider">Pipeline</p>
              <PipelineRow pipeline={project.pipeline} />
            </div>
          )}
          {project.highlights.length > 0 && (
            <ul className="space-y-1.5">
              {project.highlights.map((h) => (
                <li key={h} className="text-zinc-500 flex items-start text-sm">
                  <span className="text-emerald-500 mr-2 mt-0.5">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
          {project.gestures.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-zinc-600 text-xs uppercase tracking-wider">Gestos detectados</p>
              <GestureChips gestures={project.gestures} />
            </div>
          )}
        </>
      )}

      {/* Default: highlights */}
      {!isGame && !isML && project.highlights.length > 0 && (
        <ul className="space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="text-zinc-500 flex items-start text-sm">
              <span className="text-emerald-500 mr-2 mt-0.5">▹</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs">
            {t}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      {project.github && (
        <a
          href={`https://github.com/${project.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-500 transition-all group w-fit"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span>Ver código</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );

  // ── Media (right column) ──────────────────────────────────────────────────
  const media = (() => {
    if (hasVideos) {
      return (
        <VideoPanel
          videos={project.videos}
          currentVideo={currentVideo}
          onVideoEnd={handleVideoEnd}
          onSelect={setCurrentVideo}
          labelPrefix={isML ? 'demo: ' : ''}
        />
      );
    }
    return (
      <div className="aspect-video rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Sin videos disponibles</p>
      </div>
    );
  })();

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-6">
      {info}
      <div className="flex flex-col justify-center">{media}</div>
    </div>
  );
}