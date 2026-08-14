"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import type { Product } from "@/src/types/product";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";

export default function HeroImage({ products }: { products: Product[] }) {
  const { data } = usePublicSettings();
  const product = products[0];
  const image = data?.appearance.heroImage || "/Image/hero/industrial-showcase.png";
  const href = product ? `/products/${encodeURIComponent(product.slug.replace(/^\/+|\/+$/g, ""))}` : "/products";

  return <Link href={href} className="group relative block min-h-[20rem] overflow-hidden rounded-[1.5rem] bg-[#c8bdab] sm:min-h-[28rem] sm:rounded-[2rem] lg:h-full lg:min-h-[30rem]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,255,255,.45),transparent_38%),linear-gradient(135deg,rgba(255,255,255,.12),transparent_55%)]"/>
    <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full border-[45px] border-white/10"/>
    <motion.div animate={{ scale: [1, 1.018, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0"><Image src={image} alt={product?.title || data?.store.name || "محصول منتخب"} fill preload sizes="(max-width:1024px) 96vw, 56vw" className="object-cover"/></motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5"/>
    {product && <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/75 p-3 shadow-xl backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:rounded-3xl sm:p-4"><div className="min-w-0 flex-1"><p className="text-[10px] font-bold text-slate-500">{data?.appearance.heroProductLabel || "محصول منتخب"}</p><h2 className="mt-1 truncate text-sm font-black text-slate-950 sm:text-lg">{product.title}</h2></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-950 text-white transition group-active:scale-95 sm:h-12 sm:w-12"><ArrowUpLeft size={19}/></span></div>}
  </Link>;
}
