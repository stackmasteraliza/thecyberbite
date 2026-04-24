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

        <AuditBtn />
      </nav>
    </header>
  );
}
