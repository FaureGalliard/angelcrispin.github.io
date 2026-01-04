"use client";
import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl w-full rounded-2xl border border-white/10
        p-10 text-center backdrop-blur-md"
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
          className="text-[0.8rem] text-left text-[rgb(8,209,80)]"
        >
          $ whoami
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[2.6rem] font-bold text-white text-left"
        >
          Angel Crispin
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-[0.8rem] text-left text-[rgba(147,151,147,1)]"
        >
          FullStack Developer
        </motion.h1>
      </motion.div>
    </div>
  );
}
