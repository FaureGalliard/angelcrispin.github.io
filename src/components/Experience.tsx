import Section from './shared/Section'

const EXPERIENCE = [
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
] as const

export default function Experience() {
    return (
        <Section
            id="experience"
            label="Experience">
            {EXPERIENCE.map(({ date, title, org, desc }) => (
                <div
                    key={title}
                    className="grid grid-cols-[120px_1fr] max-sm:grid-cols-1 gap-x-8 py-7 border-t border-gray/20 last:border-b last:border-gray/20">
                    <p className="text-[13px] text-gray pt-0.5 max-sm:mb-1.5">{date}</p>
                    <div>
                        <p className="text-[15px] font-semibold text-black mb-1">
                            {title}
                        </p>
                        <p className="text-[13px] text-gray mb-2.5">{org}</p>
                        <p className="text-[13px] text-gray leading-[1.65]">{desc}</p>
                    </div>
                </div>
            ))}
        </Section>
    )
}
