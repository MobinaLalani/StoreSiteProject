"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, PackageCheck } from "lucide-react";
import type { Product } from "@/src/types/product";

export default function HeroImage({ products }: { products: Product[] }) {
  const primary = products[0];
  if (!primary) return <div className="aspect-square rounded-[2rem] border border-dashed border-slate-300 bg-white/60"/>;
  const others = products.slice(1, 3);
  const href = `/products/${encodeURIComponent(primary.slug.replace(/^\/+|\/+$/g, ""))}`;
  return <div className="relative mx-auto max-w-[34rem]">
    <div className="absolute inset-8 rounded-full bg-red-200/60 blur-3xl"/>
    <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-3 shadow-[0_30px_80px_rgba(15,23,42,.14)] backdrop-blur-xl sm:rounded-[2.5rem] sm:p-5">
      <div className="relative aspect-[1.05/1] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-50 via-white to-red-50 sm:rounded-[2rem]">
        <Image src={primary.thumbnail} alt={primary.title} fill preload sizes="(max-width: 1024px) 92vw, 44vw" className="object-contain p-7 sm:p-10"/>
        {primary.isFeatured && <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1.5 text-[11px] font-black text-white shadow-lg">پیشنهاد ویژه</span>}
      </div>
      <div className="flex items-center gap-3 px-1 pb-1 pt-4"><div className="min-w-0 flex-1"><p className="text-xs font-bold text-red-500">جدیدترین انتخاب</p><h2 className="mt-1 truncate text-base font-black text-slate-900 sm:text-lg">{primary.title}</h2></div><Link href={href} aria-label={`مشاهده ${primary.title}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-950 text-white"><ArrowUpLeft size={19}/></Link></div>
    </div>
    {others.map((product, index) => <Link key={product.id} href={`/products/${encodeURIComponent(product.slug.replace(/^\/+|\/+$/g, ""))}`} className={`absolute bottom-20 hidden w-44 items-center gap-2 rounded-2xl border border-white bg-white/90 p-2.5 shadow-xl backdrop-blur sm:flex ${index === 0 ? "-right-12" : "-left-10 bottom-40"}`}><span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-50"><Image src={product.thumbnail} alt="" fill sizes="48px" className="object-contain p-1"/></span><span className="min-w-0"><strong className="block truncate text-xs text-slate-800">{product.title}</strong><small className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600"><PackageCheck size={11}/>موجود</small></span></Link>)}
  </div>;
}
