'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import Section from './common/Section'

const STATS = [
    { value: '20+', label: 'Projects completed' },
    { value: '80k+', label: 'Lines of code written' },
    { value: '15+', label: 'Technologies applied' },
] as const

function parseValue(value: string): { number: number; suffix: string } {
    const match = value.match(/^(\d+)(.*)$/)
    return match
        ? { number: parseInt(match[1]), suffix: match[2] }
        : { number: 0, suffix: value }
}

function AnimatedNumber({ value }: { value: string }) {
    const { number, suffix } = parseValue(value)
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-20% 0px' })

    useEffect(() => {
        if (!inView || !ref.current) return
        const controls = animate(0, number, {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
                if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
            },
        })
        return () => controls.stop()
    }, [inView, number, suffix])

    return <span ref={ref}>0{suffix}</span>
}

export default function Kpi() {
    return (
        <Section
            id="kpi"
            label="By the numbers">
            <div className="grid grid-cols-3 max-sm:grid-cols-1 border-b border-gray/20">
                {STATS.map(({ value, label }, i) => (
                    <div
                        key={label}
                        className={`py-8 border-t border-gray/20 ${i !== 0 ? 'border-l border-gray/20 pl-8' : ''}`}>
                        <p className="text-[40px] text-center font-medium tracking-tight text-black leading-none mb-2">
                            <AnimatedNumber value={value} />
                        </p>
                        <p className="text-[12px] text-center text-gray leading-[1.4]">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    )
}
