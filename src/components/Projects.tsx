'use client';
import React, { useState } from 'react';


// ─── Types ──────────────────────────────────────────────────────────────────
interface Video        { url: string; label: string; }
interface Gesture      { key: string; label: string; color: string; }
interface PipelineStep { icon: string; label: string; sub: string; }
interface FeatureGroup { icon: string; label: string; color: string; items: string[]; }
interface Project {
  title:         string;
  description:   string;
  tech:          string[];
  type:          string;
  github:        string | null;
  highlights:    string[];
  gestures:      Gesture[];
  pipeline:      PipelineStep[];
  featureGroups: FeatureGroup[];
  videos:        Video[];
}

const projects: Project[] = [
  {
    title: "Save the Valley",
    description:
      "Juego sandbox 2D desarrollado desde cero en C++ con arquitectura propia tipo engine. Mundo infinito procedural, combate con múltiples armas, IA con máquina de estados y renderizado optimizado por chunks.",
    tech: ["C++17", "SFML 2.6", "CMake", "Simplex Noise"],
    type: "game",
    github: "FaureGalliard/SFML-2D-GAME",
    featureGroups: [
      {
        icon: "🌍",
        label: "Mundo Procedural",
        color: "#4ade80",
        items: [
          "Chunks infinitos con carga/descarga dinámica",
          "Múltiples biomas con terrenos únicos",
          "Autotiling para transiciones suaves entre tiles",
          "Objetos con colisión (árboles, rocas, estructuras)",
        ],
      },
      {
        icon: "⚔️",
        label: "Combate",
        color: "#f87171",
        items: [
          "Espada, hacha y martillo con hitboxes dinámicas",
          "Daño, salud e invulnerabilidad temporal",
          "Animaciones de ataque, daño y muerte",
        ],
      },
      {
        icon: "🤖",
        label: "IA de Enemigos",
        color: "#fb923c",
        items: [
          "Estados: Idle → Wandering → Hunting",
          "Detección de jugador por rango",
          "Persecución con evasión de obstáculos",
        ],
      },
      {
        icon: "🎨",
        label: "Renderizado",
        color: "#818cf8",
        items: [
          "Renderizado por chunks visibles (optimizado)",
          "Capas: terreno / objetos / entidades",
          "Cámara suave + modo debug de colisiones",
        ],
      },
    ],
    highlights: [],
    gestures: [],
    pipeline: [],
    videos: [
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550483/WorldGeneration_ec6tqz.mov", label: "World Gen" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550482/CombatSystem_bxf0de.mov", label: "Combate" },
    ],
  },
  {
    title: "GestureKey",
    description:
      "Sistema de detección de gestos de mano en tiempo real que traduce movimientos en atajos de teclado del sistema operativo. Arquitectura limpia por capas con ML integrado.",
    highlights: [
      "Pipeline modular: Cámara → Tracker → Clasificador → Motor de gestos",
      "Modelo Random Forest entrenado sobre 21 landmarks anatómicos",
      "8 gestos distintos: scroll, volumen, zoom, screenshot, task view y más",
      "Estabilizador temporal que elimina predicciones ruidosas",
      "Aplicación de bandeja del sistema con PyQt6, corre en background",
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "Scikit-learn", "PyQt6"],
    type: "ml",
    github: null,
    featureGroups: [],
    pipeline: [
      { icon: "📷", label: "Captura", sub: "OpenCV" },
      { icon: "🖐", label: "Landmarks", sub: "MediaPipe" },
      { icon: "🧠", label: "Clasifica", sub: "Random Forest" },
      { icon: "⚡", label: "Acción", sub: "Gesture Engine" },
    ],
    gestures: [
      { key: "TWO_FINGERS", label: "Scroll", color: "#50dc8a" },
      { key: "THREE_FINGERS", label: "Volumen", color: "#50c8dc" },
      { key: "PINCH", label: "Zoom", color: "#a078dc" },
      { key: "PALM→FIST", label: "Pausa", color: "#dc8c50" },
      { key: "PALM×2", label: "Task View", color: "#dc5078" },
    ],
    videos: [
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550474/Scroll_bkjocl.mov", label: "Scroll" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550473/Volume_tozkwu.mov", label: "Volumen" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550472/task_view_ghj9qr.mov", label: "Task View" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550471/Pause_u8vjtl.mp4", label: "Pausa" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550851/trayapp_dwqkxm.mp4", label: "Tray App" },
    ],
  },
  {
    title: "Automatización & Sistemas",
    description: "Integración de datos, sensores, backend y control.",
    highlights: [
      "Integración de sensores IoT",
      "Backend escalable",
      "Sistema de control en tiempo real",
    ],
    tech: ["Python", "Node.js", "IoT"],
    type: "automation",
    featureGroups: [],
    pipeline: [],
    gestures: [],
    videos: [],
  },
];

// ─── GameFeaturePanel ───────────────────────────────────────────────────────
function GameFeaturePanel({ featureGroups, activeGroup, onSelect }: { featureGroups: FeatureGroup[]; activeGroup: number; onSelect: (i: number) => void; }) {
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

// ─── GameVideoPanel ─────────────────────────────────────────────────────────
function GameVideoPanel({ videos, currentVideo, onVideoEnd, onSelect }: { videos: Video[]; currentVideo: number; onVideoEnd: () => void; onSelect: (i: number) => void; }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
        <video
          key={videos[currentVideo].url}
          src={videos[currentVideo].url}
          autoPlay muted playsInline
          onEnded={onVideoEnd}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-emerald-400 text-xs font-mono border border-emerald-500/30">
            {videos[currentVideo].label}
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
      <div className="flex gap-2">
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

// ─── PipelineRow ────────────────────────────────────────────────────────────
function PipelineRow({ pipeline }: { pipeline: PipelineStep[]; }) {
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

// ─── GestureChips ───────────────────────────────────────────────────────────
function GestureChips({ gestures }: { gestures: Gesture[]; }) {
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

// ─── GestureVideoPanel ──────────────────────────────────────────────────────
function GestureVideoPanel({ videos, currentVideo, onVideoEnd, onSelect }: { videos: Video[]; currentVideo: number; onVideoEnd: () => void; onSelect: (i: number) => void; }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
        <video
          key={videos[currentVideo].url}
          src={videos[currentVideo].url}
          autoPlay muted playsInline
          onEnded={onVideoEnd}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-emerald-400 text-xs font-mono border border-emerald-500/30">
            demo: {videos[currentVideo].label}
          </span>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {videos.map((_, idx) => (
            <div
              key={idx}
              onClick={() => onSelect(idx)}
              className={`h-1 rounded-full transition-all cursor-pointer ${
                idx === currentVideo ? 'w-6 bg-emerald-500' : 'w-1 bg-white/20'
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

// ─── ProjectInfo ────────────────────────────────────────────────────────────
function ProjectInfo({ project, activeFeature, setActiveFeature }: { project: Project; activeFeature: number; setActiveFeature: (i: number) => void; }) {
  const isGame    = project.type === 'game';
  const isGesture = project.type === 'ml';

  return (
    <div className="flex flex-col justify-center space-y-5">
      <div>
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {isGame && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs">
              <span>🎮</span> C++ Engine
            </span>
          )}
          {isGesture && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Real-time ML
            </span>
          )}
        </div>
      </div>

      <p className="text-zinc-400 leading-relaxed text-sm">{project.description}</p>

      {isGame && project.featureGroups.length > 0 && (
        <GameFeaturePanel
          featureGroups={project.featureGroups}
          activeGroup={activeFeature}
          onSelect={setActiveFeature}
        />
      )}

      {isGesture && (
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

      {!isGame && !isGesture && project.highlights.length > 0 && (
        <ul className="space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="text-zinc-500 flex items-start text-sm">
              <span className="text-emerald-500 mr-2 mt-0.5">▹</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs">
            {t}
          </span>
        ))}
      </div>

      {project.github && (
        <a
          href={`https://github.com/${project.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-500 transition-all group w-fit"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>Ver código</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );
}

// ─── ProjectMedia ────────────────────────────────────────────────────────────
function ProjectMedia({ project, currentVideo, setCurrentVideo }: { project: Project; currentVideo: number; setCurrentVideo: React.Dispatch<React.SetStateAction<number>>; }) {
  const isGame    = project.type === 'game';
  const isGesture = project.type === 'ml';
  const hasVideos = project.videos.length > 0;

  const handleVideoEnd = () => {
    if (hasVideos && project.videos.length > 1)
      setCurrentVideo((prev) => (prev + 1) % project.videos.length);
  };

  if (isGame && hasVideos) {
    return (
      <GameVideoPanel
        videos={project.videos}
        currentVideo={currentVideo}
        onVideoEnd={handleVideoEnd}
        onSelect={setCurrentVideo}
      />
    );
  }

  if (isGesture && hasVideos) {
    return (
      <GestureVideoPanel
        videos={project.videos}
        currentVideo={currentVideo}
        onVideoEnd={handleVideoEnd}
        onSelect={setCurrentVideo}
      />
    );
  }

  if (hasVideos) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
        <video
          key={project.videos[currentVideo].url}
          src={project.videos[currentVideo].url}
          autoPlay muted playsInline
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover"
        />
        {project.videos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {project.videos.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all ${
                idx === currentVideo ? 'w-8 bg-emerald-500' : 'w-1.5 bg-white/30'
              }`} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center">
      <p className="text-zinc-500 text-sm">Sin videos disponibles</p>
    </div>
  );
}

// ─── Componente principal ───────────────────────────────────────────────────
export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentVideo, setCurrentVideo]     = useState(0);
  const [activeFeature, setActiveFeature]   = useState(0);

  const project = projects[currentProject];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setCurrentVideo(0);
    setActiveFeature(0);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setCurrentVideo(0);
    setActiveFeature(0);
  };

  return (
    <section id="projects" className="py-24 bg-[rgba(16,17,17,1)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-12">Proyectos</h2>
      </div>

      <div className="relative">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-6">
          <ProjectInfo
            project={project}
            activeFeature={activeFeature}
            setActiveFeature={setActiveFeature}
          />
          <div className="flex flex-col justify-center">
            <ProjectMedia
              project={project}
              currentVideo={currentVideo}
              setCurrentVideo={setCurrentVideo}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="flex items-center justify-between">
            <button
              onClick={prevProject}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-500 transition-all group text-sm"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Anterior</span>
            </button>

            <div className="flex gap-3">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentProject(idx); setCurrentVideo(0); setActiveFeature(0); }}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentProject ? 'w-10 bg-emerald-500' : 'w-2.5 bg-zinc-700 hover:bg-zinc-600'
                  }`}
                  aria-label={`Ver proyecto ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-500 transition-all group text-sm"
            >
              <span>Siguiente</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}