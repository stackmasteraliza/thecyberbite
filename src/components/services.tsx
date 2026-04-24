"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/split-text";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const services = [
  {
    id: "threat-hunting",
    index: "01",
    tag: "CORE SERVICE",
    title: "24/7 Threat Monitoring",
    description:
      "Our team watches your systems around the clock — your devices, cloud storage, and network traffic. Instead of waiting for something to go wrong, we actively search for warning signs. We catch threats that automated tools overlook, before they turn into real problems.",
    metric: "< 4 hr",
    metricLabel: "AVERAGE TIME TO DETECT",
  },
  {
    id: "vulnerability",
    index: "02",
    tag: "CORE SERVICE",
    title: "Security Weak Spot Check",
    description:
      "Every weakness in your systems is an open door for hackers — even if no one has walked through it yet. We scan your website, apps, internal network, and cloud setup to find those gaps and report them to you clearly, before anyone else does.",
    metric: "100%",
    metricLabel: "OF YOUR SYSTEMS CHECKED",
  },
  {
    id: "incident-response",
    index: "03",
    tag: "CORE SERVICE",
    title: "Emergency Response & Recovery",
    description:
      "If you've been hacked or something suspicious is happening, we step in immediately — online or in person. We stop the attack, figure out what happened, secure your systems, and get you back up and running safely as fast as possible.",
    metric: "60 min",
    metricLabel: "RESPONSE TIME GUARANTEE",
  },
  {
    id: "compliance",
    index: "04",
    tag: "COMPLIANCE",
    title: "Compliance Made Simple",
    description:
      "Security rules and certifications like SOC 2, GDPR, and ISO 27001 can feel overwhelming. We handle the heavy lifting — setting up the right protections, preparing your paperwork, and making sure you pass your audit without the last-minute stress.",
    metric: "3",
    metricLabel: "MAJOR STANDARDS COVERED",
  },
];

function LearnMore({ hovered }: { hovered: boolean }) {
  return (
    <motion.a
      href="#audit"
      className="self-start mt-1 relative inline-flex items-center gap-1 text-[11px] tracking-widest uppercase cursor-none overflow-hidden"
      style={{ fontFamily: "var(--mono)" }}
      animate={{ color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)" }}
      transition={{ duration: 0.2 }}
    >
      <SplitText text="LEARN MORE" hovered={hovered} stagger={0.02} />
      <motion.span
        animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-white/40"
        initial={{ width: "0%" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </motion.a>
  );
}

export function Services() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="services" className="border-b border-white/10 py-24">
      <div className="px-[30px]">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[10px] text-white/30 tracking-[0.25em] uppercase" style={{ fontFamily: "var(--mono)" }}>
            MODULES://CORE
          </span>
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--mono)" }}>
            SECTION 003
          </span>
        </div>

        <div className="flex flex-col">
          {services.map((svc) => (
            <motion.div
              key={svc.id}
              onHoverStart={() => setHovered(svc.id)}
              onHoverEnd={() => setHovered(null)}
              animate={{ backgroundColor: hovered === svc.id ? "#0d0d0d" : "#000000" }}
              transition={{ duration: 0.2 }}
              className="relative grid md:grid-cols-[1fr_180px] gap-8 px-6 py-8 border-b border-white/10 cursor-none overflow-hidden"
            >
              {/* Left accent bar */}
              <motion.div
                className="absolute left-0 top-0 w-[2px] bg-white"
                initial={{ height: "0%" }}
                animate={{ height: hovered === svc.id ? "100%" : "0%" }}
                transition={{ duration: 0.35, ease: EASE }}
              />

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <motion.span
                    className="text-[10px] tracking-[0.22em] uppercase"
                    style={{ fontFamily: "var(--mono)" }}
                    animate={{ color: hovered === svc.id ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {svc.index} / {svc.tag}
                  </motion.span>
                </div>
                <motion.h3
                  className="font-bold text-[22px]"
                  style={{ fontFamily: "var(--sans)" }}
                  animate={{ color: hovered === svc.id ? "#ffffff" : "rgba(255,255,255,0.9)" }}
                  transition={{ duration: 0.2 }}
                >
                  <SplitText text={svc.title} hovered={hovered === svc.id} stagger={0.02} />
                </motion.h3>
                <motion.p
                  className="text-[13px] leading-relaxed max-w-2xl"
                  style={{ fontFamily: "var(--sans)" }}
                  animate={{ color: hovered === svc.id ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.45)" }}
                  transition={{ duration: 0.2 }}
                >
                  {svc.description}
                </motion.p>
                <LearnMore hovered={hovered === svc.id} />
              </div>

              {/* Metric */}
              <div className="flex flex-col items-start md:items-end justify-center gap-1">
                <motion.span
                  className="font-bold text-white"
                  style={{ fontFamily: "var(--mono)", fontSize: "clamp(28px,3.5vw,44px)" }}
                  animate={
                    hovered === svc.id
                      ? { textShadow: "0 0 24px rgba(255,255,255,0.4), 0 0 48px rgba(255,255,255,0.15)", scale: 1.04 }
                      : { textShadow: "none", scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  {svc.metric}
                </motion.span>
                <span className="text-[9px] text-white/25 tracking-[0.2em] uppercase text-left md:text-right" style={{ fontFamily: "var(--mono)" }}>
                  {svc.metricLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
