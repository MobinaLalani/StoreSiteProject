"use client";

import { motion } from "framer-motion";

import { Product } from "@/src/types/product";

interface ProductPriceProps {
  product: Product;
}

export default function ProductPrice({ product }: ProductPriceProps) {
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  return (
    <motion.div
      layout
      className="rounded-3xl border border-gray-200 bg-gray-50 p-6"
    >
      {hasDiscount && (
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
            %{product.discount}
          </span>

          <span className="text-lg text-gray-400 line-through">
            {product.oldPrice!.toLocaleString()} تومان
          </span>
        </div>
      )}

      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-gray-500">قیمت نهایی</p>

          <h2 className="mt-2 text-4xl font-black text-gray-900">
            {product.price.toLocaleString()}
          </h2>

          <span className="text-gray-500">تومان</span>
        </div>

        {hasDiscount && (
          <div className="text-left">
            <p className="text-sm text-gray-500">میزان تخفیف</p>

            <span className="text-lg font-bold text-green-600">
              {(product.oldPrice! - product.price).toLocaleString()} تومان
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
