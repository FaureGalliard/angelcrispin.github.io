'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'

const ROW_1 = [
    { name: 'Python', icon: 'devicon-python-plain', color: '#3776AB' },
    { name: 'C++', icon: 'devicon-cplusplus-plain', color: '#00599C' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain', color: '#3178C6' },
    { name: 'Java', icon: 'devicon-java-plain', color: '#ED8B00' },
    { name: 'Django', icon: 'devicon-django-plain', color: '#44B78B' },
    { name: 'Flask', icon: 'devicon-flask-original', color: '#ffffff' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain', color: '#539E43' },
    { name: 'FastAPI', icon: 'devicon-fastapi-plain', color: '#009688' },
    { name: 'Supabase', icon: 'devicon-supabase-plain', color: '#3ECF8E' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', color: '#336791' },
]
const ROW_2 = [
    { name: 'MySQL', icon: 'devicon-mysql-plain', color: '#4479A1' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain', color: '#47A248' },
    { name: 'Git', icon: 'devicon-git-plain', color: '#F05032' },
    { name: 'Docker', icon: 'devicon-docker-plain', color: '#2496ED' },
    { name: 'GitHub Actions', icon: 'devicon-githubactions-plain', color: '#2088FF' },
    { name: 'Vercel', icon: 'devicon-vercel-plain', color: '#ffffff' },
    { name: 'Cloudflare', icon: 'devicon-cloudflare-plain', color: '#F48120' },
    { name: 'Next.js', icon: 'devicon-nextjs-plain', color: '#ffffff' },
    { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain', color: '#06B6D4' },
    { name: 'React', icon: 'devicon-react-original', color: '#61DAFB' },
]

interface TechItem {
    name: string
    icon: string
    color: string
}

const TechCard: React.FC<{
    item: TechItem
    isHovered: boolean
    anyHovered: boolean
    onEnter: () => void
    onLeave: () => void
}> = ({ item, isHovered, anyHovered, onEnter, onLeave }) => (
    <div
        className="tech-card"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
            opacity: anyHovered && !isHovered ? 0.12 : 1,
            transform: isHovered
                ? 'scale(1.02) translateY(-4px)'
                : 'scale(1) translateY(0)',
            borderColor: isHovered ? `${item.color}33` : 'transparent',
            boxShadow: isHovered
                ? `0 18px 40px rgba(0,0,0,0.7), 0 0 24px ${item.color}25`
                : 'none',
            zIndex: isHovered ? 20 : 1,
            // Dynamic bottom glow via CSS var
            ['--glow-color' as string]: item.color,
            ['--glow-opacity' as string]: isHovered ? '0.18' : '0.07',
        }}>
        {/* Bottom radial glow */}
        <div className="tech-card-glow" />
        {/* Decorative grid */}

        <i
            className={`${item.icon} tech-icon`}
            style={{
                color: item.color,
                filter: isHovered ? 'brightness(0.9)' : 'brightness(0.85)',
            }}
        />
        <span
            className="tech-name"
            style={{ color: isHovered ? 'rgba(255,255,255,0.7)' : '#d4d4d4' }}>
            {item.name}
        </span>
    </div>
)

const BASE_SPEED = 80
const SCROLL_RATIO = 0.5

function useMarqueeRow(invertScroll = false) {
    const trackRef = useRef<HTMLDivElement>(null)
    const reverseRef = useRef(invertScroll)
    const posRef = useRef(0)
    const rafRef = useRef<number>(0)
    const lastTime = useRef<number>(0)

    useEffect(() => {
        const trackEl = trackRef.current
        if (!trackEl) return
        const halfWidth = trackEl.scrollWidth / 2
        if (invertScroll) posRef.current = -halfWidth / 2
        const animate = (time: number) => {
            if (lastTime.current) {
                const delta = (time - lastTime.current) / 1000
                const move = BASE_SPEED * delta
                if (reverseRef.current) {
                    posRef.current += move
                    if (posRef.current >= 0) posRef.current = -halfWidth
                } else {
                    posRef.current -= move
                    if (posRef.current <= -halfWidth) posRef.current = 0
                }
                trackEl.style.transform = `translateX(${posRef.current}px)`
            }
            lastTime.current = time
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    return { trackRef, reverseRef, posRef }
}

/* Filas con estado de hover propio */
function MarqueeRow({
    items,
    trackRef,
}: {
    items: TechItem[]
    trackRef: React.RefObject<HTMLDivElement>
}) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const enter = useCallback((i: number) => setHoveredId(i), [])
    const leave = useCallback(() => setHoveredId(null), [])
    const anyHovered = hoveredId !== null

    return (
        <div className="marquee-row">
            <div className="marquee-fade marquee-fade-left" />
            <div className="marquee-fade marquee-fade-right" />
            <div
                ref={trackRef}
                className="marquee-track">
                {items.map((item, i) => (
                    <TechCard
                        key={i}
                        item={item}
                        isHovered={hoveredId === i}
                        anyHovered={anyHovered}
                        onEnter={() => enter(i)}
                        onLeave={leave}
                    />
                ))}
            </div>
        </div>
    )
}

const TechStack: React.FC = () => {
    const wrapperRef = useRef<HTMLElement>(null)
    const track1 = [...ROW_1, ...ROW_1]
    const track2 = [...ROW_2, ...ROW_2]
    const row1 = useMarqueeRow(false)
    const row2 = useMarqueeRow(true)
    const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)

    useEffect(() => {
        const track1El = row1.trackRef.current
        const track2El = row2.trackRef.current
        if (!track1El || !track2El) return
        const onScroll = () => {
            const currentScrollY = window.scrollY
            const scrollDelta = currentScrollY - lastScrollY.current
            lastScrollY.current = currentScrollY
            if (scrollDelta === 0) return
            const goingDown = scrollDelta > 0
            row1.reverseRef.current = !goingDown
            row2.reverseRef.current = goingDown
            const half1 = track1El.scrollWidth / 2
            const half2 = track2El.scrollWidth / 2
            const absDelta = Math.abs(scrollDelta) * SCROLL_RATIO
            if (row1.reverseRef.current) {
                row1.posRef.current += absDelta
                if (row1.posRef.current >= 0) row1.posRef.current = -half1
            } else {
                row1.posRef.current -= absDelta
                if (row1.posRef.current <= -half1) row1.posRef.current = 0
            }
            if (row2.reverseRef.current) {
                row2.posRef.current += absDelta
                if (row2.posRef.current >= 0) row2.posRef.current = -half2
            } else {
                row2.posRef.current -= absDelta
                if (row2.posRef.current <= -half2) row2.posRef.current = 0
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return
        const elements = el.querySelectorAll<HTMLElement>('[data-animate]')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement
                        target.classList.add('animated')
                        target.addEventListener(
                            'animationend',
                            () => target.classList.add('done'),
                            { once: true },
                        )
                        observer.unobserve(target)
                    }
                })
            },
            { threshold: 0.15 },
        )
        elements.forEach((e) => observer.observe(e))
        return () => observer.disconnect()
    }, [])

    return (
        <>
            <style>{`
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

@keyframes slideFromLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to   { opacity: 1; transform: translateX(0); }
}
[data-animate="left"] { opacity: 0; }
[data-animate="left"].animated {
    animation: slideFromLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
[data-animate="left"].animated.done {
    animation: none; opacity: 1; transform: none;
}

.marquee-section {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: #000;
    padding: 5rem 0 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.orb {
    position: absolute;
    pointer-events: none;
    border-radius: 50%;
    filter: blur(40px);
    z-index: 1;
}
.orb-left {
    left: -10%;
    top: 50%;
    transform: translateY(-50%);
    width: 60%;
    height: 140%;
    background: radial-gradient(circle, rgba(108,219,149,0.13) 0%, transparent 70%);
    filter: blur(40px);
}
.orb-center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 150%;
    background: radial-gradient(circle, rgba(248,218,99,0.11) 0%, transparent 70%);
    filter: blur(45px);
}
.orb-right {
    right: -10%;
    top: 50%;
    transform: translateY(-50%);
    width: 60%;
    height: 140%;
    background: radial-gradient(circle, rgba(228,111,111,0.12) 0%, transparent 70%);
    filter: blur(42px);
}

/* Header */
.stack-header {
    position: relative; z-index: 10;
    max-width: 800px; margin: 0 auto 3rem;
    padding: 0 3rem; text-align: center;
    display: flex; flex-direction: column;
    align-items: center; gap: 0.25rem;
}
.stack-badge {
    display: inline-flex; align-items: center;
    padding: 0.125rem 0.625rem; border-radius: 9999px;
    font-size: 0.625rem; margin-bottom: 0.25rem;
    border: 1px solid #6b7280; background: rgba(0,0,0,0.1);
    color: #9ca3af; font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.06em; text-transform: uppercase;
}
.stack-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.75rem; font-weight: 700;
    color: #fff; margin: 0; line-height: 1;
}
.stack-subtitle {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    margin: 0;
    color: #4260C5;
}

/* Rows */
.marquee-row { position: relative; z-index: 10; overflow: visible; }
.marquee-track {
    display: flex; align-items: center;
    width: max-content; will-change: transform;
    padding: 2px 0; /* room for scale+translateY */
}

/* Cards */
.tech-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    width: 240px;
    height: 130px;
    flex-shrink: 0;
    margin: 0 .6rem;
    background: #000;
    border-radius: 1px;
    border: 1px solid transparent;
    cursor: default;
    transition:
        opacity 0.3s ease,
        transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.35s ease,
        border-color 0.3s ease;
    overflow: hidden;
}

/* Gradient border via pseudo */
.tech-card::before {
    content: "";
    position: absolute; inset: 0;
    border-radius: 1px;
    padding: 1px;
    background: linear-gradient(175deg, #FFFFFF1A, transparent 18%, transparent 85%, #FFFFFF1A);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 1;
}

/* Dynamic bottom glow using CSS var set inline */
.tech-card-glow {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(
        ellipse 80% 55% at 50% 115%,
        color-mix(in srgb, var(--glow-color, #fff) calc(var(--glow-opacity, 0.07) * 100%), transparent) 0%,
        transparent 40%
    );
    transition: background 0.35s ease;
    z-index: 0;
}

/* Subtle dot grid */
.tech-card-grid {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 22px 22px;
}

.tech-icon {
    position: relative; z-index: 2;
    font-size: 2.4rem;
    transition: filter 0.25s ease, color 0.25s ease;
}
/* Remove any devicon color overrides */
.tech-icon::before { color: inherit !important; }

.tech-name {
    position: relative; z-index: 2;
    font-family: 'JetBrains Mono', monospace;
    font-size: .72rem;
    transition: color 0.25s ease;
    white-space: nowrap;
}

.marquee-fade {
    position: absolute; top: 0; bottom: 0;
    width: 140px; pointer-events: none; z-index: 20;
}
.marquee-fade-left {
    left: 0;
    background: linear-gradient(to right, #000 0%, transparent 100%);
}
.marquee-fade-right {
    right: 0;
    background: linear-gradient(to left, #000 0%, transparent 100%);
}
`}</style>

            <section
                ref={wrapperRef}
                className="marquee-section">
                <div className="orb orb-left" />
                <div className="orb orb-center" />
                <div className="orb orb-right" />
                <div className="stack-header">
                    <div
                        data-animate="left"
                        className="stack-badge"
                        style={{ animationDelay: '0ms' }}>
                        Stack Tecnológico
                    </div>
                    <h2
                        data-animate="left"
                        className="stack-title"
                        style={{ animationDelay: '150ms' }}>
                        Codea, Construye, Repite
                    </h2>
                    <p
                        data-animate="left"
                        className="stack-subtitle"
                        style={{ animationDelay: '300ms' }}>
                        Una vista a las tecnologías que utilizo para crear software de
                        alta calidad.
                    </p>
                </div>

                <MarqueeRow
                    items={track1}
                    trackRef={row1.trackRef}
                />
                <MarqueeRow
                    items={track2}
                    trackRef={row2.trackRef}
                />
            </section>
        </>
    )
}

export default TechStack
