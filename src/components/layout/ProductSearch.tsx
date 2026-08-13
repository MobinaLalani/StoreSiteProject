"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, LoaderCircle, Search, X } from "lucide-react";
import { attachCategoryTitles, searchProducts, type SearchableProduct } from "@/src/lib/product-search";
import type { Category } from "@/src/types/category";
import type { Product } from "@/src/types/product";

export default function ProductSearch() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchableProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([fetch("/api/products").then((response) => response.json() as Promise<Product[]>), fetch("/api/categories").then((response) => response.json() as Promise<Category[]>)])
      .then(([allProducts, categories]) => { if (!cancelled) setProducts(attachCategoryTitles(allProducts.filter((product) => product.status === "active"), categories)); })
      .catch(() => { if (!cancelled) setProducts([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const close = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setFocused(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  const results = useMemo(() => searchProducts(products, query).slice(0, 6), [products, query]);
  const submit = (event: FormEvent) => { event.preventDefault(); const value = query.trim(); if (!value) return; setFocused(false); router.push(`/products?q=${encodeURIComponent(value)}`); };

  return (
    <div ref={rootRef} className="relative order-3 w-full md:order-none md:max-w-xl">
      <form role="search" onSubmit={submit} className="flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 shadow-inner transition focus-within:border-red-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-100 sm:px-4">
        <Search size={20} className="shrink-0 text-slate-400" /><label htmlFor="product-search" className="sr-only">جستجوی محصولات</label>
        <input id="product-search" value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setFocused(true)} autoComplete="off" enterKeyHint="search" placeholder="نام، دسته‌بندی یا مشخصات محصول..." className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none sm:text-base" />
        {query && <button type="button" onClick={() => setQuery("")} aria-label="پاک کردن جستجو" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={17} /></button>}
        <button type="submit" className="mr-1 hidden h-9 shrink-0 items-center rounded-xl bg-red-500 px-3 text-xs font-bold text-white hover:bg-red-600 sm:flex">جستجو</button>
      </form>
      {focused && query.trim() && <div className="absolute inset-x-0 top-[calc(100%+.5rem)] z-[80] max-h-[min(28rem,60dvh)] overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
        {loading ? <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500"><LoaderCircle className="animate-spin" size={19} />در حال جستجو...</div> : results.length ? <>
          <p className="px-3 pb-2 pt-1 text-xs font-medium text-slate-400">پیشنهادهای مرتبط</p>
          {results.map((product) => <Link key={product.id} href={`/products/${encodeURIComponent(product.slug)}`} onClick={() => setFocused(false)} className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-red-50 focus:bg-red-50 focus:outline-none"><span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border bg-white"><Image src={product.thumbnail} alt="" fill sizes="48px" className="object-cover" /></span><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{product.title}</strong><span className="block truncate text-xs text-slate-400">{product.categoryTitle || product.shortDescription}</span></span><ArrowLeft size={17} className="text-slate-300" /></Link>)}
          <button type="button" onClick={() => { setFocused(false); router.push(`/products?q=${encodeURIComponent(query.trim())}`); }} className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-bold text-red-500 hover:bg-red-50">مشاهده همه نتایج <ArrowLeft size={17} /></button>
        </> : <div className="px-4 py-8 text-center"><Search className="mx-auto mb-2 text-slate-300" size={28} /><p className="text-sm font-bold">محصولی پیدا نشد</p><p className="mt-1 text-xs text-slate-400">نام، برند یا مشخصات دیگری را امتحان کنید.</p></div>}
      </div>}
    </div>
  );
}
