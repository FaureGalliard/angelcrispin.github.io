import Contact from '@/components/Contact'
import Services from '@/components/Services'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import KPI from '@/components/Kpi'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'

export default function Page() {
    return (
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
    )
}
