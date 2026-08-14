import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft, ShieldCheck } from "lucide-react";
import LoginForm from "@/src/features/admin/auth/components/LoginForm";
import { settingsRepository } from "@/src/repositories/settings.repository";
import type { SiteSettings } from "@/src/features/admin/settings/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "ورود مدیریت", robots: { index: false, follow: false, nocache: true } };

export default async function LoginPage() {
  const settings = await settingsRepository.getPublic() as unknown as SiteSettings;
  return <main className="relative min-h-dvh overflow-hidden bg-[#f1ece7] px-4 pb-[env(safe-area-inset-bottom)] text-[#49382b] sm:px-6">
    <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full border-[48px] border-white/35"/><div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full border-[55px] border-[#7B604A]/8"/>
    <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col">
      <header className="flex min-h-16 items-center justify-between sm:min-h-20"><Link href="/" className="text-sm font-black tracking-tight sm:text-base">{settings.store.name}</Link><Link href="/" aria-label="بازگشت به فروشگاه" className="grid h-10 w-10 place-items-center rounded-full bg-[#7B604A] text-white transition active:scale-95 sm:h-11 sm:w-auto sm:grid-flow-col sm:gap-2 sm:px-4"><span className="hidden text-xs font-bold sm:inline">فروشگاه</span><ArrowUpLeft size={17}/></Link></header>
      <section className="grid flex-1 items-center py-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="mx-auto w-full max-w-md lg:order-2 lg:mx-0 lg:max-w-none"><div className="mb-8"><span className="inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-2 text-[11px] font-bold"><ShieldCheck size={15}/>ورود امن مدیریت</span><h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">خوش آمدید!</h1><p className="mt-3 text-sm leading-7 text-[#7B604A]/75">برای مدیریت محصولات و تنظیمات فروشگاه وارد حساب خود شوید.</p></div><LoginForm /></div>
        <div className="relative hidden lg:block"><div className="relative mx-auto aspect-[.9/1] max-w-lg overflow-hidden rounded-[3rem] bg-[#49382b] p-10 text-white shadow-[0_35px_90px_rgba(73,56,43,.24)]"><div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#bda791]/35 blur-3xl"/><div className="absolute bottom-10 right-10 h-40 w-40 rounded-full border-[28px] border-white/5"/><div className="relative flex h-full flex-col justify-between"><ShieldCheck size={46} className="text-[#d9c8b8]"/><div><p className="text-sm text-white/50">پنل مدیریت فروشگاه</p><h2 className="mt-3 text-4xl font-black leading-[1.4]">کنترل کامل،<br/>ساده و مطمئن.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-white/55">محصولات، دسته‌بندی‌ها، درخواست‌های مشتریان و محتوای سایت را از یک پنل مدیریت کنید.</p></div></div></div></div>
      </section>
      <footer className="py-5 text-center text-[10px] text-[#7B604A]/55 sm:text-xs">دسترسی به این بخش فقط برای مدیران مجاز است.</footer>
    </div>
  </main>;
}
