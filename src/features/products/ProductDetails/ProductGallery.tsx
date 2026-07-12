"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Product } from "@/src/types/product";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <motion.div
        layout
        className="flex h-[520px] items-center justify-center rounded-3xl border border-gray-200 bg-white p-8"
      >
        <Image
          src={selectedImage}
          alt={product.title}
          width={450}
          height={450}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-2xl border transition ${
              selectedImage === image ? "border-red-500" : "border-gray-200"
            }`}
          >
            <Image
              src={image}
              alt={`${product.title}-${index}`}
              width={90}
              height={90}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
