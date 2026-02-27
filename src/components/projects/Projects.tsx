'use client';
import React, { useState } from 'react';
import { projects } from '@/data/Projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentVideo,   setCurrentVideo]   = useState(0);
  const [activeFeature,  setActiveFeature]  = useState(0);

  const resetVideoAndFeature = () => {
    setCurrentVideo(0);
    setActiveFeature(0);
  };

  const goTo = (idx: number) => {
    setCurrentProject(idx);
    resetVideoAndFeature();
  };

  const nextProject = () => goTo((currentProject + 1) % projects.length);
  const prevProject = () => goTo((currentProject - 1 + projects.length) % projects.length);

  return (
    <section id="projects" className="py-24 bg-[rgba(16,17,17,1)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-12">Proyectos</h2>
      </div>

      <div className="relative">
        <ProjectCard
          project={projects[currentProject]}
          currentVideo={currentVideo}
          setCurrentVideo={setCurrentVideo}
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
        />

        {/* Navigation */}
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
                  onClick={() => goTo(idx)}
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