'use client'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Magnetic from './Magnetic'

interface RoundedButtonProps {
    children: React.ReactNode
    href?: string
    bg?: string
    fillColor?: string
    textColor?: string
    textHoverColor?: string
    borderColor?: string
    className?: string
    padding?: string
    onClick?: () => void
}

type Phase = 'idle' | 'enter' | 'exit'

const circleVariants = {
    idle: { top: '100%', width: '100%', height: '150%' },
    enter: {
        top: '-25%',
        width: '150%',
        height: '150%',
        transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] },
    },
    exit: {
        top: '-150%',
        width: '125%',
        height: '150%',
        transition: { duration: 0.25, ease: 'easeIn' },
    },
}

export default function RoundedButton({
    children,
    href,
    bg = 'transparent',
    fillColor = '#455CE9',
    textColor = 'inherit',
    textHoverColor = 'white',
    borderColor = 'rgb(136,136,136)',
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

    const isEntered = phase === 'enter'

    const inner = (
        <div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onClick={onClick}
            className={`relative overflow-hidden inline-flex items-center justify-center rounded-[10px] border cursor-pointer transition-[border-color] duration-350 ease-linear ${className}`}
            style={{
                padding,
                backgroundColor: bg,
                borderColor: isEntered ? fillColor : borderColor,
            }}>
            <span
                className="relative z-10 pointer-events-none transition-colors duration-400"
                style={{ color: isEntered ? textHoverColor : textColor }}>
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
                    className="no-underline">
                    {inner}
                </Link>
            ) : (
                inner
            )}
        </Magnetic>
    )
}
