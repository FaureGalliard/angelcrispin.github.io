import Section from './common/Section'

const ABOUT_ITEMS = [
    {
        label: 'Education',
        value: 'Software Engineering — UPC\nStatistics — UNMSM',
    },
    {
        label: 'Location',
        value: 'Lima, Perú',
    },
    {
        label: 'Languages',
        value: 'Spanish (native) · English C1\nFrench B2 · Korean A1',
    },
] as const

export default function About() {
    return (
        <Section
            id="about"
            label="About">
            <div className="grid grid-cols-2 max-sm:grid-cols-1 border-b border-gray/20">
                {ABOUT_ITEMS.map(({ label, value }, i) => (
                    <div
                        key={label}
                        className={`py-6 border-t border-gray/20 ${
                            i % 2 === 0
                                ? 'pr-10'
                                : 'pl-10 border-l border-gray/20 max-sm:pl-0 max-sm:border-l-0'
                        }`}>
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
    )
}
