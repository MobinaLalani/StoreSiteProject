"use client";

import { motion } from "framer-motion";

import ProductCard from "../ProductCard";
import { Product } from "../../../../types/product";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="
        grid
        grid-cols-1
        gap-8
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{
            duration: 0.35,
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
