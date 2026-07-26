"use client";

import { Search, X } from "lucide-react";

import Input from "../ui/Input";

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
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        leftIcon={<Search size={18} />}
        className="pr-11 pl-10"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            rounded-md
            p-1
            text-gray-400
            transition
            hover:bg-gray-100
            hover:text-red-500
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
