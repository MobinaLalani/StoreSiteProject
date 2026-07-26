"use client";

import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SearchInput({
  value,
  placeholder = "جستجو...",
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          pr-11
          pl-10
          text-sm
          outline-none
          transition
          focus:border-red-500
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
