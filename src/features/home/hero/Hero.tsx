"use client";

import { motion } from "framer-motion";

import Container from "../../../components/ui/Container";

import BackgroundEffects from "./BackgroundEffects";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-red-50">
      {/* Background */}
      <BackgroundEffects />

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right,#000 1px,transparent 1px),
              linear-gradient(to bottom,#000 1px,transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Decorative Gradient */}
      <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-red-50/70 to-transparent" />

      <Container>
        <div className="relative z-10 grid min-h-screen items-center gap-20 py-24 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <HeroContent />
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{
              opacity: 0,
              x: 60,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
            className="relative flex items-center justify-center"
          >
            <HeroImage />
          </motion.div>
        </div>
      </Container>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
