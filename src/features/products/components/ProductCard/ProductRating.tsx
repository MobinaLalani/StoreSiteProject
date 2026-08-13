import { Star } from "lucide-react";
import type { Product } from "@/src/types/product";

export default function ProductRating({ product }: { product: Product }) {
  if (product.rating <= 0) return <span className="text-xs text-slate-400">بدون امتیاز</span>;
  return <div className="inline-flex items-center gap-1.5" aria-label={`امتیاز ${product.rating} از ۵`}><span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-50"><Star size={15} className="fill-amber-400 text-amber-400" /></span><strong className="text-sm text-slate-700">{product.rating.toLocaleString("fa-IR", { maximumFractionDigits: 1 })}</strong>{product.reviewCount > 0 && <span className="text-[11px] text-slate-400">({product.reviewCount.toLocaleString("fa-IR")})</span>}</div>;
}
