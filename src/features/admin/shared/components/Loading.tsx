"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  title?: string;
  description?: string;
}

export default function Loading({
  title = "در حال بارگذاری...",
  description = "لطفا چند لحظه صبر کنید",
}: LoadingProps) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white">
      <Loader2 className="h-10 w-10 animate-spin text-red-500" />

      <h3 className="mt-6 text-lg font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}
