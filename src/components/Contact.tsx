import Link from 'next/link'
import Section from './shared/Section'

const CONTACT_INTRO =
    'Open to internships, collaborations, and interesting engineering problems. Reach out through any of the channels below.'

const CONTACT_LINKS = [
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
] as const

export default function Contact() {
    return (
        <Section
            id="contact"
            label="Let's work together">
            <p className="text-[15px] text-gray max-w-[480px] leading-[1.75] mb-9">
                {CONTACT_INTRO}
            </p>
            {CONTACT_LINKS.map(({ platform, handle, href }) => (
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
    )
}
