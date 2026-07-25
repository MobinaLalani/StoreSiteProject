"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";


interface Props {
  title: string;
  description: string;
  image: string ;
  productCount: number;
  brandCount: number;
  averageRating: number;
  slug: string;
}

export default function CategorySectionHero({
  title,
  description,
  image,
  productCount,
  brandCount,
  averageRating,
  slug,
}: Props) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-red-50 via-white to-red-50 border border-red-100">
      <div className="grid gap-10 lg:grid-cols-2 items-center p-10">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
            دسته بندی
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
            {title}
          </h1>

          <p className="mt-5 max-w-xl leading-8 text-gray-600">{description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm border">
              <p className="text-3xl font-bold">{productCount}</p>
              <span className="text-sm text-gray-500">محصول</span>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border">
              <p className="text-3xl font-bold">{brandCount}</p>
              <span className="text-sm text-gray-500">برند</span>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border">
              <p className="text-3xl font-bold">⭐ {averageRating}</p>
              <span className="text-sm text-gray-500">میانگین امتیاز</span>
            </div>
          </div>

          <Link
            href={`/products?category=${slug}`}
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-4 font-semibold text-white transition hover:bg-red-600"
          >
            مشاهده همه محصولات
            <ArrowLeft size={18} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-[420px]"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
