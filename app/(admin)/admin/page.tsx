"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Boxes, CheckCircle2, CircleAlert, Clock3, FolderTree, MessageCircle, Package, Plus, Settings, Sparkles, TrendingUp } from "lucide-react";
import { useProducts } from "@/src/features/admin/products/hooks/useProducts";
import { useCategories } from "@/src/features/admin/categories/hooks/useCategories";

type InquiryStatus = "new" | "contacted" | "quoted" | "completed" | "cancelled";
interface Inquiry { id: number; name: string; mobile: string; productTitle: string; status: InquiryStatus; createdAt: string }

export default function DashboardPage() {
  const productsQuery = useProducts();
  const categoriesQuery = useCategories();
  const inquiriesQuery = useQuery<Inquiry[]>({ queryKey: ["admin", "inquiries"], queryFn: async () => { const response = await fetch("/api/admin/inquiries"); if (!response.ok) throw new Error(); return response.json(); } });
  const products = productsQuery.data ?? []; const categories = categoriesQuery.data ?? []; const inquiries = inquiriesQuery.data ?? [];
  const isLoading = productsQuery.isLoading || categoriesQuery.isLoading || inquiriesQuery.isLoading;
  const newInquiries = inquiries.filter((item) => item.status === "new").length;
  const completed = inquiries.filter((item) => item.status === "completed").length;
  const activeProducts = products.filter((item) => item.status === "active").length;
  const unavailable = products.filter((item) => item.stock <= 0).length;
  const conversion = inquiries.length ? Math.round((completed / inquiries.length) * 100) : 0;
  const stats = [
    { label: "کل محصولات", value: products.length, detail: `${activeProducts} محصول فعال`, icon: Package, color: "from-red-500 to-rose-600", soft: "bg-red-50 text-red-600" },
    { label: "دسته‌بندی‌ها", value: categories.length, detail: "ساختار فروشگاه", icon: FolderTree, color: "from-sky-500 to-blue-600", soft: "bg-sky-50 text-sky-600" },
    { label: "درخواست‌های جدید", value: newInquiries, detail: `${inquiries.length} درخواست کل`, icon: MessageCircle, color: "from-amber-400 to-orange-500", soft: "bg-amber-50 text-amber-600" },
    { label: "تکمیل‌شده", value: completed, detail: `نرخ تبدیل ${conversion}٪`, icon: TrendingUp, color: "from-emerald-500 to-green-600", soft: "bg-emerald-50 text-emerald-600" },
  ];
  const quickActions = [{ href: "/admin/Products", label: "افزودن محصول", description: "مدیریت محصولات فروشگاه", icon: Plus }, { href: "/admin/Categories", label: "مدیریت دسته‌ها", description: "ویرایش ساختار دسته‌بندی", icon: Boxes }, { href: "/admin/inquiries", label: "بررسی درخواست‌ها", description: `${newInquiries} درخواست خوانده‌نشده`, icon: MessageCircle }, { href: "/admin/settings", label: "تنظیمات فروشگاه", description: "اطلاعات، ظاهر و سئو", icon: Settings }];

  return <div dir="rtl" className="space-y-7">
    <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8"><div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-red-500/20 blur-3xl" /><div className="absolute -bottom-28 right-1/3 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" /><div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center"><div><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-red-300"><Sparkles size={15} />مرکز مدیریت فروشگاه</span><h1 className="mt-4 text-3xl font-black sm:text-4xl">سلام مدیر، خوش آمدی 👋</h1><p className="mt-3 max-w-2xl leading-7 text-slate-400">وضعیت فروشگاه، محصولات و درخواست‌های مشتریان را از یک‌جا مشاهده و مدیریت کن.</p></div><Link href="/" target="_blank" className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 font-bold text-slate-900 transition hover:bg-red-50">مشاهده فروشگاه<ArrowLeft size={18} /></Link></div></section>

    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, detail, icon: Icon, color, soft }) => <article key={label} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${color}`} /><div className="flex items-start justify-between"><span className={`grid h-12 w-12 place-items-center rounded-2xl ${soft}`}><Icon size={23} /></span>{isLoading && <span className="h-6 w-12 animate-pulse rounded bg-slate-100" />}</div><strong className="mt-5 block text-4xl font-black text-slate-900">{isLoading ? "—" : value.toLocaleString("fa-IR")}</strong><p className="mt-1 font-bold text-slate-700">{label}</p><p className="mt-2 text-xs text-slate-400">{detail}</p></article>)}</section>

    <section className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
      <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-xl font-black">آخرین درخواست‌ها</h2><p className="mt-1 text-sm text-slate-400">پیگیری مشتریان اخیر</p></div><Link href="/admin/inquiries" className="flex items-center gap-1 text-sm font-bold text-red-500">مشاهده همه<ArrowLeft size={16} /></Link></div><div className="mt-5 divide-y divide-slate-100">{inquiries.slice(0, 5).map((item) => <div key={item.id} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"><div className="min-w-0"><div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${item.status === "new" ? "bg-amber-400" : item.status === "completed" ? "bg-emerald-500" : "bg-slate-300"}`} /><p className="truncate font-bold">{item.name}</p></div><p className="mt-1 truncate pr-4 text-xs text-slate-400">{item.productTitle}</p></div><div className="flex shrink-0 items-center gap-4"><a href={`tel:${item.mobile}`} dir="ltr" className="text-sm font-bold text-red-500">{item.mobile}</a><span className="flex items-center gap-1 text-xs text-slate-400"><Clock3 size={13} />{new Date(item.createdAt).toLocaleDateString("fa-IR")}</span></div></div>)}{!isLoading && !inquiries.length && <div className="py-12 text-center text-slate-400"><MessageCircle className="mx-auto mb-3 opacity-40" size={36} />هنوز درخواستی ثبت نشده است.</div>}</div></div>

      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-white shadow-lg"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-400"><TrendingUp /></span><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">عملکرد استعلام</span></div><p className="mt-8 text-sm text-slate-400">نرخ تبدیل درخواست‌ها</p><div className="mt-2 flex items-end gap-3"><strong className="text-6xl font-black text-emerald-400">{conversion.toLocaleString("fa-IR")}٪</strong><span className="pb-2 text-xs text-slate-500">تکمیل موفق</span></div><div className="mt-7 h-3 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-l from-emerald-400 to-green-600 transition-all duration-700" style={{ width: `${conversion}%` }} /></div><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/5 p-3"><CheckCircle2 className="text-emerald-400" size={18} /><b className="mt-2 block text-xl">{completed.toLocaleString("fa-IR")}</b><span className="text-xs text-slate-500">تکمیل‌شده</span></div><div className="rounded-xl bg-white/5 p-3"><CircleAlert className="text-amber-400" size={18} /><b className="mt-2 block text-xl">{newInquiries.toLocaleString("fa-IR")}</b><span className="text-xs text-slate-500">نیازمند پیگیری</span></div></div></div>
    </section>

    <section><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black">دسترسی سریع</h2>{unavailable > 0 && <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">{unavailable.toLocaleString("fa-IR")} محصول ناموجود</span>}</div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{quickActions.map(({ href, label, description, icon: Icon }) => <Link key={href} href={href} className="group flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition hover:border-red-200 hover:shadow-md"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-red-50 group-hover:text-red-500"><Icon size={20} /></span><div className="min-w-0"><p className="font-bold">{label}</p><p className="truncate text-xs text-slate-400">{description}</p></div><ArrowLeft className="mr-auto text-slate-300 transition group-hover:-translate-x-1 group-hover:text-red-500" size={17} /></Link>)}</div></section>
  </div>;
}
