"use client";

import { X } from "lucide-react";
import { Category } from "@/src/types/category";

import CategoryForm from "./CategoryForm";

interface CategoryModalProps {
  open: boolean;
  loading?: boolean;
  category?: Category | null;
  title: string;

  onClose: () => void;

  onSubmit: (data: Omit<Category, "id">) => Promise<void>;
}

export default function CategoryModal({
  open,
  loading = false,
  category,
  title,
  onClose,
  onSubmit,
}: CategoryModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <CategoryForm
            loading={loading}
            initialValues={category}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
