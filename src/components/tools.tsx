"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tools = [
  {
    id: "burpsuite",
    name: "Burp Suite",
    category: "Web Testing",
    description: "Intercepts and tests web app traffic for vulnerabilities",
  },
  {
    id: "metasploit",
    name: "Metasploit",
    category: "Exploitation",
    description: "Industry-standard framework for running security tests",
  },
  {
    id: "nmap",
    name: "Nmap",
    category: "Reconnaissance",
    description: "Scans networks to map open ports and running services",
  },
  {
    id: "wireshark",
    name: "Wireshark",
    category: "Analysis",
    description: "Captures and inspects network packets in real time",
  },
  {
    id: "ghidra",
    name: "Ghidra",
    category: "Reverse Engineering",
    description: "Disassembles and analyses compiled software binaries",
  },
  {
    id: "jadx",
    name: "JADX",
    category: "APK Analysis",
    description: "Decompiles Android apps to readable source code",
  },
  {
    id: "sqlmap",
    name: "SQLMap",
    category: "Database Testing",
    description: "Detects and exploits SQL injection vulnerabilities",
  },
  {
    id: "frida",
    name: "Frida",
    category: "Dynamic Analysis",
    description: "Hooks into running apps to inspect and modify behaviour",
  },
  {
    id: "johntheripper",
    name: "John the Ripper",
    category: "Password Auditing",
    description: "Tests the strength of hashed passwords",
  },
  {
    id: "openssl",
    name: "OpenSSL",
    category: "Cryptography",
    description: "Implements and tests encryption protocols",
  },
  {
    id: "nikto",
    name: "Nikto",
    category: "Web Scanning",
    description: "Scans web servers for misconfigurations and known issues",
  },
  {
    id: "volatility",
    name: "Volatility",
    category: "Memory Forensics",
    description: "Extracts evidence and artefacts from memory dumps",
  },
];

function ToolCard({ tool, index }: { tool: typeof tools[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ backgroundColor: hovered ? "#0d0d0d" : "#000000" }}
      className="relative px-6 py-7 overflow-hidden cursor-none"
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 w-[2px] bg-white"
        initial={{ height: "0%" }}
        animate={{ height: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      {/* Category tag */}
      <motion.span
        className="inline-block text-[9px] tracking-[0.22em] uppercase mb-3"
        style={{ fontFamily: "var(--mono)" }}
        animate={{ color: hovered ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)" }}
        transition={{ duration: 0.2 }}
      >
        {tool.category}
      </motion.span>

      {/* Tool name */}
      <motion.h3
        className="font-bold text-[17px] mb-2 leading-tight"
        style={{ fontFamily: "var(--sans)" }}
        animate={{ color: hovered ? "#ffffff" : "rgba(255,255,255,0.9)" }}
        transition={{ duration: 0.2 }}
      >
        {tool.name}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="text-[12px] leading-relaxed"
        style={{ fontFamily: "var(--sans)" }}
        animate={{ color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.35)" }}
        transition={{ duration: 0.2 }}
      >
        {tool.description}
      </motion.p>
    </motion.div>
  );
}

export function Tools() {
  return (
    <section id="tools" className="border-b border-white/10 py-24">
      <div className="px-[30px]">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="text-[10px] text-white/30 tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--mono)" }}
          >
            TOOLS://ARSENAL
          </span>
          <div className="h-px flex-1 bg-white/10" />
          <span
            className="text-[10px] text-white/20 tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--mono)" }}
          >
            SECTION 007
          </span>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[clamp(28px,4vw,52px)] font-bold text-white leading-tight tracking-tight mb-14"
          style={{ fontFamily: "var(--sans)" }}
        >
          Our toolkit.
          <br />
          <span className="text-white/25">Trusted by professionals.</span>
        </motion.h2>

        {/* Tools grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {tools.map((tool, i) => (
            <div key={tool.id} className="bg-black">
              <ToolCard tool={tool} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
