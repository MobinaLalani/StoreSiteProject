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
        // On mobile the one-column grid can be much taller than the viewport,
        // so waiting for 20% of the whole grid keeps every card hidden.
        amount: 0.01,
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
        gap-5
        sm:grid-cols-2
        lg:grid-cols-3
        lg:gap-6
        xl:grid-cols-4
      "
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="h-full"
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
