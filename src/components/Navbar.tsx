'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { navbarBar, navbarContainer, navbarItem } from '@/lib/motion/navbar'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Contact', href: '#contact' },
]

const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    show: {
        opacity: 1,
        height: 'auto',
        transition: { duration: 0.25, when: 'beforeChildren', staggerChildren: 0.06 },
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.2,
            when: 'afterChildren',
            staggerChildren: 0.04,
            staggerDirection: -1,
        },
    },
}

const mobileLinkVariants = {
    hidden: { opacity: 0, x: -12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <motion.nav
            variants={navbarBar}
            initial="hidden"
            animate="show"
            className=" w-full z-50 top-0 left-0 bg-transparent transition-all duration-300">
            <div className=" mx-auto px-8 sm:px-8 lg:px-10">
                <div className="flex justify-between items-center h-20">
                    <Link
                        href="/"
                        className="shrink-0 flex items-center gap-3 hover:opacity-85 transition-opacity">
                        <span className="text-white font-sm tracking-tight font-inter">
                            © Code By Angel
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <motion.div
                        variants={navbarContainer}
                        initial="hidden"
                        animate="show"
                        className="hidden md:flex items-center space-x-12 ml-auto font-inter">
                        {navLinks.map((item) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                variants={navbarItem}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                className="relative font-sm text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                                {item.label}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileOpen((prev) => !prev)}
                            className="text-slate-400 hover:text-white p-2 transition-colors"
                            aria-label="Toggle menu">
                            <AnimatePresence
                                mode="wait"
                                initial={false}>
                                {mobileOpen ? (
                                    <motion.svg
                                        key="x"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 384 512">
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z" />
                                    </motion.svg>
                                ) : (
                                    <motion.svg
                                        key="bars"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 448 512">
                                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                                    </motion.svg>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="md:hidden bg-transparent border-b border-white/10 overflow-hidden">
                        <div className="flex items-center gap-3 px-7 pt-4 pb-2 border-b border-white/5">
                            <div className="flex flex-col leading-tight">
                                <span className="text-white font-medium text-sm font-jetbrains">
                                    Angel Crispin
                                </span>
                                <span className="text-[#4a6ef5] text-[10px] font-jetbrains">
                                    Software Engineer
                                </span>
                            </div>
                        </div>
                        <div className="px-10 pt-2 pb-4 space-y-1">
                            {navLinks.map((item) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    variants={mobileLinkVariants}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-5 py-2 text-base font-medium text-white hover:bg-white/5   ">
                                    {item.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
