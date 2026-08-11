"use client";

import { useEffect, useState } from "react";
import { Building2, MessageCircle, Palette, Save, Search, Share2 } from "lucide-react";
import { useAdminSettings, useUpdateSettings } from "./hooks/useSettings";
import type { SiteSettings } from "./types";
import { SettingsField, SettingsTextarea, SettingsToggle } from "./components/SettingsField";

const tabs = [
  { id: "store", label: "فروشگاه", icon: Building2 },
  { id: "inquiry", label: "استعلام", icon: MessageCircle },
  { id: "social", label: "شبکه‌ها", icon: Share2 },
  { id: "appearance", label: "ظاهر", icon: Palette },
  { id: "seo", label: "سئو", icon: Search },
] as const;
type TabId = (typeof tabs)[number]["id"];

export default function SettingsPage() {
  const { data, isLoading, error } = useAdminSettings();
  if (isLoading) return <div className="p-10 text-center">در حال دریافت تنظیمات...</div>;
  if (!data || error) return <div className="rounded-xl bg-red-50 p-5 text-red-600">دریافت تنظیمات ناموفق بود.</div>;
  return <SettingsEditor initial={data} />;
}

function SettingsEditor({ initial }: { initial: SiteSettings }) {
  const [active, setActive] = useState<TabId>("store");
  const [data, setData] = useState(initial);
  const update = useUpdateSettings();
  useEffect(() => setData(initial), [initial]);
  const setSection = <K extends keyof SiteSettings>(section: K, key: keyof SiteSettings[K], value: unknown) => setData((previous) => ({ ...previous, [section]: { ...previous[section], [key]: value } }));

  return <div dir="rtl" className="space-y-5">
    <div><h1 className="text-2xl font-black sm:text-3xl">تنظیمات فروشگاه</h1><p className="mt-2 text-sm text-slate-500">مدیریت اطلاعات، ظاهر و راه‌های ارتباطی فروشگاه</p></div>
    <div className="flex gap-2 overflow-x-auto rounded-2xl border bg-white p-2 shadow-sm">{tabs.map((tab) => { const Icon = tab.icon; return <button type="button" key={tab.id} onClick={() => setActive(tab.id)} className={`flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-bold transition ${active === tab.id ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:bg-slate-50"}`}><Icon size={17} />{tab.label}</button>; })}</div>
    <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
      {active === "store" && <div className="grid gap-4 md:grid-cols-2">
        <SettingsField label="نام فروشگاه" value={data.store.name} onChange={(e) => setSection("store", "name", e.target.value)} />
        <SettingsField label="ایمیل" type="email" dir="ltr" value={data.store.email} onChange={(e) => setSection("store", "email", e.target.value)} />
        <SettingsField label="تلفن ثابت" dir="ltr" value={data.store.landline} onChange={(e) => setSection("store", "landline", e.target.value)} />
        <SettingsField label="موبایل" dir="ltr" value={data.store.mobile} onChange={(e) => setSection("store", "mobile", e.target.value)} />
        <SettingsField label="شماره واتساپ با کد کشور" dir="ltr" value={data.store.whatsapp} onChange={(e) => setSection("store", "whatsapp", e.target.value)} />
        <SettingsField label="ساعات کاری" value={data.store.workingHours} onChange={(e) => setSection("store", "workingHours", e.target.value)} />
        <div className="md:col-span-2"><SettingsTextarea label="توضیح کوتاه و متن درباره ما" value={data.store.shortDescription} onChange={(e) => setSection("store", "shortDescription", e.target.value)} /></div>
        <div className="md:col-span-2"><SettingsTextarea label="آدرس" value={data.store.address} onChange={(e) => setSection("store", "address", e.target.value)} /></div>
      </div>}
      {active === "inquiry" && <div className="grid gap-4 md:grid-cols-2">
        <SettingsToggle label="نمایش تماس تلفنی" checked={data.inquiry.phoneEnabled} onChange={(value) => setSection("inquiry", "phoneEnabled", value)} />
        <SettingsToggle label="نمایش واتساپ" checked={data.inquiry.whatsappEnabled} onChange={(value) => setSection("inquiry", "whatsappEnabled", value)} />
        <SettingsField label="متن دکمه" value={data.inquiry.buttonText} onChange={(e) => setSection("inquiry", "buttonText", e.target.value)} />
        <div className="md:col-span-2"><SettingsTextarea label="متن پیش‌فرض واتساپ؛ {product} با نام محصول جایگزین می‌شود" value={data.inquiry.whatsappMessage} onChange={(e) => setSection("inquiry", "whatsappMessage", e.target.value)} /></div>
        <div className="md:col-span-2"><SettingsTextarea label="پیام خارج از ساعات کاری" value={data.inquiry.afterHoursMessage} onChange={(e) => setSection("inquiry", "afterHoursMessage", e.target.value)} /></div>
      </div>}
      {active === "social" && <div className="grid gap-4 md:grid-cols-2">{(["instagram", "telegram", "linkedin", "aparat"] as const).map((key) => <SettingsField key={key} label={key} dir="ltr" value={data.social[key]} onChange={(e) => setSection("social", key, e.target.value)} />)}</div>}
      {active === "appearance" && <div className="grid gap-4 md:grid-cols-2">
        <SettingsField label="رنگ اصلی" type="color" value={data.appearance.primaryColor} onChange={(e) => setSection("appearance", "primaryColor", e.target.value)} />
        <SettingsField label="آدرس تصویر Hero" dir="ltr" value={data.appearance.heroImage} onChange={(e) => setSection("appearance", "heroImage", e.target.value)} />
        <SettingsField label="عنوان Hero" value={data.appearance.heroTitle} onChange={(e) => setSection("appearance", "heroTitle", e.target.value)} />
        <div className="md:col-span-2"><SettingsTextarea label="توضیحات Hero" value={data.appearance.heroDescription} onChange={(e) => setSection("appearance", "heroDescription", e.target.value)} /></div>
        <SettingsToggle label="نمایش دسته‌بندی‌ها" checked={data.appearance.showCategories} onChange={(value) => setSection("appearance", "showCategories", value)} />
        <SettingsToggle label="نمایش محصولات ویژه" checked={data.appearance.showFeaturedProducts} onChange={(value) => setSection("appearance", "showFeaturedProducts", value)} />
      </div>}
      {active === "seo" && <div className="grid gap-4 md:grid-cols-2">
        <SettingsField label="عنوان سایت" value={data.seo.title} onChange={(e) => setSection("seo", "title", e.target.value)} />
        <SettingsField label="کلمات کلیدی" value={data.seo.keywords} onChange={(e) => setSection("seo", "keywords", e.target.value)} />
        <SettingsField label="تصویر اشتراک‌گذاری" dir="ltr" value={data.seo.shareImage} onChange={(e) => setSection("seo", "shareImage", e.target.value)} />
        <SettingsToggle label="اجازه ایندکس موتورهای جستجو" checked={data.seo.allowIndexing} onChange={(value) => setSection("seo", "allowIndexing", value)} />
        <div className="md:col-span-2"><SettingsTextarea label="توضیحات سایت" value={data.seo.description} onChange={(e) => setSection("seo", "description", e.target.value)} /></div>
      </div>}
      <div className="mt-6 flex items-center justify-end gap-3 border-t pt-5">{update.isError && <span className="text-sm text-red-600">ذخیره تنظیمات ناموفق بود.</span>}{update.isSuccess && <span className="text-sm font-bold text-emerald-600">تنظیمات ذخیره شد.</span>}<button type="button" onClick={() => update.mutate(data)} disabled={update.isPending} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 font-bold text-white disabled:opacity-50"><Save size={18} />{update.isPending ? "در حال ذخیره..." : "ذخیره تنظیمات"}</button></div>
    </div>
  </div>;
}
