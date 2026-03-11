import Link from 'next/link'

const NAME = 'Angel Crispin'
const ROLE = 'Software Engineer'
const LOCATION = 'Lima, Perú'
const BIO =
    'I design and build scalable software systems that power modern digital products. My passion for clean architecture, sharp algorithms, and meaningful data puts me in a unique place in the engineering world.'

export default function Hero() {
    return (
        <section
            id="hero"
            className="py-4 border-b border-gray/20">
            <h1 className="text-[clamp(36px,6vw,56px)] font-semibold tracking-tight leading-[1.08] text-black">
                {NAME}
            </h1>
            <h2 className="text-[clamp(36px,6vw,56px)] font-semibold tracking-tight leading-[1.08] text-black mb-5">
                {ROLE}
            </h2>
            <p className="text-base text-gray mb-7">{LOCATION}</p>
            <p className="text-[12px] text-gray max-w-[560px] leading-[1.75] mb-10">
                {BIO}
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
    )
}
