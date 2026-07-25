"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold">داشبورد</h2>

        <p className="text-sm text-gray-500">خوش آمدید</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Search className="absolute right-3 top-3 text-gray-400" size={18} />

          <input
            placeholder="جستجو..."
            className="rounded-xl border py-2 pr-10 pl-4 outline-none focus:border-red-500"
          />
        </div>

        <button className="rounded-full bg-gray-100 p-3 hover:bg-gray-200">
          <Bell size={20} />
        </button>

        <button className="flex items-center gap-2">
          <UserCircle2 size={40} />

          <div className="text-right">
            <p className="font-semibold">Mobina</p>

            <span className="text-xs text-gray-500">Administrator</span>
          </div>
        </button>
      </div>
    </header>
  );
}
