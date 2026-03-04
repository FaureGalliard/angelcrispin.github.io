'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const row1 = [
  { name: "Python",         icon: "devicon-python-plain colored" },
  { name: "C++",            icon: "devicon-cplusplus-plain colored" },
  { name: "TypeScript",     icon: "devicon-typescript-plain colored" },
  { name: "Java",           icon: "devicon-java-plain colored" },
  { name: "Django",         icon: "devicon-django-plain colored" },
  { name: "Flask",          icon: "devicon-flask-original" },
  { name: "Node.js",        icon: "devicon-nodejs-plain colored" },
  { name: "FastAPI",        icon: "devicon-fastapi-plain colored" },
  { name: "Supabase",       icon: "devicon-supabase-plain colored" },
  { name: "PostgreSQL",     icon: "devicon-postgresql-plain colored" },
];
const row2 = [
  { name: "MySQL",          icon: "devicon-mysql-plain colored" },
  { name: "MongoDB",        icon: "devicon-mongodb-plain colored" },
  { name: "Git",            icon: "devicon-git-plain colored" },
  { name: "Docker",         icon: "devicon-docker-plain colored" },
  { name: "GitHub Actions", icon: "devicon-githubactions-plain colored" },
  { name: "Vercel",         icon: "devicon-vercel-plain" },
  { name: "Cloudflare",     icon: "devicon-cloudflare-plain colored" },
  { name: "Next.js",        icon: "devicon-nextjs-plain" },
  { name: "Tailwind CSS",   icon: "devicon-tailwindcss-plain colored" },
  { name: "React",          icon: "devicon-react-original colored" },
];

const GAP          = 8;
const CARD_W       = 150 + GAP;
const BASE_SPEED   = 0.6;
const SCROLL_BOOST = 0.18;
const OVERFLOW_PAD = 24;

function CarouselRow({
  items,
  direction = 1,
  scrollVelRef,
  hoveredCard,
  onHover,
  rowId,
}: {
  items: typeof row1;
  direction?: 1 | -1;
  scrollVelRef: React.RefObject<number>;
  hoveredCard: string | null;
  onHover: (id: string | null) => void;
  rowId: string;
}) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef    = useRef(0);
  const LOOP_W    = CARD_W * items.length;
  const track     = [...items, ...items, ...items];

  useEffect(() => {
    offsetRef.current = LOOP_W;
    const tick = () => {
      const vel   = scrollVelRef.current ?? 0;
      const boost = vel * SCROLL_BOOST * direction;
      const step  = (BASE_SPEED + Math.abs(boost)) * direction;
      offsetRef.current += step;
      if (offsetRef.current >= LOOP_W * 2) offsetRef.current -= LOOP_W;
      if (offsetRef.current <  LOOP_W)     offsetRef.current += LOOP_W;
      if (trackRef.current)
        trackRef.current.style.transform = `translateX(-${offsetRef.current.toFixed(2)}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, LOOP_W, scrollVelRef]);

  return (
    <>
      <style>{`
        .tech-card-inner {
          transition: transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.35s ease;
        }
        .tech-card-inner.hovered {
          transform: scale(1.05) translateY(-4px);
          box-shadow: 0 28px 52px rgba(0,0,0,0.75),
                      inset 0 1px 0 rgba(255,255,255,0.07);
        }
      `}</style>

      <div
        className="relative"
        style={{
          overflowX: 'hidden',
          overflowY: 'visible',
          paddingTop: `${OVERFLOW_PAD}px`,
          paddingBottom: `${OVERFLOW_PAD}px`,
          marginTop: `-${OVERFLOW_PAD}px`,
          marginBottom: `-${OVERFLOW_PAD}px`,
        }}
      >
        {/* Gradient fade — left */}
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(1,1,1,1) 0%, transparent 100%)' }} />
        {/* Gradient fade — right */}
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(1,1,1,1) 0%, transparent 100%)' }} />

        <div ref={trackRef} className="flex w-max" style={{ gap: `${GAP}px` }}>
          {track.map((item, i) => {
            const cardId      = `${rowId}-${item.name}-${i}`;
            const isHovered   = hoveredCard === cardId;
            const someHovered = hoveredCard !== null;

            return (
              <div
                key={cardId}
                className="shrink-0 cursor-default"
                onMouseEnter={() => onHover(cardId)}
                onMouseLeave={() => onHover(null)}
                style={{
                  position: 'relative',
                  zIndex: isHovered ? 20 : 1,
                  opacity: someHovered && !isHovered ? 0.2 : 1,
                  transition: 'opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div
                  className={`tech-card-inner${isHovered ? ' hovered' : ''}`}
                  style={{
                    width: '150px',
                    height: '150px',
                    position: 'relative',
                    borderRadius: '10px',
                    backgroundColor: '#090909',
                    border: '1px solid #151515',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* White glow — bottom */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      borderRadius: '2x',
                      background: isHovered
                        ? 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,255,255,0.13) 0%, transparent 70%)'
                        : 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,255,255,0.055) 0%, transparent 70%)',
                      transition: 'background 0.35s ease',
                    }}
                  />

                  {/* Decorative grid */}
                 

                  {/* Icon + label */}
                  <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                    <i
                      className={`${item.icon} text-[3.6rem]`}
                      style={{
                        filter: isHovered ? 'brightness(1.5)' : 'brightness(1.1)',
                        transition: 'filter 0.25s ease',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-fira-code)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.06em',
                        color: isHovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.22)',
                        whiteSpace: 'nowrap',
                        textTransform: 'uppercase',
                        transition: 'color 0.25s ease',
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function TechStack() {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const isInView     = useInView(wrapperRef, { once: true, margin: '-80px' });
  const scrollVelRef = useRef(0);
  const lastScrollY  = useRef(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      const cur = window.scrollY;
      scrollVelRef.current = cur - lastScrollY.current;
      lastScrollY.current  = cur;
      clearTimeout(raf);
      raf = window.setTimeout(() => { scrollVelRef.current = 0; }, 80) as unknown as number;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="techstack"
      className="relative w-full py-24 overflow-hidden"
      style={{ background: '#010101' }}
    >
      {/* Orb verde */}
      <div className="pointer-events-none absolute" style={{ left: '10%', top: '50%', transform: 'translateY(-50%)', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,219,149,0.13) 0%, rgba(108,219,149,0.05) 45%, transparent 70%)', filter: 'blur(40px)' }} />
      {/* Orb amarillo */}
      <div className="pointer-events-none absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,218,99,0.11) 0%, rgba(248,218,99,0.04) 45%, transparent 70%)', filter: 'blur(45px)' }} />
      {/* Orb rojo */}
      <div className="pointer-events-none absolute" style={{ right: '10%', top: '50%', transform: 'translateY(-50%)', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(228,111,111,0.12) 0%, rgba(228,111,111,0.04) 45%, transparent 70%)', filter: 'blur(42px)' }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto px-12 mb-14 text-center"
      >
        <h2 className="font-jetbrains text-3xl md:text-4xl font-bold text-white leading-[1.1]">
          Technologies I work with
        </h2>
        <p className="font-jetbrains text-sm text-[#4260C5] leading-snug mt-2">
         tecnologías con las que trabajo y me gusta usar en mis proyectos.
         
        </p>
      </motion.div>

      {/* Carousels */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col"
        style={{ gap: `${GAP}px` }}
      >
        <CarouselRow items={row1} direction={1}  scrollVelRef={scrollVelRef} hoveredCard={hoveredCard} onHover={setHoveredCard} rowId="row1" />
        <CarouselRow items={row2} direction={-1} scrollVelRef={scrollVelRef} hoveredCard={hoveredCard} onHover={setHoveredCard} rowId="row2" />
      </motion.div>
    </section>
  );
}