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

function CarouselRow({ items, direction = 1, scrollVelRef, rowId }) {
    const trackRef = useRef(null)
    const offsetRef = useRef(0)
    const rafRef = useRef(null)
    const [hoveredCard, setHoveredCard] = useState(null)

    const LOOP_W = CARD_W * items.length
    const track = [...items, ...items, ...items]

    const handleHover = useCallback((id) => setHoveredCard(id), [])

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
        <div
            style={{
                position: 'relative',
                overflowX: 'hidden',
                overflowY: 'visible',
                paddingTop: 20,
                paddingBottom: 20,
                marginTop: -20,
                marginBottom: -20,
            }}>
            <div
                ref={trackRef}
                style={{
                    display: 'flex',
                    width: 'max-content',
                    gap: GAP,
                    willChange: 'transform',
                }}>
                {track.map((item, i) => {
                    const cardId = `${rowId}-${i}`
                    const isHovered = hoveredCard === cardId
                    const anyHovered = hoveredCard !== null

                    return (
                        <div
                            key={cardId}
                            onMouseEnter={() => handleHover(cardId)}
                            onMouseLeave={() => handleHover(null)}
                            style={{
                                flexShrink: 0,
                                position: 'relative',
                                zIndex: isHovered ? 20 : 1,
                                opacity: anyHovered && !isHovered ? 0.13 : 1,
                                transition: 'opacity 0.3s ease',
                                cursor: 'default',
                            }}>
                            <div
                                style={{
                                    width: 128,
                                    height: 128,
                                    borderRadius: 16,
                                    backgroundColor: '#090909',
                                    border: isHovered
                                        ? `1px solid ${item.color}44`
                                        : '1px solid #151515',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 10,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transform: isHovered
                                        ? 'scale(1.05) translateY(-6px)'
                                        : 'scale(1) translateY(0)',
                                    boxShadow: isHovered
                                        ? `0 16px 36px rgba(0,0,0,0.65), 0 0 20px ${item.color}1a`
                                        : 'none',
                                    transition:
                                        'transform 1.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s ease',
                                }}>
                                {/* Grid decorativo sutil */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundImage:
                                            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                        backgroundSize: '24px 24px',
                                        pointerEvents: 'none',
                                    }}
                                />

                                {/* Glow radial desde abajo */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: `radial-gradient(ellipse 80% 55% at 50% 115%, ${item.color}${isHovered ? '22' : '0f'} 0%, transparent 70%)`,
                                        transition: 'background 0.35s ease',
                                        pointerEvents: 'none',
                                    }}
                                />

                                {/* Icon */}
                                <span
                                    style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        fontSize: item.isText ? 28 : 36,
                                        fontWeight: 'bold',
                                        color: item.color,
                                        fontFamily: 'monospace',
                                        lineHeight: 1,
                                        filter: isHovered
                                            ? 'brightness(1.35)'
                                            : 'brightness(0.9)',
                                        transition: 'filter 0.25s ease',
                                        userSelect: 'none',
                                    }}>
                                    {item.icon}
                                </span>

                                {/* Label */}
                                <span
                                    style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        fontSize: '0.6rem',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        fontFamily: 'monospace',
                                        color: isHovered
                                            ? 'rgba(255,255,255,0.65)'
                                            : 'rgba(255,255,255,0.18)',
                                        transition: 'color 0.25s ease',
                                        whiteSpace: 'nowrap',
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
    const wrapperRef = useRef(null)
    const scrollVelRef = useRef(0)
    const lastScrollY = useRef(null)
    const scrollTimeoutRef = useRef(null)

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

    // Mismo sistema de animaciones que KpiSection
    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return
        const elements = el.querySelectorAll('[data-animate]')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target
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
                style={{
                    position: 'relative',
                    width: '100%',
                    padding: '96px 0',
                    background: '#010101',
                    overflow: 'hidden',
                }}>
                {/* Orbs de fondo */}
                <div
                    style={{
                        position: 'absolute',
                        left: '-10%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 800,
                        height: 1200,
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(108,219,149,0.13) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: 400,
                        height: 1300,
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(248,218,99,0.11) 0%, transparent 70%)',
                        filter: 'blur(45px)',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        right: '-10%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 800,
                        height: 1200,
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(228,111,111,0.12) 0%, transparent 70%)',
                        filter: 'blur(42px)',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />

                {/* ── Header ── */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        maxWidth: 800,
                        margin: '0 auto',
                        padding: '0 48px',
                        marginBottom: 56,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                    }}>
                    {/* Badge — eco visual con KpiSection, mismo patrón */}
                    <div
                        data-animate="left"
                        style={{
                            animationDelay: '0ms',
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '2px 10px',
                            borderRadius: 9999,
                            fontSize: '0.625rem',
                            marginBottom: 4,
                            border: '1px solid #6B7280',
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            color: '#9CA3AF',
                            fontFamily: 'monospace',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                        }}>
                        Stack Tecnológico
                    </div>

                    <h2
                        data-animate="left"
                        style={{
                            animationDelay: '150ms',
                            fontFamily: 'monospace',
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            color: '#fff',
                            margin: 0,
                            lineHeight: 1.1,
                        }}>
                        Codea, Construye, Repite
                    </h2>

                    <p
                        data-animate="left"
                        style={{
                            animationDelay: '300ms',
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            color: '#4260C5',
                            margin: 0,
                        }}>
                        Una vista a las tecnologías que utilizo para crear software de
                        alta calidad.
                    </p>
                </div>

                {/* ── Carousels ── */}
                <div
                    data-animate="up"
                    style={{
                        animationDelay: '400ms',
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: GAP,
                    }}>
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

                {/* Fades laterales */}
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 400,
                        background:
                            'linear-gradient(to right, rgba(1,1,1,1) 0%, rgba(1,1,1,0.8) 30%, transparent 100%)',
                        pointerEvents: 'none',
                        zIndex: 20,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: 400,
                        background:
                            'linear-gradient(to left, rgba(1,1,1,1) 0%, rgba(1,1,1,0.8) 30%, transparent 100%)',
                        pointerEvents: 'none',
                        zIndex: 20,
                    }}
                />
            </section>
        </>
    )
}
