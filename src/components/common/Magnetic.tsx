'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'

interface MagneticProps {
    children: React.ReactNode
    strength?: number
}

export default function Magnetic({ children, strength = 0.25 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)

        const normalizedX = (x / rect.width) * 2 * strength * rect.height
        const normalizedY = (y / rect.height) * 2 * strength * rect.height

        gsap.to(el, {
            x: normalizedX,
            y: normalizedY,
            duration: 0.3,
            ease: 'power2.out',
        })
    }

    const handleMouseLeave = () => {
        const el = ref.current
        if (!el) return

        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)',
        })
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-flex' }}>
            {children}
        </div>
    )
}
