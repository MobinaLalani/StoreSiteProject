"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import DataTable, {
  Column,
} from "@/src/features/admin/shared/components/DataTable";

import { Category } from "@/src/types/category";

interface CategoryTableProps {
  categories: Category[];
  loading?: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const columns: Column<Category>[] = [
    {
      key: "image",
      title: "تصویر",
      width: "110px",
      render: (category) => (
        <Image
          src={category.image}
          alt={category.title}
          width={60}
          height={60}
          className="rounded-xl border object-cover"
        />
      ),
    },

    {
      key: "title",
      title: "عنوان",
      render: (category) => (
        <span className="font-semibold text-gray-900">{category.title}</span>
      ),
    },

    {
      key: "slug",
      title: "Slug",
      render: (category) => (
        <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium">
          {category.slug}
        </span>
      ),
    },

    {
      key: "description",
      title: "توضیحات",
      render: (category) => (
        <p className="max-w-sm truncate text-gray-500">
          {category.description}
        </p>
      ),
    },

    {
      key: "actions",
      title: "عملیات",
      width: "140px",
      render: (category) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(category)}
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
            onClick={() => onDelete(category)}
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
    <DataTable<Category>
      columns={columns}
      data={categories}
      loading={loading}
      emptyMessage="هیچ دسته‌بندی‌ای وجود ندارد."
    />
  );
}
