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
        <Star size={18} className="fill-yellow-400 text-yellow-400" />

        <span className="font-semibold">{product.rating}</span>
      </div>

      <span className="text-sm text-green-600">
        {product.stock > 0 ? "موجود" : "ناموجود"}
      </span>
    </div>
  );
}
