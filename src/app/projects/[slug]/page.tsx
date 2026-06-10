import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import ProjectDetail from '@/features/projects/components/ProjectDetail'
import Navbar from '@/features/navigation/navbar/components/Navbar'
import Footer from '@/shared/ui/Footer'

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)
    if (!project) return {}
    return {
        title: project.title,
        description: project.description,
    }
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)
    if (!project) notFound()

    return (
        <>
            <Navbar />
            <main className="pt-13">
                <div className="max-w-[900px] mx-auto px-6">
                    <ProjectDetail project={project} />
                </div>
            </main>
            <Footer />
        </>
    )
}
