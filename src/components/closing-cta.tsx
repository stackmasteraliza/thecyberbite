"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { SplitText } from "@/components/split-text";

const services = [
  "SECURITY AUDIT",
  "THREAT HUNTING",
  "INCIDENT RESPONSE",
  "COMPLIANCE PROGRAM",
];

function ServiceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-[12px] bg-transparent transition-colors hover:bg-white/[0.02]"
        style={{ fontFamily: "var(--mono)", color: value ? "#fff" : "rgba(255,255,255,0.35)" }}
      >
        {value || "SELECT SERVICE"}
        <span className="text-white/30 text-[10px]">{open ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 z-50 bg-[#0a0a0a] border border-white/10 border-t-0"
          >
            {services.map((svc) => (
              <li key={svc}>
                <button
                  type="button"
                  onClick={() => { onChange(svc); setOpen(false); }}
                  className="w-full text-left px-5 py-3.5 text-[12px] border-b border-white/10 last:border-b-0 transition-colors"
                  style={{
                    fontFamily: "var(--mono)",
                    color: value === svc ? "#fff" : "rgba(255,255,255,0.4)",
                    background: value === svc ? "rgba(255,255,255,0.06)" : "transparent",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = value === svc ? "rgba(255,255,255,0.06)" : "transparent")}
                >
                  {value === svc && <span className="mr-2 text-white/50">▶</span>}
                  {svc}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Ticker ─────────────────────────────────────────────────────── */
const tickerItems = [
  { label: "AVG DWELL TIME",      value: "207 DAYS"            },
  { label: "OUR MTD",             value: "< 4 HRS"             },
  { label: "CONTAINMENT RATE",    value: "98.4%"               },
  { label: "UPTIME SLA",          value: "99.99%"              },
  { label: "AUDITS COMPLETED",    value: "1,200+"              },
  { label: "FRAMEWORKS",          value: "SOC2 · GDPR · ISO"   },
  { label: "RESPONSE SLA",        value: "60 MIN"              },
  { label: "THREAT HUNTS / YR",   value: "52,000+"             },
];
const doubled = [...tickerItems, ...tickerItems];

/* ── Stats ──────────────────────────────────────────────────────── */
const stats = [
  { value: "207",   unit: " days", label: "INDUSTRY AVG DWELL TIME"  },
  { value: "< 4",   unit: " hrs",  label: "OUR MEAN TIME TO DETECT"  },
  { value: "98.4",  unit: "%",     label: "CONTAINMENT SUCCESS RATE" },
];

/* ── Animated counter ───────────────────────────────────────────── */
function StatCard({ value, unit, label, delay }: { value: string; unit: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className="bg-black px-8 py-10 flex flex-col gap-2 group hover:bg-[#080808] transition-colors duration-300"
    >
      <div className="flex items-end gap-1 leading-none">
        <span
          className="font-bold text-white metric-glow"
          style={{ fontFamily: "var(--mono)", fontSize: "clamp(32px,4vw,52px)" }}
        >
          {value}
        </span>
        <span
          className="font-bold text-white/40 pb-1"
          style={{ fontFamily: "var(--mono)", fontSize: "clamp(16px,2vw,26px)" }}
        >
          {unit}
        </span>
      </div>
      <span
        className="text-[9px] text-white/25 tracking-[0.22em] uppercase"
        style={{ fontFamily: "var(--mono)" }}
      >
        {label}
      </span>
      {/* Animated bottom border on hover */}
      <div className="mt-2 h-px w-0 bg-white/40 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

/* ── Submit button ──────────────────────────────────────────────── */
function SubmitBtn() {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      type="submit"
      className="relative overflow-hidden py-4 text-[12px] font-bold tracking-widest uppercase cursor-none border"
      style={{ fontFamily: "var(--mono)" }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      animate={{ borderColor: hov ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span className="absolute inset-0 bg-white" animate={{ opacity: hov ? 0.92 : 1 }} />
      <motion.span
        className="absolute inset-0 bg-black"
        initial={{ x: "-101%" }}
        animate={{ x: hov ? 0 : "-101%" }}
        transition={{ duration: 0.35, ease: EASE }}
      />
      <span className="relative" style={{ color: hov ? "#fff" : "#000", transition: "color 0.35s" }}>
        <SplitText text="REQUEST CONSULTATION →" hovered={hov} stagger={0.016} />
      </span>
    </motion.button>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export function ClosingCta() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selectedService, setSelectedService] = useState("");

  return (
    <section id="audit" ref={sectionRef} className="py-0 bg-black overflow-hidden">

      {/* ── Ticker strip ── */}
      <div className="border-y border-white/10 py-3 overflow-hidden bg-[#050505]">
        <div className="flex ticker-track whitespace-nowrap">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-6 border-r border-white/10 shrink-0"
              style={{ fontFamily: "var(--mono)" }}
            >
              <span className="text-[9px] text-white/20 tracking-[0.2em] uppercase">{item.label}</span>
              <span className="text-[11px] text-white font-bold tracking-wider">{item.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="px-[30px] pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 mb-20">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.12} />
          ))}
        </div>

        {/* ── CTA block ── */}
        <div id="emergency" className="border border-white/10 overflow-hidden">

          {/* Top label bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-between px-10 py-3 border-b border-white/10 bg-[#050505]"
          >
            <span className="text-[9px] text-white/20 tracking-[0.25em] uppercase" style={{ fontFamily: "var(--mono)" }}>
              READY WHEN YOU ARE
            </span>
            <span className="flex items-center gap-2" style={{ fontFamily: "var(--mono)" }}>
              <span className="relative flex h-[6px] w-[6px]">
                <span className="animate-ping absolute inline-flex h-full w-full bg-white opacity-30" />
                <span className="relative inline-flex h-[6px] w-[6px] bg-white/60" />
              </span>
              <span className="text-[9px] text-white/20 tracking-[0.2em] uppercase">SECURE CHANNEL OPEN</span>
            </span>
          </motion.div>

          <div className="p-10 sm:p-14 grid lg:grid-cols-[1fr_520px] gap-14 items-start">

            {/* Left — headline + copy */}
            <div>
              <div className="overflow-hidden mb-1">
                <motion.h2
                  initial={{ y: 40, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
                  className="font-bold text-white leading-[0.95] tracking-tight"
                  style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px,5.5vw,68px)" }}
                >
                  Know your
                </motion.h2>
              </div>
              <div className="overflow-hidden mb-1">
                <motion.h2
                  initial={{ y: 40, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.25 }}
                  className="font-bold text-white leading-[0.95] tracking-tight"
                  style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px,5.5vw,68px)" }}
                >
                  exposure.
                </motion.h2>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h2
                  initial={{ y: 40, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.35 }}
                  className="font-bold text-white/20 leading-[0.95] tracking-tight"
                  style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px,5.5vw,68px)" }}
                >
                  Control your outcome.
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
                className="text-[13px] text-white/40 leading-relaxed max-w-md"
                style={{ fontFamily: "var(--sans)" }}
              >
                A security assessment from The Cyber Bite gives you a clear picture of where
                your business is at risk — and exactly what to fix first. No confusing technical
                reports, no long-term contracts, no pressure. Just honest advice you can act on.
              </motion.p>

              {/* Feature bullets */}
              <motion.ul
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-8 flex flex-col gap-2"
              >
                {[
                  "Results delivered within 72 hours of starting",
                  "Risks ranked by what's most dangerous to fix first",
                  "Plain-English summary plus a full technical report",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12px] text-white/35"
                    style={{ fontFamily: "var(--mono)" }}
                  >
                    <span className="text-white/30 mt-px shrink-0">//</span>
                    {item}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Right — terminal form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="flex flex-col border border-white/10 bg-[#030303]"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Form title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-[#080808]">
                <div className="w-2 h-2 border border-white/20" />
                <div className="w-2 h-2 border border-white/20" />
                <div className="w-2 h-2 border border-white/20" />
                <span
                  className="ml-2 text-[9px] text-white/20 tracking-widest uppercase"
                  style={{ fontFamily: "var(--mono)" }}
                >
                  contact.sh
                </span>
              </div>

              <input
                type="text"
                placeholder="YOUR NAME"
                required
                className="bg-transparent border-b border-white/10 text-white placeholder-white/20 px-5 py-4 text-[12px] outline-none focus:bg-white/[0.02] transition-colors"
                style={{ fontFamily: "var(--mono)" }}
              />
              <input
                type="email"
                placeholder="WORK EMAIL"
                required
                className="bg-transparent border-b border-white/10 text-white placeholder-white/20 px-5 py-4 text-[12px] outline-none focus:bg-white/[0.02] transition-colors"
                style={{ fontFamily: "var(--mono)" }}
              />
              <ServiceSelect value={selectedService} onChange={setSelectedService} />
              <textarea
                placeholder="BRIEF DESCRIPTION (OPTIONAL)"
                rows={3}
                className="bg-transparent border-b border-white/10 text-white placeholder-white/20 px-5 py-4 text-[12px] outline-none focus:bg-white/[0.02] transition-colors resize-none"
                style={{ fontFamily: "var(--mono)" }}
              />
              <SubmitBtn />
              <p
                className="text-[9px] text-white/15 text-center py-3 tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--mono)" }}
              >
                ACTIVE INCIDENT? CALL OUR 24/7 LINE
              </p>
            </motion.form>
          </div>
        </div>

        {/* Bottom padding spacer */}
        <div className="h-20" />
      </div>
    </section>
  );
}
