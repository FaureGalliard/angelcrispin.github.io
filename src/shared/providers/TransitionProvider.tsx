'use client'
import { useRef, useCallback, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import gsap from 'gsap'
import { TransitionContext } from '@/shared/context/TransitionContext'

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()
    const isTransitioning = useRef(false)

    useEffect(() => {
        const overlay = overlayRef.current
        if (!overlay || !isTransitioning.current) return

        isTransitioning.current = false

        gsap.to(overlay, {
            yPercent: -100,
            duration: 0.65,
            ease: 'power3.inOut',
            delay: 0.05,
            onComplete: () => {
                gsap.set(overlay, { display: 'none', yPercent: 100 })
            },
        })
    }, [pathname])

    const navigate = useCallback(
        (href: string) => {
            const overlay = overlayRef.current
            if (!overlay) {
                router.push(href)
                return
            }

            isTransitioning.current = true
            gsap.set(overlay, { yPercent: 100, display: 'flex' })
            gsap.to(overlay, {
                yPercent: 0,
                duration: 0.55,
                ease: 'power3.inOut',
                onComplete: () => router.push(href),
            })
        },
        [router],
    )

    return (
        <TransitionContext.Provider value={{ navigate }}>
            {children}
            <div
                ref={overlayRef}
                data-transition-overlay
                style={{ display: 'none' }}
                className="fixed inset-0 z-[997] bg-[#1a1a1a]"
            />
        </TransitionContext.Provider>
    )
}
