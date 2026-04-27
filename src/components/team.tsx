"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SplitText } from "@/components/split-text";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const members = [
  {
    id: "tousif",
    index: "01",
    initials: "TA",
    name: "Tousif Ahmed",
    role: "Penetration Tester | Reverse Engineer | Security Consultant",
    tag: "CONSULTANT",
    bio: "Tousif Ahmed is a cybersecurity specialist with expertise in penetration testing, reverse engineering, and defensive security. He identifies critical vulnerabilities, analyzes complex systems, and delivers secure solutions to protect modern applications and infrastructures.",
    skills: ["PENTESTING", "REVERSE ENG", "VULNERABILITY RESEARCH", "DEFENSE"],
    social: {
      github: null as string | null,
      linkedin: null as string | null,
    },
  },
  {
    id: "asim",
    index: "02",
    initials: "MA",
    name: "Muhammad Asim Ali",
    role: "Penetration Tester | Reverse Engineer | Security Analyst",
    tag: "ANALYST",
    bio: "Muhammad Asim Ali is a cybersecurity professional specializing in penetration testing, reverse engineering, and cyber defense. He focuses on uncovering security flaws, strengthening system resilience, and building reliable, secure digital solutions.",
    skills: ["PENTESTING", "REVERSE ENG", "CYBER DEFENSE", "SECURITY ANALYSIS"],
    social: {
      github: "https://github.com/m-asim-ali" as string | null,
      linkedin: "https://www.linkedin.com/in/muhammad-asim-ali-528118353" as string | null,
    },
  },
];

function IconLinkedIn() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function SocialLinks({ social, hov }: { social: typeof members[0]["social"]; hov: boolean }) {
  return (
    <div className="flex items-center gap-3 mt-1">
      {social.github && (
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200"
          style={{ color: hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}
          aria-label="GitHub"
        >
          <IconGitHub />
        </a>
      )}
      {social.linkedin && (
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200"
          style={{ color: hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}
          aria-label="LinkedIn"
        >
          <IconLinkedIn />
        </a>
      )}
    </div>
  );
}

function MemberCard({ member, index }: { member: typeof members[0]; index: number }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.1 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="relative flex flex-col gap-5 p-6 sm:p-8 overflow-hidden cursor-none"
      style={{ background: hov ? "#0d0d0d" : "#000000", transition: "background 0.25s ease" }}
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 w-[2px] bg-white"
        initial={{ height: "0%" }}
        animate={{ height: hov ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      {/* Corner brackets */}
      <motion.div
        className="absolute top-3 right-3 w-4 h-4"
        style={{
          borderTop: "1.5px solid",
          borderRight: "1.5px solid",
          borderColor: hov ? "rgba(255,255,255,0.4)" : "transparent",
          transition: "border-color 0.25s ease",
        }}
      />
      <motion.div
        className="absolute bottom-3 left-3 w-4 h-4"
        style={{
          borderBottom: "1.5px solid",
          borderLeft: "1.5px solid",
          borderColor: hov ? "rgba(255,255,255,0.4)" : "transparent",
          transition: "border-color 0.25s ease",
        }}
      />

      {/* Header row: index + tag */}
      <div className="flex items-start justify-between">
        <motion.span
          className="font-bold leading-none select-none"
          style={{ fontFamily: "var(--mono)", fontSize: "48px" }}
          animate={{ color: hov ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.05)" }}
          transition={{ duration: 0.25 }}
        >
          {member.index}
        </motion.span>
        <span
          className="text-[9px] tracking-[0.22em] uppercase border px-2 py-1 mt-1 transition-colors duration-200"
          style={{
            fontFamily: "var(--mono)",
            borderColor: hov ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
            color: hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
          }}
        >
          {member.tag}
        </span>
      </div>

      {/* Avatar + name row */}
      <div className="flex items-center gap-4">
        {/* Avatar circle — initials */}
        <motion.div
          className="shrink-0 w-12 h-12 flex items-center justify-center border text-[13px] font-bold"
          style={{ fontFamily: "var(--mono)" }}
          animate={{
            borderColor: hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)",
            color: hov ? "#fff" : "rgba(255,255,255,0.4)",
          }}
          transition={{ duration: 0.25 }}
        >
          {member.initials}
        </motion.div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <motion.span
            className="font-bold text-[17px] leading-tight"
            style={{ fontFamily: "var(--sans)" }}
            animate={{ color: hov ? "#ffffff" : "rgba(255,255,255,0.85)" }}
            transition={{ duration: 0.2 }}
          >
            <SplitText text={member.name} hovered={hov} stagger={0.025} />
          </motion.span>
          <motion.span
            className="text-[11px] leading-snug"
            style={{ fontFamily: "var(--sans)" }}
            animate={{ color: hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)" }}
            transition={{ duration: 0.2 }}
          >
            {member.role}
          </motion.span>
          <SocialLinks social={member.social} hov={hov} />
        </div>
      </div>

      {/* Bio */}
      <motion.p
        className="text-[12px] leading-relaxed"
        style={{ fontFamily: "var(--sans)" }}
        animate={{ color: hov ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.38)" }}
        transition={{ duration: 0.2 }}
      >
        {member.bio}
      </motion.p>

      {/* Skills */}
      <div
        className="mt-auto flex flex-wrap gap-2 pt-4 border-t"
        style={{
          borderColor: hov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
          transition: "border-color 0.25s",
        }}
      >
        {member.skills.map((s) => (
          <motion.span
            key={s}
            className="text-[9px] tracking-[0.18em] uppercase border px-2 py-1"
            style={{ fontFamily: "var(--mono)" }}
            animate={{
              color: hov ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)",
              borderColor: hov ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
            }}
            transition={{ duration: 0.2 }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function Team() {
  return (
    <section id="team" className="border-b border-white/10 py-24">
      <div className="px-[30px]">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="text-[10px] text-white/30 tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--mono)" }}
          >
            TEAM://OPERATORS
          </span>
          <div className="h-px flex-1 bg-white/10" />
          <span
            className="text-[10px] text-white/20 tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--mono)" }}
          >
            SECTION 006
          </span>
        </div>

        {/* Heading */}
        <div className="mb-14">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[clamp(28px,4vw,52px)] font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: "var(--sans)" }}
          >
            The operators
            <br />
            <span className="text-white/25">behind the intelligence.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-4 text-[13px] text-white/40 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--sans)" }}
          >
            Every engagement is led by senior practitioners — not analysts following a playbook.
            Our team brings decades of combined experience across threat intelligence, incident
            response, and adversarial simulation.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
          {members.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
