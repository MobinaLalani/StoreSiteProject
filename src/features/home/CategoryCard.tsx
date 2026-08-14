"use client";

import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/src/types/category";

export default function CategoryCard({ category }: { category: Category }) {
  const slug = category.slug.replace(/^\/+|\/+$/g, "");

  return (
    <Link
      href={`/products/category/${encodeURIComponent(slug)}`}
      aria-label={`مشاهده محصولات دسته ${category.title}`}
      className="group flex w-[4.75rem] shrink-0 flex-col items-center gap-2.5 text-center outline-none min-[390px]:w-[5.25rem] sm:w-[6.25rem] lg:w-[7rem]"
    >
      <span className="relative block size-[4.5rem] overflow-hidden rounded-full border border-[#7B604A]/10 bg-[#f1ece7] shadow-[0_8px_24px_-16px_rgba(73,56,43,0.55)] transition duration-300 group-active:scale-95 group-hover:-translate-y-1 group-hover:border-[#7B604A]/30 group-hover:shadow-[0_14px_30px_-15px_rgba(73,56,43,0.55)] group-focus-visible:ring-2 group-focus-visible:ring-[#7B604A] group-focus-visible:ring-offset-3 min-[390px]:size-20 sm:size-24 lg:size-[6.5rem]">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 640px) 80px, 104px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </span>
      <span className="line-clamp-1 w-full text-[11px] font-black text-[#49382b] sm:text-xs lg:text-sm">
        {category.title}
      </span>
    </Link>
  );
}
