"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl w-full rounded-2xl border border-white/10 p-10 text-center backdrop-blur-md"
        style={{ backgroundColor: "rgba(13, 14, 15, 0.9)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
        </div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[1rem] text-left text-[rgba(255, 235, 52, 1)]"
        >
          Software Developer &lt;/&gt;
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[2.6rem] font-bold text-white text-left"
        >
          Angel Crispin
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.65, duration: 0.5, ease: "easeOut" }}
  className="mt-4 max-w-xl text-left text-sm leading-relaxed text-gray-300">
          Desarrollo aplicaciones y sistemas tecnológicos, cuidando tanto la lógica como la arquitectura, con una mentalidad de ingeniería y mejora continua.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex justify-start gap-5 text-gray-400"
        >
          {/* GitHub */}
          <motion.a
            href="https://github.com/angelcrispin"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            className="hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
          </motion.a>
          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/angelcrispin"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            className="hover:text-[#0A66C2] transition-colors"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
          </motion.a>
          {/* Email */}
          <motion.a
            href="mailto:angelcrispin@gmail.com"
            whileHover={{ scale: 1.15, y: -2 }}
            className="hover:text-red-400 transition-colors"
          >
            <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}