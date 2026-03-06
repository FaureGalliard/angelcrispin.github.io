'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

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

// ── useTitleShine ──────────────────────────────────────────────────────────────
function useTitleShine() {
    const h1Ref = useRef<HTMLHeadingElement>(null)
    const rafRef = useRef<number>(0)
    const running = useRef(false)
    const SPEED = 3.0

    useEffect(() => {
        const el = h1Ref.current
        if (!el) return

        const getOpacity = (pos: number) => {
            if (pos < 0) return 0
            if (pos < 12) return pos / 12
            if (pos < 80) return 1
            return Math.max(0, 1 - (pos - 80) / 40)
        }

        const runSweep = () => {
            cancelAnimationFrame(rafRef.current)
            running.current = true
            let x = -20

            const tick = () => {
                x = Math.min(x + SPEED, 122)
                const o = getOpacity(x)

                el.style.backgroundImage = `linear-gradient(
                    125deg,
                    white                                    0%,
                    white                                    ${x - 8}%,
                    rgba(150,175,255,${(o * 0.4).toFixed(3)}) ${x - 4}%,
                    rgba(100,140,255,${(o * 0.9).toFixed(3)}) ${x - 1}%,
                    rgba(200,220,255,${o.toFixed(3)})           ${x}%,
                    rgba(100,140,255,${(o * 0.8).toFixed(3)}) ${x + 3}%,
                    rgba(66,96,197,  ${(o * 0.25).toFixed(3)}) ${x + 6}%,
                    white                                    ${x + 10}%,
                    white                                    100%
                )`

                if (x >= 122) {
                    running.current = false
                    el.style.backgroundImage =
                        'linear-gradient(125deg, white 0%, white 100%)'
                    return
                }
                rafRef.current = requestAnimationFrame(tick)
            }

            rafRef.current = requestAnimationFrame(tick)
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(runSweep, 200)
                } else {
                    cancelAnimationFrame(rafRef.current)
                    running.current = false
                    el.style.backgroundImage =
                        'linear-gradient(125deg, white 0%, white 100%)'
                }
            },
            { threshold: 0.5 },
        )

        observer.observe(el)

        return () => {
            observer.disconnect()
            cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return h1Ref
}

// ── AnimatedNumber ─────────────────────────────────────────────────────────────
function AnimatedNumber({
    value,
    duration = 1.2,
    start = false,
    delay = 0,
}: {
    value: number
    duration?: number
    start?: boolean
    delay?: number
}) {
    const motionVal = useMotionValue(0)
    const rounded = useTransform(motionVal, (v) => Math.round(v))
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        const unsub = rounded.on('change', (v) => setDisplay(v))
        return unsub
    }, [rounded])

    useEffect(() => {
        if (!start) return
        const timeout = setTimeout(() => {
            animate(motionVal, value, {
                duration,
                ease: [0.25, 0.46, 0.45, 0.94],
            })
        }, delay)
        return () => clearTimeout(timeout)
    }, [start, value, duration, delay, motionVal])

    return <>{display}</>
}

// ── KpiCard ───────────────────────────────────────────────────────────────────
function KpiCard({
    item,
    index,
    triggerCount,
}: {
    item: (typeof kpiItems)[0]
    index: number
    triggerCount: boolean
}) {
    const color = unitColors[index]

    return (
        <div
            data-animate="up"
            className="kpi-card relative flex items-center justify-center rounded-3xl border border-white/5 bg-[#090909] p-6 sm:p-10 md:p-12 min-h-45 sm:min-h-62.5 md:min-h-67.5 w-[60%] sm:w-full mx-auto"
            style={{ animationDelay: `${550 + index * 120}ms` }}>
            <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 110%, ${color}18 0%, transparent 70%)`,
                }}
            />
            {/* amplified glow — fades in on hover via .kpi-glow */}
            <div
                className="kpi-glow pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                    background: `radial-gradient(ellipse 110% 90% at 50% 105%, ${color}60 0%, ${color}28 40%, transparent 68%)`,
                }}
            />
            <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.01) 1.2px, transparent 1.2px), linear-gradient(90deg, rgba(255,255,255,0.04) 1.2px, transparent 1.2px)',
                    backgroundSize: '50px 50px',
                }}
            />
            <div className="relative z-10 flex flex-col items-center text-center gap-2">
                <div className="relative">
                    <span
                        className="block text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-none tabular-nums"
                        style={{
                            WebkitMaskImage:
                                'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskSize: '100% 100%',
                            maskImage:
                                'linear-gradient(to bottom, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 90%)',
                            maskRepeat: 'no-repeat',
                            maskSize: '100% 100%',
                        }}>
                        <AnimatedNumber
                            value={item.number}
                            start={triggerCount}
                            delay={index * 120}
                        />
                        {item.suffix}
                    </span>
                    <p className="absolute left-1/2 -translate-x-1/2 top-[80%] font-firacode text-sm sm:text-base md:text-lg font-semibold uppercase leading-none pointer-events-none text-white whitespace-nowrap">
                        {item.unit}
                    </p>
                </div>
                <p className="font-jetbrains text-[10px] sm:text-xs text-white/40 leading-tight max-w-40 sm:max-w-45 md:max-w-55 mt-1">
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
    const titleRef = useTitleShine()

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
          animation-delay: var(--anim-delay, 0ms);
        }
        [data-animate="up"].animated {
          animation: slideFromBottom 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Once the entry animation ends, lock state and enable hover */
        [data-animate="up"].animated.done {
          animation: none;
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Hover ── */
        .kpi-card.animated:not(.done) {
          transition: none;
        }
        .kpi-card.done {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.4s ease;
        }
        .kpi-card.done:hover {
          transform: scale(1.08) translateY(-14px);
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.6);
        }
        /* Glow layer brightens on hover */
        .kpi-card .kpi-glow {
          transition: opacity 0.4s ease;
          opacity: 0;
        }
        .kpi-card.done:hover .kpi-glow {
          opacity: 0.2;
        }
      `}</style>

            <section
                ref={sectionRef}
                className="relative w-full bg-[#010101] py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-30 bg-linear-to-b from-[#080808] to-[#010101]" />

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-10 sm:gap-12">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1
                            ref={titleRef}
                            data-animate="left"
                            className="font-jetbrains text-3xl md:text-4xl font-bold leading-[1.1]"
                            style={{
                                ['--anim-delay' as string]: '150ms',
                                backgroundImage:
                                    'linear-gradient(125deg, white 0%, white 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                            Impacto real en cada proyecto
                        </h1>
                    </div>

                    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div
                            className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-0 w-[min(1900px,300vw)] h-225 blur-[50px]"
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
