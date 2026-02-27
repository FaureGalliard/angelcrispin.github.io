"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  navbarBar,
  navbarContainer,
  navbarItem,
} from "@/lib/motion/navbar";
import Link from "next/link";
const navLinks = [
  { label: "About",         href: "#about" },
  { label: "Projects",      href: "#projects" },
  { label: "Stack",         href: "#techstack" },
  { label: "Certifications",  href: "#certifications" },
  { label: "Contact",      href: "#contact" },
];

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

         <Link
            href="/"
            className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="text-white font-semibold ">
              angelcrispin
            </span>
            <span className="text-[#4a6ef5] font-semibold">
              .dev
            </span>
          </Link>

          {/* Desktop Menu */}
          <motion.div
            variants={navbarContainer}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center space-x-6 ml-auto "
          >
            {navLinks.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                variants={navbarItem}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="text-sm font-medium text-zinc-400 hover:text-[#4a6ef5] transition-colors font-mono"
              >
                <span className="text-[#4a6ef5]/50"></span> {item.label}
              </motion.a>
            ))}

            <motion.a
              href="/resume.pdf"
              variants={navbarItem}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 px-4 py-2 border border-[#4a6ef5] text-[#4a6ef5] text-sm font-mono hover:bg-[#4a6ef5]/10 transition-all rounded-sm flex items-center gap-2"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
              </svg>
              Resume
            </motion.a>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="text-zinc-400 hover:text-white p-2 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0f0f17] border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-md font-mono transition-colors"
                >
                  <span className="text-[#4a6ef5]">{item.num}.</span> {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                className="block px-3 py-2 text-base font-medium text-[#4a6ef5] border border-[#4a6ef5]/30 rounded-md mt-4 text-center hover:bg-[#4a6ef5]/10 font-mono transition-colors"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}