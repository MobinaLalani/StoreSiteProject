"use client";

import { Headphones, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import Container from "@/src/components/ui/Container";

const benefits = [
  { title: "تضمین کیفیت", description: "محصولات بررسی‌شده", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
  { title: "ارسال مطمئن", description: "بسته‌بندی استاندارد", icon: Truck, color: "text-blue-600 bg-blue-50" },
  { title: "مشاوره تخصصی", description: "پاسخ‌گویی قبل از خرید", icon: Headphones, color: "text-amber-600 bg-amber-50" },
  { title: "موجودی واقعی", description: "اطلاعات به‌روز محصولات", icon: PackageCheck, color: "text-red-600 bg-red-50" },
];

export default function HomeBenefits() {
  return <section className="relative z-10 -mt-1 pb-5 sm:-mt-7 sm:pb-8"><Container><div className="grid grid-cols-2 gap-2 rounded-3xl border border-slate-200/80 bg-white p-2 shadow-[0_15px_45px_rgba(15,23,42,.08)] sm:grid-cols-4 sm:gap-0 sm:p-3">{benefits.map(({ title, description, icon: Icon, color }, index) => <div key={title} className={`flex items-center gap-2.5 rounded-2xl p-2.5 sm:p-4 ${index ? "sm:border-r sm:border-slate-100" : ""}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11 ${color}`}><Icon size={20}/></span><span className="min-w-0"><strong className="block text-xs font-black text-slate-800 sm:text-sm">{title}</strong><small className="mt-1 block truncate text-[9px] text-slate-400 sm:text-[11px]">{description}</small></span></div>)}</div></Container></section>;
}
