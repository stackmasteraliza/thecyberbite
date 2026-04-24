"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** controlled mode — pass parent hover state to drive the animation */
  hovered?: boolean;
  stagger?: number;
}

export function SplitText({ text, className, style, hovered, stagger = 0.025 }: SplitTextProps) {
  const [selfHovered, setSelfHovered] = useState(false);
  const active = hovered !== undefined ? hovered : selfHovered;

  return (
    <span
      className={className}
      style={{ display: "inline-block", ...style }}
      onMouseEnter={() => hovered === undefined && setSelfHovered(true)}
      onMouseLeave={() => hovered === undefined && setSelfHovered(false)}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: char === " " ? "inline" : "inline-block" }}
          animate={
            active
              ? { y: -4, opacity: 1, textShadow: "0 0 14px rgba(255,255,255,0.55)" }
              : { y: 0,  opacity: 1, textShadow: "none" }
          }
          transition={{
            duration: 0.22,
            delay: active
              ? i * stagger
              : Math.max(0, (text.length - 1 - i) * stagger * 0.4),
            ease: EASE,
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
