"use client";

import { motion } from "framer-motion";
import { ShoppingCart, User } from "lucide-react";
import Container from "../ui/Container";
import ProductSearch from "./ProductSearch";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";

export default function Header() {
  const { data } = usePublicSettings();
  return (
    <motion.header initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-40 border-b bg-white">
      <Container>
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 py-3 md:flex-nowrap md:py-0">
          <h1 className="max-w-[55vw] truncate text-xl font-black text-red-500 sm:text-2xl md:max-w-none md:text-3xl">{data?.store.name || "اتصال گستر"}</h1>
          <ProductSearch />
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100 sm:h-11 sm:w-11" aria-label="سبد خرید"><ShoppingCart /></motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100 sm:h-11 sm:w-11" aria-label="حساب کاربری"><User /></motion.button>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
