"use client";

import { motion } from "framer-motion";

import Container from "../../components/ui/Container";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-red-100 blur-[180px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-100 blur-[180px]" />

      <Container>
        <div className="grid min-h-[720px] items-center gap-16 py-20 lg:grid-cols-2">
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <HeroContent />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <HeroImage />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
