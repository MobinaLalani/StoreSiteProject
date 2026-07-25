"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { Category } from "@/src/types/category";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-sm text-gray-600">
            <th className="px-6 py-4 text-right">تصویر</th>
            <th className="px-6 py-4 text-right">عنوان</th>
            <th className="px-6 py-4 text-right">Slug</th>
            <th className="px-6 py-4 text-right">توضیحات</th>
            <th className="px-6 py-4 text-center">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </td>

              <td className="px-6 py-4 font-semibold">{category.title}</td>

              <td className="px-6 py-4 text-gray-500">{category.slug}</td>

              <td className="px-6 py-4 text-gray-500">
                {category.description}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(category)}
                    className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(category)}
                    className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan={5} className="py-10 text-center text-gray-500">
                هیچ دسته‌بندی‌ای وجود ندارد.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
