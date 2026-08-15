"use client";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/src/types/product";
import { useCart } from "./CartProvider";
import { effectivePrice } from "@/src/lib/money";
export default function AddToCartButton({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add } = useCart(); const disabled = product.stock <= 0 || effectivePrice(product) <= 0;
  return <button type="button" disabled={disabled} onClick={() => add(product)} className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300 ${compact ? "min-h-12 px-4" : "min-h-14 px-6"}`}><ShoppingCart size={19} />{disabled ? (product.stock <= 0 ? "ناموجود" : "قیمت ثبت نشده") : "افزودن به سبد خرید"}</button>;
}
