"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/split-text";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Factor = {
  id: string;
  question: string;
  options: { label: string; score: number }[];
};

const factors: Factor[] = [
  {
    id: "size",
    question: "How many employees does your organisation have?",
    options: [
      { label: "1 – 25",    score: 1 },
      { label: "26 – 100",  score: 2 },
      { label: "101 – 500", score: 3 },
      { label: "500+",      score: 4 },
    ],
  },
  {
    id: "audit",
    question: "When was your last external security assessment?",
    options: [
      { label: "Within 6 months",   score: 1 },
      { label: "6 – 12 months ago", score: 2 },
      { label: "1 – 2 years ago",   score: 3 },
      { label: "Never / Unknown",   score: 5 },
    ],
  },
  {
    id: "cloud",
    question: "Which best describes your infrastructure?",
    options: [
      { label: "Fully on-premise",        score: 2 },
      { label: "Hybrid (on-prem + cloud)", score: 4 },
      { label: "Fully cloud-native",       score: 3 },
      { label: "Not sure",                 score: 5 },
    ],
  },
  {
    id: "mfa",
    question: "Is MFA enforced across all systems?",
    options: [
      { label: "Yes, universally",   score: 1 },
      { label: "Partially deployed", score: 3 },
      { label: "No",                 score: 5 },
    ],
  },
  {
    id: "data",
    question: "Do you store or process regulated data (PII, financial, health)?",
    options: [
      { label: "No",                              score: 1 },
      { label: "Yes — we are compliant",          score: 2 },
      { label: "Yes — compliance is in progress", score: 4 },
      { label: "Yes — no active program",         score: 6 },
    ],
  },
];

type Band = { label: string; message: string; cta: string };

function getBand(score: number, max: number): Band {
  const r = score / max;
  if (r <= 0.3)
    return {
      label: "LOW RISK",
      message: "Solid foundational controls. Continued monitoring and periodic assessments will keep you ahead of emerging threats.",
      cta: "SCHEDULE MAINTENANCE REVIEW",
    };
  if (r <= 0.55)
    return {
      label: "MODERATE RISK",
      message: "Meaningful gaps exist in your security posture. Adversaries actively target organisations at this level.",
      cta: "REQUEST TARGETED ASSESSMENT",
    };
  if (r <= 0.78)
    return {
      label: "ELEVATED RISK",
      message: "Critical attack surface is exposed. A comprehensive threat landscape review and remediation roadmap is recommended.",
      cta: "GET A FULL SECURITY AUDIT",
    };
  return {
    label: "HIGH RISK",
    message: "Significant and addressable exposure is present. Prioritising investment now is far more cost-effective than post-incident response.",
    cta: "CONTACT OUR TEAM",
  };
}

function OptionBtn({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="relative text-left px-3 py-2.5 text-[12px] border-b border-white/5 last:border-b-0 overflow-hidden cursor-none"
      style={{ fontFamily: "var(--mono)" }}
      animate={{
        background: selected ? "#ffffff" : hov ? "rgba(255,255,255,0.06)" : "transparent",
      }}
      transition={{ duration: 0.15 }}
    >
      {/* slide-in indicator line */}
      {!selected && (
        <motion.span
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/40"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: hov ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: "top" }}
        />
      )}
      <span
        className="relative"
        style={{
          color: selected ? "#000000" : hov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
          transition: "color 0.15s ease",
        }}
      >
        {selected ? "▶  " : "   "}
        <SplitText text={label} hovered={hov && !selected} stagger={0.015} />
      </span>
    </motion.button>
  );
}

function RunBtn({ onClick }: { onClick: () => void; }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="relative w-full overflow-hidden py-4 text-[12px] font-bold tracking-widest uppercase cursor-none border"
      style={{ fontFamily: "var(--mono)" }}
      animate={{ borderColor: hov ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className="absolute inset-0 bg-white"
        animate={{ opacity: hov ? 0.9 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute inset-0 bg-black"
        initial={{ x: "-101%" }}
        animate={{ x: hov ? 0 : "-101%" }}
        transition={{ duration: 0.35, ease: EASE }}
      />
      <span
        className="relative"
        style={{ color: hov ? "#fff" : "#000", transition: "color 0.35s" }}
      >
        <SplitText text="RUN ASSESSMENT →" hovered={hov} stagger={0.02} />
      </span>
    </motion.button>
  );
}

export function RiskCalculator() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const scorePanelRef = useRef<HTMLDivElement>(null);

  const maxScore = factors.reduce((a, f) => a + Math.max(...f.options.map((o) => o.score)), 0);
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const answered = Object.keys(answers).length;
  const band = getBand(totalScore, maxScore);
  const scoreNum = Math.round((totalScore / maxScore) * 100);

  function handleSubmit() {
    setSubmitted(true);
    scorePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="risk" className="border-b border-white/10 py-24 bg-[#030303]">
      <div className="px-[30px]">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] text-white/30 tracking-[0.25em] uppercase" style={{ fontFamily: "var(--mono)" }}>
            TERMINAL://RISK-CALC
          </span>
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--mono)" }}>
            SECTION 004
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — score panel */}
          <div ref={scorePanelRef} className="lg:sticky lg:top-20">
            <h2
              className="text-[clamp(28px,4vw,48px)] font-bold text-white leading-tight tracking-tight"
              style={{ fontFamily: "var(--sans)" }}
            >
              What is your
              <br />
              <span className="cursor-blink">Security Score</span>
            </h2>
            <p className="mt-4 text-[13px] text-white/40 leading-relaxed max-w-sm" style={{ fontFamily: "var(--sans)" }}>
              Five questions. Instant, anonymised risk assessment. No email required.
            </p>

            {/* Live gauge */}
            <AnimatePresence>
              {answered > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-10 border border-white/10 p-6"
                >
                  <div className="flex items-end justify-between mb-4">
                    <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--mono)" }}>
                      RISK INDEX
                    </span>
                    <span className="font-bold text-white text-[32px] leading-none" style={{ fontFamily: "var(--mono)" }}>
                      {scoreNum}
                      <span className="text-[16px] text-white/30">/100</span>
                    </span>
                  </div>
                  <div className="h-[2px] bg-white/10 w-full">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${scoreNum}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-[10px] text-white/25" style={{ fontFamily: "var(--mono)" }}>
                      {answered}/{factors.length} ANSWERED
                    </span>
                    <span className="text-[10px] text-white tracking-widest uppercase" style={{ fontFamily: "var(--mono)" }}>
                      {band.label}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result block */}
            <AnimatePresence>
              {submitted && answered === factors.length && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 border border-white/10 p-6 bg-black"
                >
                  <p className="text-[13px] text-white/50 leading-relaxed" style={{ fontFamily: "var(--sans)" }}>
                    {band.message}
                  </p>
                  <ResultLink cta={band.cta} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — terminal form */}
          <div className="flex flex-col border border-white/10">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#080808]">
              <div className="w-2.5 h-2.5 border border-white/20" />
              <div className="w-2.5 h-2.5 border border-white/20" />
              <div className="w-2.5 h-2.5 border border-white/20" />
              <span className="ml-3 text-[10px] text-white/20 tracking-widest uppercase" style={{ fontFamily: "var(--mono)" }}>
                risk-assessment.sh
              </span>
            </div>

            {factors.map((f, i) => (
              <div key={f.id} className="border-b border-white/10 last:border-b-0">
                <div className="px-5 pt-5 pb-2">
                  <p className="text-[13px] text-white" style={{ fontFamily: "var(--sans)" }}>
                    <span className="text-white/25 mr-2" style={{ fontFamily: "var(--mono)" }}>
                      {String(i + 1).padStart(2, "0")} &gt;
                    </span>
                    {f.question}
                  </p>
                </div>
                <div className="flex flex-col pb-4 px-5">
                  {f.options.map((opt) => (
                    <OptionBtn
                      key={opt.label}
                      label={opt.label}
                      selected={answers[f.id] === opt.score}
                      onClick={() => setAnswers((p) => ({ ...p, [f.id]: opt.score }))}
                    />
                  ))}
                </div>
              </div>
            ))}

            {answered === factors.length && (
              <RunBtn onClick={handleSubmit} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultLink({ cta }: { cta: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href="#audit"
      className="mt-4 inline-flex items-center gap-1 text-[11px] tracking-widest uppercase cursor-none relative"
      style={{ fontFamily: "var(--mono)" }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      animate={{ color: hov ? "#fff" : "rgba(255,255,255,0.7)" }}
      transition={{ duration: 0.2 }}
    >
      <SplitText text={cta} hovered={hov} stagger={0.018} />
      <motion.span animate={{ x: hov ? 3 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-white/40"
        initial={{ width: "0%" }}
        animate={{ width: hov ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </motion.a>
  );
}
