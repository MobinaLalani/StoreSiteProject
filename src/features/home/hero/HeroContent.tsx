"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";

export default function HeroContent({ productCount, categoryCount }: { productCount: number; categoryCount: number }) {
  const { data } = usePublicSettings();
  const view = data?.appearance;
  return <div className="w-full text-center lg:text-right">
    {view?.heroEyebrow && <p className="text-[10px] font-black uppercase tracking-[.18em] text-slate-500 sm:text-xs">{view.heroEyebrow}</p>}
    <h1 className="mx-auto mt-3 max-w-xl text-3xl font-black leading-[1.3] tracking-tight text-slate-950 sm:text-4xl lg:mx-0 lg:text-5xl xl:text-[3.4rem]">{view?.heroTitle || "کیفیتی که اعتماد می‌سازد"}</h1>
    <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:mx-0">{view?.heroDescription || "تأمین تجهیزات باکیفیت و مشاوره تخصصی برای یک انتخاب مطمئن."}</p>
    <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row lg:justify-start">
      {view?.heroPrimaryButtonEnabled !== false && <Link href={view?.heroPrimaryButtonLink || "/products"} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-black text-white transition active:scale-[.98]">{view?.heroPrimaryButtonText || "مشاهده محصولات"}<ArrowLeft size={17}/></Link>}
      {view?.heroSecondaryButtonEnabled !== false && <Link href={view?.heroSecondaryButtonLink || "#contact"} className="flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-bold text-slate-600 transition active:bg-slate-100">{view?.heroSecondaryButtonText || "مشاوره و تماس"}</Link>}
    </div>
    {view?.heroStatsEnabled !== false && <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-6 border-t border-slate-200 pt-5 lg:mx-0 lg:justify-start"><div><strong className="text-lg font-black text-slate-900">{productCount.toLocaleString("fa-IR")}</strong><span className="mr-1.5 text-[10px] text-slate-400">{view?.heroProductStatLabel || "محصول"}</span></div><span className="h-5 w-px bg-slate-200"/><div><strong className="text-lg font-black text-slate-900">{categoryCount.toLocaleString("fa-IR")}</strong><span className="mr-1.5 text-[10px] text-slate-400">{view?.heroCategoryStatLabel || "دسته"}</span></div></div>}
  </div>;
}
