'use client'
import Section from '@/shared/ui/Section'
import { useAnimatedNumber } from '../hooks/useKpi'

const STATS = [
    { value: '20+', label: 'Projects completed' },
    { value: '80k+', label: 'Lines of code written' },
    { value: '15+', label: 'Technologies applied' },
] as const

function AnimatedNumber({ value }: { value: string }) {
    const { refs: { ref }, state: { suffix } } = useAnimatedNumber(value)
    return <span ref={ref}>0{suffix}</span>
}

export default function Kpi() {
    return (
        <Section
            id="kpi"
            label="By the numbers">
            <div className="grid grid-cols-3 max-sm:grid-cols-1 border-b border-gray/20">
                {STATS.map(({ value, label }, i) => (
                    <div
                        key={label}
                        className={`py-8 border-t border-gray/20 ${i !== 0 ? 'border-l border-gray/20 pl-8' : ''}`}>
                        <p className="text-[40px] text-center font-medium tracking-tight text-black leading-none mb-2">
                            <AnimatedNumber value={value} />
                        </p>
                        <p className="text-[12px] text-center text-gray leading-[1.4]">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    )
}
