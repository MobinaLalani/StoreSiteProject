"use client";

import { motion } from "framer-motion";

import { products } from "@/src/data/products";

import ProductCard from "../components/ProductCard/ProductCard";

interface RelatedProductsProps {
  categorySlug: string;
  currentProductId: number;
}

export default function RelatedProducts({
  categorySlug,
  currentProductId,
}: RelatedProductsProps) {
  const relatedProducts = products
    .filter(
      (product) =>
        product.category.slug === categorySlug &&
        product.id !== currentProductId,
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
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
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900">محصولات مرتبط</h2>

          <p className="mt-2 text-gray-500">محصولات مشابه این کالا</p>
        </div>
      </div>

      {/* Grid */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.section>
  );
}
