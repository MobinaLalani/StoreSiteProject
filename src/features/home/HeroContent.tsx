"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="max-w-2xl">
      {/* Badge */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2"
      >
        <Sparkles className="h-4 w-4 text-red-500" />

        <span className="text-sm font-medium text-red-600">
          جدیدترین محصولات ۲۰۲۶
        </span>
      </motion.div>

      {/* Title */}

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.6,
        }}
        className="mt-8 text-5xl font-black leading-tight text-slate-900 md:text-6xl"
      >
        خرید آنلاین
        <br />
        <span className="text-red-500">سریع، مطمئن و هوشمند</span>
      </motion.h1>

      {/* Description */}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
        }}
        className="mt-8 max-w-xl text-lg leading-9 text-slate-500"
      >
        جدیدترین کالاهای دیجیتال، لوازم جانبی، پوشاک و هزاران محصول دیگر را با
        بهترین قیمت، ارسال سریع و ضمانت اصالت کالا خریداری کنید.
      </motion.p>

      {/* Buttons */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.7,
        }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <Link href="/products">
          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="rounded-2xl bg-red-500 px-7 py-4 font-semibold text-white shadow-lg shadow-red-200 transition-colors hover:bg-red-600"
          >
            مشاهده محصولات
          </motion.button>
        </Link>

        <Link href="/categories">
          <motion.button
            whileHover={{
              x: -4,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="flex items-center gap-2 rounded-2xl border bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-red-500"
          >
            دسته‌بندی‌ها
            <ArrowLeft size={18} />
          </motion.button>
        </Link>
      </motion.div>

      {/* Statistics */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.9,
        }}
        className="mt-14 flex flex-wrap gap-10"
      >
        <div>
          <h3 className="text-3xl font-black text-slate-900">+15K</h3>

          <p className="mt-2 text-slate-500">محصول متنوع</p>
        </div>

        <div>
          <h3 className="text-3xl font-black text-slate-900">+8K</h3>

          <p className="mt-2 text-slate-500">مشتری فعال</p>
        </div>

        <div>
          <h3 className="text-3xl font-black text-slate-900">+99%</h3>

          <p className="mt-2 text-slate-500">رضایت کاربران</p>
        </div>
      </motion.div>
    </div>
  );
}
