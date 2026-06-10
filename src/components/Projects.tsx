import Section from './common/Section'
import TransitionLink from './TransitionLink'
import { projects } from '@/data/Projects'

export default function Projects() {
    return (
        <Section
            id="projects"
            label="Projects">
            {projects.map(({ slug, title, description, tech }) => (
                <TransitionLink
                    key={slug}
                    href={`/projects/${slug}`}
                    className="group grid grid-cols-[1fr_auto] items-start gap-4 py-7 border-t border-gray/20 last:border-b last:border-gray/20 block">
                    <div>
                        <p className="text-[15px] font-semibold text-black mb-1.5 group-hover:underline">
                            {title}
                        </p>
                        <p className="text-[13px] text-gray leading-[1.65] mb-3">
                            {description}
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
                    <span className="text-lg text-gray/40 mt-0.5">→</span>
                </TransitionLink>
            ))}
        </Section>
    )
}
