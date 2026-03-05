'use client'
import { useEffect, useRef, useState } from 'react'

const unitColors = ['#6CDB95', '#F8DA63', '#E46F6F']

const kpiItems = [
    {
        number: 20,
        suffix: '+',
        unit: 'proyectos',
        description: 'desarrollados con técnicas de alto rendimiento.',
    },
    {
        number: 80,
        suffix: 'k+',
        unit: 'líneas',
        description: 'de código escritas en distintos lenguajes.',
    },
    {
        number: 15,
        suffix: '+',
        unit: 'tecnologías',
        description: 'aplicadas en desarrollo de software y soluciones.',
    },
]

// ── Counter ───────────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, start = false) {
    const [value, setValue] = useState(0)
    const rafRef = useRef<number>(0)

    useEffect(() => {
        if (!start) return
        const startTime = performance.now()
        const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setValue(Math.floor(eased * target))
            if (progress < 1) rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [start, target, duration])

    return value
}

function KpiCard({
    item,
    index,
    triggerCount,
}: {
    item: (typeof kpiItems)[0]
    index: number
    triggerCount: boolean
}) {
    const [started, setStarted] = useState(false)
    const count = useCounter(item.number, 1600 + index * 150, started)
    const color = unitColors[index]

    useEffect(() => {
        if (triggerCount && !started) {
            const t = setTimeout(() => setStarted(true), index * 120)
            return () => clearTimeout(t)
        }
    }, [triggerCount, started, index])

    return (
        <div
            data-animate="up"
            className="kpi-card relative flex items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#090909] p-6 sm:p-10 md:p-12 min-h-[180px] sm:min-h-[250px] md:min-h-[270px] transition-colors w-[60%] sm:w-full mx-auto "
            style={{ animationDelay: `${550 + index * 120}ms` }}>
            {/* Glow de color */}
            <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 110%, ${color}18 0%, transparent 70%)`,
                }}
            />
            {/* Grid decorativo */}
            <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.04) 1.2px, transparent 1.2px), linear-gradient(90deg, rgba(255,255,255,0.04) 1.2px, transparent 1.2px)',
                    backgroundSize: '50px 50px',
                }}
            />
            {/* Contenido */}
            <div className="relative z-10 flex flex-col items-center text-center gap-2">
                <div className="relative">
                    <span className="block text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-none tabular-nums">
                        {count}
                        {item.suffix}
                    </span>
                    {/* Fade overlay sobre el número */}
                    <div
                        className="absolute inset-x-0 bottom-0 pointer-events-none h-full"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(9,9,9,0) 0%, rgba(9,9,9,0.85) 68%, #090909 100%)',
                        }}
                    />
                    {/* Label de unidad superpuesto */}
                    <p className="absolute left-1/2 -translate-x-1/2 top-[80%] font-firacode text-sm sm:text-base md:text-lg font-semibold uppercase leading-none pointer-events-none text-white whitespace-nowrap">
                        {item.unit}
                    </p>
                </div>
                <p className="font-jetbrains text-[10px] sm:text-xs text-white/40 leading-tight max-w-[160px] sm:max-w-[180px] md:max-w-[220px] mt-1">
                    {item.description}
                </p>
            </div>
        </div>
    )
}

// ── KpiSection ────────────────────────────────────────────────────────────────
export default function KpiSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [triggerCount, setTriggerCount] = useState(false)

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('[data-animate]')
        if (!elements) return
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement
                        el.classList.add('animated')
                        el.addEventListener(
                            'animationend',
                            () => el.classList.add('done'),
                            { once: true },
                        )
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.15 },
        )
        elements.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTriggerCount(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.2 },
        )
        observer.observe(section)
        return () => observer.disconnect()
    }, [])

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
        [data-animate="up"] { opacity: 0; }
        [data-animate="left"].animated {
          animation: slideFromLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        [data-animate="up"].animated {
          animation: slideFromBottom 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        [data-animate="up"].animated.done {
          animation: none;
          opacity: 1;
          transform: translateY(0);
        }
        .kpi-card {
          transition: transform 1.50s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .kpi-card.done:hover {
          transform: scale(1.04) translateY(-10px);
        }
      `}</style>

            <section
                ref={sectionRef}
                className="relative w-full bg-[#010101] py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 overflow-hidden">
                {/* Transición Hero → KPI */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[120px] bg-gradient-to-b from-[#080808] to-[#010101]" />

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-10 sm:gap-12">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-1 text-center">
                        <div
                            data-animate="left"
                            className="font-jetbrains inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] mb-1 border border-[#6B7280] bg-black/10 text-[#9CA3AF]"
                            style={{ animationDelay: '0ms' }}>
                            Indicadores Clave
                        </div>
                        <h1
                            data-animate="left"
                            className="font-jetbrains text-3xl md:text-4xl font-bold text-white leading-[1.1]"
                            style={{ animationDelay: '150ms' }}>
                            Impacto real en cada proyecto
                        </h1>
                        <p
                            data-animate="left"
                            className="font-jetbrains text-sm text-[#4260C5] leading-snug"
                            style={{ animationDelay: '300ms' }}>
                            Ingeniería enfocada en rendimiento, calidad y evolución
                            constante.
                        </p>
                    </div>

                    {/* Cards grid — 1 col en móvil, 3 en md+ */}
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Glow de fondo */}
                        <div
                            className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-0 w-[min(1900px,300vw)] h-[1100px] blur-[50px]"
                            style={{
                                top: '-520px',
                                background:
                                    'radial-gradient(ellipse 50% 50% at 50% 75%, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 45%, transparent 70%)',
                            }}
                        />
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
    )
}
