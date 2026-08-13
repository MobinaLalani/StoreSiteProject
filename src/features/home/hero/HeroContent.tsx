"use client";

import Link from "next/link";
import { ArrowLeft, BadgeCheck, PhoneCall, Sparkles } from "lucide-react";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";

export default function HeroContent({ productCount, categoryCount }: { productCount: number; categoryCount: number }) {
  const { data } = usePublicSettings();
  return <div className="relative z-10 text-center lg:text-right">
    <span className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-white/80 px-3 py-2 text-xs font-bold text-red-600 shadow-sm backdrop-blur sm:px-4 sm:text-sm"><Sparkles size={16}/>انتخاب مطمئن برای تجهیزات تخصصی</span>
    <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-black leading-[1.45] tracking-tight text-slate-950 sm:text-4xl lg:mx-0 lg:text-6xl lg:leading-[1.3]">{data?.appearance.heroTitle || "کیفیتی که اعتماد می‌سازد"}</h1>
    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">{data?.appearance.heroDescription || "تأمین تجهیزات باکیفیت، مشاوره تخصصی و پاسخ‌گویی سریع برای یک انتخاب مطمئن."}</p>
    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:justify-center lg:justify-start">
      <Link href="/products" className="col-span-2 flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-red-500 to-red-600 px-6 font-black text-white shadow-xl shadow-red-500/20 transition active:scale-[.98] sm:col-auto sm:min-h-14 sm:px-8">مشاهده محصولات <ArrowLeft size={18}/></Link>
      <a href="#contact" className="col-span-2 flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 font-bold text-slate-700 shadow-sm backdrop-blur transition active:scale-[.98] sm:col-auto sm:min-h-14"><PhoneCall size={18}/>مشاوره و تماس</a>
    </div>
    <div className="mx-auto mt-7 grid max-w-md grid-cols-3 divide-x divide-x-reverse divide-slate-200 rounded-2xl border border-white bg-white/65 px-2 py-4 shadow-sm backdrop-blur lg:mx-0">
      <div><strong className="block text-xl font-black text-slate-900 sm:text-2xl">{productCount.toLocaleString("fa-IR")}</strong><span className="text-[10px] text-slate-500 sm:text-xs">محصول جدید</span></div>
      <div><strong className="block text-xl font-black text-slate-900 sm:text-2xl">{categoryCount.toLocaleString("fa-IR")}</strong><span className="text-[10px] text-slate-500 sm:text-xs">دسته‌بندی</span></div>
      <div><BadgeCheck className="mx-auto mb-1 text-emerald-500" size={23}/><span className="text-[10px] text-slate-500 sm:text-xs">تضمین کیفیت</span></div>
    </div>
  </div>;
}
