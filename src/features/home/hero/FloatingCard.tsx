"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FloatingCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  className: string;
  iconBg: string;
  iconColor: string;
  duration?: number;
  delay?: number;
}

export default function FloatingCard({
  icon: Icon,
  title,
  value,
  className,
  iconBg,
  iconColor,
  duration = 4,
  delay = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute z-30 hidden lg:block ${className}`}
    >
      <motion.div
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl"
      >
        <div className={`rounded-full p-2 ${iconBg}`}>
          <Icon className={iconColor} size={20} />
        </div>

        <div>
          <p className="text-xs text-gray-500">{title}</p>
          <h4 className="font-bold text-gray-900">{value}</h4>
        </div>
      </motion.div>
    </motion.div>
  );
}
