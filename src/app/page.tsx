'use client'

import { useState } from 'react'
import PageLoader from '@/shared/providers/PageLoader'
import Contact from '@/features/landing/components/Contact'
import Services from '@/features/landing/components/Services'
import Navbar from '@/features/navigation/navbar/components/Navbar'
import Hero from '@/features/landing/components/Hero'
import KPI from '@/features/landing/components/Kpi'
import About from '@/features/landing/components/About'
import Skills from '@/features/landing/components/Skills'
import Experience from '@/features/landing/components/Experience'
import Projects from '@/features/landing/components/Projects'
import Footer from '@/shared/ui/Footer'

export default function Page() {
    const [loaderDone, setLoaderDone] = useState(false)

    return (
        <>
            {!loaderDone && <PageLoader onComplete={() => setLoaderDone(true)} />}

            {loaderDone && (
                <div className="font-inter">
                    <Navbar />
                    <main className="pt-13">
                        <div className="max-w-[900px] mx-auto px-6">
                            <Hero />
                            <KPI />
                            <Projects />
                            <Experience />
                            <Skills />
                            <Services />
                            <About />
                            <Contact />
                        </div>
                    </main>
                    <Footer />
                </div>
            )}
        </>
    )
}
