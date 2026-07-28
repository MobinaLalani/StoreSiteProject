"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
const dots = [
  { left: "5%", top: "15%", size: 4 },
  { left: "15%", top: "60%", size: 6 },
  { left: "25%", top: "30%", size: 8 },
  { left: "35%", top: "80%", size: 5 },
  { left: "45%", top: "20%", size: 7 },
  { left: "55%", top: "70%", size: 4 },
  { left: "65%", top: "10%", size: 6 },
  { left: "75%", top: "45%", size: 5 },
  { left: "85%", top: "25%", size: 8 },
  { left: "90%", top: "70%", size: 4 },
  { left: "20%", top: "90%", size: 6 },
  { left: "60%", top: "90%", size: 5 },
];
  return (
    <>
      {/* Red Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-0 top-10 h-[420px] w-[420px] rounded-full bg-red-200 blur-[140px]"
      />

      {/* Blue Glow */}
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
        }}
        className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-sky-200 blur-[150px]"
      />

      {/* Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[450px] w-[450px] rounded-full border border-red-200/40"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[600px] w-[600px] rounded-full border border-slate-200/40"
        />
      </div>

      {/* Floating Dots */}
      {dots.map((dot, i) => (
        <motion.span
          key={i}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
          }}
          className="absolute h-2 w-2 rounded-full bg-red-300 pointer-events-none"
          style={dot}
        />
      ))}
    </>
  );
}
