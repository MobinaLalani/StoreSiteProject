"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  House,
  Boxes,
  UserRound,
  LogOut,
  X,
} from "lucide-react";

import Container from "../ui/Container";

import { useCategoriesWithProducts } from "@/src/features/admin/categories/hooks/useCategoriesWithProducts";
import { Product } from "@/src/types/product";
import { Category } from "@/src/types/category";
import { useCustomer, useCustomerActions } from "@/src/features/customer/useCustomer";

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
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: customer } = useCustomer();
  const { logout } = useCustomerActions();

  const { data: categories = [], isLoading, isError } = useCategoriesWithProducts();

  const [activeId, setActiveId] = useState<number | null>(null);

  const active =
    categories.find((item:Category) => item.id === activeId) ?? categories[0];

  const categoryHref = (slug: string) =>
    `/products/category/${encodeURIComponent(slug.replace(/^\/+|\/+$/g, ""))}`;

  const mobileItemClass = (href: string) => {
    const isActive = href === "/" ? pathname === "/" || pathname === "/home" : pathname.startsWith(href);

    return `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition ${
      isActive ? "text-red-500" : "text-slate-500"
    }`;
  };

  async function handleLogout() {
    await logout();
    setMobileOpen(false);
    router.replace("/home");
    router.refresh();
  }

  return (
    <>
    <nav className="relative z-50 hidden overflow-visible border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-xl lg:block">
      <Container>
        <div className="flex h-14 items-center gap-10">
          {/* Category Button */}
          <div
            className="relative after:absolute after:inset-x-0 after:top-full after:h-2 after:content-['']"
            onMouseLeave={() => setDesktopOpen(false)}
          >
            <button type="button" aria-expanded={desktopOpen} aria-haspopup="menu" onClick={() => setDesktopOpen((value) => !value)} className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-100">
              <Menu size={18} />
              دسته بندی ها
              <ChevronDown
                size={18}
                className={`transition ${desktopOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {desktopOpen && (
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
                  className="absolute right-0 top-[calc(100%+.5rem)] z-[100] flex h-[420px] w-[min(720px,calc(100vw-4rem))] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
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
                            onClick={() => setDesktopOpen(false)}
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
                    {active && <Link href={categoryHref(active.slug)} onClick={() => setDesktopOpen(false)} className="mb-6 inline-block text-xl font-bold hover:text-red-600">{active.title}</Link>}

                    <div className="grid grid-cols-2 gap-4">
                      {active?.products?.map((product:Product) => (
                        <motion.div
                          key={product.id}
                          whileHover={{
                            x: -5,
                          }}
                          className="cursor-pointer rounded-xl bg-gray-50 p-4 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Link href={`/products/${encodeURIComponent(product.slug)}`} onClick={() => setDesktopOpen(false)} className="block">{product.title}</Link>
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

          {customer && <button type="button" onClick={handleLogout} className="mr-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"><LogOut size={17} />خروج</button>}
        </div>
      </Container>
    </nav>

    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.button
            type="button"
            aria-label="بستن دسته‌بندی‌ها"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[55] bg-black/35 backdrop-blur-[2px] lg:hidden"
          />
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="دسته‌بندی محصولات"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-x-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-[60] max-h-[65dvh] overflow-y-auto rounded-t-3xl bg-white px-4 pb-5 pt-3 shadow-2xl lg:hidden"
          >
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-200" />
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black">دسته‌بندی‌ها</h2>
                <p className="text-xs text-slate-400">دسته موردنظر را انتخاب کنید</p>
              </div>
              <button type="button" aria-label="بستن" onClick={() => setMobileOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100">
                <X size={19} />
              </button>
            </div>
            {isLoading ? (
              <div className="py-10 text-center text-sm text-slate-500">در حال دریافت دسته‌بندی‌ها...</div>
            ) : isError ? (
              <div className="rounded-2xl bg-red-50 px-4 py-8 text-center text-sm text-red-600">دریافت دسته‌بندی‌ها ناموفق بود. دوباره تلاش کنید.</div>
            ) : categories.length === 0 ? (
              <div className="py-10 text-center text-sm text-slate-500">هنوز دسته‌بندی‌ای ثبت نشده است.</div>
            ) : (
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category: Category) => {
                const Icon = categoryIcons[category.slug.replace(/^\/+/, "") as keyof typeof categoryIcons] ?? Menu;
                return (
                  <Link key={category.id} href={categoryHref(category.slug)} onClick={() => setMobileOpen(false)} className="flex min-h-14 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-3 text-sm font-semibold active:scale-[.98]">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-red-500"><Icon size={18} /></span>
                    <span className="truncate">{category.title}</span>
                  </Link>
                );
              })}
            </div>
            )}
          </motion.section>
        </>
      )}
    </AnimatePresence>

    <nav aria-label="ناوبری موبایل" className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/70 bg-white/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_40px_rgba(15,23,42,.13)] backdrop-blur-2xl lg:hidden">
      <div className="mx-auto flex h-[4.25rem] max-w-md items-stretch px-2">
        <Link href="/" className={mobileItemClass("/")}><House size={21} /><span>خانه</span></Link>
        <Link href="/products" className={mobileItemClass("/products")}><ShoppingBag size={21} /><span>محصولات</span></Link>
        <button type="button" aria-expanded={mobileOpen} aria-haspopup="dialog" onClick={() => setMobileOpen((value) => !value)} className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition ${mobileOpen ? "text-red-500" : "text-slate-500"}`}>
          <span className={`grid h-10 w-10 place-items-center rounded-2xl transition ${mobileOpen ? "bg-red-500 text-white" : "bg-red-50 text-red-500"}`}><Boxes size={21} /></span>
          <span>دسته‌بندی</span>
        </button>
        <Link href="/admin" className={mobileItemClass("/admin")}><UserRound size={21} /><span>مدیریت</span></Link>
        {customer && <button type="button" onClick={handleLogout} className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium text-red-600 transition"><LogOut size={21} /><span>خروج</span></button>}
      </div>
    </nav>
    </>
  );
}
