'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const row1 = [
  { name: "Python",         icon: "devicon-python-plain colored" },
  { name: "C++",            icon: "devicon-cplusplus-plain colored" },
  { name: "TypeScript",     icon: "devicon-typescript-plain colored" },
  { name: "Java",           icon: "devicon-java-plain colored" },
  { name: "Django",         icon: "devicon-django-plain colored" },
  { name: "Flask",          icon: "devicon-flask-original colored" },
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
  { name: "Next.js",        icon: "devicon-nextjs-plain colored" },
  { name: "Tailwind CSS",   icon: "devicon-tailwindcss-plain colored" },
  { name: "React",          icon: "devicon-react-original colored" },
];

const GAP        = 8;
const CARD_W     = 150 + GAP; // card width + gap
const BASE_SPEED = 0.6;     // px per frame base
const SCROLL_BOOST = 0.18;  // scroll velocity multiplier

// ── Infinite carousel row ─────────────────────────────────────────────────────
function CarouselRow({
  items,
  direction = 1,
  scrollVelRef,
}: {
  items: typeof row1;
  direction?: 1 | -1;
  scrollVelRef: React.RefObject<number>;
}) {
  const trackRef   = useRef<HTMLDivElement>(null);
  const offsetRef  = useRef(0);
  const rafRef     = useRef(0);
  const LOOP_W     = CARD_W * items.length;
  const [hovered, setHovered] = useState<number | null>(null);

  // triple-clone for seamless loop
  const track = [...items, ...items, ...items];

  useEffect(() => {
    // start at the middle clone so we can loop both ways
    offsetRef.current = LOOP_W;

    const tick = () => {
      const vel   = scrollVelRef.current ?? 0;
      const boost = vel * SCROLL_BOOST * direction;
      const step  = (BASE_SPEED + Math.abs(boost)) * direction;

      offsetRef.current += step;

      // loop: stay in the middle clone range [LOOP_W, 2*LOOP_W]
      if (offsetRef.current >= LOOP_W * 2) offsetRef.current -= LOOP_W;
      if (offsetRef.current <  LOOP_W)     offsetRef.current += LOOP_W;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offsetRef.current.toFixed(2)}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, LOOP_W, scrollVelRef]);

  return (
    <div className="relative overflow-hidden" style={{ padding: `${GAP / 2}px 0`, perspective: '1000px' }}>
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(16,17,17,1) 0%, transparent 100%)',
        }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(16,17,17,1) 0%, transparent 100%)',
        }}
      />

      <div ref={trackRef} className="flex w-max" style={{ gap: `${GAP}px` }}>
        {track.map((item, i) => {
          const isHov    = hovered === i;
          const isDimmed = hovered !== null && !isHov;
          return (
            <div
              key={`${item.name}-${i}`}
              className="shrink-0 cursor-default"
              style={{ position: 'relative' }}
            >
              <div
                style={{
                  width:           '150px',
                  height:          '150px',
                  display:         'flex',
                  flexDirection:   'column',
                  alignItems:      'center',
                  justifyContent:  'center',
                  gap:             '12px',
                  backgroundColor: 'rgba(13,14,15,0.85)',
                  borderRadius:    '10px',
                }}
              >
                <i className={`${item.icon} text-[4.2rem]`} />
                <span
                  style={{
                    fontFamily: 'var(--font-fira-code)',
                    fontSize:   '0.65rem',
                    color:      'rgba(255,255,255,0.25)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── TechStack ─────────────────────────────────────────────────────────────────
export default function TechStack() {
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const isInView      = useInView(wrapperRef, { once: true, margin: '-80px' });
  const scrollVelRef  = useRef(0);
  const lastScrollY   = useRef(0);

  // Track scroll velocity for boost
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      const cur = window.scrollY;
      scrollVelRef.current = cur - lastScrollY.current;
      lastScrollY.current  = cur;

      // decay after scroll stops
      clearTimeout(raf);
      raf = window.setTimeout(() => {
        scrollVelRef.current = 0;
      }, 80) as unknown as number;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="techstack"
      style={{
        background: 'linear-gradient(to bottom, rgba(16,17,17,1) 0%, #010101 100%)',
      }}
      className="w-full py-24 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto px-12 mb-14 text-center"
      >
        <h2 className="font-jetbrains text-3xl md:text-4xl font-bold text-white leading-[1.1]">
          Technologies I work with
        </h2>

        <p className="font-jetbrains text-xs text-white/40 leading-snug mt-2">
          Modern tools for modern solutions
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col" style={{ gap: `${GAP}px` }}
      >
        {/* Row 1 → left */}
        <CarouselRow items={row1} direction={1}  scrollVelRef={scrollVelRef} />
        {/* Row 2 ← right */}
        <CarouselRow items={row2} direction={-1} scrollVelRef={scrollVelRef} />
      </motion.div>
    </section>
  );
}