'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import TransitionLink from './TransitionLink'
import type { Project } from '@/data/Projects'

const TYPE_LABELS: Record<string, string> = {
    platform: 'Platform',
    game:     'Game',
    ml:       'Machine Learning',
    desktop:  'Desktop App',
    web:      'Web App',
}

const fadeUp = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export default function ProjectDetail({ project }: { project: Project }) {
    const {
        title, description, tech, type, github,
        highlights, featureGroups, pipeline, gestures, videos,
    } = project

    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="py-4">

            {/* ── Nav row ── */}
            <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-6">
                <TransitionLink
                    href="/"
                    className="text-[18px] text-gray hover:text-black transition-colors leading-none">
                    ←
                </TransitionLink>
                {github && (
                    <Link
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[13px] text-gray hover:text-black transition-colors">
                        <span>GitHub</span>
                        <span>↗</span>
                    </Link>
                )}
            </motion.div>

            {/* ── Type badge ── */}
            <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray mb-3">
                {TYPE_LABELS[type] ?? type}
            </motion.p>

            {/* ── Title ── */}
            <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[72px] max-sm:text-[48px] font-semibold tracking-tight leading-[1.05] text-black mb-6">
                {title}
            </motion.h1>

            {/* ── Tech tags ── */}
            <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-2 mb-8">
                {tech.map((t) => (
                    <span
                        key={t}
                        className="text-[11px] font-medium tracking-[0.05em] uppercase text-gray border border-gray/20 px-2.5 py-1">
                        {t}
                    </span>
                ))}
            </motion.div>

            {/* ── Description ── */}
            <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-[15px] text-gray leading-[1.8] border-t border-gray/20 pt-8 mb-12 max-w-[680px]">
                {description}
            </motion.p>

            {/* ── Highlights ── */}
            {highlights.length > 0 && (
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-12">
                    <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray mb-5">
                        Highlights
                    </p>
                    <ul className="flex flex-col gap-3">
                        {highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-3 text-[14px] text-gray leading-[1.65]">
                                <span className="text-gray mt-[3px] flex-shrink-0">—</span>
                                {h}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {/* ── Pipeline ── */}
            {pipeline.length > 0 && (
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-12">
                    <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray mb-6">
                        Pipeline
                    </p>
                    <div className="flex flex-wrap items-center gap-0">
                        {pipeline.map((step, i) => (
                            <div key={step.label} className="flex items-center gap-0">
                                <div className="flex flex-col items-center border border-gray/20 px-6 py-4 min-w-[90px]">
                                    <span className="text-[13px] font-semibold text-black">{step.label}</span>
                                    <span className="text-[11px] text-gray mt-0.5">{step.sub}</span>
                                </div>
                                {i < pipeline.length - 1 && (
                                    <span className="text-gray/30 text-lg px-1">→</span>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Gestures ── */}
            {gestures.length > 0 && (
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-12">
                    <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray mb-5">
                        Gestures
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {gestures.map((g) => (
                            <span
                                key={g.key}
                                className="text-[12px] font-mono font-medium px-3 py-1.5 border border-gray/20 text-gray">
                                {g.key} → {g.label}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Feature Groups ── */}
            {featureGroups.length > 0 && (
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-12">
                    <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray mb-6">
                        Features
                    </p>
                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-0">
                        {featureGroups.map((group, i) => (
                            <div
                                key={group.label}
                                className={`py-7 pr-8 border-t border-gray/20
                                    ${i % 2 === 1 ? 'pl-8 border-l border-gray/20 max-sm:pl-0 max-sm:border-l-0' : ''}
                                    ${i >= featureGroups.length - 2 ? 'border-b border-gray/20' : ''}
                                `}>
                                <p className="text-[12px] font-semibold tracking-[0.04em] uppercase text-black mb-4">
                                    {group.label}
                                </p>
                                <ul className="flex flex-col gap-2">
                                    {group.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2 text-[13px] text-gray leading-[1.6]">
                                            <span className="flex-shrink-0 mt-[5px] w-1 h-1 rounded-full bg-gray/40" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Videos ── */}
            {videos.length > 0 && (
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-12">
                    <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray mb-6">
                        Demo
                    </p>
                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                        {videos.map((v) => (
                            <div key={v.url}>
                                <video
                                    src={v.url}
                                    controls
                                    muted
                                    playsInline
                                    className="w-full border border-gray/15 bg-black"
                                    style={{ aspectRatio: '16/9', objectFit: 'contain' }}
                                />
                                <p className="text-[11px] text-gray mt-2 tracking-[0.04em] uppercase">
                                    {v.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

        </motion.div>
    )
}
