'use client'
import { useRef, useEffect } from 'react'

export default function AboutMe() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const el = sectionRef.current
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
                @keyframes slideFromRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideFromBottom {
                    from { opacity: 0; transform: translateY(50px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                [data-animate="left"],
                [data-animate="right"],
                [data-animate="up"] { opacity: 0; }
                [data-animate="left"].animated {
                    animation: slideFromLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                [data-animate="right"].animated {
                    animation: slideFromRight 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                [data-animate="up"].animated {
                    animation: slideFromBottom 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                [data-animate].animated.done {
                    animation: none;
                    opacity: 1;
                    transform: none;
                }

                .about-photo-wrapper {
                    transition: transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .about-photo-wrapper:hover {
                    transform: scale(1.03) translateY(-6px);
                }
                .about-scan-line {
                    position: absolute;
                    left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(108,219,149,0.35), transparent);
                    animation: scanLine 3.5s ease-in-out infinite;
                    pointer-events: none;
                }
                @keyframes scanLine {
                    0%   { top: 0%;    opacity: 0; }
                    5%   { opacity: 1; }
                    95%  { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }

                .about-cursor {
                    display: inline-block;
                    width: 2px;
                    height: 1.1em;
                    background: #4260C5;
                    margin-left: 3px;
                    vertical-align: text-bottom;
                    animation: blink 1.1s step-end infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative w-full bg-[#010101] py-24 px-4 sm:px-8 md:px-12 overflow-hidden">
                {/* Background orbs — consistent with TechStack */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        left: '-5%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '45%',
                        height: '130%',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(66,96,197,0.09) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                        zIndex: 0,
                    }}
                />
                <div
                    className="absolute pointer-events-none"
                    style={{
                        right: '-5%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '40%',
                        height: '120%',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(108,219,149,0.07) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                        zIndex: 0,
                    }}
                />

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-1 text-center">
                        <div
                            data-animate="left"
                            className="font-mono inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] mb-1 border border-gray-500 bg-black/10 text-gray-400 tracking-[0.06em] uppercase"
                            style={{ animationDelay: '0ms' }}>
                            Sobre Mí
                        </div>
                        <h2
                            data-animate="left"
                            className="font-mono text-[1.75rem] font-bold text-white m-0 leading-none"
                            style={{ animationDelay: '150ms' }}>
                            ¿Quién soy?
                        </h2>
                        <p
                            data-animate="left"
                            className="font-mono text-sm m-0"
                            style={{ animationDelay: '300ms', color: '#4260C5' }}>
                            Código, arquitectura y propósito.
                        </p>
                    </div>

                    {/* Main content — text left, photo right */}
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                        {/* Left — text card */}
                        <div
                            data-animate="left"
                            className="flex-1 w-full"
                            style={{ animationDelay: '400ms' }}>
                            <div
                                className="relative overflow-hidden rounded-2xl border border-white/5 p-8 sm:p-10"
                                style={{ backgroundColor: '#090909' }}>
                                {/* Decorative grid */}
                                <div
                                    className="absolute inset-0 pointer-events-none rounded-2xl"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                                        backgroundSize: '32px 32px',
                                    }}
                                />
                                {/* Bottom glow */}
                                <div
                                    className="absolute inset-0 pointer-events-none rounded-2xl"
                                    style={{
                                        background:
                                            'radial-gradient(ellipse 80% 55% at 50% 110%, rgba(66,96,197,0.12) 0%, transparent 70%)',
                                    }}
                                />

                                {/* Terminal prompt line */}
                                <div className="relative z-10 flex items-center gap-2 mb-6">
                                    <span className="font-mono text-[#6CDB95] text-xs select-none">
                                        ❯
                                    </span>
                                    <span className="font-mono text-[#4260C5] text-xs tracking-widest uppercase select-none">
                                        about.txt
                                    </span>
                                </div>

                                {/* Text */}
                                <div className="relative z-10 flex flex-col gap-5">
                                    <p className="font-mono text-[0.95rem] leading-relaxed text-white/80">
                                        Me interesa construir software que sea{' '}
                                        <span style={{ color: '#6CDB95' }}>rápido</span>,{' '}
                                        <span style={{ color: '#F8DA63' }}>robusto</span>{' '}
                                        y{' '}
                                        <span style={{ color: '#E46F6F' }}>
                                            bien diseñado
                                        </span>
                                        .
                                    </p>
                                    <p className="font-mono text-[0.85rem] leading-relaxed text-white/45">
                                        Disfruto trabajar desde la arquitectura hasta la
                                        implementación, buscando siempre soluciones
                                        simples para problemas complejos.
                                        <span className="about-cursor" />
                                    </p>
                                </div>

                                {/* Bottom divider with accent */}
                                <div
                                    className="relative z-10 mt-8 h-px w-full"
                                    style={{
                                        background:
                                            'linear-gradient(90deg, #4260C522, #6CDB9533, transparent)',
                                    }}
                                />
                                <div className="relative z-10 mt-4 flex items-center gap-2">
                                    <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
                                        Angel Crispin
                                    </span>
                                    <span className="font-mono text-[10px] text-white/10">
                                        ·
                                    </span>
                                    <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
                                        Lima, Perú
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right — photo */}
                        <div
                            data-animate="right"
                            className="flex-shrink-0 flex justify-center"
                            style={{ animationDelay: '500ms' }}>
                            <div
                                className="about-photo-wrapper relative rounded-2xl overflow-hidden"
                                style={{
                                    width: 260,
                                    height: 320,
                                    border: '1px solid #1a1a1a',
                                    boxShadow:
                                        '0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(66,96,197,0.08)',
                                    backgroundColor: '#090909',
                                }}>
                                {/* Grid bg inside photo */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                                        backgroundSize: '24px 24px',
                                    }}
                                />

                                {/* Placeholder avatar */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                    <div
                                        className="rounded-full flex items-center justify-center"
                                        style={{
                                            width: 80,
                                            height: 80,
                                            background:
                                                'linear-gradient(135deg, #4260C522, #6CDB9522)',
                                            border: '1px solid #4260C533',
                                        }}>
                                        <svg
                                            width="36"
                                            height="36"
                                            viewBox="0 0 24 24"
                                            fill="none">
                                            <circle
                                                cx="12"
                                                cy="8"
                                                r="4"
                                                stroke="#4260C5"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                                                stroke="#4260C5"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
                                        tu foto aquí
                                    </span>
                                </div>

                                {/* Scan line animation */}
                                <div className="about-scan-line" />

                                {/* Bottom color glow */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background:
                                            'radial-gradient(ellipse 80% 45% at 50% 110%, rgba(66,96,197,0.18) 0%, transparent 70%)',
                                    }}
                                />

                                {/* Corner accents */}
                                <div
                                    className="absolute top-3 left-3 w-4 h-4 border-t border-l"
                                    style={{ borderColor: '#4260C544' }}
                                />
                                <div
                                    className="absolute top-3 right-3 w-4 h-4 border-t border-r"
                                    style={{ borderColor: '#4260C544' }}
                                />
                                <div
                                    className="absolute bottom-3 left-3 w-4 h-4 border-b border-l"
                                    style={{ borderColor: '#6CDB9544' }}
                                />
                                <div
                                    className="absolute bottom-3 right-3 w-4 h-4 border-b border-r"
                                    style={{ borderColor: '#6CDB9544' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
