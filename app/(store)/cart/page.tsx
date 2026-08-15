"use client";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/src/features/cart/CartProvider";
import { formatToman } from "@/src/lib/money";

export default function CartPage() {
  const { items, subtotal, setQuantity, remove } = useCart();
  return <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-10">
    <h1 className="mb-8 text-3xl font-black">سبد خرید</h1>
    {!items.length ? <div className="rounded-3xl border bg-white p-12 text-center"><ShoppingBag className="mx-auto mb-4 text-slate-300" size={52}/><p className="mb-6 text-slate-500">سبد خرید شما خالی است.</p><Link href="/products" className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white">مشاهده محصولات</Link></div> : <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <section className="space-y-3">{items.map((item) => <article key={item.productId} className="flex flex-col gap-4 rounded-2xl border bg-white p-4 sm:flex-row sm:items-center">
        <Image src={item.thumbnail} alt={item.title} width={96} height={96} className="h-24 w-24 rounded-xl bg-slate-50 object-contain" />
        <div className="min-w-0 flex-1"><Link href={`/products/${encodeURIComponent(item.slug)}`} className="font-black hover:text-red-600">{item.title}</Link><p className="mt-2 text-sm text-slate-500">{formatToman(item.unitPrice)}</p></div>
        <div className="flex items-center justify-between gap-3"><div className="flex items-center rounded-xl border"><button onClick={() => setQuantity(item.productId, item.quantity - 1)} className="p-2"><Minus size={17}/></button><span className="min-w-8 text-center">{item.quantity.toLocaleString("fa-IR")}</span><button onClick={() => setQuantity(item.productId, item.quantity + 1)} className="p-2"><Plus size={17}/></button></div><button onClick={() => remove(item.productId)} className="p-2 text-red-600" aria-label="حذف"><Trash2 size={19}/></button></div>
      </article>)}</section>
      <aside className="h-fit rounded-3xl border bg-white p-6"><h2 className="text-lg font-black">خلاصه سفارش</h2><div className="my-6 flex justify-between border-y py-4"><span>جمع کالاها</span><strong>{formatToman(subtotal)}</strong></div><p className="mb-5 text-xs leading-6 text-slate-500">هزینه ارسال در مرحله ثبت سفارش محاسبه می‌شود.</p><Link href="/checkout" className="flex min-h-12 items-center justify-center rounded-xl bg-red-600 font-bold text-white">ادامه و ثبت سفارش</Link></aside>
    </div>}
  </main>;
}
