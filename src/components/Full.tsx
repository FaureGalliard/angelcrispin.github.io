'use client'
import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'

function LocalTime() {
    const [time, setTime] = useState('')

    useEffect(() => {
        const update = () =>
            setTime(
                new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,

                    timeZone: 'America/Lima',
                }),
            )

        update()
        const id = setInterval(update, 1000)
        return () => clearInterval(id)
    }, [])

    return time
}

function Section({
    id,
    label,
    children,
}: {
    id: string
    label: string
    children: ReactNode
}) {
    return (
        <section
            id={id}
            className="py-13">
            <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-black mb-10">
                {label}
            </p>
            {children}
        </section>
    )
}

function Tag({ children }: { children: string }) {
    return (
        <span className="text-[11px]  px-3 py-[5px] bg-white text-gray border-gray border text-center">
            {children}
        </span>
    )
}

export default function Full() {
    return (
        <div className="font-inter">
            {/* NAV */}
            <nav className="top-0 inset-x-0 bg-white z-50">
                <div className="max-w-[760px] mx-auto px-6 flex items-center justify-between h-13">
                    <Link
                        href="#"
                        className="text-[13px] text-black">
                        © Coded By Angel
                    </Link>
                    <ul className="flex gap-7 list-none">
                        {['about', 'projects', 'contact'].map((l) => (
                            <li key={l}>
                                <Link
                                    href={`#${l}`}
                                    className="text-[13px] text-gray hover:text-black transition-colors">
                                    {l.charAt(0).toUpperCase() + l.slice(1)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <main className="pt-13">
                <div className="max-w-[760px] mx-auto px-6">
                    {/* HERO */}
                    <section
                        id="hero"
                        className="py-4 border-b border-gray/20">
                        <h1 className="text-[clamp(36px,6vw,56px)] font-semibold tracking-tight leading-[1.08] text-black">
                            Angel Crispin
                        </h1>
                        <h2 className="text-[clamp(36px,6vw,56px)] font-semibold tracking-tight leading-[1.08] text-black mb-5">
                            Software Engineer
                        </h2>
                        <p className="text-base text-gray mb-7">Lima, Perú</p>
                        <p className="text-[12px] text-gray max-w-[560px] leading-[1.75] mb-10">
                            I design and build scalable software systems that power modern
                            digital products. My passion for clean architecture, sharp
                            algorithms, and meaningful data puts me in a unique place in
                            the engineering world.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                            <Link
                                href="#contact"
                                className="text-[13px] font-medium px-[18px] py-[9px] bg-black text-white hover:bg-accent transition-colors">
                                Get in touch
                            </Link>
                            <Link
                                href="#projects"
                                className="text-[13px] font-medium px-[18px] py-[9px] border border-gray text-gray hover:bg-accent hover:border-transparent hover:text-white transition-colors">
                                View projects
                            </Link>
                        </div>
                    </section>

                    {/* KPI */}
                    <Section
                        id="kpi"
                        label="By the numbers">
                        <div className="grid grid-cols-3 max-sm:grid-cols-1 border-b border-gray/20">
                            {[
                                { value: '20+', label: 'Projects completed' },
                                { value: '80k+', label: 'Lines of code written' },
                                { value: '15+', label: 'Technologies applied' },
                            ].map(({ value, label }, i) => (
                                <div
                                    key={label}
                                    className={`py-8 border-t border-gray/20 ${i !== 0 ? 'border-l border-gray/20 pl-8' : ''}`}>
                                    <p className="text-[40px] text-center font-medium tracking-tight text-black leading-none mb-2">
                                        {value}
                                    </p>
                                    <p className="text-[12px] text-center text-gray leading-[1.4]">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* SERVICES */}
                    <Section
                        id="services"
                        label="I can help you with">
                        {[
                            {
                                num: '01',
                                title: 'Full-Stack Development',
                                desc: 'Building scalable web applications with modern frameworks and architectures. From frontend interfaces to backend systems.',
                                tags: ['Next.js', 'TypeScript', 'Node.js'],
                            },
                            {
                                num: '02',
                                title: 'System Architecture',
                                desc: 'Designing robust software systems that scale. Clean code, optimal performance, and maintainable solutions.',
                                tags: ['PostgreSQL', 'MongoDB', 'REST'],
                            },
                            {
                                num: '03',
                                title: 'Automatization',
                                desc: 'Implementing automated solutions to streamline development processes and improve efficiency.',
                                tags: ['Python', 'CI/CD', 'Docker', 'n8n'],
                            },
                        ].map(({ num, title, desc, tags }) => (
                            <div
                                key={num}
                                className="grid grid-cols-[40px_1fr] gap-x-8 py-7 border-t border-gray/20 last:border-b last:border-gray/20">
                                <p className="text-[13px] font-semibold text-gray pt-0.5">
                                    {num}
                                </p>
                                <div>
                                    <p className="text-[15px] font-semibold text-black mb-1.5">
                                        {title}
                                    </p>
                                    <p className="text-[13px] text-gray leading-[1.65] mb-3">
                                        {desc}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tags.map((t) => (
                                            <span
                                                key={t}
                                                className="text-[11px] font-medium tracking-[0.04em] uppercase text-gray border border-gray/20 px-2 py-[3px]">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Section>

                    {/* ABOUT */}
                    <Section
                        id="about"
                        label="About">
                        <div className="grid grid-cols-2 max-sm:grid-cols-1 border-b border-gray/20">
                            {[
                                {
                                    label: 'Education',
                                    value: 'Software Engineering — UPC\nStatistics — UNMSM',
                                },
                                { label: 'Location', value: 'Lima, Perú' },
                                {
                                    label: 'Languages',
                                    value: 'Spanish (native) · English C1\nFrench B2 · Korean A1',
                                },
                            ].map(({ label, value }, i) => (
                                <div
                                    key={label}
                                    className={`py-6 border-t border-gray/20 ${i % 2 === 0 ? 'pr-10' : 'pl-10 border-l border-gray/20 max-sm:pl-0 max-sm:border-l-0'}`}>
                                    <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray mb-1.5">
                                        {label}
                                    </p>
                                    <p className="text-sm text-black leading-[1.55] whitespace-pre-line">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* SKILLS */}
                    <Section
                        id="skills"
                        label="TechStack">
                        <div className="flex flex-col gap-8 border-b border-gray/20 pb-18">
                            {[
                                {
                                    name: 'Languages',
                                    tags: ['Java', 'C++', 'Python', 'TypeScript'],
                                },
                                {
                                    name: 'Frameworks & Tools',
                                    tags: [
                                        'Next.js',
                                        'Node.js',
                                        'Tailwind CSS',
                                        'Framer Motion',
                                        'WebGL',
                                        'Git',
                                        'Docker',
                                    ],
                                },
                                {
                                    name: 'Databases',
                                    tags: ['PostgreSQL', 'MongoDB', 'MySQL'],
                                },
                                {
                                    name: 'Other',
                                    tags: [
                                        'Algorithmic Design',
                                        'Trading',
                                        '3D Printing',
                                        'Fusion 360',
                                        'DaVinci Resolve',
                                    ],
                                },
                            ].map(({ name, tags }) => (
                                <div key={name}>
                                    <p className="text-[10px] font-semibold tracking-[0.06em] uppercase text-gray mb-3">
                                        {name}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((t) => (
                                            <Tag key={t}>{t}</Tag>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* EXPERIENCE */}
                    <Section
                        id="experience"
                        label="Experience">
                        {[
                            {
                                date: '2026 — March',
                                title: 'Linux Kernel Contributor',
                                org: 'Open Source',
                                desc: 'Contributed small patches to the Linux kernel, including bug fixes, documentation improvements, and code quality updates. Participated in the kernel contribution workflow and code review process through the Linux Kernel Mailing List.',
                            },
                            {
                                date: '2026 — February',
                                title: 'Automation Engineer',
                                org: 'Freelance',
                                desc: 'Designed and implemented an automated lead-processing workflow using n8n, including webhook ingestion, data validation, duplicate detection in Google Sheets, AI-based classification, priority assignment, and automated email responses.',
                            },
                            {
                                date: '2026 — January',
                                title: 'Full-Stack Developer',
                                org: 'Los Alamos Building',
                                desc: 'Developed a building access management system with a web interface for visitor registration and entry tracking. Integrated Raspberry Pi hardware and camera modules to support facial recognition for automated access control.',
                            },
                            {
                                date: '2025 — October',
                                title: 'ICPC Competitor',
                                org: 'UPC — Universidad Peruana de Ciencias Aplicadas',
                                desc: 'Represented the university in competitive programming contests, focusing on algorithmic problem solving, graph theory, modular arithmetic, and performance optimization in C++.',
                            },
                            {
                                date: '2025 — September',
                                title: 'Frontend Developer',
                                org: 'Sastrería Marcels — Freelance',
                                desc: 'Designed and developed a responsive website for a local tailor shop using Next.js and Tailwind CSS, including an online appointment booking system for customer scheduling.',
                            },
                        ].map(({ date, title, org, desc }) => (
                            <div
                                key={title}
                                className="grid grid-cols-[120px_1fr] max-sm:grid-cols-1 gap-x-8 py-7 border-t border-gray/20 last:border-b last:border-gray/20">
                                <p className="text-xs text-gray pt-0.5 max-sm:mb-1.5">
                                    {date}
                                </p>
                                <div>
                                    <p className="text-[15px] font-semibold text-black mb-1">
                                        {title}
                                    </p>
                                    <p className="text-[13px] text-gray mb-2.5">{org}</p>
                                    <p className="text-[13px] text-gray leading-[1.65]">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Section>

                    {/* PROJECTS */}
                    <Section
                        id="projects"
                        label="Projects">
                        {[
                            {
                                name: 'Hand Gesture Shortcut System',
                                desc: 'A real-time computer vision system that detects hand gestures from webcam input and triggers operating system shortcuts such as zoom, scroll, and task switching. Combines MediaPipe hand tracking with a Scikit-learn classifier for gesture recognition.',
                                tech: ['Python', 'OpenCV', 'MediaPipe', 'Scikit-learn'],
                                href: '#',
                            },
                            {
                                name: 'Save the Valley',
                                desc: 'A 2D sandbox game built in C++ featuring a procedurally generated world with dynamic chunk loading, enemy AI with state-based behavior, and a combat system with multiple weapons and hitboxes.',
                                tech: ['C++', 'SFML', 'CMake', 'Game Development'],
                                href: '#',
                            },
                            {
                                name: 'Stream Deck System Automation',
                                desc: 'A collection of Windows automation scripts designed to integrate with Stream Deck and other launchers, enabling one-click system actions such as shutdown, restart, suspend, and window management.',
                                tech: ['Windows', 'Batch', 'PowerShell', 'Automation'],
                                href: '#',
                            },
                        ].map(({ name, desc, tech, href }) => (
                            <Link
                                key={name}
                                href={href}
                                target="_blank"
                                className="group grid grid-cols-[1fr_auto] items-start gap-4 py-7 border-t border-gray/20 last:border-b last:border-gray/20">
                                <div>
                                    <p className="text-[15px] font-semibold text-black mb-1.5 group-hover:underline">
                                        {name}
                                    </p>
                                    <p className="text-[13px] text-gray leading-[1.65] mb-3">
                                        {desc}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tech.map((t) => (
                                            <span
                                                key={t}
                                                className="text-[11px] font-medium tracking-[0.04em] uppercase text-gray border border-gray/20 px-2 py-[3px]">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <span className="text-lg text-gray/40 mt-0.5">↗</span>
                            </Link>
                        ))}
                    </Section>

                    {/* CONTACT */}
                    <Section
                        id="contact"
                        label="Let's work together">
                        <p className="text-[15px] text-gray max-w-[480px] leading-[1.75] mb-9">
                            Open to internships, collaborations, and interesting
                            engineering problems. Reach out through any of the channels
                            below.
                        </p>
                        {[
                            {
                                platform: 'Email',
                                handle: 'contacto@angelcrispin.dev',
                                href: 'mailto:contacto@angelcrispin.dev',
                            },
                            {
                                platform: 'Number',
                                handle: '+51 926 447 831',
                                href: 'https://wa.me/51926447831',
                            },
                            {
                                platform: 'LinkedIn',
                                handle: 'linkedin.com/in/angelcrispin',
                                href: 'https://linkedin.com/in/angelcrispin',
                            },
                        ].map(({ platform, handle, href }) => (
                            <Link
                                key={platform}
                                href={href}
                                target="_blank"
                                className="group flex items-center justify-between py-[18px] border-t border-gray/20 last:border-b last:border-gray/20 text-black hover:text-black transition-colors">
                                <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-gray w-[100px]">
                                    {platform}
                                </span>
                                <span className="text-sm text-gray flex-1 group-hover:text-black transition-colors">
                                    {handle}
                                </span>
                                <span className="text-base text-gray/20">↗</span>
                            </Link>
                        ))}
                    </Section>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="py-8">
                <div className="max-w-[760px] mx-auto px-6 flex justify-between text-[10px] text-gray">
                    <div>
                        Version
                        <br />
                        <span className="text-xs text-black">2026 © Edition</span>
                    </div>
                    <div>
                        LocalTime
                        <br />
                        <span className="text-[12px] text-black">
                            <LocalTime /> GMT-5
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
