"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Icons ───────────────────────────────────────────────────────── */
function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.028 4.388 11.026 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.099 24 18.1 24 12.073z" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.47 11.47 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.59a1 1 0 0 1-.25 1.01L6.62 10.79z" />
    </svg>
  );
}

/* ── Data ────────────────────────────────────────────────────────── */
const contactItems = [
  {
    id: "email",
    label: "EMAIL",
    value: "hello@thecyberbite.com",
    href: "mailto:hello@thecyberbite.com",
    icon: <IconEmail />,
  },
  {
    id: "phone",
    label: "PHONE",
    value: "+1 (555) 000-0000",
    href: "tel:+15550000000",
    icon: <IconPhone />,
  },
];

const socialItems = [
  { id: "twitter",   label: "X / TWITTER", handle: "@thecyberbite",  href: "https://twitter.com/",   icon: <IconX />         },
  { id: "linkedin",  label: "LINKEDIN",    handle: "thecyberbite",   href: "https://linkedin.com/",  icon: <IconLinkedIn />  },
  { id: "github",    label: "GITHUB",      handle: "thecyberbite",   href: "https://github.com/",    icon: <IconGitHub />    },
  { id: "youtube",   label: "YOUTUBE",     handle: "@thecyberbite",  href: "https://youtube.com/",   icon: <IconYouTube />   },
  { id: "instagram", label: "INSTAGRAM",   handle: "@thecyberbite",  href: "https://instagram.com/", icon: <IconInstagram /> },
  { id: "facebook",  label: "FACEBOOK",    handle: "thecyberbite",   href: "https://facebook.com/",  icon: <IconFacebook />  },
];

/* ── Row component ───────────────────────────────────────────────── */
function ContactRow({
  icon,
  label,
  value,
  sub,
  href,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  href: string;
  delay: number;
}) {
  const [hov, setHov] = useState(false);

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="group relative flex items-center gap-5 px-6 py-5 border-b border-white/10 cursor-none overflow-hidden"
      style={{ background: hov ? "#0a0a0a" : "transparent", transition: "background 0.2s ease" }}
    >
      {/* Left accent */}
      <motion.div
        className="absolute left-0 top-0 w-[2px] h-full bg-white/60"
        animate={{ scaleY: hov ? 1 : 0, originY: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
      />

      {/* Icon */}
      <motion.span
        className="shrink-0"
        animate={{ color: hov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)" }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.span>

      {/* Label */}
      <span
        className="shrink-0 w-28 text-[9px] tracking-[0.22em] uppercase"
        style={{ fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)" }}
      >
        {label}
      </span>

      {/* Value */}
      <motion.span
        className="text-[13px] font-medium"
        style={{ fontFamily: "var(--mono)" }}
        animate={{ color: hov ? "#ffffff" : "rgba(255,255,255,0.7)" }}
        transition={{ duration: 0.2 }}
      >
        {value}
      </motion.span>

      {/* Sub handle */}
      {sub && (
        <motion.span
          className="ml-auto text-[10px]"
          style={{ fontFamily: "var(--mono)" }}
          animate={{ color: hov ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)" }}
          transition={{ duration: 0.2 }}
        >
          {sub}
        </motion.span>
      )}

      {/* Arrow */}
      <motion.span
        className="ml-auto text-[11px] shrink-0"
        style={{ fontFamily: "var(--mono)" }}
        animate={{
          color: hov ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.1)",
          x: hov ? 4 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */
export function Contact() {
  return (
    <section id="contact" className="border-b border-white/10 py-24">
      <div className="px-[30px]">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="text-[10px] text-white/30 tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--mono)" }}
          >
            CONTACT://REACH_US
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
        <div className="mb-14">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[clamp(28px,4vw,52px)] font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: "var(--sans)" }}
          >
            Get in touch.
            <br />
            <span className="text-white/25">We don&apos;t bite. Much.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-4 text-[13px] text-white/40 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--sans)" }}
          >
            Whether you have a tip, a story lead, a collaboration idea, or just want to say hello —
            all channels below are monitored and responded to.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10">

          {/* Left — direct contact */}
          <div className="bg-black flex flex-col">
            {/* Column header */}
            <div className="px-6 py-4 border-b border-white/10 bg-[#050505]">
              <span
                className="text-[9px] tracking-[0.25em] uppercase text-white/30"
                style={{ fontFamily: "var(--mono)" }}
              >
                DIRECT CONTACT
              </span>
            </div>

            {contactItems.map((item, i) => (
              <ContactRow
                key={item.id}
                icon={item.icon}
                label={item.label}
                value={item.value}
                href={item.href}
                delay={i * 0.08}
              />
            ))}
          </div>

          {/* Right — social accounts */}
          <div className="bg-black flex flex-col">
            {/* Column header */}
            <div className="px-6 py-4 border-b border-white/10 bg-[#050505]">
              <span
                className="text-[9px] tracking-[0.25em] uppercase text-white/30"
                style={{ fontFamily: "var(--mono)" }}
              >
                SOCIAL ACCOUNTS
              </span>
            </div>

            {socialItems.map((item, i) => (
              <ContactRow
                key={item.id}
                icon={item.icon}
                label={item.label}
                value={item.handle}
                href={item.href}
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
