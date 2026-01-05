"use client";
import { motion } from "framer-motion";
import {
  navbarBar,
  navbarContainer,
  navbarItem,
} from "@/lib/motion/navbar";

export default function Navbar() {
  return (
    <motion.nav
      variants={navbarBar}
      initial="hidden"
      animate="show"
      className="fixed top-0 w-full z-50 bg-transparent"
    >
      <div className="max-w-10xl mx-auto px-8 h-full flex items-center">
        <motion.div
          variants={navbarContainer}
          initial="hidden"
          animate="show"
          className="ml-auto flex gap-1 text-sm text-zinc-300 h-full"
        >
          {[
            { label: "Certifications", href: "#certifications" },
            { label: "Projects", href: "#projects" },
            { label: "Stack", href: "#techstack" },
            { label: "About me", href: "#about" },
            { label: "CV", href: "#cv" },
          ].map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              variants={navbarItem}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-4 py-4 h-full flex items-center
                hover:bg-white/10
                transition-colors
              "
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
}
