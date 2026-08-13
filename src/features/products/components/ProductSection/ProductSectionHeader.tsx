"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface ProductSectionHeaderProps {
  title: string;
  description?: string;
  href?: string;
  buttonText?: string;
}

export default function ProductSectionHeader({
  title,
  description,
  href = "/products",
  buttonText = "مشاهده همه",
}: ProductSectionHeaderProps) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4 sm:mb-10">
      {/* Left */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-black text-red-500 sm:text-sm">پیشنهادهای تازه</span><h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500 sm:text-base sm:leading-7">
            {description}
          </p>
        )}
      </motion.div>

      {/* Right */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href={href}
          className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition-all hover:border-red-500 hover:text-red-500 sm:gap-2 sm:px-5 sm:text-sm"
        >
          {buttonText}

          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
        </Link>
      </motion.div>
    </div>
  );
}
