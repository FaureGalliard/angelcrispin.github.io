'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        let mouseX = 0
        let mouseY = 0
        let ringX = 0
        let ringY = 0

        let rafId: number

        // Posición interpolada del dot
        let dotX = 0
        let dotY = 0

        // Factor de interpolación: dot más rápido, ring más lento
        const DOT_LERP = 0.14
        const RING_LERP = 0.09

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const animate = () => {
            dotX += (mouseX - dotX) * DOT_LERP
            dotY += (mouseY - dotY) * DOT_LERP
            dot.style.transform = `translate(${dotX}px, ${dotY}px)`

            ringX += (mouseX - ringX) * RING_LERP
            ringY += (mouseY - ringY) * RING_LERP
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`

            rafId = requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', onMouseMove)
        rafId = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <>
            {/* Punto central — sigue inmediatamente */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
                style={{ willChange: 'transform' }}>
                <div className="size-1 rounded-full bg-[#9e9e9e]" />
            </div>

            {/* Ring exterior — sigue con delay (lerp) */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
                style={{ willChange: 'transform' }}>
                <div className="size-7 rounded-full border border-[#575757] opacity-70" />
            </div>
        </>
    )
}
