import Section from './shared/Section'
import Tag from './shared/Tag'

const TECH_STACK = [
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
] as const

export default function Skills() {
    return (
        <Section
            id="skills"
            label="TechStack">
            <div className="flex flex-col gap-8 border-b border-gray/20 pb-18">
                {TECH_STACK.map(({ name, tags }) => (
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
    )
}
