"use client";

import { X } from "lucide-react";

import { Product } from "@/src/types/product";

import ProductForm from "./ProductForm";

interface ProductModalProps {
  open: boolean;

  loading?: boolean;

  product?: Product | null;

  title: string;

  onClose: () => void;

  onSubmit: (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
}

export default function ProductModal({
  open,

  loading = false,

  product,

  title,

  onClose,

  onSubmit,
}: ProductModalProps) {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      p-4
    "
    >
      <div
        className="
        w-full
        max-w-3xl
        max-h-[90vh]
        overflow-y-auto
        rounded-2xl
        bg-white
        shadow-xl
      "
      >
        <div
          className="
          flex
          items-center
          justify-between
          border-b
          px-6
          py-5
        "
        >
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              transition
              hover:bg-gray-100
            "
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <ProductForm
            loading={loading}
            initialValues={product}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
