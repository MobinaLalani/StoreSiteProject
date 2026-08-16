"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpLeft, Building2, PackageCheck, PackageX } from "lucide-react";
import type { Product } from "@/src/types/product";
import ProductImage from "./ProductImage";
import ProductRating from "./ProductRating";
import AddToCartButton from "@/src/features/cart/AddToCartButton";
import { effectivePrice, formatToman } from "@/src/lib/money";

export default function ProductCard({ product }: { product: Product }) {
  const href = `/products/${encodeURIComponent(product.slug.replace(/^\/+|\/+$/g, ""))}`;
  const available = product.stock > 0;

  return (
    <motion.article layout whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="group relative flex h-full min-h-[31rem] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,.06)] transition-[border-color,box-shadow] duration-300 hover:border-red-200 hover:shadow-[0_22px_55px_rgba(15,23,42,.14)]">
      <ProductImage product={product} href={href} />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <ProductRating product={product} />
          <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
            {available ? <PackageCheck size={14} /> : <PackageX size={14} />}
            {available ? "موجود" : "ناموجود"}
          </span>
        </div>

        <Link href={href} className="group/title block focus:outline-none">
          <h3 className="line-clamp-2 min-h-14 text-lg font-black leading-7 text-slate-900 transition-colors group-hover/title:text-red-600">{product.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">{product.shortDescription || product.description}</p>

        {product.isWholesaleAvailable && <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-[11px] font-bold text-amber-800"><Building2 size={14} />قابل خرید عمده</span>}

        {product.tags.length > 0 && <div className="mt-3 flex min-h-7 flex-wrap gap-1.5 overflow-hidden">{product.tags.slice(0, 2).map((tag) => <span key={tag} className="max-w-28 truncate rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">{tag}</span>)}</div>}

        <div className="mt-auto pt-4">
          <div className="mb-3 text-left"><strong className="text-lg text-red-600">{effectivePrice(product) > 0 ? formatToman(effectivePrice(product)) : "قیمت ثبت نشده"}</strong></div>
          <div className="mb-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="text-xs text-slate-400">{available ? `${product.stock.toLocaleString("fa-IR")} عدد موجود` : "برای موجودی تماس بگیرید"}</span>
            <Link href={href} aria-label={`مشاهده ${product.title}`} className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 transition hover:text-red-600">جزئیات <ArrowUpLeft size={15} /></Link>
          </div>
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </motion.article>
  );
}
