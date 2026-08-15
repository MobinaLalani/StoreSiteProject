"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useCart } from "@/src/features/cart/CartProvider";
import type { Order } from "@/src/types/order";
import { formatToman } from "@/src/lib/money";

function Result() {
  const params = useSearchParams(); const tracking = params.get("tracking") || ""; const token = params.get("token") || ""; const [order, setOrder] = useState<Order | null>(null); const [loaded, setLoaded] = useState(false); const { clear } = useCart();
  useEffect(() => { fetch(`/api/orders/track?trackingCode=${encodeURIComponent(tracking)}&token=${encodeURIComponent(token)}`).then((r) => r.ok ? r.json() : null).then((data) => { setOrder(data); setLoaded(true); if (data?.status === "paid") clear(); }); }, [tracking, token, clear]);
  if (!loaded) return <main className="min-h-[60vh] p-16 text-center">در حال بررسی نتیجه پرداخت...</main>;
  const success = order?.status === "paid"; return <main className="mx-auto flex min-h-[65vh] max-w-xl items-center px-4 py-12"><section className="w-full rounded-3xl border bg-white p-8 text-center">{success ? <CheckCircle2 className="mx-auto text-emerald-600" size={64}/> : <XCircle className="mx-auto text-red-600" size={64}/>}<h1 className="mt-5 text-2xl font-black">{success ? "پرداخت آزمایشی موفق بود" : "پرداخت ناموفق بود"}</h1>{order && <><p className="mt-4">کد پیگیری سفارش: <strong dir="ltr">{order.trackingCode}</strong></p><p className="mt-2 text-slate-500">مبلغ: {formatToman(order.total)}</p></>}<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"><Link href="/track-order" className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white">پیگیری سفارش</Link><Link href="/products" className="rounded-xl border px-6 py-3 font-bold">بازگشت به فروشگاه</Link></div></section></main>;
}
export default function PaymentResultPage() { return <Suspense><Result /></Suspense>; }
