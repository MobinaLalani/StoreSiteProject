"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LogOut, PackageSearch } from "lucide-react";
import { useCustomer, useCustomerActions } from "@/src/features/customer/useCustomer";
import type { Order, OrderStatus } from "@/src/types/order";
import { formatToman } from "@/src/lib/money";
const labels: Record<OrderStatus, string> = { pending_payment: "در انتظار پرداخت", paid: "پرداخت‌شده", processing: "در حال آماده‌سازی", shipped: "ارسال‌شده", delivered: "تحویل‌شده", cancelled: "لغوشده", payment_failed: "پرداخت ناموفق" };
async function getOrders(): Promise<Order[]> { const response = await fetch("/api/customer/orders"); if (!response.ok) throw new Error(); return response.json(); }
export default function AccountPage() {
  const router = useRouter(); const { data: customer, isLoading } = useCustomer(); const { logout } = useCustomerActions(); const orders = useQuery({ queryKey: ["customer", "orders"], queryFn: getOrders, enabled: Boolean(customer), retry: false });
  if (isLoading) return <main className="min-h-[60vh] p-16 text-center">در حال دریافت حساب...</main>;
  if (!customer) return <main className="mx-auto min-h-[60vh] max-w-xl px-4 py-16 text-center"><h1 className="text-2xl font-black">برای مشاهده حساب وارد شوید</h1><Link href="/login?next=/account" className="mt-6 inline-flex rounded-xl bg-red-600 px-6 py-3 font-bold text-white">ورود</Link></main>;
  async function exit() { await logout(); router.replace("/home"); router.refresh(); }
  return <main className="mx-auto min-h-[65vh] max-w-5xl px-4 py-10"><div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-black">حساب کاربری</h1><p className="mt-2 text-slate-500">{customer.fullName} — <span dir="ltr">{customer.mobile}</span></p></div><button onClick={exit} className="flex items-center gap-2 rounded-xl border px-4 py-3 text-red-600"><LogOut size={18}/> خروج</button></div><section className="mt-8"><h2 className="mb-4 text-xl font-black">سفارش‌های من</h2>{orders.isLoading ? <p>در حال دریافت سفارش‌ها...</p> : !orders.data?.length ? <div className="rounded-3xl border bg-white p-12 text-center text-slate-500"><PackageSearch className="mx-auto mb-3" size={42}/>هنوز سفارشی ندارید.</div> : <div className="space-y-3">{[...orders.data].reverse().map((order) => <article key={order.id} className="rounded-2xl border bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><div><strong>سفارش {order.trackingCode}</strong><p className="mt-1 text-xs text-slate-400">{new Date(order.createdAt).toLocaleString("fa-IR")}</p></div><div className="text-left"><span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">{labels[order.status]}</span><strong className="mt-2 block">{formatToman(order.total)}</strong></div></div><div className="mt-4 border-t pt-3 text-sm text-slate-600">{order.items.map((item) => <p key={item.productId}>{item.title} × {item.quantity.toLocaleString("fa-IR")}</p>)}</div></article>)}</div>}</section></main>;
}
