"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Boxes,
  House,
  LogOut,
  Menu,
  ShoppingBag,
  UserRound,
  X,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
} from "lucide-react";
import { Customer } from "@/src/types/customer";
import { useRouter, usePathname } from "next/navigation";
import { PublicCustomer } from "@/src/types/customer";
import { Category } from "@/src/types/category";
import { useCustomerActions } from "@/src/features/customer/useCustomer";

const categoryIcons = {
  mobile: Smartphone,
  laptop: Laptop,
  headphone: Headphones,
  watch: Watch,
  camera: Camera,
  gaming: Gamepad2,
};

interface MobileNavbarProps {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  customer?: PublicCustomer | null;
}

export default function MobileNavbar({
  mobileOpen,
  setMobileOpen,
  categories,
  isLoading,
  isError,
  customer,
}: MobileNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { logout } = useCustomerActions();

  const categoryHref = (slug: string) =>
    `/products/category/${encodeURIComponent(slug.replace(/^\/+|\/+$/g, ""))}`;

  const mobileItemClass = (href: string) => {
    const isActive =
      href === "/"
        ? pathname === "/" || pathname === "/home"
        : pathname.startsWith(href);

    return `
      flex min-w-0 flex-1 flex-col items-center justify-center
      gap-1 py-2 text-[11px] font-medium transition
      ${isActive ? "text-red-500" : "text-slate-500"}
    `;
  };

  async function handleLogout() {
    await logout();

    setMobileOpen(false);

    router.replace("/home");

    router.refresh();
  }

  return (
    <>
      {/* Category Drawer */}

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
              className="
                fixed inset-0 z-[55]
                bg-black/35 backdrop-blur-[2px]
                lg:hidden
              "
            />

            <motion.section
              role="dialog"
              aria-modal="true"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 320,
              }}
              className="
                fixed inset-x-0
                bottom-[calc(4.25rem+env(safe-area-inset-bottom))]
                z-[60]
                max-h-[65dvh]
                overflow-y-auto
                rounded-t-3xl
                bg-white
                px-4 pb-5 pt-3
                shadow-2xl
                lg:hidden
              "
            >
              <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-200" />

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black">دسته‌بندی‌ها</h2>

                  <p className="text-xs text-slate-400">
                    دسته موردنظر را انتخاب کنید
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="
                    grid h-10 w-10
                    place-items-center
                    rounded-xl
                    bg-slate-100
                  "
                >
                  <X size={19} />
                </button>
              </div>

              {isLoading ? (
                <div className="py-10 text-center text-sm text-slate-500">
                  در حال دریافت دسته‌بندی‌ها...
                </div>
              ) : isError ? (
                <div
                  className="
                    rounded-2xl
                    bg-red-50
                    px-4 py-8
                    text-center
                    text-sm
                    text-red-600
                  "
                >
                  دریافت دسته‌بندی‌ها ناموفق بود.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => {
                    const Icon =
                      categoryIcons[
                        category.slug as keyof typeof categoryIcons
                      ] ?? Menu;

                    return (
                      <Link
                        key={category.id}
                        href={categoryHref(category.slug)}
                        onClick={() => setMobileOpen(false)}
                        className="
                              flex min-h-14
                              items-center
                              gap-3
                              rounded-2xl
                              border
                              border-slate-100
                              bg-slate-50
                              px-3
                              text-sm
                              font-semibold
                            "
                      >
                        <span
                          className="
                              grid h-9 w-9
                              place-items-center
                              rounded-xl
                              bg-white
                              text-red-500
                            "
                        >
                          <Icon size={18} />
                        </span>

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

      {/* Bottom Navigation */}

      <nav
        className="
          fixed inset-x-0 bottom-0
          z-[70]
          border-t
          bg-white/90
          pb-[env(safe-area-inset-bottom)]
          shadow-lg
          backdrop-blur-2xl
          lg:hidden
        "
      >
        <div
          className="
          mx-auto
          flex
          h-[4.25rem]
          max-w-md
          items-stretch
          px-2
        "
        >
          <Link href="/" className={mobileItemClass("/")}>
            <House size={21} />
            <span>خانه</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="
              flex flex-1
              flex-col
              items-center
              justify-center
              gap-1
              text-[11px]
            "
          >
            <span
              className="
              grid h-10 w-10
              place-items-center
              rounded-2xl
              bg-red-50
              text-red-500
            "
            >
              <Boxes size={21} />
            </span>
            دسته‌بندی
          </button>

          <Link href="/cart" className={mobileItemClass("/cart")}>
            <ShoppingBag size={21} />
            <span> سبد خرید</span>
          </Link>
          <Link href="/account" className={mobileItemClass("/account")}>
            <UserRound size={21} />
            <span>اطلاعات من</span>
          </Link>

          {/* {customer && (
            <button
              onClick={handleLogout}
              className="
                  flex flex-1
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  text-[11px]
                  text-red-600
                "
            >
              <LogOut size={21} />
              <span>خروج</span>
            </button>
          )} */}
        </div>
      </nav>
    </>
  );
}
