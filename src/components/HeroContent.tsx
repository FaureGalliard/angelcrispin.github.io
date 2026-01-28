"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { heroCard, heroContainer, heroItem, dotVariants,pulse } from "@/lib/motion/hero";

export default function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <motion.div
        variants={heroCard}
        initial="hidden"
        animate="show"
        className="max-w-3xl w-full rounded-2xl border border-white/10 p-10 backdrop-blur-md"
        style={{ backgroundColor: "rgba(13,14,15,0.9)" }}
      >
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div
              variants={dotVariants}
              animate={pulse.animate}
              className="w-2.5 h-2.5  rounded-full"
              style={{ backgroundColor: "rgba(108,219,149,1)" }}
            />
            <motion.div
              variants={dotVariants}
              animate={pulse.animate}
              transition={{ delay: 0.2 }}
              className="w-2.5 h-2.5  rounded-full"
              style={{ backgroundColor: "rgba(248,218,99,1)" }}
            />
            <motion.div
              variants={dotVariants}
              animate={pulse.animate}
              transition={{ delay: 0.4 }}
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "rgba(228,111,111,1)" }}
            />
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-[2.6rem] font-bold text-white text-left"
          >
            Angel Crispin
          </motion.h1>

          <motion.h2
            variants={heroItem}
            className="text-[1rem] text-left font-bold"
          >
            <span className="text-[rgba(66,96,197,1)]">
              Software Developer &lt; / &gt;
              </span>
          </motion.h2>

          <motion.p
            variants={heroItem}
            className="mt-4 max-w-xl text-left text-sm leading-relaxed text-gray-300"
          >
           Desarrollo sistemas y aplicaciones con enfoque en lógica, arquitectura y eficiencia.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-6 flex justify-start gap-5 text-gray-400"
          >
            <motion.a
              href="https://github.com/angelcrispin"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/angelcrispin"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="hover:text-[#0A66C2] transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="mailto:angelcrispin@gmail.com"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="hover:text-red-400 transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
