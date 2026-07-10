"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { scale } from "@/src/lib/motion";

interface ScaleProps {
  children: ReactNode;
  className?: string;
}

export default function Scale({
  children,
  className,
}: ScaleProps) {
  return (
    <motion.div
      className={className}
      variants={scale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}