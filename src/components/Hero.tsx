'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import RoundedButton from './common/RoundedButton'
const NAME = 'Angel Crispin'
const ROLE = 'Software Engineer'
const LOCATION = 'Lima, Perú'
const BIO =
    'I design and build scalable software systems that power modern digital products. My passion for clean architecture, sharp algorithms, and meaningful data puts me in a unique place in the engineering world.'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export default function Hero() {
    return (
        <motion.section
            id="hero"
            className="py-4 border-b border-gray/20"
            variants={stagger}
            initial="hidden"
            animate="visible">
            <motion.h1
                className="text-[80px] font-semibold tracking-tight leading-[1.08] text-black"
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                {NAME}
            </motion.h1>
            <motion.h2
                className="text-[80px] font-semibold tracking-tight leading-[1.08] text-black mb-5"
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                {ROLE}
            </motion.h2>
            <motion.p
                className="text-[18px] text-gray mb-14"
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                {LOCATION}
            </motion.p>
            <motion.p
                className="text-[15px] text-gray max-w-[560px] leading-[1.75] mb-10"
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                {BIO}
            </motion.p>
            <motion.div
                className="flex gap-5 flex-wrap mb-[30px]"
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <RoundedButton
                    href="#contact"
                    bg="var(--color-black)"
                    fillColor="var(--color-accent)"
                    textColor="var(--color-white)"
                    borderIdleColor="transparent"
                    textHoverColor="white"
                    borderEnterColor="var(--color-accent)">
                    <span className="text-[14px] font-medium">Get in touch</span>
                </RoundedButton>
                <RoundedButton
                    href="#projects"
                    fillColor="var(--color-accent)"
                    textColor="var(--color-gray)"
                    textHoverColor="white"
                    borderIdleColor="var(--color-gray)"
                    borderEnterColor="var(--color-accent)">
                    <span className="text-[14px] font-medium">View projects</span>
                </RoundedButton>
            </motion.div>
        </motion.section>
    )
}
