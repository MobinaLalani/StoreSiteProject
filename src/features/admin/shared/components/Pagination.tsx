"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPages(currentPage, totalPages);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl border transition",
          currentPage === 1
            ? "cursor-not-allowed border-gray-200 text-gray-300"
            : "border-gray-300 hover:border-red-500 hover:text-red-500",
        )}
      >
        <ChevronRight size={18} />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "h-10 w-10 rounded-xl border text-sm font-medium transition",
              currentPage === page
                ? "border-red-500 bg-red-500 text-white"
                : "border-gray-300 bg-white hover:border-red-500 hover:text-red-500",
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl border transition",
          currentPage === totalPages
            ? "cursor-not-allowed border-gray-200 text-gray-300"
            : "border-gray-300 hover:border-red-500 hover:text-red-500",
        )}
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}

function getPages(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}
