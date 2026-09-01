
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import Container from "../ui/Container";
import ProductSearch from "./ProductSearch";
import CustomerMenu from "@/src/features/customer/CustomerMenu";
import { useCart } from "@/src/features/cart/CartProvider";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";

export default function Header() {
  const { data } = usePublicSettings();
  const { count } = useCart();

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-40 border-b bg-white"
    >
      <Container>
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 py-3 md:flex-nowrap md:py-0">
          
          {/* Store Name */}
          <Link
            href="/home"
            className="max-w-[55vw] truncate text-xl font-black text-red-500 sm:text-2xl md:max-w-none md:text-3xl"
          >
            {data?.store.name || "فروشگاه"}
          </Link>

          {/* Search */}
          <ProductSearch />

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Cart */}
            <Link
              href="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100 sm:h-11 sm:w-11"
              aria-label="سبد خرید"
            >
              <ShoppingCart />

              {count > 0 && (
                <span className="absolute -left-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                  {count.toLocaleString("fa-IR")}
                </span>
              )}
            </Link>

            {/* Customer Menu */}
            <CustomerMenu />
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
;
