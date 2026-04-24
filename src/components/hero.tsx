"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { SplitText } from "@/components/split-text";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const slideUp = {
  hidden: { y: 24, opacity: 0 },
  show:   { y: 0,  opacity: 1 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1 },
};

function PrimaryBtn() {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href="#audit"
      className="relative inline-flex items-center gap-2 overflow-hidden bg-white text-black px-7 py-3.5 text-[13px] font-bold tracking-wider cursor-none border"
      style={{ fontFamily: "var(--mono)" }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      animate={{ borderColor: hov ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* slide-in fill */}
      <motion.span
        className="absolute inset-0 bg-black"
        initial={{ x: "-101%" }}
        animate={{ x: hov ? 0 : "-101%" }}
        transition={{ duration: 0.35, ease: EASE }}
      />
      <span className="relative" style={{ color: hov ? "#fff" : "#000", transition: "color 0.35s" }}>
        <SplitText text="GET A SECURITY AUDIT →" hovered={hov} stagger={0.018} />
      </span>
    </motion.a>
  );
}

function SecondaryBtn() {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href="#emergency"
      className="relative inline-flex items-center gap-2 overflow-hidden border border-white/30 text-white px-7 py-3.5 text-[13px] font-bold tracking-wider cursor-none"
      style={{ fontFamily: "var(--mono)" }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      animate={{ borderColor: hov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }}
      transition={{ duration: 0.25 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className="absolute inset-0 bg-white"
        initial={{ x: "-101%" }}
        animate={{ x: hov ? 0 : "-101%" }}
        transition={{ duration: 0.35, ease: EASE }}
      />
      <span className="relative flex items-center gap-2" style={{ color: hov ? "#000" : "#fff", transition: "color 0.35s" }}>
        <span className="relative flex h-[6px] w-[6px] shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full bg-current opacity-60" />
          <span className="relative inline-flex h-[6px] w-[6px] bg-current" />
        </span>
        <SplitText text="EMERGENCY RESPONSE" hovered={hov} stagger={0.018} />
      </span>
    </motion.a>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center border-b border-white/10 overflow-hidden blueprint-grid">

      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/assets/imgs/logo.jpeg"
          alt=""
          fill
          className="object-contain object-right select-none"
          style={{ opacity: 0.22 }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #000000 35%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.25) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #000000 0%, transparent 30%)" }}
        />
      </div>

      {/* ── Text content ── */}
      <motion.div
        className="relative z-10 px-[30px] py-28 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* System label */}
        <motion.div
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="text-[10px] text-white/30 tracking-[0.25em] uppercase" style={{ fontFamily: "var(--mono)" }}>
            SYS://THREAT-OPS
          </span>
          <div className="h-px w-16 bg-white/10" />
          <span className="relative flex h-[6px] w-[6px]">
            <span className="animate-ping absolute inline-flex h-full w-full bg-white opacity-40" />
            <span className="relative inline-flex h-[6px] w-[6px] bg-white" />
          </span>
          <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--mono)" }}>
            ACTIVE 24/7/365
          </span>
        </motion.div>

        {/* H1 lines */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            variants={slideUp}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[clamp(42px,7vw,90px)] font-bold leading-[0.95] tracking-[-0.03em] text-white"
            style={{ fontFamily: "var(--sans)" }}
          >
            <SplitText text="Security that" stagger={0.03} />
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.h1
            variants={slideUp}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[clamp(42px,7vw,90px)] font-bold leading-[0.95] tracking-[-0.03em] text-white relative inline-block"
            style={{ fontFamily: "var(--sans)" }}
          >
            <SplitText text="Bites Back." stagger={0.03} />
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white" />
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            variants={slideUp}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[clamp(42px,7vw,90px)] font-bold leading-[0.95] tracking-[-0.03em] text-white/20"
            style={{ fontFamily: "var(--sans)" }}
          >
            <SplitText text="Before They Strike." stagger={0.025} />
          </motion.h1>
        </div>

        {/* Sub-headline */}
        <motion.p
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-[15px] text-white/50 max-w-xl leading-relaxed mb-10"
          style={{ fontFamily: "var(--sans)" }}
        >
          <strong className="text-white font-semibold">The Cyber Bite</strong> keeps you informed
          and protected in a world where hackers go unnoticed for months. On average, attackers
          hide inside systems for{" "}
          <span style={{ fontFamily: "var(--mono)" }} className="text-white border-b border-white/30">
            207 days
          </span>{" "}
          — we help you catch them in hours.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <PrimaryBtn />
          <SecondaryBtn />
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8"
        >
          {["SOC 2 TYPE II", "ISO 27001", "GDPR", "NIST CSF"].map((b) => (
            <span key={b} className="text-[10px] text-white/25 tracking-[0.22em] uppercase" style={{ fontFamily: "var(--mono)" }}>
              {b}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
