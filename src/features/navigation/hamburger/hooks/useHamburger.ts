'use client'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useHamburger() {
    const [isActive, setIsActive] = useState(false)
    const pathname = usePathname()
    const buttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsActive(false)
    }, [pathname])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.set(buttonRef.current, { scale: 0 })

        ScrollTrigger.create({
            trigger: document.documentElement,
            start: 'top top',
            end: `+=${window.innerHeight}`,
            onLeave: () =>
                gsap.to(buttonRef.current, {
                    scale: 1,
                    duration: 0.25,
                    ease: 'power1.out',
                }),
            onEnterBack: () => {
                gsap.to(buttonRef.current, {
                    scale: 0,
                    duration: 0.25,
                    ease: 'power1.out',
                })
                setIsActive(false)
            },
        })

        return () => ScrollTrigger.getAll().forEach((t) => t.kill())
    }, [])

    return {
        state: { isActive },
        handlers: { toggle: () => setIsActive((prev) => !prev) },
        refs: { buttonRef },
    }
}
