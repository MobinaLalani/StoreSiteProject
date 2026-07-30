"use client";

import { Star } from "lucide-react";

import { Product } from "../../../../types/product";

interface Props {
  product: Product;
}

export default function ProductRating({ product }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className={
              index < Math.floor(product.rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>

      <span className="text-sm text-green-600">
        {product.stock > 0 ? "موجود" : "ناموجود"}
      </span>
    </div>
  );
}
