'use client'
import { useRef, useEffect, useState, useCallback } from 'react'

const row1 = [
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'C++', icon: '⚙️', color: '#00599C' },
    { name: 'TypeScript', icon: '𝗧𝗦', color: '#3178C6', isText: true },
    { name: 'Java', icon: '☕', color: '#ED8B00' },
    { name: 'Django', icon: '🎸', color: '#092E20' },
    { name: 'Flask', icon: '🧪', color: '#ffffff' },
    { name: 'Node.js', icon: '⬡', color: '#539E43', isText: true },
    { name: 'FastAPI', icon: '⚡', color: '#009688' },
    { name: 'Supabase', icon: '🔋', color: '#3ECF8E' },
    { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
]
const row2 = [
    { name: 'MySQL', icon: '🐬', color: '#4479A1' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'Git', icon: '🔀', color: '#F05032' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
    { name: 'GH Actions', icon: '⚙️', color: '#2088FF' },
    { name: 'Vercel', icon: '▲', color: '#ffffff', isText: true },
    { name: 'Cloudflare', icon: '☁️', color: '#F48120' },
    { name: 'Next.js', icon: 'N', color: '#ffffff', isText: true },
    { name: 'Tailwind', icon: '🌊', color: '#06B6D4' },
    { name: 'React', icon: '⚛', color: '#61DAFB', isText: true },
]

const GAP = 8
const CARD_W = 128 + GAP
const BASE_SPEED = 0.55
const SCROLL_BOOST = 0.12

type Item = { name: string; icon: string; color: string; isText?: boolean }

function CarouselRow({
    items,
    direction = 1,
    scrollVelRef,
    rowId,
}: {
    items: Item[]
    direction?: number
    scrollVelRef: React.MutableRefObject<number>
    rowId: string
}) {
    const trackRef = useRef<HTMLDivElement>(null)
    const offsetRef = useRef(0)
    const rafRef = useRef<number | null>(null)
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)

    const LOOP_W = CARD_W * items.length
    const track = [...items, ...items, ...items]

    const handleHover = useCallback((id: string | null) => setHoveredCard(id), [])

    useEffect(() => {
        offsetRef.current = LOOP_W
        const tick = () => {
            const vel = scrollVelRef.current ?? 0
            const boost = Math.abs(vel) > 1 ? vel * SCROLL_BOOST * direction : 0
            offsetRef.current += BASE_SPEED * direction + boost

            if (offsetRef.current >= LOOP_W * 2) offsetRef.current -= LOOP_W
            else if (offsetRef.current < LOOP_W) offsetRef.current += LOOP_W

            if (trackRef.current)
                trackRef.current.style.transform = `translateX(-${offsetRef.current.toFixed(2)}px)`

            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [direction, LOOP_W, scrollVelRef])

    return (
        /* overflow-x hidden but overflow-y visible → need negative margin trick */
        <div className="relative overflow-x-hidden overflow-y-visible -mt-5 -mb-5 pt-5 pb-5">
            <div
                ref={trackRef}
                className="flex w-max will-change-transform"
                style={{ gap: GAP }}>
                {track.map((item, i) => {
                    const cardId = `${rowId}-${i}`
                    const isHovered = hoveredCard === cardId
                    const anyHovered = hoveredCard !== null

                    return (
                        <div
                            key={cardId}
                            onMouseEnter={() => handleHover(cardId)}
                            onMouseLeave={() => handleHover(null)}
                            className="relative flex-shrink-0 cursor-default transition-opacity duration-300"
                            style={{
                                zIndex: isHovered ? 20 : 1,
                                opacity: anyHovered && !isHovered ? 0.13 : 1,
                            }}>
                            {/*
                             * Dynamic values that depend on `item.color` or hover state
                             * cannot be expressed as static Tailwind classes, so we keep
                             * them as inline CSS via CSS custom properties where possible.
                             */}
                            <div
                                className="relative overflow-hidden flex flex-col items-center justify-center"
                                style={{
                                    width: 128,
                                    height: 128,
                                    borderRadius: 16,
                                    gap: 10,
                                    backgroundColor: '#090909',
                                    border: isHovered
                                        ? `1px solid ${item.color}44`
                                        : '1px solid #151515',
                                    transform: isHovered
                                        ? 'scale(1.05) translateY(-6px)'
                                        : 'scale(1) translateY(0)',
                                    boxShadow: isHovered
                                        ? `0 16px 36px rgba(0,0,0,0.65), 0 0 20px ${item.color}1a`
                                        : 'none',
                                    transition:
                                        'transform 1.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s ease',
                                }}>
                                {/* Decorative grid */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                        backgroundSize: '24px 24px',
                                    }}
                                />

                                {/* Bottom radial glow — color is dynamic */}
                                <div
                                    className="absolute inset-0 pointer-events-none transition-[background] duration-[350ms] ease-[ease]"
                                    style={{
                                        background: `radial-gradient(ellipse 80% 55% at 50% 115%, ${item.color}${isHovered ? '22' : '0f'} 0%, transparent 70%)`,
                                    }}
                                />

                                {/* Icon */}
                                <span
                                    className="relative z-10 leading-none select-none font-bold font-mono transition-[filter] duration-[250ms] ease-[ease]"
                                    style={{
                                        fontSize: item.isText ? 28 : 36,
                                        color: item.color,
                                        filter: isHovered
                                            ? 'brightness(1.35)'
                                            : 'brightness(0.9)',
                                    }}>
                                    {item.icon}
                                </span>

                                {/* Label */}
                                <span
                                    className="relative z-10 text-[0.6rem] tracking-[0.08em] uppercase font-mono whitespace-nowrap transition-colors duration-[250ms] ease-[ease]"
                                    style={{
                                        color: isHovered
                                            ? 'rgba(255,255,255,0.65)'
                                            : 'rgba(255,255,255,0.18)',
                                    }}>
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default function TechStack() {
    const wrapperRef = useRef<HTMLElement>(null)
    const scrollVelRef = useRef(0)
    const lastScrollY = useRef<number | null>(null)
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const onScroll = () => {
            const cur = window.scrollY
            if (lastScrollY.current === null) {
                lastScrollY.current = cur
                return
            }
            const delta = cur - lastScrollY.current
            lastScrollY.current = cur
            if (Math.abs(delta) < 1) return
            scrollVelRef.current = delta
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
            scrollTimeoutRef.current = setTimeout(() => {
                scrollVelRef.current = 0
            }, 80)
        }
        lastScrollY.current = window.scrollY
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
        }
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
                [data-animate].animated.done {
                    animation: none;
                    opacity: 1;
                    transform: none;
                }
            `}</style>

            <section
                ref={wrapperRef}
                className="relative w-full py-24 overflow-hidden"
                style={{ background: '#010101' }}>
                {/* Background orbs */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        left: '-10%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 800,
                        height: 1200,
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(108,219,149,0.13) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        zIndex: 1,
                    }}
                />
                <div
                    className="absolute pointer-events-none"
                    style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: 400,
                        height: 1300,
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(248,218,99,0.11) 0%, transparent 70%)',
                        filter: 'blur(45px)',
                        zIndex: 1,
                    }}
                />
                <div
                    className="absolute pointer-events-none"
                    style={{
                        right: '-10%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 800,
                        height: 1200,
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(228,111,111,0.12) 0%, transparent 70%)',
                        filter: 'blur(42px)',
                        zIndex: 1,
                    }}
                />

                {/* Header */}
                <div className="relative z-10 max-w-[800px] mx-auto px-12 mb-14 text-center flex flex-col items-center gap-1">
                    <div
                        data-animate="left"
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.625rem] mb-1 border border-gray-500 bg-black/10 text-gray-400 font-mono tracking-[0.06em] uppercase"
                        style={{ animationDelay: '0ms' }}>
                        Stack Tecnológico
                    </div>

                    <h2
                        data-animate="left"
                        className="font-mono text-[1.75rem] font-bold text-white m-0 leading-none"
                        style={{ animationDelay: '150ms' }}>
                        Codea, Construye, Repite
                    </h2>

                    <p
                        data-animate="left"
                        className="font-mono text-sm m-0"
                        style={{ animationDelay: '300ms', color: '#4260C5' }}>
                        Una vista a las tecnologías que utilizo para crear software de
                        alta calidad.
                    </p>
                </div>

                {/* Carousels */}
                <div
                    data-animate="up"
                    className="relative z-10 flex flex-col"
                    style={{ animationDelay: '400ms', gap: GAP }}>
                    <CarouselRow
                        items={row1}
                        direction={1}
                        scrollVelRef={scrollVelRef}
                        rowId="row1"
                    />
                    <CarouselRow
                        items={row2}
                        direction={-1}
                        scrollVelRef={scrollVelRef}
                        rowId="row2"
                    />
                </div>

                {/* Edge fades */}
                <div
                    className="absolute left-0 top-0 bottom-0 pointer-events-none z-20"
                    style={{
                        width: 400,
                        background:
                            'linear-gradient(to right, rgba(1,1,1,1) 0%, rgba(1,1,1,0.8) 30%, transparent 100%)',
                    }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 pointer-events-none z-20"
                    style={{
                        width: 400,
                        background:
                            'linear-gradient(to left, rgba(1,1,1,1) 0%, rgba(1,1,1,0.8) 30%, transparent 100%)',
                    }}
                />
            </section>
        </>
    )
}
