"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Product } from "../../../../types/product";

import ProductBadge from "./ProductBadge";

interface Props {
  product: Product;
}

export default function ProductImage({ product }: Props) {
  return (
    <div className="relative overflow-hidden">
      <ProductBadge product={product} />

      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.35,
          }}
          className="flex h-72 items-center justify-center bg-gray-50"
        >
          <Image
            src={product.image}
            alt={product.title}
            width={220}
            height={220}
            className="object-contain"
          />
        </motion.div>
      </Link>
    </div>
  );
}
