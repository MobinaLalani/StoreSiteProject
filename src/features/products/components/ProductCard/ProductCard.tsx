"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "../../../../types/product";

import ProductImage from "./ProductImage";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  console.log("product", product);
  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-2xl"
    >
      <ProductImage product={product} />

      <div className="space-y-5 p-5">
        <div>
       <Link href={`/products/${product.slug}`}>
  <h3 className="line-clamp-1 text-lg font-bold transition-colors hover:text-red-500">
    {product.title}
  </h3>
</Link>

          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {product.description}
          </p>
        </div>

        <ProductRating product={product} />

        <ProductPrice product={product} />

        <ProductActions />
      </div>
    </motion.article>
  );
}
