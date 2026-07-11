"use client";

import { Product } from "../../../../types/product";

interface Props {
  product: Product;
}

export default function ProductPrice({ product }: Props) {
  return (
    <div>
      {product.oldPrice && (
        <p className="text-sm text-gray-400 line-through">
          {product.oldPrice.toLocaleString()} تومان
        </p>
      )}

      <h4 className="mt-1 text-2xl font-black text-gray-900">
        {product.price.toLocaleString()} تومان
      </h4>
    </div>
  );
}
