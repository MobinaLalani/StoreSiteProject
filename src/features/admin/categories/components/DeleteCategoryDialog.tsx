"use client";

import { AlertTriangle } from "lucide-react";

import { Category } from "@/src/types/category";

interface DeleteCategoryDialogProps {
  open: boolean;
  loading?: boolean;
  category: Category | null;

  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteCategoryDialog({
  open,
  loading = false,
  category,
  onClose,
  onConfirm,
}: DeleteCategoryDialogProps) {
  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <AlertTriangle size={34} className="text-red-600" />
          </div>
        </div>

        <h2 className="text-center text-xl font-bold">حذف دسته بندی</h2>

        <p className="mt-3 text-center text-gray-600">
          آیا از حذف
          <span className="mx-1 font-bold">{category.title}</span>
          مطمئن هستید؟
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 py-3 transition hover:bg-gray-100"
          >
            انصراف
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-3 text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
