import { ReactNode } from 'react'

interface SectionProps {
    id: string
    label: string
    children: ReactNode
}

export default function Section({ id, label, children }: SectionProps) {
    return (
        <section
            id={id}
            className="py-13">
            <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-black mb-10">
                {label}
            </p>
            {children}
        </section>
    )
}
