"use client";

import { motion } from "framer-motion";

import { Product } from "@/src/types/product";

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
      }}
      className="rounded-3xl border border-gray-200 bg-white p-8"
    >
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900">معرفی محصول</h2>

        <div className="mt-3 h-1 w-20 rounded-full bg-red-500" />
      </div>

      {/* Content */}

      <div className="space-y-5 leading-9 text-gray-600">
        <p>{product.description}</p>
      </div>
    </motion.section>
  );
}
