"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpLeft, BadgeCheck, Headphones, PackageCheck, Truck } from "lucide-react";
import Container from "../../../components/ui/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import type { Product } from "@/src/types/product";

const features = [
  { title: "کیفیت تضمین‌شده", text: "محصولات بررسی‌شده", icon: BadgeCheck },
  { title: "مشاوره تخصصی", text: "انتخاب دقیق‌تر", icon: Headphones },
  { title: "موجودی واقعی", text: "اطلاعات به‌روز", icon: PackageCheck },
  { title: "ارسال مطمئن", text: "بسته‌بندی استاندارد", icon: Truck },
];

export default function Hero({ products, categoryCount }: { products: Product[]; categoryCount: number }) {
  return <section className="bg-[#e9e7e2] px-2 py-3 sm:px-4 sm:py-5 lg:px-6 lg:py-7">
    <Container className="px-0">
      <div className="overflow-hidden rounded-[1.6rem] border border-black/5 bg-white p-3 shadow-[0_24px_70px_rgba(30,27,22,.12)] sm:rounded-[2.25rem] sm:p-5 lg:p-7">
        <div className="grid items-stretch gap-4 lg:grid-cols-[.82fr_1.18fr] lg:gap-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="flex items-center px-2 py-4 sm:px-5 sm:py-7 lg:px-8"><HeroContent productCount={products.length} categoryCount={categoryCount}/></motion.div>
          <motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65, delay: .08 }}><HeroImage products={products}/></motion.div>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:gap-3 lg:mt-5">
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl bg-[#f3f1ed] sm:grid-cols-4 sm:rounded-[1.5rem]">{features.map(({ title, text, icon: Icon }, index) => <div key={title} className={`flex min-h-20 items-center gap-2.5 p-3 sm:min-h-24 sm:p-4 ${index % 2 ? "border-r border-black/5" : ""} ${index > 1 ? "border-t border-black/5 sm:border-t-0" : ""} ${index ? "sm:border-r" : ""}`}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-slate-900 shadow-sm"><Icon size={17}/></span><span className="min-w-0"><strong className="block text-[11px] font-black text-slate-900 sm:text-xs">{title}</strong><small className="mt-1 block truncate text-[9px] text-slate-500 sm:text-[10px]">{text}</small></span></div>)}</div>
          <Link href="/products" aria-label="مشاهده همه محصولات" className="group flex min-h-14 items-center justify-center rounded-2xl bg-slate-950 text-white transition active:scale-[.98] sm:aspect-square sm:h-full sm:min-h-24 sm:w-24 sm:rounded-[1.5rem]"><ArrowUpLeft size={30} className="transition duration-300 sm:group-hover:-translate-y-1 sm:group-hover:translate-x-1 sm:group-hover:scale-110"/></Link>
        </div>
      </div>
    </Container>
  </section>;
}
