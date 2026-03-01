'use client';
import React, { useState } from 'react';
import type { Project, Video } from '@/data/Projects';
import { projects } from '@/data/Projects';

const PRIMARY = '#4a6ef5';

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

const FolderIcon = () => (
  <svg className="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
    <path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z" />
  </svg>
);

// ─── Window controls ──────────────────────────────────────────────────────────
const WindowControls: React.FC = () => (
  <div className="flex gap-2">
    <div className="w-3 h-3 rounded-full bg-red-500" />
    <div className="w-3 h-3 rounded-full bg-yellow-400" />
    <div className="w-3 h-3 rounded-full bg-green-500" />
  </div>
);

const CodeBlockHeader: React.FC<{ filename?: string }> = ({ filename }) => (
  <div className="flex items-center px-4 py-3 bg-zinc-800 border-b border-zinc-700 rounded-t-lg">
    <WindowControls />
    {filename && (
      <span className="ml-4 text-xs text-zinc-400 font-mono">{filename}</span>
    )}
  </div>
);

// ─── Video panel ─────────────────────────────────────────────────────────────
function VideoPanel({
  videos, currentVideo, setCurrentVideo,
}: {
  videos: Video[];
  currentVideo: number;
  setCurrentVideo: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="relative overflow-hidden group">
      <div className="w-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
      <video
        key={videos[currentVideo].url}
        src={videos[currentVideo].url}
        autoPlay muted playsInline
        onEnded={() => setCurrentVideo((p) => (p + 1) % videos.length)}
        className="w-full object-cover transform group-hover:scale-105 transition-transform duration-500  "
      />
      
      {/* dot nav */}
      {videos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentVideo(i)}
              className={`h-1 rounded-full transition-all ${i === currentVideo ? 'w-10' : 'w-6 bg-white/30 hover:bg-white/50'}`}
              style={i === currentVideo ? { width: '1.5rem', backgroundColor: PRIMARY } : {}}
            />
          ))}
        </div>
      )}
      {/* tab buttons */}
      
    </div>
  );
}

// ─── FeaturedProjectCard ──────────────────────────────────────────────────────
interface FeaturedProjectCardProps {
  project: Project;
  index: number;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project, index }) => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const reversed  = index % 2 !== 0;
  const hasVideos = project.videos.length > 0;
  const filename = `${project.title.replace(/\s+/g, "_")}.mp4`;
  const imageBlock = (
    <div className={`lg:col-span-7 relative group cursor-pointer ${reversed ? 'order-1 lg:order-2' : ''}`}>
      <div className="rounded-lg overflow-hidden shadow-2xl border border-zinc-700">
        <CodeBlockHeader filename={filename} />
        <div className="relative overflow-hidden">
          {hasVideos ? (
            <VideoPanel
              videos={project.videos}
              currentVideo={currentVideo}
              setCurrentVideo={setCurrentVideo}
            />
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex flex-col items-center justify-center gap-2">
              <span className="text-4xl opacity-20">{project.type === 'game' ? '🎮' : project.type === 'ml' ? '🤖' : '⚙️'}</span>
              <span className="text-zinc-600 text-xs font-mono">sin preview</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const infoBlock = (
    <div className={`lg:col-span-5 flex flex-col z-20 ${reversed ? 'lg:items-start order-2 lg:order-1' : 'lg:text-right lg:items-end'}`}>
      <p className="font-jetbrains text-sm mb-2" style={{ color: PRIMARY }}>Featured Project</p>
      <h3 className="text-2xl font-jetbrains font-bold text-white mb-4 transition-colors cursor-pointer hover:opacity-80">
        {project.title}
      </h3>

      {/* floating description card */}
      <div className={`bg-[#1a1a1a] font-firacode p-6 rounded-lg shadow-xl border border-zinc-700 mb-4 text-zinc-400 text-sm leading-relaxed backdrop-blur-sm relative z-20 ${reversed ? 'lg:-mr-16' : 'lg:-ml-16'}`}>
        {project.description}
      </div>

      {/* tech stack */}
      <ul className={`font-firacode flex flex-wrap gap-4 text-xs  text-zinc-400 mb-6 ${reversed ? '' : 'lg:justify-end'}`}>
        {project.tech.map((t) => <li key={t}>{t}</li>)}
      </ul>

      {/* action icons */}
      <div className={`flex gap-4 text-white ${reversed ? '' : 'lg:justify-end'}`}>
        {project.github && (
          <a href={`https://github.com/${project.github}`} target="_blank" rel="noopener noreferrer"
            className="transition-colors hover:opacity-70 color-white">
            <GithubIcon />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {reversed ? <>{infoBlock}{imageBlock}</> : <>{imageBlock}{infoBlock}</>}
    </div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-zinc-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* header */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl font-jetbrains font-bold text-white">Featured Projects</h2>
          <div className="h-px bg-zinc-700 flex-grow max-w-xs ml-4" />
        </div>

        {/* featured list */}
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