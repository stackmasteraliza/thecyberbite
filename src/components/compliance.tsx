"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SplitText } from "@/components/split-text";

const frameworks = [
  {
    name: "SOC 2 TYPE II",
    description:
      "SOC 2 is a security certificate that shows your customers their data is safe with you. We get your systems and processes ready for the official audit — setting up the right protections, keeping the required records, and making sure nothing is left to chance.",
    pillars: ["ACCESS CONTROL", "CHANGE MGMT", "INCIDENT LOG", "VENDOR RISK"],
  },
  {
    name: "GDPR",
    description:
      "GDPR is the law that protects people's personal data. It's more than just a privacy policy on your website. We help you understand what data you collect, why you collect it, how to store it safely, and what to do if something goes wrong.",
    pillars: ["DATA MAPPING", "PRIVACY POLICY", "BREACH NOTIFY", "RIGHT TO ERASE"],
  },
  {
    name: "ISO 27001",
    description:
      "ISO 27001 is an internationally recognised certificate that proves your business takes security seriously. We build the whole program for you from scratch — identifying risks, putting the right rules in place, and walking you through the certification process step by step.",
    pillars: ["RISK REGISTER", "ASSET INVENTORY", "SECURITY POLICY", "AUDIT PREP"],
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Compliance() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="compliance" className="border-b border-white/10 py-24">
      <div className="px-[30px]">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[10px] text-white/30 tracking-[0.25em] uppercase" style={{ fontFamily: "var(--mono)" }}>
            SCHEMA://COMPLIANCE
          </span>
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--mono)" }}>
            SECTION 005
          </span>
        </div>

        <div className="mb-12">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[clamp(28px,4vw,52px)] font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: "var(--sans)" }}
          >
            Certifications that prove
            <br />
            <span className="text-white/30">you take security seriously.</span>
          </motion.h2>
          <p
            className="mt-4 text-[13px] text-white/40 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--sans)" }}
          >
            Every certification we help you achieve is backed by real security measures —
            not just paperwork ticked off a list and forgotten.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {frameworks.map((fw, i) => {
            const isHov = hovered === fw.name;
            return (
              <motion.div
                key={fw.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                onHoverStart={() => setHovered(fw.name)}
                onHoverEnd={() => setHovered(null)}
                className="relative flex flex-col gap-5 p-8 overflow-hidden cursor-none"
                style={{
                  background: isHov ? "#0d0d0d" : "#000000",
                  transition: "background 0.25s ease",
                }}
              >
                {/* Left accent bar */}
                <motion.div
                  className="absolute left-0 top-0 w-[2px] bg-white"
                  initial={{ height: "0%" }}
                  animate={{ height: isHov ? "100%" : "0%" }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                {/* Top-right corner bracket */}
                <motion.div
                  className="absolute top-3 right-3 w-4 h-4"
                  style={{
                    borderTop: "1.5px solid",
                    borderRight: "1.5px solid",
                    borderColor: isHov ? "rgba(255,255,255,0.4)" : "transparent",
                    transition: "border-color 0.25s ease",
                  }}
                />
                {/* Bottom-left corner bracket */}
                <motion.div
                  className="absolute bottom-3 left-3 w-4 h-4"
                  style={{
                    borderBottom: "1.5px solid",
                    borderLeft: "1.5px solid",
                    borderColor: isHov ? "rgba(255,255,255,0.4)" : "transparent",
                    transition: "border-color 0.25s ease",
                  }}
                />

                <motion.span
                  className="text-[11px] font-bold tracking-[0.2em]"
                  style={{ fontFamily: "var(--mono)" }}
                  animate={{ color: isHov ? "#ffffff" : "rgba(255,255,255,0.7)" }}
                  transition={{ duration: 0.2 }}
                >
                  <SplitText text={fw.name} hovered={isHov} stagger={0.025} />
                </motion.span>

                <motion.p
                  className="text-[13px] leading-relaxed"
                  style={{ fontFamily: "var(--sans)" }}
                  animate={{ color: isHov ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.4)" }}
                  transition={{ duration: 0.2 }}
                >
                  {fw.description}
                </motion.p>

                <div className="mt-auto flex flex-wrap gap-2 pt-5 border-t" style={{ borderColor: isHov ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.1)", transition: "border-color 0.25s" }}>
                  {fw.pillars.map((p) => (
                    <motion.span
                      key={p}
                      className="text-[9px] tracking-[0.18em] uppercase border px-2 py-1"
                      style={{ fontFamily: "var(--mono)" }}
                      animate={{
                        color: isHov ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
                        borderColor: isHov ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {p}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
