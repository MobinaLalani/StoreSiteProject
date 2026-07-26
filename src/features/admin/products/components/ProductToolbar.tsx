"use client";

import { Plus } from "lucide-react";

import SearchInput from "@/src/features/admin/shared/components/SearchInput";

interface ProductToolbarProps {
  search: string;

  onSearchChange: (value: string) => void;

  onAddProduct: () => void;
}

export default function ProductToolbar({
  search,

  onSearchChange,

  onAddProduct,
}: ProductToolbarProps) {
  return (
    <div
      className="
        mb-6
        flex
        flex-col
        gap-4
        rounded-2xl
        bg-white
        p-5
        shadow-sm
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="جستجوی محصول..."
      />

      <button
        onClick={onAddProduct}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          py-3
          text-white
          transition
          hover:bg-blue-700
        "
      >
        <Plus size={18} />
        افزودن محصول
      </button>
    </div>
  );
}
