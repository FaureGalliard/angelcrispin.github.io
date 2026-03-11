'use client'

import { useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface MagneticProps {
    children: React.ReactNode
    strength?: number
}

export default function Magnetic({ children, strength = 0.25 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)
    const controls = useAnimation()

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)
        controls.start({
            x: x * strength,
            y: y * strength,
            transition: { type: 'spring', stiffness: 200, damping: 15 },
        })
    }

    const handleMouseLeave = () => {
        controls.start({
            x: 0,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
        })
    }

    return (
        <motion.div
            ref={ref}
            animate={controls}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-flex' }}>
            {children}
        </motion.div>
    )
}
