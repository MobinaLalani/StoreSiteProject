"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import { Product } from "../../../../types/product";

interface Props {
  product: Product;
}

export default function ProductBadge({ product }: Props) {
  return (
    <>
      {product.discount && (
        <span className="absolute left-4 top-4 z-20 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
          %{product.discount}
        </span>
      )}

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
