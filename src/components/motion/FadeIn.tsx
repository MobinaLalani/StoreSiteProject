"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { fadeIn } from "@/src/lib/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
}

export default function FadeIn({
  children,
  className,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}