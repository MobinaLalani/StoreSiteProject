"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import type { Category } from "@/src/types/category";

export default function CategoryCard({ category }: { category: Category }) {
  const href = `/products/category/${encodeURIComponent(category.slug.replace(/^\/+|\/+$/g, ""))}`;
  return <Link href={href} className="group w-[8.75rem] shrink-0 snap-start sm:w-auto"><article className="h-full rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-sm transition active:scale-[.98] sm:rounded-3xl sm:p-3 sm:hover:-translate-y-1 sm:hover:border-red-200 sm:hover:shadow-xl"><div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-red-50/70 sm:rounded-2xl"><Image src={category.image} alt={category.title} fill sizes="(max-width:640px) 130px, 16vw" className="object-contain p-4 transition duration-300 sm:group-hover:scale-105"/></div><div className="flex items-center justify-between gap-1 px-1 pb-1 pt-3"><h3 className="truncate text-sm font-black text-slate-800">{category.title}</h3><ArrowUpLeft size={15} className="shrink-0 text-slate-300 transition group-hover:text-red-500"/></div></article></Link>;
}
