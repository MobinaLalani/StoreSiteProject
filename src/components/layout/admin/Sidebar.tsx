"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, FolderTree, LayoutDashboard, MessageCircle, Package, Settings, ShieldCheck  , Tag} from "lucide-react";
import { title } from "process";

const menu = [
  { title: "داشبورد", href: "/admin", icon: LayoutDashboard },
  { title: "دسته‌بندی محصولات", href: "/admin/Categories", icon: Package },
  { title: "تنظیمات تگ", href: "/admin/Tag", icon: Tag },
  { title: "محصولات", href: "/admin/Products", icon: FolderTree },
  { title: "درخواست‌های تماس", href: "/admin/inquiries", icon: MessageCircle },
  { title: "سفارش‌ها", href: "/admin/order", icon: ClipboardList },
  { title: "تنظیمات", href: "/admin/Settings", icon: Settings },
  { title: "امنیت حساب", href: "/admin/security", icon: ShieldCheck },
];
export default function Sidebar() {
  const pathname = usePathname();
  return <><aside className="hidden w-72 shrink-0 border-l border-gray-200 bg-white md:block"><div className="border-b p-6"><h1 className="text-2xl font-bold">Store Admin</h1></div><nav className="space-y-2 p-4">{menu.map((item) => { const Icon = item.icon; const active = pathname === item.href; return <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${active ? "bg-red-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}><Icon size={20}/><span>{item.title}</span></Link>; })}</nav></aside>
    <nav aria-label="ناوبری مدیریت" className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(15,23,42,.1)] backdrop-blur-xl md:hidden"><div className="flex h-16 items-stretch overflow-x-auto px-1">{menu.map((item) => { const Icon = item.icon; const active = pathname === item.href; return <Link key={item.href} href={item.href} className={`flex min-w-[4.5rem] flex-1 flex-col items-center justify-center gap-1 px-1 text-[10px] font-bold ${active ? "text-red-600" : "text-slate-500"}`}><Icon size={20}/><span className="max-w-full truncate">{item.title}</span></Link>; })}</div></nav>
  </>;
}
