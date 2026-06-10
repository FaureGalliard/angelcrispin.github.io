'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function parseValue(value: string): { number: number; suffix: string } {
    const match = value.match(/^(\d+)(.*)$/)
    return match
        ? { number: parseInt(match[1]), suffix: match[2] }
        : { number: 0, suffix: value }
}

export function useAnimatedNumber(value: string) {
    const { number, suffix } = parseValue(value)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const obj = { val: 0 }

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(obj, {
                    val: number,
                    duration: 1.2,
                    ease: 'expo.out',
                    onUpdate: () => {
                        el.textContent = `${Math.round(obj.val)}${suffix}`
                    },
                })
            },
        })

        return () => trigger.kill()
    }, [number, suffix])

    return {
        state: { suffix },
        refs: { ref },
    }
}
