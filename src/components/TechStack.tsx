'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const allTech = [
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
  { name: "MySQL",          icon: "devicon-mysql-plain colored" },
  { name: "MongoDB",        icon: "devicon-mongodb-plain colored" },
  { name: "Git",            icon: "devicon-git-plain colored" },
  { name: "Docker",         icon: "devicon-docker-plain colored" },
  { name: "GitHub Actions", icon: "devicon-githubactions-plain colored" },
  { name: "Vercel",         icon: "devicon-vercel-plain" },
  { name: "Cloudflare",     icon: "devicon-cloudflare-plain colored" },
  { name: "Next.js",        icon: "devicon-nextjs-plain colored" },
  { name: "Tailwind CSS",   icon: "devicon-tailwindcss-plain colored" },
];

const track = [...allTech, ...allTech, ...allTech];

const CARD_W    = 120 + 6;
const LOOP_W    = CARD_W * allTech.length - 6;
const SCROLL_VH = 200;

// ── Title shine hook (same logic as Hero) ─────────────────────────────────────
function useTitleShine(triggerRef: React.RefObject<HTMLElement>) {
  const h2Ref   = useRef<HTMLHeadingElement>(null);
  const rafRef  = useRef<number>(0);
  const shineX  = useRef(-20);
  const running = useRef(false);
  const done    = useRef(false);

  const setGradient = (x: number, o: number) => {
    if (!h2Ref.current) return;
    h2Ref.current.style.backgroundImage = `linear-gradient(
      105deg,
      white                        0%,
      white                        ${x - 20}%,
      rgba(237,241,254,${o})       ${x - 8}%,
      rgba(255,255,255,${o})       ${x}%,
      rgba(180,200,255,${o * 0.9}) ${x + 5}%,
      white                        ${x + 16}%,
      white                        100%
    )`;
  };

  const clearGradient = () => {
    if (h2Ref.current)
      h2Ref.current.style.backgroundImage = 'linear-gradient(105deg, white 0%, white 100%)';
  };

  const introOpacity = (x: number) => {
    if (x < 10)  return x / 10;
    if (x < 85)  return 1;
    return 1 - (x - 85) / 35;
  };

  const sweep = () => {
    shineX.current = Math.min(shineX.current + 1.4, 120);
    const o = Math.max(0, introOpacity(shineX.current));
    setGradient(shineX.current, o);
    if (shineX.current >= 120) {
      running.current = false;
      done.current    = true;
      clearGradient();
      return;
    }
    rafRef.current = requestAnimationFrame(sweep);
  };

  useEffect(() => {
    // Fire shine when section enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current && !running.current) {
          running.current = true;
          shineX.current  = -20;
          rafRef.current  = requestAnimationFrame(sweep);
        }
      },
      { threshold: 0.3 }
    );
    if (triggerRef.current) observer.observe(triggerRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [triggerRef]);

  return h2Ref;
}

// ── TechStack ─────────────────────────────────────────────────────────────────
export default function TechStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const isInView   = useInView(wrapperRef, { once: true, margin: '-80px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [progress, setProgress]         = useState(0);

  // Center item detection
  const [centerIndex, setCenterIndex] = useState<number | null>(null);

  // Title shine
  const h2Ref = useTitleShine(wrapperRef as React.RefObject<HTMLElement>);

  // smooth eased offset
  const easedOffsetRef  = useRef(0);
  const targetOffsetRef = useRef(0);
  const scrollVelRef    = useRef(0); // for micro vertical movement
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnapping      = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track   = trackRef.current;
    if (!wrapper || !track) return;

    track.style.animation = 'none';

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Snap target: find nearest card center relative to viewport center
    const getSnapTarget = () => {
      const viewportCenterX = window.innerWidth / 2;
      const trackRect = track.getBoundingClientRect();
      const relativeCenter = viewportCenterX - trackRect.left;
      // Which card index is closest to center
      const nearestIdx = Math.round(relativeCenter / CARD_W);
      // Offset needed so that card sits exactly at viewport center
      // current offset + (relativeCenter - nearestIdx * CARD_W + CARD_W/2 - CARD_W/2)
      const cardCenterInTrack = nearestIdx * CARD_W - CARD_W / 2 + CARD_W / 2;
      const snapOffset = easedOffsetRef.current - (relativeCenter - nearestIdx * CARD_W);
      return snapOffset;
    };

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      isSnapping.current = false; // interrupt any ongoing snap

      const rect       = wrapper.getBoundingClientRect();
      const wrapperH   = wrapper.offsetHeight;
      const stickyH    = window.innerHeight;
      const scrolled   = -rect.top;
      const scrollable = wrapperH - stickyH;
      const rawP = Math.min(1, Math.max(0, scrolled / scrollable));
      setProgress(rawP);

      const easedP = easeInOutCubic(rawP);
      targetOffsetRef.current = easedP * LOOP_W;

      const curY = window.scrollY;
      scrollVelRef.current = curY - lastScrollY;
      lastScrollY = curY;

      // Debounce: detect scroll stop → trigger snap
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = setTimeout(() => {
        // Only snap if we're inside the sticky zone
        const rect2 = wrapper.getBoundingClientRect();
        const inZone = rect2.top <= 0 && rect2.bottom >= window.innerHeight;
        if (!inZone) return;

        isSnapping.current = true;
        const snapTo = getSnapTarget();
        targetOffsetRef.current = snapTo;
      }, 120); // 120ms after last scroll event
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let raf = 0;
    const tick = () => {
      const curr = easedOffsetRef.current;
      const tgt  = targetOffsetRef.current;
      const diff = tgt - curr;

      // Tighter lerp when snapping for that magnetic feel
      const lerpFactor = isSnapping.current ? 0.1 : 0.08;
      easedOffsetRef.current += diff * lerpFactor;

      scrollVelRef.current *= 0.85;

      if (track) {
        const microY = isSnapping.current ? 0 : -Math.abs(scrollVelRef.current) * 0.15;
        track.style.transform = `translateX(-${easedOffsetRef.current.toFixed(2)}px) translateY(${microY.toFixed(2)}px)`;
      }

      // Center index detection
      const viewportCenterX = window.innerWidth / 2;
      const trackRect = track.getBoundingClientRect();
      const relativeCenter = viewportCenterX - trackRect.left;
      const idx = Math.round(relativeCenter / CARD_W);
      setCenterIndex(idx);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .carousel-track { will-change: transform; }
      `}</style>

      <div
        ref={wrapperRef}
        style={{ height: `calc(100vh + ${SCROLL_VH}vh)` }}
        className="relative"
        id="techstack"
      >
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: '100vh', backgroundColor: 'rgba(16,17,17,1)' }}
        >
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-14"
            >
              {/* Shine title */}
              <motion.h2
                ref={h2Ref}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-center font-jetbrains font-bold text-3xl md:text-4xl tracking-tight"
                style={{
                  backgroundImage: 'linear-gradient(105deg, white 0%, white 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
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

              {/* Progress bar */}
              <div className="mt-6 flex justify-center">
                <div className="w-32 h-[2px] rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-white/40 rounded-full"
                    style={{ width: `${progress * 100}%`, transition: 'none' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                {/* Left fade */}
                <div
                  className="absolute left-0 top-0 h-full w-28 z-10 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, rgba(16,17,17,1) 0%, rgba(16,17,17,0.7) 50%, transparent 100%)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    maskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
                  }}
                />
                {/* Right fade */}
                <div
                  className="absolute right-0 top-0 h-full w-28 z-10 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to left, rgba(16,17,17,1) 0%, rgba(16,17,17,0.7) 50%, transparent 100%)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
                  }}
                />



                {/* Center glow spotlight */}
                <div
                  className="absolute top-0 bottom-0 z-0 pointer-events-none"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '280px',
                    background: 'radial-gradient(ellipse at center, rgba(100,140,255,0.07) 0%, transparent 70%)',
                  }}
                />
                <div className="overflow-hidden py-5" style={{ perspective: '1200px' }}>
                  <div ref={trackRef} className="carousel-track flex gap-[6px] w-max">
                    {track.map((item, i) => {
                      const isHovered  = hoveredIndex === i;
                      const isDimmed   = hoveredIndex !== null && !isHovered;
                      const isCenter   = centerIndex === i;

                      return (
                        <div
                          key={`${item.name}-${i}`}
                          onMouseEnter={() => setHoveredIndex(i)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className="shrink-0 cursor-default"
                          style={{
                            transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                            opacity:   isDimmed ? 0.25 : 1,
                            transform: isHovered
                              ? 'translateY(-8px) scale(1.04) rotateX(6deg)'
                              : isCenter
                                ? 'translateY(-4px) scale(1.06)'
                                : 'translateY(0) scale(1) rotateX(0deg)',
                            zIndex: isHovered ? 10 : isCenter ? 5 : 1,
                            position: 'relative',
                          }}
                        >
                          <div
                            style={{
                              width:  '120px',
                              height: '120px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '10px',
                              backgroundColor: isHovered
                                ? 'rgba(20,22,24,1)'
                                : 'rgba(13,14,15,0.9)',
                              transition: 'background-color 0.25s ease, box-shadow 0.3s ease',
                              boxShadow: isHovered
                                ? '0 12px 32px rgba(0,0,0,0.6), 0 0 16px rgba(80,120,255,0.08)'
                                : isCenter
                                  ? '0 0 20px rgba(100,140,255,0.12), 0 4px 16px rgba(0,0,0,0.3)'
                                  : 'none',
                            }}
                          >
                            <i className={`${item.icon} text-[3.6rem]`} />
                            <span
                              style={{
                                fontFamily: 'var(--font-fira-code)',
                                fontSize: '0.6rem',
                                color: isHovered
                                  ? 'rgba(255,255,255,0.85)'
                                  : isCenter
                                    ? 'rgba(255,255,255,0.65)'
                                    : 'rgba(255,255,255,0.28)',
                                transition: 'color 0.25s ease',
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
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}