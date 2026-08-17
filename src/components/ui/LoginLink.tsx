"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogIn } from "lucide-react";

export default function LoginLink() {
  const pathname = usePathname();

  return (
    <Link
      href={`/login?next=${encodeURIComponent(pathname)}`}
      className="
        inline-flex
        h-10
        items-center
        gap-1.5
        rounded-xl
        px-2.5
        text-xs
        font-bold
        text-slate-700
        hover:bg-slate-100
        sm:h-11
        sm:px-4
        sm:text-sm
      "
    >
      <LogIn size={17} />
      ورود
    </Link>
  );
}
