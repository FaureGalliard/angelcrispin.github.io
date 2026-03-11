'use client'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const NAV_LINKS = ['about', 'projects', 'contact', 'experience'] as const
type NavLink = (typeof NAV_LINKS)[number]

const EASE_TRANSITION = 'all 0.5s cubic-bezier(0.06, 0, 0.14, 0.8)'
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' })
        const yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' })

        const onMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            const { height, width, left, top } = el.getBoundingClientRect()
            xTo((clientX - (left + width / 2)) * 0.35)
            yTo((clientY - (top + height / 2)) * 0.35)
        }
        const onLeave = () => {
            xTo(0)
            yTo(0)
        }

        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        return () => {
            el.removeEventListener('mousemove', onMove)
            el.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    return <div ref={ref}>{children}</div>
}

function Logo() {
    const [hovered, setHovered] = useState(false)
    const codeByRef = useRef<HTMLSpanElement>(null)
    const angelRef = useRef<HTMLSpanElement>(null)
    const crispinRef = useRef<HTMLSpanElement>(null)
    const [codeByW, setCodeByW] = useState(0)
    const [crispinLeft, setCrispinLeft] = useState(0)

    const measure = () => {
        if (codeByRef.current && angelRef.current) {
            setCodeByW(codeByRef.current.offsetWidth)
            setCrispinLeft(angelRef.current.offsetLeft + angelRef.current.offsetWidth)
        }
    }

    useEffect(() => {
        measure()
        const ro = new ResizeObserver(measure)
        if (codeByRef.current) ro.observe(codeByRef.current)
        if (angelRef.current) ro.observe(angelRef.current)
        return () => ro.disconnect()
    }, [])

    return (
        <Link
            href="/"
            className="select-none flex items-center cursor-pointer text-black text-[14px]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <span
                style={{
                    transition: EASE_TRANSITION,
                    transform: hovered ? 'rotate(360deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                }}>
                ©
            </span>

            <div
                className="relative overflow-hidden whitespace-nowrap ml-[8px] flex"
                style={{ transition: EASE_TRANSITION, paddingRight: hovered ? 30 : 0 }}>
                <span
                    ref={codeByRef}
                    style={{
                        transition: EASE_TRANSITION,
                        transform: hovered ? 'translateX(-100%)' : 'translateX(0)',
                        display: 'inline-block',
                    }}>
                    Coded by&nbsp;
                </span>

                <span
                    ref={angelRef}
                    style={{
                        transition: EASE_TRANSITION,
                        transform: hovered
                            ? `translateX(-${codeByW}px)`
                            : 'translateX(0)',
                        display: 'inline-block',
                    }}>
                    Angel
                </span>

                <span
                    ref={crispinRef}
                    style={{
                        position: 'absolute',
                        left: crispinLeft,
                        transition: EASE_TRANSITION,
                        transform: hovered
                            ? `translateX(-${codeByW}px)`
                            : 'translateX(0)',
                        display: 'inline-block',
                        paddingLeft: '0.3em',
                    }}>
                    Crispin
                </span>
            </div>
        </Link>
    )
}

export default function Nav() {
    const [isActive, setIsActive] = useState(false)
    const pathname = usePathname()
    const burgerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsActive(false)
    }, [pathname])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        const el = burgerRef.current
        if (!el) return

        gsap.set(el, { scale: 0 })

        const st = ScrollTrigger.create({
            trigger: document.documentElement,
            start: 0,
            end: window.innerHeight,
            onLeave: () => gsap.to(el, { scale: 1, duration: 0.25, ease: 'power1.out' }),
            onEnterBack: () => {
                gsap.to(el, { scale: 0, duration: 0.25, ease: 'power1.out' })
                setIsActive(false)
            },
        })

        return () => st.kill()
    }, [])

    return (
        <>
            <nav className="py-[4px] inset-x-0 z-50 bg-white">
                <div className="mx-auto px-6 flex items-center justify-between h-13">
                    <Logo />
                    <ul className="flex gap-7 list-none">
                        {NAV_LINKS.map((link: NavLink) => (
                            <li
                                key={link}
                                className="relative flex flex-col items-center group">
                                <Magnetic>
                                    <Link
                                        href={`#${link}`}
                                        className="text-[14px] text-gray hover:text-black transition-colors duration-200 inline-block">
                                        {capitalize(link)}
                                    </Link>
                                </Magnetic>
                                <div className="w-[5px] h-[5px] rounded-full bg-black absolute -bottom-2 scale-0 group-hover:scale-100 transition-transform duration-300" />
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    )
}
