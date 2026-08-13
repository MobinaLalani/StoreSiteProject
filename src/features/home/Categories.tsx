"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Container from "../../components/ui/Container";
import CategoryCard from "./CategoryCard";
import type { Category } from "@/src/types/category";

export default function Categories({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;
  return <section className="py-10 sm:py-16 lg:py-20"><Container>
    <div className="flex items-end justify-between gap-4"><div><span className="text-xs font-black text-red-500 sm:text-sm">انتخاب سریع</span><h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl lg:text-4xl">دسته‌بندی محصولات</h2><p className="mt-2 text-xs text-slate-500 sm:text-base">سریع‌تر به محصول موردنظرتان برسید</p></div><Link href="/products" className="hidden items-center gap-2 text-sm font-bold text-slate-600 sm:flex">همه محصولات <ArrowLeft size={17}/></Link></div>
    <div className="-mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 md:grid-cols-4 lg:mt-9 lg:grid-cols-6">{categories.map((category) => <CategoryCard key={category.id} category={category}/>)}</div>
  </Container></section>;
}
