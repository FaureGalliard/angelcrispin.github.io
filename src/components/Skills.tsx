import Section from './common/Section'
import Tag from './common/Tag'

const TECH_STACK = [
    {
        name: 'Languages',
        tags: ['Python', 'Java', 'C++', 'TypeScript', 'Rust'],
    },
    {
        name: 'Frameworks & Tools',
        tags: [
            'Next.js',
            'Node.js',
            'Django',
            'Flask',
            'Tauri',
            'Tailwind CSS',
            'Framer Motion',
            'PyTorch',
            'OpenCV',
            'MediaPipe',
            'SFML',
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
            'GSAP',
            'Scikit-learn',
            'Web Speech API',
            'CI/CD',
            'REST APIs',
            'Linux',
            'Scrum',
            'Algorithmic Design',
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
                        <p className="text-[12px] font-semibold tracking-[0.06em] uppercase text-gray mb-3">
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
