'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const allTech = [
  { name: "Python", icon: "devicon-python-plain colored" },
  { name: "C++", icon: "devicon-cplusplus-plain colored" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { name: "Java", icon: "devicon-java-plain colored" },
  { name: "Django", icon: "devicon-django-plain colored" },
  { name: "Flask", icon: "devicon-flask-original colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
  { name: "Supabase", icon: "devicon-supabase-plain colored" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
  { name: "MySQL", icon: "devicon-mysql-plain colored" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
  { name: "Git", icon: "devicon-git-plain colored" },
  { name: "Docker", icon: "devicon-docker-plain colored" },
  { name: "GitHub Actions", icon: "devicon-githubactions-plain colored" },
  { name: "Vercel", icon: "devicon-vercel-plain" },
  { name: "Cloudflare", icon: "devicon-cloudflare-plain colored" },
  { name: "Next.js", icon: "devicon-nextjs-plain colored" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored" },
];

const track = [...allTech, ...allTech, ...allTech];

export default function TechStack() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <>
      <style>{`
        @keyframes carousel {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .carousel-track {
          animation: carousel 35s linear infinite;
        }
        .carousel-mask:hover .carousel-track {
          animation-play-state: paused;
        }
      `}</style>

      <section
        id="techstack"
        ref={sectionRef}
        className="bg-[rgba(16,17,17,1)] relative overflow-hidden py-24"
      >
        {/* Subtle grid */}
        

       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center font-jetbrains font-bold text-white text-3xl md:text-4xl tracking-tight"
            >
              Technologies I work with
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-center font-jetbrains text-sm text-white/40 mt-2 tracking-wide"
            >
              Modern tools for modern solutions
            </motion.p>

           
          </motion.div>

          {/* Carousel wrapper — padding vertical para que el hover no se corte */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="carousel-mask relative py-3"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                overflow: 'hidden',
              }}
            >
              {/* Extra vertical space so scale-110 on hover isn't clipped */}
              <div className="py-2 overflow-visible">
                <div className="carousel-track flex gap-4 w-max">
                  {track.map((item, i) => (
                    <div
                      key={`${item.name}-${i}`}
                      className="
                        group shrink-0
                        flex flex-col items-center justify-center gap-3
                        px-5 py-4 rounded-xl
                       
                        bg-white/0.03
                        backdrop-blur-sm
                        cursor-default
                        transition-all duration-300 ease-out
                        hover:border-white/0.15
                        hover:bg-white/[0.07]
                        hover:scale-110
                        hover:-translate-y-1
                        hover:z-10
                        relative
                        min-w-25
                      "
                    >
                      <i
                        className={`${item.icon} text-[2rem] transition-transform duration-300 group-hover:scale-110`}
                      />
                      <span className="font-firacode text-[0.65rem] text-white/40 group-hover:text-white/80 transition-colors duration-300 whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}