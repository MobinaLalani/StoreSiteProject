"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface FloatingProductProps {
  image: string | StaticImageData;
  className: string;
  duration?: number;
  delay?: number;
  rotate?: number;
  size?: number;
}

export default function FloatingProduct({
  image,
  className,
  duration = 6,
  delay = 0,
  rotate = 10,
  size = 120,
}: FloatingProductProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.85,
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
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{
          y: [-5, 2, -14],
          rotate: [-rotate, rotate, -rotate],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="rounded-3xl bg-transparent  p-2 "
      >
        <Image
          src={image}
          alt=""
          width={size}
          height={size}
          className="rounded-2xl object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
