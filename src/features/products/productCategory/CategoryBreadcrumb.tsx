"use client";

import Link from "next/link";
import { ChevronLeft, House } from "lucide-react";

interface CategoryBreadcrumbProps {
  title: string;
}

export default function CategoryBreadcrumb({ title }: CategoryBreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className="mb-8 flex items-center gap-2 text-sm text-gray-500"
    >
      <Link
        href="/"
        className="flex items-center gap-2 transition-colors hover:text-red-500"
      >
        <House size={16} />
        <span>خانه</span>
      </Link>

      <ChevronLeft size={16} className="text-gray-400" />

      <Link href="/products" className="transition-colors hover:text-red-500">
        محصولات
      </Link>

      <ChevronLeft size={16} className="text-gray-400" />

      <span className="font-medium text-gray-900">{title}</span>
    </nav>
  );
}
