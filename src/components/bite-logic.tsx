"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const columns = [
  {
    number: "01",
    label: "THE PROBLEM",
    heading: "Old Security Tools React Too Late",
    body: "Most security tools only raise an alarm when they recognise a threat they've seen before. But attackers are smart — they move quietly and avoid the obvious patterns. By the time an alert goes off, the damage is already being done.",
  },
  {
    number: "02",
    label: "THE COST",
    heading: "Hackers Stay Hidden for Months",
    body: "On average, a hacker spends 207 days inside a company's systems before anyone notices. In that time they can read your files, steal your data, and prepare a much bigger attack. Every day they go undetected is a day they're working against you.",
  },
  {
    number: "03",
    label: "OUR APPROACH",
    heading: "We Find Threats Before They Strike",
    body: "We actively look for signs of suspicious activity — not just known threats, but anything unusual. By monitoring your systems continuously and connecting the dots early, The Cyber Bite spots attackers before they can do serious harm.",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  show:   { y: 0,  opacity: 1 },
};

export function BiteLogic() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="border-b border-white/10 py-24 blueprint-grid">
      <div className="px-[30px]">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[10px] text-white/30 tracking-[0.25em] uppercase" style={{ fontFamily: "var(--mono)" }}>
            LOGIC://BITE
          </span>
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--mono)" }}>
            SECTION 002
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {columns.map((col, i) => (
            <motion.div
              key={col.number}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              onHoverStart={() => setHovered(col.number)}
              onHoverEnd={() => setHovered(null)}
              className="relative flex flex-col gap-5 p-8 overflow-hidden cursor-none"
              style={{
                background: hovered === col.number ? "#0d0d0d" : "#000000",
                transition: "background 0.25s ease",
              }}
            >
              {/* Animated left accent bar */}
              <motion.div
                className="absolute left-0 top-0 w-[2px] bg-white"
                initial={{ height: "0%" }}
                animate={{ height: hovered === col.number ? "100%" : "0%" }}
                transition={{ duration: 0.35, ease: EASE }}
              />

              {/* Top-right corner bracket */}
              <motion.div
                className="absolute top-3 right-3 w-4 h-4"
                style={{
                  borderTop: "1.5px solid",
                  borderRight: "1.5px solid",
                  borderColor: hovered === col.number ? "rgba(255,255,255,0.4)" : "transparent",
                  transition: "border-color 0.25s ease",
                }}
              />
              {/* Bottom-left corner bracket */}
              <motion.div
                className="absolute bottom-3 left-3 w-4 h-4"
                style={{
                  borderBottom: "1.5px solid",
                  borderLeft: "1.5px solid",
                  borderColor: hovered === col.number ? "rgba(255,255,255,0.4)" : "transparent",
                  transition: "border-color 0.25s ease",
                }}
              />

              {/* Number + label */}
              <div className="flex items-start justify-between">
                <motion.span
                  className="font-bold leading-none select-none"
                  style={{ fontFamily: "var(--mono)", fontSize: "52px" }}
                  animate={{ color: hovered === col.number ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.05)" }}
                  transition={{ duration: 0.25 }}
                >
                  {col.number}
                </motion.span>
                <span
                  className="text-[9px] text-white/25 tracking-[0.22em] uppercase border border-white/10 px-2 py-1 mt-1 transition-colors duration-200"
                  style={{
                    fontFamily: "var(--mono)",
                    borderColor: hovered === col.number ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
                    color: hovered === col.number ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
                  }}
                >
                  {col.label}
                </span>
              </div>

              {/* Heading */}
              <motion.h3
                className="font-bold text-[18px] leading-snug"
                style={{ fontFamily: "var(--sans)" }}
                animate={{ color: hovered === col.number ? "#ffffff" : "rgba(255,255,255,0.85)" }}
                transition={{ duration: 0.2 }}
              >
                {col.heading}
              </motion.h3>

              {/* Body */}
              <motion.p
                className="text-[13px] leading-relaxed"
                style={{ fontFamily: "var(--sans)" }}
                animate={{ color: hovered === col.number ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.45)" }}
                transition={{ duration: 0.2 }}
              >
                {col.body}
              </motion.p>

              {/* Bottom read-more indicator */}
              <motion.div
                className="mt-auto flex items-center gap-2 pt-4 border-t"
                style={{ borderColor: hovered === col.number ? "rgba(255,255,255,0.1)" : "transparent", transition: "border-color 0.3s ease" }}
              >
                <motion.span
                  className="text-[10px] tracking-widest uppercase"
                  style={{ fontFamily: "var(--mono)" }}
                  animate={{ opacity: hovered === col.number ? 1 : 0, x: hovered === col.number ? 0 : -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-white/30">EXPLORE</span>
                  <span className="text-white/20 ml-2">→</span>
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
