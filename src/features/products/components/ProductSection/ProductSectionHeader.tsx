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
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      {/* Left */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-black text-slate-900 lg:text-4xl">
          {title}
        </h2>

        {description && (
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
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
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition-all hover:border-red-500 hover:text-red-500"
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
