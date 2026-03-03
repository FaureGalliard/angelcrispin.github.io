"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10"
      style={{ backgroundColor: "rgba(13,14,15,0.9)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="font-jetbrains text-xs text-neutral-500 tracking-wide">
          © 2026 Angel Crispin —{" "}
          <span className="text-neutral-600">built for performance</span>
        </p>

        {/* Socials */}
        <div className="flex items-center gap-5 text-neutral-500">
          <a
            href="https://twitter.com/angelcrispin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Twitter / X"
          >
            <FontAwesomeIcon icon={faXTwitter} className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/FaureGalliard"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/angelcrispin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0A66C2] transition-colors"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}