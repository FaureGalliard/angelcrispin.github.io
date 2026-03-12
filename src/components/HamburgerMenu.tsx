'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Magnetic from '@/components/common/Magnetic'

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
    title: string
    href: string
}

interface NavLinkProps {
    data: NavItem & { index: number }
    isActive: boolean
    setSelectedIndicator: (href: string) => void
}

interface BurgerButtonProps {
    isActive: boolean
    onClick: () => void
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Work', href: '/work' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
]

// ─── Framer Motion Variants ───────────────────────────────────────────────────

const menuSlide = {
    initial: { x: 'calc(100% + 100px)' },
    enter: { x: '0', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
    exit: {
        x: 'calc(100% + 100px)',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
}

const slide = {
    initial: { x: 80 },
    enter: (i: number) => ({
        x: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.05 * i },
    }),
    exit: (i: number) => ({
        x: 80,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.05 * i },
    }),
}
const scaleVariants = {
    open: { scale: 1, transition: { duration: 0.3 } },
    closed: { scale: 0, transition: { duration: 0.4 } },
}

// ─── BurgerButton ─────────────────────────────────────────────────────────────

function BurgerButton({ isActive, onClick }: BurgerButtonProps) {
    const circleRef = useRef<HTMLDivElement>(null)
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isAnimating = useRef(false)

    const onEnter = () => {
        if (timeoutId.current) clearTimeout(timeoutId.current)
        isAnimating.current = true
        gsap.killTweensOf(circleRef.current)
        gsap.fromTo(
            circleRef.current,
            { top: '100%', width: '150%' },
            {
                top: '-25%',
                width: '150%',
                duration: 0.4,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.to(circleRef.current, {
                        top: '-150%',
                        width: '125%',
                        duration: 0.25,
                        onComplete: () => {
                            isAnimating.current = false
                        },
                    })
                },
            },
        )
    }

    const onLeave = () => {
        if (timeoutId.current) clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(
            () => {
                gsap.killTweensOf(circleRef.current)
                gsap.to(circleRef.current, {
                    top: '100%',
                    width: '150%',
                    duration: 0.3,
                    ease: 'power3.out',
                })
            },
            isAnimating.current ? 300 : 0,
        )
    }

    return (
        <div
            className="relative flex items-center justify-center w-20 h-20 m-5 rounded-full border border-white/30 bg-[rgb(41,41,41)] overflow-hidden cursor-pointer"
            onClick={onClick}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}>
            {/* Barras → X */}
            <div className="flex flex-col gap-1.5 w-[23px] pointer-events-none z-10">
                <span
                    className={`block w-full h-[1.5px] bg-white rounded-sm origin-center transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
                        isActive ? 'translate-y-[3.75px] rotate-45' : ''
                    }`}
                />
                <span
                    className={`block w-full h-[1.5px] bg-white rounded-sm origin-center transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
                        isActive ? '-translate-y-[3.75px] -rotate-45' : ''
                    }`}
                />
            </div>

            <div
                ref={circleRef}
                className="absolute w-[150%] h-[150%] rounded-full bg-white pointer-events-none"
                style={{ top: '100%' }}
            />
        </div>
    )
}

// ─── Curve ────────────────────────────────────────────────────────────────────

function Curve() {
    const [height, setHeight] = useState(800)
    useEffect(() => {
        setHeight(window.innerHeight)
    }, [])

    const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`
    const targetPath = `M100 0 L100 ${height} Q100  ${height / 2} 100 0`

    const curveVariants = {
        initial: { d: initialPath },
        enter: {
            d: targetPath,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as const },
        },
        exit: {
            d: initialPath,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
        },
    }

    return (
        <svg
            className="absolute top-0 h-full fill-[rgb(41,41,41)] stroke-none"
            style={{ left: -99, width: 100 }}
            viewBox={`0 0 100 ${height}`}
            preserveAspectRatio="none">
            <motion.path
                variants={curveVariants}
                initial="initial"
                animate="enter"
                exit="exit"
            />
        </svg>
    )
}

// ─── NavLink ──────────────────────────────────────────────────────────────────
function NavLink({ data, isActive, setSelectedIndicator }: NavLinkProps) {
    const { title, href, index } = data
    return (
        <Magnetic strength={0.15}>
            <motion.div
                className="relative flex items-center pl-8"
                onMouseEnter={() => setSelectedIndicator(href)}
                custom={index}
                variants={slide}
                initial="initial"
                animate="enter"
                exit="exit">
                <motion.div
                    variants={scaleVariants}
                    animate={isActive ? 'open' : 'closed'}
                    className="absolute left-0 w-2.5 h-2.5 bg-white rounded-full"
                />
                <Link
                    href={href}
                    className="text-[46px]  text-white no-underline  transition-opacity duration-200">
                    {title}
                </Link>
            </motion.div>
        </Magnetic>
    )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
    const pathname = usePathname()
    const [selectedIndicator, setSelectedIndicator] = useState(pathname)

    return (
        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed top-0 right-0 h-screen w-[400px] bg-[rgb(41,41,41)] text-white flex flex-col justify-between z-[999] overflow-hidden">
            <div className="flex flex-col gap-10 flex-1 pt-28 pb-10 px-10">
                {/* Links */}
                <div
                    onMouseLeave={() => setSelectedIndicator(pathname)}
                    className="flex flex-col gap-2">
                    <div className="border-b border-white/15 mb-4 pb-3">
                        <p className="text-white font-semibold text-[11px] uppercase tracking-[2px] m-0">
                            Navigation
                        </p>
                    </div>
                    {NAV_ITEMS.map((item, index) => (
                        <NavLink
                            key={index}
                            data={{ ...item, index }}
                            isActive={selectedIndicator === item.href}
                            setSelectedIndicator={setSelectedIndicator}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className=" px-6  flex justify-between text-[12px] mt-15 text-gray">
                    <div>
                        Version
                        <br />
                        <span className="text-[13px] text-white">2026</span>
                    </div>

                    <div className="">
                        Socials
                        <br />
                        <a
                            className="text-[13px] text-white"
                            href="https://linkedin.com/in/angelcrispin"
                            target="">
                            Linkedin
                        </a>
                    </div>
                </div>
            </div>

            <Curve />
        </motion.div>
    )
}

// ─── HamburgerMenu ────────────────────────────────────────────────────────────

export default function HamburgerMenu() {
    const [isActive, setIsActive] = useState(false)
    const pathname = usePathname()
    const buttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isActive) setIsActive(false)
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

    return (
        <>
            <div
                ref={buttonRef}
                className="fixed top-0 right-0 z-[1000]">
                <Magnetic>
                    <BurgerButton
                        isActive={isActive}
                        onClick={() => setIsActive((prev) => !prev)}
                    />
                </Magnetic>
            </div>

            <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
        </>
    )
}
