'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PageLoaderProps {
    onComplete?: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
    const loaderRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLSpanElement>(null)
    const subRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ onComplete: () => onComplete?.() })

            tl.to(
                textRef.current,
                {
                    y: '0%',
                    duration: 0.9,
                    ease: 'power4.out',
                },
                0.1,
            )

            tl.to(textRef.current, { y: '-110%', duration: 0.7, ease: 'power3.in' }, 2.3)
            tl.to(subRef.current, { opacity: 0, duration: 0.4 }, 2.3)

            tl.to(
                loaderRef.current,
                {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power3.inOut',
                },
                1.3,
            )
        })

        return () => ctx.revert()
    }, [onComplete])

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
            style={{ backgroundColor: '#1a1a1a' }}>
            {/* Texto principal */}
            <div className="overflow-hidden">
                <span
                    ref={textRef}
                    className="block font-semibold tracking-tight text-white select-none"
                    style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 'clamp(3rem, 10vw, 7rem)',
                        lineHeight: 1,
                        transform: 'translateY(110%)',
                    }}>
                    Welcome
                </span>
            </div>

            <div
                ref={subRef}
                className="font-inter absolute bottom-9 right-10 select-none"
                style={{
                    fontFamily: 'var(--font-fira-code)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.3em',
                    color: 'rgba(255,255,255,0.2)',
                    textTransform: 'uppercase',
                }}>
                Inicializando —
            </div>
        </div>
    )
}
