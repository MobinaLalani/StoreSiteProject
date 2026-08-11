"use client";

import { motion } from "framer-motion";
import { Clock3, MapPin, PhoneCall, Store } from "lucide-react";
import Container from "@/src/components/ui/Container";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";

export default function About() {
  const { data: settings, isLoading } = usePublicSettings();
  if (isLoading || !settings?.store) return null;
  const { store } = settings;
  const items = [{ label: "آدرس", value: store.address, icon: MapPin }, { label: "شماره تماس", value: store.mobile || store.landline, icon: PhoneCall }, { label: "ساعات کاری", value: store.workingHours, icon: Clock3 }].filter((item) => item.value);
  return <section id="about" className="scroll-mt-24 py-16 sm:py-24"><Container><motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-2xl"><div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_.8fr] lg:p-14"><div><span className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-2 text-sm font-bold text-red-400"><Store size={18} /> درباره ما</span><h2 className="mt-6 text-3xl font-black sm:text-4xl">{store.name}</h2><p className="mt-5 max-w-2xl text-base leading-9 text-slate-300 sm:text-lg">{store.shortDescription || "تأمین و فروش محصولات باکیفیت و ارائه خدمات مطمئن به مشتریان."}</p></div><div className="space-y-3">{items.map(({ label, value, icon: Icon }) => <div key={label} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"><Icon size={20} className="mt-1 shrink-0 text-red-400" /><div><p className="text-xs text-slate-400">{label}</p><p className="mt-1 leading-7">{value}</p></div></div>)}</div></div></motion.div></Container></section>;
}
