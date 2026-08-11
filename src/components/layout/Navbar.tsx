"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  ShoppingBag,
  Menu,
} from "lucide-react";

import Container from "../ui/Container";

import { useCategoriesWithProducts } from "@/src/features/admin/categories/hooks/useCategoriesWithProducts";
import { Product } from "@/src/types/product";
import { Category } from "@/src/types/category";

const categoryIcons = {
  mobile: Smartphone,
  laptop: Laptop,
  headphone: Headphones,
  watch: Watch,
  camera: Camera,
  gaming: Gamepad2,
  bag: ShoppingBag,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { data: categories = [], isLoading } = useCategoriesWithProducts();

  const [activeId, setActiveId] = useState<number | null>(null);

  const active =
    categories.find((item:Category) => item.id === activeId) ?? categories[0];

  const categoryHref = (slug: string) =>
    `/products/category/${encodeURIComponent(slug.replace(/^\/+|\/+$/g, ""))}`;

  return (
    <nav className="relative border-b bg-white">
      <Container>
        <div className="flex h-14 items-center gap-10">
          {/* Category Button */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-100">
              <Menu size={18} />
              دسته بندی ها
              <ChevronDown
                size={18}
                className={`transition ${open ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="absolute right-0 top-14 z-50 flex h-[420px] w-[720px] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
                >
                  {/* Left */}
                  <div className="w-64 border-l bg-gray-50">
                    {isLoading ? (
                      <div className="p-5">در حال دریافت...</div>
                    ) : (
                      categories.map((category: Category) => {
                        const Icon =
                          categoryIcons[
                            category.slug as keyof typeof categoryIcons
                          ] ?? Menu;

                        return (
                          <Link
                            key={category.id}
                            href={categoryHref(category.slug)}
                            onMouseEnter={() => setActiveId(category.id)}
                            onClick={() => setOpen(false)}
                            className={`flex w-full items-center gap-3 px-5 py-4 text-right transition ${
                              active?.id === category.id
                                ? "bg-white font-bold text-red-600"
                                : "hover:bg-white"
                            }`}
                          >
                            <Icon size={20} />

                            {category.title}
                          </Link>
                        );
                      })
                    )}
                  </div>

                  {/* Right */}
                  <motion.div
                    key={active?.id}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="flex-1 p-8"
                  >
                    {active && <Link href={categoryHref(active.slug)} onClick={() => setOpen(false)} className="mb-6 inline-block text-xl font-bold hover:text-red-600">{active.title}</Link>}

                    <div className="grid grid-cols-2 gap-4">
                      {active?.products?.map((product:Product) => (
                        <motion.div
                          key={product.id}
                          whileHover={{
                            x: -5,
                          }}
                          className="cursor-pointer rounded-xl bg-gray-50 p-4 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Link href={`/products/${encodeURIComponent(product.slug)}`} onClick={() => setOpen(false)} className="block">{product.title}</Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Normal Links */}
          <ul className="flex items-center gap-8">
            {categories.slice(0, 7).map((category: Category) => (
              <motion.li
                key={category.id}
                whileHover={{
                  y: -3,
                  color: "#ef4444",
                }}
                transition={{
                  duration: 0.5,
                }}
                className="cursor-pointer text-sm font-medium"
              >
                <Link href={categoryHref(category.slug)}>{category.title}</Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
}
