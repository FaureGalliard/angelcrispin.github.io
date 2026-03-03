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
// ── Animated background canvas ────────────────────────────────────────────────
function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    180 + Math.random() * 220,
      vx:   (Math.random() - 0.5) * 0.18,
      vy:   (Math.random() - 0.5) * 0.18,
      hue:  [210, 225, 195, 240, 200][i],
      sat:  30 + Math.random() * 20,
      phase: Math.random() * Math.PI * 2,
    }));
    const particles = Array.from({ length: 38 }, () => ({
      x:     Math.random() * 1000,
      y:     Math.random() * 400,
      size:  0.6 + Math.random() * 1.2,
      speed: 0.08 + Math.random() * 0.18,
      drift: (Math.random() - 0.5) * 0.06,
      alpha: 0.15 + Math.random() * 0.35,
    }));
    let t = 0;
    const draw = () => {
      t += 0.004;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(16,17,17,1)';
      ctx.fillRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;
        const pulse = 0.018 + 0.008 * Math.sin(t + o.phase);
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0,   `hsla(${o.hue}, ${o.sat}%, 40%, ${pulse})`);
        grad.addColorStop(0.5, `hsla(${o.hue}, ${o.sat}%, 30%, ${pulse * 0.5})`);
        grad.addColorStop(1,   `hsla(${o.hue}, ${o.sat}%, 20%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
      const scanY = ((t * 60) % (H + 40)) - 20;
      const scanGrad = ctx.createLinearGradient(0, scanY - 12, 0, scanY + 12);
      scanGrad.addColorStop(0,   'rgba(100,130,255,0)');
      scanGrad.addColorStop(0.5, 'rgba(100,130,255,0.025)');
      scanGrad.addColorStop(1,   'rgba(100,130,255,0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 12, W, 24);
      particles.forEach(p => {
        p.x += p.speed;
        p.y += p.drift;
        if (p.x > W + 10) { p.x = -10; p.y = Math.random() * H; }
        if (p.y < 0)  p.y = H;
        if (p.y > H)  p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,200,255,${p.alpha})`;
        ctx.fill();
      });
      ctx.strokeStyle = 'rgba(255,255,255,0.018)';
      ctx.lineWidth = 1;
      const lineSpacing = 40;
      for (let y = 0; y < H; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    />
  );
}
// ── TechStack ─────────────────────────────────────────────────────────────────
export default function TechStack() {
  const sectionRef   = useRef<HTMLElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const isInView     = useInView(sectionRef, { once: true, margin: '-80px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Scroll-driven carousel — pure JS offset, no CSS animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.animation = 'none';
    let offset    = 0;
    let baseSpeed = 0.8;
    let boost     = 0;
    const DECAY   = 0.92;
    const cardW   = 120 + 6;
    const loopWidth = cardW * allTech.length - 6;
    let lastScrollY = window.scrollY;
    let raf = 0;
    const tick = () => {
      const curY  = window.scrollY;
      const delta = curY - lastScrollY;
      lastScrollY = curY;
      boost = boost * (DECAY / 2) + Math.abs(delta) * 0.15;
      offset += baseSpeed + boost;
      if (loopWidth > 0 && offset >= loopWidth) offset -= loopWidth;
      if (track) track.style.transform = `translateX(-${offset.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <>
      <style>{`
        .carousel-track { will-change: transform; }
      `}</style>
      <section
        id="techstack"
        ref={sectionRef}
        className="relative overflow-hidden py-24"
        style={{ backgroundColor: 'rgba(16,17,17,1)' }}
      >
        <LiveBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

              {/* ── perspective wrapper ── */}
              <div
                className="overflow-hidden py-5"
                style={{ perspective: '1200px' }}
              >
                <div ref={trackRef} className="carousel-track flex gap-[6px] w-max">
                  {track.map((item, i) => {
                    const isHovered = hoveredIndex === i;
                    const isDimmed  = hoveredIndex !== null && !isHovered;
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
                            : 'translateY(0) scale(1) rotateX(0deg)',
                          zIndex:    isHovered ? 10 : 1,
                          position:  'relative',
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
                            border: isHovered
                              ? '1px solid rgba(255,255,255,0.14)'
                              : '1px solid rgba(255,255,255,0.06)',
                            transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                            boxShadow: isHovered
                              ? '0 12px 32px rgba(0,0,0,0.6), 0 0 16px rgba(80,120,255,0.08)'
                              : 'none',
                          }}
                        >
                          <i className={`${item.icon} text-[3.6rem]`} />
                          <span
                            style={{
                              fontFamily: 'var(--font-fira-code)',
                              fontSize: '0.6rem',
                              color: isHovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.28)',
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
      </section>
    </>
  );
}