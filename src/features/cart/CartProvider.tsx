"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/src/types/product";
import { effectivePrice } from "@/src/lib/money";

export interface CartItem { productId: number; title: string; slug: string; thumbnail: string; unitPrice: number; stock: number; quantity: number; }
interface CartValue { items: CartItem[]; count: number; subtotal: number; add: (product: Product, quantity?: number) => void; setQuantity: (productId: number, quantity: number) => void; remove: (productId: number) => void; clear: () => void; }
const CartContext = createContext<CartValue | null>(null);
const storageKey = "store-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  /* localStorage is an external client-only store hydrated after mount. */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem(storageKey) || "[]")); } catch { setItems([]); } setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem(storageKey, JSON.stringify(items)); }, [items, ready]);
  const add = useCallback((product: Product, quantity = 1) => { if (product.stock <= 0 || effectivePrice(product) <= 0) return; setItems((current) => { const existing = current.find((item) => item.productId === product.id); return existing ? current.map((item) => item.productId === product.id ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock), stock: product.stock, unitPrice: effectivePrice(product) } : item) : [...current, { productId: product.id, title: product.title, slug: product.slug, thumbnail: product.thumbnail, unitPrice: effectivePrice(product), stock: product.stock, quantity: Math.min(quantity, product.stock) }]; }); }, []);
  const setQuantity = useCallback((productId: number, quantity: number) => { setItems((current) => current.map((item) => item.productId === productId ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item)); }, []);
  const remove = useCallback((productId: number) => { setItems((current) => current.filter((item) => item.productId !== productId)); }, []);
  const clear = useCallback(() => { setItems([]); }, []);
  const value = useMemo<CartValue>(() => ({
    items, count: items.reduce((sum, item) => sum + item.quantity, 0), subtotal: items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    add, setQuantity, remove, clear,
  }), [items, add, setQuantity, remove, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error("useCart must be used inside CartProvider"); return value; }
