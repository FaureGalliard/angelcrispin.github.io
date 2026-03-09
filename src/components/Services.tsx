'use client'

const services = [
    {
        number: '01',
        title: 'Full-Stack Development',
        description:
            'Building scalable web applications with modern frameworks and architectures. From frontend interfaces to backend systems.',
    },
    {
        number: '02',
        title: 'System Architecture',
        description:
            'Designing robust software systems that scale. Clean code, optimal performance, and maintainable solutions.',
    },
    {
        number: '03',
        title: 'Technical Consulting',
        description:
            'Strategic guidance on technology decisions, code reviews, and engineering best practices for your projects.',
    },
]

export default function ServicesSection() {
    return (
        <section
            className="font-inter min-h-screen flex flex-col"
            style={{ backgroundColor: '#1A1A1A' }}>
            <div className="w-full max-w-6xl mx-auto px-8 py-12 flex flex-col flex-1">
                {/* Top label */}

                {/* Heading + CTA */}
                <div className="flex items-start justify-between mb-14">
                    <h2
                        className="text-5xl font-medium"
                        style={{ color: '#FFFFFF' }}>
                        I can help you with
                    </h2>
                </div>

                {/* Horizontal services */}
                <div className="grid grid-cols-3 gap-16 flex-1">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group cursor-default">
                            {/* number */}
                            <div className="flex items-center gap-3 mb-2">
                                <span
                                    className="text-[11px]"
                                    style={{ color: '#5E626C' }}>
                                    {service.number}
                                </span>
                            </div>
                            <div className="pt-2 mb-14">
                                <div
                                    className="h-px w-full"
                                    style={{ backgroundColor: '#5E626C', opacity: 0.3 }}
                                />
                            </div>
                            {/* title */}
                            <h3
                                className="text-[22px] font-medium mb-6 transition-colors duration-300 group-hover:text-[#445ADE]"
                                style={{ color: '#FFFFFF' }}>
                                {service.title}
                            </h3>

                            {/* description */}
                            <p
                                className="text-[12px] leading-5 "
                                style={{ color: '#ffffff' }}>
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom divider */}
            </div>
        </section>
    )
}
