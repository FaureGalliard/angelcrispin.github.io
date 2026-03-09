'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
export default function ContactSection() {
    const [time, setTime] = useState('')

    useEffect(() => {
        const update = () => {
            const now = new Date()
            const formatted = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZoneName: 'short',
            })
            setTime(formatted)
        }
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section
            className="font-inter relative min-h-screen flex flex-col justify-between px-8 py-12 md:px-16"
            style={{ backgroundColor: '#1A1A1A' }}>
            {/* Main content */}
            <div className="flex-1 flex flex-col justify-center">
                {/* Heading */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-1">
                        <Image
                            src="https://avatars.githubusercontent.com/u/92346624?s=400&u=26d43676130b9813db4c60c140cb4c4c108f8559&v=4"
                            alt="Avatar"
                            width={80}
                            height={80}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <span
                            className="text-[40px] md:text-[60px] font-medium leading-tight"
                            style={{ color: '#5E626C' }}>
                            Let&apos;s work
                        </span>
                    </div>
                    <h1
                        className="text-[40px] md:text-[60px] font-medium leading-tight"
                        style={{ color: '#FFFFFF' }}>
                        together
                    </h1>
                </div>

                {/* Divider with CTA button */}
                <div className="relative flex items-center mb-10">
                    <div
                        className="flex-1 h-px"
                        style={{ backgroundColor: '#ffffff', opacity: 0.4 }}
                    />
                    <button
                        className="absolute right-0 -translate-y-1/2 top-1/2 w-28 h-28 rounded-full flex items-center justify-center text-white text-sm font-medium transition-transform duration-300 hover:scale-110 cursor-pointer"
                        style={{ backgroundColor: '#445ADE' }}>
                        Get in touch
                    </button>
                </div>

                {/* Contact pills */}
                <div className="flex font-inter  flex-wrap gap-3 mt-4">
                    <a
                        href="mailto:contact@angelcrispin.dev"
                        className="px-5 py-3 rounded-full border text-[12px]  transition-all duration-200 hover:border-[#445ADE] hover:text-white"
                        style={{
                            borderColor: '#5E626C',
                            color: '#FFFFFF',
                            backgroundColor: 'transparent',
                        }}>
                        contact@angelcrispin.dev
                    </a>
                    <a
                        href="tel:+51926447831"
                        className="px-5 py-3 rounded-full border text-[12px]  transition-all duration-200 hover:border-[#445ADE] hover:text-white"
                        style={{
                            borderColor: '#5E626C',
                            color: '#FFFFFF',
                            backgroundColor: 'transparent',
                        }}>
                        +51 926 447 831
                    </a>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between text-xs mt-16">
                <div className="flex gap-10">
                    <div>
                        <p className="text-[#5E626C] font-semibold uppercase  text-[8px] mb-1">
                            Version
                        </p>
                        <p className="text-[#ffffff]">2026 © Edition</p>
                    </div>
                    <div>
                        <p className="text-[#5E626C] font-semibold uppercase  text-[8px] mb-1">
                            Local time
                        </p>
                        <p className="text-[#ffffff]">{time}</p>
                    </div>
                </div>
                <div className="">
                    <p className="text-[#5E626C] font-semibold uppercase text-[8px] mb-1">
                        Socials
                    </p>
                    <a
                        href="https://www.linkedin.com/in/angelcrispin/"
                        className="hover:text-white transition-colors duration-200"
                        style={{ color: '#FFFFFF' }}>
                        Linkedin
                    </a>
                </div>
            </div>
        </section>
    )
}
