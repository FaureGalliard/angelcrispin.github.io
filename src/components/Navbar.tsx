'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Magnetic from './common/Magnetic'
const NAV_LINKS = ['about', 'projects', 'contact', 'experience'] as const
type NavLink = (typeof NAV_LINKS)[number]

const EASE_TRANSITION = 'all 0.5s cubic-bezier(0.06, 0, 0.14, 0.8)'
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function Logo() {
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
                ref={containerRef}
                className="relative overflow-hidden whitespace-nowrap ml-[8px] flex"
                style={{
                    transition: EASE_TRANSITION,
                    paddingRight: hovered ? crispinW : 0,
                }}>
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
    return (
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
    )
}
