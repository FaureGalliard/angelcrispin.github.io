"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Lima",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">

        {}
        <div>
          <h4 className="mb-4 uppercase tracking-widest text-xs text-neutral-500">
            Links
          </h4>
          <ul className="space-y-2">
            <li><link href="/" className="hover:text-white transition">Home</link></li>
            <li><link href="/work" className="hover:text-white transition">Work</link></li>
            <li><link href="/about" className="hover:text-white transition">About</link></li>
            <li><link href="/contact" className="hover:text-white transition">Contact</link></li>
          </ul>
        </div>

        {/* SOCIALS */}
        <div>
          <h4 className="mb-4 uppercase tracking-widest text-xs text-neutral-500">
            Socials
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="mailto:contact@angelcrispin.dev" className="hover:text-white transition">
                Email
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/angelcrispin" target="_blank" className="hover:text-white transition">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/FaureGalliard" target="_blank" className="hover:text-white transition">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* LOCAL TIME */}
        <div>
          <h4 className="mb-4 uppercase tracking-widest text-xs text-neutral-500">
            Local Time
          </h4>
          <p className="font-mono text-neutral-300">
            {time} UTC−5
          </p>
        </div>

        {/* VERSION */}
        <div>
          <h4 className="mb-4 uppercase tracking-widest text-xs text-neutral-500">
            Version
          </h4>
          <p className="text-neutral-300">
            2026 © Angel Crispin
          </p>
        </div>

      </div>
    </footer>
  );
}
