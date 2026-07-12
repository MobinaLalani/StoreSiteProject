"use client";

import { motion } from "framer-motion";

import { Product } from "@/src/types/product";

import ProductCard from "../components/ProductCard/ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
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
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-black">محصولات مرتبط</h2>

        <p className="mt-2 text-gray-500">
          شاید این محصولات هم برای شما جذاب باشند.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.section>
  );
}
