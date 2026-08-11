"use client";

import { motion } from "framer-motion";
import { Clock3, Mail, MapPin, PhoneCall } from "lucide-react";
import Container from "../ui/Container";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";

export default function Footer() {
  const { data: settings } = usePublicSettings();
  const store = settings?.store;
  const socialLinks = settings ? Object.entries(settings.social).filter(([, url]) => Boolean(url)) : [];
  return <motion.footer id="contact" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-14 scroll-mt-24 border-t border-slate-800 bg-slate-950 text-white sm:mt-24">
    <Container>
      <div className="grid gap-10 py-10 sm:py-14 md:grid-cols-2 lg:grid-cols-4">
        <div><h3 className="text-2xl font-black">{store?.name || "اتصال گستر"}</h3><p className="mt-4 leading-8 text-slate-400">{store?.shortDescription || "تأمین و فروش تجهیزات صنعتی"}</p><a href="/#about" className="mt-4 inline-block font-bold text-red-400 hover:text-red-300">درباره ما</a></div>
        <div><h4 className="font-black">اطلاعات تماس</h4><div className="mt-4 space-y-3 text-sm text-slate-400">
          {store?.landline && <a href={`tel:${store.landline.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 hover:text-white"><PhoneCall size={17} className="text-red-400" /><span dir="ltr">{store.landline}</span></a>}
          {store?.mobile && <a href={`tel:${store.mobile.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 hover:text-white"><PhoneCall size={17} className="text-red-400" /><span dir="ltr">{store.mobile}</span></a>}
          {store?.email && <a href={`mailto:${store.email}`} className="flex items-center gap-3 hover:text-white"><Mail size={17} className="text-red-400" /><span dir="ltr">{store.email}</span></a>}
        </div></div>
        <div><h4 className="font-black">آدرس و ساعات کاری</h4><div className="mt-4 space-y-4 text-sm leading-7 text-slate-400">{store?.address && <p className="flex items-start gap-3"><MapPin size={18} className="mt-1 shrink-0 text-red-400" />{store.address}</p>}{store?.workingHours && <p className="flex items-start gap-3"><Clock3 size={18} className="mt-1 shrink-0 text-red-400" />{store.workingHours}</p>}</div></div>
        <div><h4 className="font-black">شبکه‌های اجتماعی</h4><div className="mt-4 flex flex-wrap gap-2">{socialLinks.length ? socialLinks.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-red-500 hover:text-white">{name}</a>) : <span className="text-sm text-slate-500">لینکی ثبت نشده است.</span>}</div></div>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 border-t border-slate-800 py-5 text-sm text-slate-500 sm:flex-row"><span>© {new Date().getFullYear()} {store?.name || "اتصال گستر"}</span><span>تمامی حقوق محفوظ است.</span></div>
    </Container>
  </motion.footer>;
}
