"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";

interface ProductEmptyProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export default function ProductEmpty({
  title = "محصولی یافت نشد",
  description = "در حال حاضر محصولی برای نمایش وجود ندارد. لطفاً بعداً دوباره بررسی کنید.",
  buttonText = "مشاهده همه محصولات",
  href = "/products",
}: ProductEmptyProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-20 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
        <PackageSearch size={40} className="text-slate-400" />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-800">{title}</h3>

      <p className="mt-3 max-w-md leading-7 text-slate-500">{description}</p>

      <Link
        href={href}
        className="mt-8 rounded-2xl bg-red-500 px-6 py-3 font-medium text-white transition-colors hover:bg-red-600"
      >
        {buttonText}
      </Link>
    </motion.div>
  );
}
