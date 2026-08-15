"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import type { Product } from "@/src/types/product";
import { useCart } from "./CartProvider";
import { effectivePrice } from "@/src/lib/money";
export default function AddToCartButton({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { items, add, setQuantity, remove } = useCart();
  const [added, setAdded] = useState(false);
  const disabled = product.stock <= 0 || effectivePrice(product) <= 0;
  const cartItem = items.find((item) => item.productId === product.id);

  useEffect(() => {
    if (!added) return;
    const timeout = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [added]);

  function handleAdd() {
    add(product);
    setAdded(true);
  }

  function decrease() {
    if (!cartItem) return;
    if (cartItem.quantity === 1) remove(product.id);
    else setQuantity(product.id, cartItem.quantity - 1);
  }

  return <>
    {cartItem ? <motion.div layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className={`flex w-full items-center justify-between gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-1.5 text-emerald-800 ${compact ? "min-h-12" : "min-h-14"}`}>
      <button type="button" onClick={decrease} aria-label={cartItem.quantity === 1 ? "حذف از سبد خرید" : "کاهش تعداد"} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-red-600 shadow-sm transition hover:bg-red-50 active:scale-95">
        {cartItem.quantity === 1 ? <Trash2 size={18}/> : <Minus size={19}/>} 
      </button>
      <div className="min-w-0 text-center"><strong className="block text-lg leading-5">{cartItem.quantity.toLocaleString("fa-IR")}</strong><span className="text-[10px] font-bold sm:text-xs">عدد در سبد</span></div>
      <button type="button" onClick={handleAdd} disabled={cartItem.quantity >= product.stock} aria-label="افزایش تعداد" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm transition hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300">
        <Plus size={20}/>
      </button>
    </motion.div> : <motion.button
      type="button"
      disabled={disabled}
      onClick={handleAdd}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      animate={added ? { scale: [1, 1.03, 1] } : { scale: 1 }}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl font-bold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 ${added ? "bg-emerald-600 hover:bg-emerald-600" : "bg-red-600 hover:bg-red-700"} ${compact ? "min-h-12 px-4" : "min-h-14 px-6"}`}
    >
      {added ? <Check size={20} strokeWidth={3} /> : <ShoppingCart size={19} />}
      {disabled ? (product.stock <= 0 ? "ناموجود" : "قیمت ثبت نشده") : added ? "به سبد اضافه شد" : "افزودن به سبد خرید"}
    </motion.button>}

    {typeof document !== "undefined" && createPortal(
      <AnimatePresence>
        {added && <motion.div role="status" aria-live="polite" initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} className="fixed bottom-24 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-2xl sm:bottom-8">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500"><Check size={20} strokeWidth={3}/></span>
          <span className="min-w-0 flex-1"><span className="block truncate">{product.title}</span><small className="font-normal text-slate-300">به سبد خرید اضافه شد.</small></span>
        </motion.div>}
      </AnimatePresence>,
      document.body,
    )}
  </>;
}
