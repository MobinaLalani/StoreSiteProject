"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import DataTable, {
  Column,
} from "@/src/features/admin/shared/components/DataTable";

import { Product } from "@/src/types/product";

interface ProductTableProps {
  products: Product[];

  loading?: boolean;

  onEdit: (product: Product) => void;

  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,

  loading,

  onEdit,

  onDelete,
}: ProductTableProps) {
  const columns: Column<Product>[] = [
    {
      key: "thumbnail",

      title: "تصویر",

      width: "110px",

      render: (product) => (
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={60}
          height={60}
          className="
            rounded-xl
            border
            object-cover
          "
        />
      ),
    },

    {
      key: "title",

      title: "عنوان",

      render: (product) => (
        <div>
          <p className="font-semibold text-gray-900">{product.title}</p>

          <span
            className="
            rounded-lg
            bg-gray-100
            px-2
            py-1
            text-xs
            text-gray-500
          "
          >
            {product.sku}
          </span>
        </div>
      ),
    },

    {
      key: "brand",

      title: "برند",

      render: (product) => (
        <span className="text-gray-700">{product.brand}</span>
      ),
    },

    {
      key: "price",

      title: "قیمت",

      render: (product) => (
        <div className="flex flex-col">
          <span
            className="
            font-semibold
            text-gray-900
          "
          >
            {product.price.toLocaleString()}
            تومان
          </span>

          {product.oldPrice && (
            <span
              className="
                text-xs
                text-gray-400
                line-through
              "
            >
              {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      ),
    },

    {
      key: "stock",

      title: "موجودی",

      render: (product) => (
        <span
          className={`
            rounded-lg
            px-3
            py-1
            text-xs
            font-medium

            ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {product.stock > 0 ? `${product.stock} عدد` : "ناموجود"}
        </span>
      ),
    },

    {
      key: "status",

      title: "وضعیت",

      render: (product) => (
        <span
          className={`
            rounded-lg
            px-3
            py-1
            text-xs
            font-medium

            ${
              product.status === "active"
                ? "bg-green-100 text-green-700"
                : product.status === "draft"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
            }
          `}
        >
          {product.status === "active"
            ? "فعال"
            : product.status === "draft"
              ? "پیش‌نویس"
              : "آرشیو"}
        </span>
      ),
    },

    {
      key: "isFeatured",

      title: "ویژه",

      render: (product) =>
        product.isFeatured ? (
          <span
            className="
          rounded-lg
          bg-blue-100
          px-3
          py-1
          text-xs
          text-blue-700
        "
          >
            ویژه
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },

    {
      key: "actions",

      title: "عملیات",

      width: "140px",

      render: (product) => (
        <div
          className="
          flex
          justify-center
          gap-2
        "
        >
          <button
            onClick={() => onEdit(product)}
            className="
              rounded-lg
              bg-blue-50
              p-2
              text-blue-600
              transition
              hover:bg-blue-100
            "
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(product)}
            className="
              rounded-lg
              bg-red-50
              p-2
              text-red-600
              transition
              hover:bg-red-100
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable<Product>
      columns={columns}
      data={products}
      loading={loading}
      emptyMessage="هیچ محصولی وجود ندارد."
    />
  );
}
