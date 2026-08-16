"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/src/types/product";
import ProductBadge from "./ProductBadge";

export default function ProductImage({ product, href }: { product: Product; href: string }) {
  return (
    <div className="relative m-2.5 overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-slate-50 via-white to-red-50/70 sm:m-3">
      <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-red-100/70 blur-3xl" />
      <ProductBadge featured={product.isFeatured} wholesale={product.isWholesaleAvailable} />
      <Link href={href} className="relative block aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
        <motion.div className="relative h-full w-full" whileHover={{ scale: 1.055 }} transition={{ duration: 0.4, ease: "easeOut" }}>
          <Image src={product.thumbnail} alt={product.title} fill sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 22vw" className="object-contain p-5 sm:p-7" />
        </motion.div>
      </Link>
    </div>
  );
}
