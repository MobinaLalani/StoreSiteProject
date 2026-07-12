"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";

export default function ProductActions() {
  return (
    <div className="space-y-5">
      {/* Quantity */}

      <div className="flex items-center justify-between">
        <span className="font-semibold">تعداد</span>

        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 px-4 py-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            className="rounded-full p-1 transition hover:bg-gray-100"
          >
            <Minus size={18} />
          </motion.button>

          <span className="min-w-6 text-center font-bold">1</span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            className="rounded-full p-1 transition hover:bg-gray-100"
          >
            <Plus size={18} />
          </motion.button>
        </div>
      </div>

      {/* Buttons */}

      <div className="flex gap-4">
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="flex-1 rounded-2xl bg-red-500 px-6 py-4 font-semibold text-white transition hover:bg-red-600"
        >
          <div className="flex items-center justify-center gap-3">
            <ShoppingCart size={20} />
            افزودن به سبد خرید
          </div>
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.92,
          }}
          className="rounded-2xl border border-gray-200 p-4 transition hover:border-red-500 hover:text-red-500"
        >
          <Heart size={22} />
        </motion.button>
      </div>
    </div>
  );
}
