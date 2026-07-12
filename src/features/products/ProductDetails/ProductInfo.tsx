"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2, Truck, ShieldCheck } from "lucide-react";

import { Product } from "@/src/types/product";

import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-col space-y-8">
      {/* Brand */}

      <span className="text-sm font-semibold text-red-500">
        {product.brand}
      </span>

      {/* Title */}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-black leading-tight text-gray-900"
      >
        {product.title}
      </motion.h1>

      {/* Short Description */}

      <p className="leading-8 text-gray-500">{product.shortDescription}</p>

      {/* Rating */}

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Star size={20} className="fill-yellow-400 text-yellow-400" />

          <span className="font-bold">{product.rating}</span>

          <span className="text-gray-400">({product.reviewCount} نظر)</span>
        </div>

        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle2 size={18} />

          <span>{product.stock > 0 ? "موجود در انبار" : "ناموجود"}</span>
        </div>
      </div>

      {/* SKU */}

      <div className="text-sm text-gray-500">
        کد کالا :
        <span className="mr-2 font-semibold text-gray-800">{product.sku}</span>
      </div>

      {/* Colors */}

      <div>
        <h3 className="mb-4 font-bold">رنگ‌بندی</h3>

        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <span
              key={color}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm"
            >
              {color}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}

      <div>
        <h3 className="mb-4 font-bold">ویژگی‌ها</h3>

        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Price */}

      <ProductPrice product={product} />

      {/* Actions */}

      <ProductActions />

      {/* Services */}

      <div className="grid gap-4 rounded-3xl border border-gray-200 p-5 md:grid-cols-2">
        <div className="flex items-center gap-3">
          <Truck size={22} className="text-red-500" />

          <div>
            <p className="font-semibold">ارسال سریع</p>

            <span className="text-sm text-gray-500">
              تحویل در سریع‌ترین زمان
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck size={22} className="text-green-500" />

          <div>
            <p className="font-semibold">ضمانت اصالت کالا</p>

            <span className="text-sm text-gray-500">تضمین اصل بودن محصول</span>
          </div>
        </div>
      </div>
    </div>
  );
}
