"use client";

import { ArrowLeft, MessageCircle, PhoneCall } from "lucide-react";
import Container from "@/src/components/ui/Container";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";

export default function HomeCallToAction() {
  const { data } = usePublicSettings();
  const phone = data?.store.mobile || data?.store.landline;
  const whatsapp = data?.store.whatsapp;
  return <section className="bg-white px-0 pb-12 pt-2 sm:pb-20"><Container><div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-5 py-8 text-white shadow-2xl sm:px-10 sm:py-12 lg:px-14"><div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-red-500/25 blur-3xl"/><div className="absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl"/><div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]"><div><span className="text-xs font-bold text-red-400">مشاوره قبل از خرید</span><h2 className="mt-2 text-2xl font-black leading-10 sm:text-3xl">برای انتخاب محصول مناسب نیاز به راهنمایی دارید؟</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">کارشناسان ما برای بررسی نیاز شما و انتخاب دقیق‌تر محصول پاسخ‌گو هستند.</p></div><div className="grid gap-2 sm:flex">{phone && <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 font-black transition active:scale-[.98]"><PhoneCall size={18}/>تماس مستقیم</a>}{whatsapp && <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 font-bold transition active:scale-[.98]"><MessageCircle size={18}/>واتساپ <ArrowLeft size={16}/></a>}</div></div></div></Container></section>;
}
