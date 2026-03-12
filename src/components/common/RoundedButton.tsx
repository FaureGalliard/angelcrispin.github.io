'use client'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Magnetic from './Magnetic'
import { type Variants } from 'framer-motion'

interface RoundedButtonProps {
    children: React.ReactNode
    href?: string
    bg?: string
    fillColor?: string
    textColor?: string
    textHoverColor?: string
    borderIdleColor?: string
    borderEnterColor?: string
    className?: string
    padding?: string
    onClick?: () => void
}

type Phase = 'idle' | 'enter' | 'exit'

const circleVariants: Variants = {
    idle: {
        top: '100%',
        width: '30%',
        height: '150%',
        opacity: 0,
        transition: { duration: 0 },
    },
    enter: {
        top: '-25%',
        width: '130%',
        height: '200%',
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1],
        },
    },
    exit: {
        top: '-200%',
        width: '85%',
        height: '150%',
        opacity: 1,
        transition: { duration: 0.35, ease: 'easeIn' },
    },
}

export default function RoundedButton({
    children,
    href,
    bg = 'transparent',
    fillColor = '#ffffff',
    textColor = 'inherit',
    textHoverColor = 'black',
    borderIdleColor = 'rgb(136,136,136)',
    borderEnterColor = fillColor,
    padding = '13px 40px',
    className = '',
    onClick,
}: RoundedButtonProps) {
    const [phase, setPhase] = useState<Phase>('idle')
    const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(
        () => () => {
            leaveTimeout.current && clearTimeout(leaveTimeout.current)
        },
        [],
    )

    const onEnter = () => {
        leaveTimeout.current && clearTimeout(leaveTimeout.current)
        setPhase('enter')
    }

    const onLeave = () => {
        leaveTimeout.current = setTimeout(() => setPhase('exit'), 300)
    }

    const inner = (
        <div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onClick={onClick}
            className={`group relative overflow-hidden inline-flex items-center justify-center cursor-pointer transition-[border-color] duration-450 ease-linear isolate border border-solid border-[var(--border-idle)] hover:border-[var(--border-hover)] rounded-[10px] ${className}`}
            style={
                {
                    padding,
                    backgroundColor: bg,
                    '--text-idle': textColor,
                    '--text-hover': textHoverColor,
                    '--border-idle': borderIdleColor,
                    '--border-hover': borderEnterColor,
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    willChange: 'transform',
                } as React.CSSProperties & Record<string, string>
            }>
            <span className="relative z-10 pointer-events-none text-[var(--text-idle)] group-hover:text-[var(--text-hover)] transition-colors duration-400">
                {children}
            </span>
            <motion.div
                variants={circleVariants}
                animate={phase}
                onAnimationComplete={(d) => d === 'exit' && setPhase('idle')}
                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                style={{ backgroundColor: fillColor }}
            />
        </div>
    )

    return (
        <Magnetic>
            {href ? (
                <Link
                    href={href}
                    className="no-underline overflow-hidden block"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}>
                    {inner}
                </Link>
            ) : (
                inner
            )}
        </Magnetic>
    )
}
