import Section from './common/Section'
import RoundedButton from './common/RoundedButton'

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
] as const

export default function Contact() {
    return (
        <Section
            id="contact"
            label="">
            <span className="text-[40px] mb-[30px]">
                Let&apos;s work <br /> together
            </span>
            <hr className="mt-10 border-gray" />
            <div className="flex flex-row gap-4 mt-20 mb-15">
                {CONTACT_LINKS.map(({ platform, handle, href }) => (
                    <RoundedButton
                        key={platform}
                        href={href}
                        bg="#ffffffff"
                        borderIdleColor="#1a1a1a"
                        borderEnterColor="transparent"
                        fillColor="#1a1a1a"
                        textColor="#1a1a1a"
                        textHoverColor="white"
                        padding="13px 25px">
                        {handle}
                    </RoundedButton>
                ))}
            </div>
        </Section>
    )
}
