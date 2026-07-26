"use client";

import { PackageSearch } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title = "داده‌ای پیدا نشد",
  description = "هنوز اطلاعاتی برای نمایش وجود ندارد.",
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-10 py-20 text-center">
      <PackageSearch className="mx-auto h-16 w-16 text-gray-400" />

      <h2 className="mt-6 text-xl font-bold text-gray-800">{title}</h2>

      <p className="mt-3 text-gray-500">{description}</p>

      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
