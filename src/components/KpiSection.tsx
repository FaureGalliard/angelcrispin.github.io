"use client";
import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, Globe, User } from "lucide-react";

const kpiItems = [
  {
    number: 50,
    suffix: "+",
    unit: "proyectos",
    description: "desarrollados con técnicas de alto rendimiento.",
    icon: <Globe size={18} />,
  },
  {
    number: 100,
    suffix: "k+",
    unit: "líneas",
    description: "de código escritas en distintos lenguajes.",
    icon: <User size={18} />,
  },
  {
    number: 15,
    suffix: "+",
    unit: "tecnologías",
    description: "aplicadas en desarrollo de software y soluciones.",
    icon: <BriefcaseBusiness size={18} />,
  },
];

// ── Counter ───────────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return value;
}

function KpiCard({
  item,
  index,
  triggerCount,
}: {
  item: (typeof kpiItems)[0];
  index: number;
  triggerCount: boolean;
}) {
  const [started, setStarted] = useState(false);
  const count = useCounter(item.number, 1600 + index * 150, started);

  useEffect(() => {
    if (triggerCount && !started) {
      const t = setTimeout(() => setStarted(true), index * 120);
      return () => clearTimeout(t);
    }
  }, [triggerCount, started, index]);

  return (
    <div
      data-animate="up"
      className="kpi-card relative flex items-center justify-center overflow-hidden rounded-3xl border border-[#151515] bg-[#090909] p-12 transition-colors hover:bg-white/[0.04]"
      style={{
        minHeight: "270px",
        animationDelay: `${550 + index * 120}ms`,
      }}
    >
      {/* Grid decorativo */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1.2px, transparent 1.2px), linear-gradient(90deg, rgba(255,255,255,0.04) 1.2px, transparent 1.2px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative">
          <span className="block text-7xl font-semibold text-white leading-none tabular-nums">
            {count}
            {item.suffix}
          </span>
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(9,9,9,0) 0%, rgba(9,9,9,0.85) 68%, #090909 100%)",
            }}
          />
          <p className="absolute left-1/2 -translate-x-1/2 top-[80%] font-firacode text-lg font-semibold uppercase text-white leading-none pointer-events-none">
            {item.unit}
          </p>
        </div>
        <p className="font-jetbrains text-xs text-white/40 leading-tight max-w-[220px] mt-2">
          {item.description}
        </p>
      </div>

      {/* Icon */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/60">
        {item.icon}
      </div>
    </div>
  );
}

// ── KpiSection ────────────────────────────────────────────────────────────────
export default function KpiSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggerCount, setTriggerCount] = useState(false);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll("[data-animate]");
    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Trigger counter when section enters viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromBottom {
          from { opacity: 0; transform: translateY(50px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        [data-animate="left"],
        [data-animate="up"] {
          opacity: 0;
        }

        [data-animate="left"].animated {
          animation: slideFromLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        [data-animate="up"].animated {
          animation: slideFromBottom 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .kpi-card {
          transition: transform 0.25s ease-out;
        }
        .kpi-card:hover {
          transform: scale(1.03);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full bg-[#010101] py-24 px-12 overflow-hidden"
      >
        {/* ── Bola blanca central con glow desvanecido ── */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "1200px",
            height: "1200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 30%, rgba(255,255,255,0.008) 55%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        {/* segundo halo más suave y grande */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "1800px",
            height: "1000px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.028) 0%, transparent 65%)",
            filter: "blur(10px)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-1 text-center">
            <div
              data-animate="left"
              className="font-jetbrains inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] mb-1 border"
              style={{
                animationDelay: "0ms",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderColor: "#6B7280",
                color: "#9CA3AF",
              }}
            >
              Indicadores Clave
            </div>

            <h1
              data-animate="left"
              className="font-jetbrains text-3xl md:text-4xl font-bold text-white leading-[1.1]"
              style={{ animationDelay: "150ms" }}
            >
              Impacto real en cada proyecto
            </h1>

            <p
              data-animate="left"
              className="font-jetbrains text-xs text-white/40 leading-snug"
              style={{ animationDelay: "300ms" }}
            >
              Ingeniería enfocada en rendimiento, calidad y evolución constante.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {kpiItems.map((item, i) => (
              <KpiCard
                key={i}
                item={item}
                index={i}
                triggerCount={triggerCount}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}