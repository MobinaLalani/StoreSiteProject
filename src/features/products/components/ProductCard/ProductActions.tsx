"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function ProductActions() {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.96,
      }}
      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 py-4 font-semibold text-white transition hover:bg-red-600"
    >
      <ShoppingCart size={20} />
      افزودن به سبد خرید
    </motion.button>
  );
}
