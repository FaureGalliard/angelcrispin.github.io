'use client';
import React, { useState } from 'react';
import type { Project, Video } from '@/data/Projects';
import { projects } from '@/data/Projects';

// ─── Colors ───────────────────────────────────────────────────────────────────
const C = {
  bg:        '#0e0e0e',
  surface:   '#1a1a1a',
  border:    '#2a2a2a',
  primary:   '#4d9fff',
  muted:     '#6b7280',
  mutedDim:  'rgba(107,114,128,0.6)',
  white:     '#ffffff',
  dotRed:    '#ff5f57',
  dotYellow: '#febc2e',
  dotGreen:  '#28c840',
  sectionBg: 'rgba(26,26,26,0.3)',
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
  </svg>
);

// ─── Window Controls ──────────────────────────────────────────────────────────
const WindowControls: React.FC = () => (
  <div className="flex gap-2">
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: C.dotRed }} />
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: C.dotYellow }} />
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: C.dotGreen }} />
  </div>
);

// ─── Code Block Header ────────────────────────────────────────────────────────
const CodeBlockHeader: React.FC<{ filename?: string }> = ({ filename }) => (
  <div
    className="flex items-center px-4 py-3 border-b rounded-t-lg"
    style={{ backgroundColor: C.surface, borderColor: C.border }}
  >
    <WindowControls />
    {filename && (
      <span className="ml-4 text-xs font-mono" style={{ color: C.muted }}>
        {filename}
      </span>
    )}
  </div>
);

// ─── Video Panel ──────────────────────────────────────────────────────────────
function VideoPanel({
  videos,
  currentVideo,
  setCurrentVideo,
}: {
  videos: Video[];
  currentVideo: number;
  setCurrentVideo: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="relative overflow-hidden group">
      <video
        key={videos[currentVideo].url}
        src={videos[currentVideo].url}
        autoPlay
        muted
        playsInline
        onEnded={() => setCurrentVideo((p) => (p + 1) % videos.length)}
        className="w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />

      {/* dot nav */}
      {videos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {videos.map((v, i) => (
            <button
              key={i}
              onClick={() => setCurrentVideo(i)}
              title={v.label}
              className="h-1 rounded-full transition-all"
              style={{
                width: i === currentVideo ? '1.5rem' : '1.25rem',
                backgroundColor:
                  i === currentVideo ? C.primary : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── No-Preview Placeholder ───────────────────────────────────────────────────
const NoPreview: React.FC<{ type: string }> = ({ type }) => (
  <div
    className="w-full aspect-video flex flex-col items-center justify-center gap-2"
    style={{
      background: `linear-gradient(135deg, ${C.surface} 0%, #111111 100%)`,
    }}
  >
    <span className="text-4xl opacity-20">
      {type === 'game' ? '🎮' : type === 'ml' ? '🤖' : '⚙️'}
    </span>
    <span className="text-xs font-mono" style={{ color: C.border }}>
      sin preview
    </span>
  </div>
);

// ─── Featured Project Card ────────────────────────────────────────────────────
interface FeaturedProjectCardProps {
  project: Project;
  index: number;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project, index }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const reversed  = index % 2 !== 0;
  const hasVideos = project.videos.length > 0;
  const filename  = `${project.title.replace(/\s+/g, '_')}.mp4`;

  const imageBlock = (
    <div
      className={`lg:col-span-7 relative group cursor-pointer ${
        reversed ? 'order-1 lg:order-2' : ''
      }`}
    >
      <div
        className="rounded-lg overflow-hidden shadow-2xl border"
        style={{ borderColor: C.border, borderRadius: '8px' }}
      >
        <CodeBlockHeader filename={filename} />
        <div className="relative overflow-hidden">
          {hasVideos ? (
            <VideoPanel
              videos={project.videos}
              currentVideo={currentVideo}
              setCurrentVideo={setCurrentVideo}
            />
          ) : (
            <NoPreview type={project.type} />
          )}
        </div>
      </div>
    </div>
  );

  const infoBlock = (
    <div
      className={`lg:col-span-5 flex flex-col z-20 ${
        reversed
          ? 'lg:items-start order-2 lg:order-1'
          : 'lg:text-right lg:items-end'
      }`}
    >
      {/* label */}
      <p className="font-mono text-sm mb-2" style={{ color: C.primary }}>
        Featured Project
      </p>

      {/* title */}
      <h3
        className="text-2xl font-bold mb-4 cursor-pointer transition-opacity hover:opacity-75"
        style={{ color: C.white }}
      >
        {project.title}
      </h3>

      {/* floating description card */}
      <div
        className={`p-6 rounded-lg shadow-xl border mb-4 text-sm leading-relaxed backdrop-blur-sm relative z-20 font-mono ${
          reversed ? 'lg:-mr-16' : 'lg:-ml-16'
        }`}
        style={{
          backgroundColor: C.surface,
          borderColor: C.border,
          color: C.muted,
        }}
      >
        {project.description}
      </div>

      {/* tech stack */}
      <ul
        className={`flex flex-wrap gap-4 text-xs font-mono mb-6 ${
          reversed ? '' : 'lg:justify-end'
        }`}
        style={{ color: C.muted }}
      >
        {project.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      {/* action icons */}
      <div
        className={`flex gap-4 ${reversed ? '' : 'lg:justify-end'}`}
        style={{ color: C.white }}
      >
        <a
          href={project.github ? `https://github.com/${project.github}` : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.white)}
        >
          <GithubIcon />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.white)}
        >
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  );

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {reversed ? (
        <>
          {infoBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {infoBlock}
        </>
      )}
    </div>
  );
};

// ─── Projects Section ─────────────────────────────────────────────────────────
const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="py-24 relative"
      style={{ backgroundColor: C.sectionBg }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* heading */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl font-bold" style={{ color: C.white }}>
            Featured Projects
          </h2>
          <div
            className="h-px flex-grow max-w-xs ml-4"
            style={{ backgroundColor: C.border }}
          />
        </div>

        {/* list */}
        <div className="space-y-24">
          {projects.map((project, idx) => (
            <FeaturedProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;