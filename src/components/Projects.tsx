import Link from 'next/link'
import Section from './shared/Section'

const PROJECTS = [
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
] as const

export default function Projects() {
    return (
        <Section
            id="projects"
            label="Projects">
            {PROJECTS.map(({ name, desc, tech, href }) => (
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
    )
}
