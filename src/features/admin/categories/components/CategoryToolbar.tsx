"use client";

import { Plus, Search } from "lucide-react";

interface CategoryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onAddCategory: () => void;
}

export default function CategoryToolbar({
  search,
  onSearchChange,
  onAddCategory,
}: CategoryToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجوی دسته بندی..."
          className="w-full rounded-xl border border-gray-300 py-3 pr-11 pl-4 outline-none transition focus:border-blue-500"
        />
      </div>

      <button
        onClick={onAddCategory}
        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        افزودن دسته بندی
      </button>
    </div>
  );
}
