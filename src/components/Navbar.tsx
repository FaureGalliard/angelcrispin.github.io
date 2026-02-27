"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  navbarBar,
  navbarContainer,
  navbarItem,
} from "@/lib/motion/navbar";
import Link from "next/link";

const navLinks = [
  { label: "About",          href: "#about" },
  { label: "Projects",       href: "#projects" },
  { label: "Stack",          href: "#techstack" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact" },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.25, when: "beforeChildren", staggerChildren: 0.06 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, when: "afterChildren", staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.2 } },
  exit:   { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      variants={navbarBar}
      initial="hidden"
      animate="show"
      className="fixed w-full z-50 top-0 left-0 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo — avatar + name + title */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
              <Image
                src="https://avatars.githubusercontent.com/u/92346624?v=4"
                alt="Angel Crispin"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-medium font-mono text-sm tracking-tight">
                Angel Crispin
              </span>
              <span className="text-[#4a6ef5] font-mono text-[11px] tracking-wide">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <motion.div
            variants={navbarContainer}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center space-x-6 ml-auto"
          >
            {navLinks.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                variants={navbarItem}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={[
                  "relative text-sm font-medium font-mono text-slate-300",
                  "hover:text-[#6b8fff] transition-colors duration-300",
                  "after:absolute after:-bottom-1 after:left-0",
                  "after:h-px after:w-0 after:bg-[#6b8fff]",
                  "after:transition-all after:duration-300",
                  "hover:after:w-full",
                ].join(" ")}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="text-slate-400 hover:text-white p-2 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.svg
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{    rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="bars"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0,  opacity: 1 }}
                    exit={{    rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"
                  >
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
            className="md:hidden bg-[#0f0f17] border-b border-white/10 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-7 pt-4 pb-2 border-b border-white/5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                <Image
                  src="https://avatars.githubusercontent.com/u/92346624?v=4"
                  alt="Angel Crispin"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-medium text-sm font-mono">Angel Crispin</span>
                <span className="text-[#4a6ef5] font-mono text-[10px]">Software Engineer</span>
              </div>
            </div>

            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  variants={mobileLinkVariants}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md font-mono transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}