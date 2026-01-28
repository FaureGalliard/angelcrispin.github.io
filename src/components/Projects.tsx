'use client';

import { useState } from 'react';

const projects = [
  {
    title: "ExploreValley",
    description:
      "Juego 2D desarrollado desde cero en C++ con arquitectura propia tipo engine. Sistema completo con generación procedural, IA de enemigos y sistemas desacoplados.",
    highlights: [
      "Generación procedural con streaming de chunks y biomas",
      "IA de enemigos basada en máquina de estados",
      "Sistema de combate y movimiento desacoplado",
      "Arquitectura modular (World / Systems / Renderer)"
    ],
    tech: ["C++", "SFML", "Simplex Noise", "POO", "IA"],
    type: "game",
    github: "FaureGalliard/SFML-2D-GAME",
    videos: [
      {
        url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1769570970/video2_nsrnw4.mp4"
      },
      {
        url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1769570949/video1_io6bnh.mp4"
      },
      {
        url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1769571013/video3_tmxbkm.mp4"
      }
    ]
  },
  {
    title: "Automatización & Sistemas",
    description: "Integración de datos, sensores, backend y control.",
    highlights: [
      "Integración de sensores IoT",
      "Backend escalable",
      "Sistema de control en tiempo real"
    ],
    tech: ["Python", "Node.js", "IoT"],
    type: "automation",
    videos: []
  }
];

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);

  const project = projects[currentProject];
  const hasVideos = project.videos && project.videos.length > 0;

  const handleVideoEnd = () => {
    if (hasVideos && project.videos.length > 1) {
      setCurrentVideo((prev) => (prev + 1) % project.videos.length);
    }
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setCurrentVideo(0);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setCurrentVideo(0);
  };

  return (
    <section id="projects" className="py-24 bg-[rgba(16,17,17,1)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-12">Proyectos</h2>
      </div>

      {/* Carrusel Container */}
      <div className="relative">
        {/* Contenido del proyecto actual */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-6">
          {/* Lado izquierdo: Información */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold">{project.title}</h3>
            </div>

            <p className="text-zinc-400 leading-relaxed text-sm">
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="text-zinc-500 flex items-start text-sm">
                    <span className="text-emerald-500 mr-2 mt-0.5">▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2">
              {project.tech && project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-zinc-800 
                             text-zinc-300 border border-zinc-700 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>

            {project.github && (
              <div>
              <a
                href={`https://github.com/${project.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-500 transition-all group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492 .997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Ver código</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            )}
          </div>

          {/* Lado derecho: Videos */}
          <div className="relative">
            {hasVideos ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <video
                  key={project.videos[currentVideo].url}
                  src={project.videos[currentVideo].url}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-cover"
                />

                {/* Indicadores de video */}
                {project.videos.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.videos.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentVideo 
                            ? 'w-8 bg-emerald-500' 
                            : 'w-1.5 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 
                            border border-zinc-700 flex items-center justify-center">
                <p className="text-zinc-500 text-sm">Sin videos disponibles</p>
              </div>
            )}
          </div>
        </div>

        {/* Controles de navegación de proyectos */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="flex items-center justify-between">
            <button
              onClick={prevProject}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg 
                       bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 
                       hover:border-emerald-500 transition-all group text-sm"
            >
              <svg 
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Anterior</span>
            </button>

            {/* Indicadores de proyecto */}
            <div className="flex gap-3">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentProject(idx);
                    setCurrentVideo(0);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentProject 
                      ? 'w-10 bg-emerald-500' 
                      : 'w-2.5 bg-zinc-700 hover:bg-zinc-600'
                  }`}
                  aria-label={`Ver proyecto ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg 
                       bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 
                       hover:border-emerald-500 transition-all group text-sm"
            >
              <span>Siguiente</span>
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}