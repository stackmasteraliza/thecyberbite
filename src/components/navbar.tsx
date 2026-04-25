"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { SplitText } from "@/components/split-text";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const navLinks = [
  { label: "Services",   href: "#services"   },
  { label: "Risk Score", href: "#risk"        },
  { label: "Compliance", href: "#compliance"  },
  { label: "About",      href: "#audit"       },
];

function NavLink({ label, href }: { label: string; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <Link
        href={href}
        className="relative flex flex-col overflow-hidden text-xs font-mono text-[#666] uppercase tracking-widest cursor-none"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <motion.span
          animate={{ color: hov ? "#fff" : "#666", y: hov ? -1 : 0 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {label}
        </motion.span>
        {/* sliding underline */}
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-white/50"
          initial={{ width: "0%" }}
          animate={{ width: hov ? "100%" : "0%" }}
          transition={{ duration: 0.25, ease: EASE }}
        />
      </Link>
    </li>
  );
}

function AuditBtn() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="#audit"
      className="relative overflow-hidden text-xs font-semibold px-4 py-2 cursor-none"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: "inline-block" }}
    >
      {/* bg fill slides in from bottom */}
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{ y: "101%" }}
        animate={{ y: hov ? 0 : "101%" }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      {/* border always visible */}
      <motion.span
        className="absolute inset-0 border"
        animate={{ borderColor: hov ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)" }}
        transition={{ duration: 0.3 }}
      />
      <span
        className="relative"
        style={{ color: hov ? "#000" : "#fff", transition: "color 0.3s" }}
      >
        <SplitText text="Get Audited" hovered={hov} stagger={0.02} />
      </span>
    </a>
  );
}

export function Navbar() {
  return (
    <header className="border-b border-[#1a1a1a] bg-black sticky top-0 z-50">
      <nav className="px-[30px] h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group cursor-none">
          <Image
            src="/assets/imgs/logo.jpeg"
            alt="The Cyber Bite"
            width={32}
            height={32}
            className="object-cover"
            style={{ width: 32, height: 32 }}
            priority
          />
          <motion.span
            className="font-mono font-bold text-white text-base tracking-tight leading-none"
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            The<span className="text-[#555]">Cyber</span>Bite
          </motion.span>
        </Link>

        <ul className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a href="https://t.me/the_cyber_byte" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
            className="text-white/30 hover:text-white transition-colors duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
          <a href="https://www.tiktok.com/@the_cyber_bite" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
            className="text-white/30 hover:text-white transition-colors duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/the_cyber_bite" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="text-white/30 hover:text-white transition-colors duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/the_cyber_bite" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="text-white/30 hover:text-white transition-colors duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.028 4.388 11.026 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.099 24 18.1 24 12.073z"/>
            </svg>
          </a>
          <a href="https://github.com/thecyberbite" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="text-white/30 hover:text-white transition-colors duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>

        <AuditBtn />
      </nav>
    </header>
  );
}
