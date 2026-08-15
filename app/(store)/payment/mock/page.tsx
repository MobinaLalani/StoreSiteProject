"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function MockPayment() {
  const authority = useSearchParams().get("authority") || ""; const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  async function finish(result: "success" | "failed") { setLoading(true); setError(""); const response = await fetch("/api/payment/mock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ authority, result }) }); const data = await response.json().catch(() => null) as { redirectUrl?: string; message?: string } | null; if (response.ok && data?.redirectUrl) window.location.href = data.redirectUrl; else { setLoading(false); setError(data?.message || "پرداخت آزمایشی ناموفق بود."); } }
  return <main className="mx-auto flex min-h-[65vh] max-w-xl items-center px-4 py-12"><section className="w-full rounded-3xl border bg-white p-7 text-center shadow-xl"><span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">درگاه آزمایشی</span><h1 className="mt-6 text-2xl font-black">شبیه‌ساز پرداخت آنلاین</h1><p className="mt-3 leading-7 text-slate-500">هیچ مبلغی جابه‌جا نمی‌شود. برای تست جریان فروشگاه، نتیجه پرداخت را انتخاب کنید.</p>{error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}<div className="mt-7 grid gap-3 sm:grid-cols-2"><button disabled={loading} onClick={() => finish("success")} className="min-h-12 rounded-xl bg-emerald-600 font-bold text-white">پرداخت موفق</button><button disabled={loading} onClick={() => finish("failed")} className="min-h-12 rounded-xl border border-red-200 font-bold text-red-600">پرداخت ناموفق</button></div></section></main>;
}
export default function MockPaymentPage() { return <Suspense><MockPayment /></Suspense>; }
