'use client'
import { useState, useEffect, useRef } from 'react'

export function useNavbarLogo() {
    const [hovered, setHovered] = useState(false)
    const codeByRef = useRef<HTMLSpanElement>(null)
    const angelRef = useRef<HTMLSpanElement>(null)
    const crispinRef = useRef<HTMLSpanElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [codeByW, setCodeByW] = useState(0)
    const [crispinLeft, setCrispinLeft] = useState(9999)
    const [crispinW, setCrispinW] = useState(0)

    const measure = () => {
        if (codeByRef.current && angelRef.current && crispinRef.current) {
            setCodeByW(codeByRef.current.offsetWidth)
            setCrispinLeft(angelRef.current.offsetLeft + angelRef.current.offsetWidth)
            setCrispinW(crispinRef.current.offsetWidth)
        }
    }

    useEffect(() => {
        measure()
        const ro = new ResizeObserver(measure)
        if (containerRef.current) ro.observe(containerRef.current)
        return () => ro.disconnect()
    }, [])

    return {
        state: { hovered, codeByW, crispinLeft, crispinW },
        handlers: {
            onMouseEnter: () => setHovered(true),
            onMouseLeave: () => setHovered(false),
        },
        refs: { codeByRef, angelRef, crispinRef, containerRef },
    }
}
