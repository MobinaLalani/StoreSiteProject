"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

const menu = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "کتگوری محصولات",
    href: "/admin/Categories",
    icon: Package,
  },
  {
    title: "محصولات",
    href: "/admin/Products",
    icon: FolderTree,
  },
  {
    title: "سفارش ها",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "کاربران",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "تنظیمات",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-l border-gray-200 bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">Store Admin</h1>
      </div>

      <nav className="space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition

              ${
                active
                  ? "bg-red-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }
              `}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
