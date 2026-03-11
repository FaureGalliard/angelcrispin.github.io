import Section from './common/Section'

const SERVICES = [
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
] as const

export default function Services() {
    return (
        <Section
            id="services"
            label="I can help you with">
            {SERVICES.map(({ num, title, desc, tags }) => (
                <div
                    key={num}
                    className="grid grid-cols-[40px_1fr] gap-x-8 py-7 border-t border-gray/20 last:border-b last:border-gray/20">
                    <p className="text-[13px] font-semibold text-gray pt-0.5">{num}</p>
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
    )
}
