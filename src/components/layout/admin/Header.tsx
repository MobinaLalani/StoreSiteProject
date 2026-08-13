"use client";

import Link from "next/link";
import { ExternalLink, UserCircle2 } from "lucide-react";

export default function Header() {
  return (
    <header className="flex min-h-16 items-center justify-between gap-3 border-b bg-white px-3 py-2 sm:px-5 md:h-20 md:px-8">
      <div>
        <h2 className="text-lg font-black sm:text-xl md:text-2xl">مدیریت فروشگاه</h2>

        <p className="hidden text-sm text-gray-500 sm:block">مدیریت اطلاعات فروشگاه</p>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center gap-2 rounded-xl bg-red-500 px-3 font-semibold text-white transition hover:bg-red-600 md:px-4"
        >
          <ExternalLink size={18} />
          <span className="hidden sm:inline">بازگشت به فروشگاه</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <UserCircle2 size={40} />

          <div className="text-right">
            <p className="font-semibold">Mobina</p>

            <span className="text-xs text-gray-500">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
