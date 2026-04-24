"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX  = useMotionValue(-100);
  const trailY  = useMotionValue(-100);

  const springCfg = { stiffness: 400, damping: 28, mass: 0.5 };
  const trailCfg  = { stiffness: 120, damping: 22, mass: 0.8 };

  const smoothX = useSpring(cursorX, springCfg);
  const smoothY = useSpring(cursorY, springCfg);
  const trailSX = useSpring(trailX,  trailCfg);
  const trailSY = useSpring(trailY,  trailCfg);

  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        trailX.set(e.clientX);
        trailY.set(e.clientY);
      });

      const target = e.target as HTMLElement;
      setHovering(
        !!(
          target.closest("a, button, [role='button'], input, textarea, select, label") ||
          target.closest("[data-cursor='pointer']")
        )
      );
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* ── Outer ring (trail) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: trailSX, y: trailSY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width:   hovering ? 36 : clicking ? 20 : 28,
            height:  hovering ? 36 : clicking ? 20 : 28,
            opacity: hovering ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.2 }}
          style={{
            border: "1px solid rgba(255,255,255,0.7)",
            background: "transparent",
          }}
        />
      </motion.div>

      {/* ── Inner dot (snappy) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width:      hovering ? 4 : clicking ? 2 : 4,
            height:     hovering ? 4 : clicking ? 2 : 4,
            background: hovering ? "#ffffff" : "#ffffff",
            opacity:    clicking ? 0.5 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* ── Crosshair lines (visible on hover) ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hovering ? 0.25 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Horizontal */}
        <div
          className="absolute bg-white"
          style={{ width: 20, height: 1, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
        {/* Vertical */}
        <div
          className="absolute bg-white"
          style={{ width: 1, height: 20, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </motion.div>
    </>
  );
}
