"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function ProductBadge() {
  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.15,
        }}
        whileTap={{
          scale: 0.9,
        }}
        className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 shadow-md"
      >
        <Heart size={18} className="text-gray-500" />
      </motion.button>
    </>
  );
}
