"use client";

import Image from "next/image";
import { Pencil, Trash2, PackageOpen, Star } from "lucide-react";

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

  if (loading) return <div className="rounded-2xl bg-white py-16 text-center text-sm text-slate-500">در حال دریافت محصولات...</div>;
  if (!products.length) return <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center"><PackageOpen className="mx-auto text-slate-300" size={38}/><p className="mt-3 font-bold text-slate-700">هیچ محصولی وجود ندارد</p></div>;

  return (
    <><div className="grid gap-3 md:hidden">{products.map((product) => <article key={product.id} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"><div className="flex gap-3"><div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50"><Image src={product.thumbnail} alt={product.title} fill sizes="80px" className="object-contain p-1"/></div><div className="min-w-0 flex-1"><h3 className="line-clamp-2 font-black leading-6 text-slate-900">{product.title}</h3><p className="mt-1 truncate text-xs text-slate-400" dir="ltr">/{product.slug.replace(/^\/+/, "")}</p><div className="mt-2 flex flex-wrap gap-1.5"><span className={`rounded-lg px-2 py-1 text-[10px] font-bold ${product.stock > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>{product.stock > 0 ? `${product.stock.toLocaleString("fa-IR")} موجود` : "ناموجود"}</span>{product.isFeatured && <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700"><Star size={11}/>ویژه</span>}</div></div></div><div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3"><button onClick={() => onEdit(product)} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-100 text-sm font-bold text-slate-700"><Pencil size={16}/>ویرایش</button><button onClick={() => onDelete(product)} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-50 text-sm font-bold text-red-600"><Trash2 size={16}/>حذف</button></div></article>)}</div><div className="hidden md:block"><DataTable<Product>
      columns={columns}
      data={products}
      loading={loading}
      emptyMessage="هیچ محصولی وجود ندارد."
    /></div></>
  );
}
