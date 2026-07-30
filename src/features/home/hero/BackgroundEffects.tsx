"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
const dots = [
  { left: "3%", top: "10%", size: 4 },
  { left: "8%", top: "35%", size: 6 },
  { left: "12%", top: "65%", size: 5 },
  { left: "18%", top: "20%", size: 7 },
  { left: "22%", top: "50%", size: 4 },
  { left: "28%", top: "80%", size: 6 },
  { left: "34%", top: "12%", size: 5 },
  { left: "38%", top: "42%", size: 8 },
  { left: "42%", top: "70%", size: 4 },
  { left: "48%", top: "28%", size: 6 },
  { left: "52%", top: "58%", size: 5 },
  { left: "58%", top: "15%", size: 7 },
  { left: "62%", top: "82%", size: 4 },
  { left: "68%", top: "38%", size: 6 },
  { left: "72%", top: "8%", size: 5 },
  { left: "76%", top: "62%", size: 8 },
  { left: "80%", top: "25%", size: 4 },
  { left: "84%", top: "52%", size: 6 },
  { left: "88%", top: "78%", size: 5 },
  { left: "92%", top: "18%", size: 7 },
  { left: "95%", top: "45%", size: 4 },
  { left: "10%", top: "92%", size: 6 },
  { left: "30%", top: "94%", size: 5 },
  { left: "50%", top: "90%", size: 7 },
  { left: "70%", top: "95%", size: 4 },
  { left: "90%", top: "90%", size: 6 },
  { left: "14%", top: "5%", size: 5 },
  { left: "46%", top: "6%", size: 8 },
  { left: "78%", top: "4%", size: 4 },
  { left: "97%", top: "88%", size: 5 },
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
