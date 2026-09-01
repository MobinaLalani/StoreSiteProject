
"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import {
  LogOut,
  PackageSearch,
  User,
  UserRound,
  X,
} from "lucide-react";

import LoginLink from "@/src/components/ui/LoginLink";

import { useCustomer, useCustomerActions } from "./useCustomer";

export default function CustomerMenu() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { data: customer, isLoading } = useCustomer();
  const { logout } = useCustomerActions();

  async function handleLogout() {
    await logout();

    setOpen(false);

    router.replace("/home");
    router.refresh();
  }

  // Loading
  if (isLoading) {
    return (
      <span className="h-10 w-20 animate-pulse rounded-xl bg-slate-100 sm:h-11" />
    );
  }

  // Not logged in
  if (!customer) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <LoginLink />

        <Link
          href="/register"
          className="inline-flex h-10 items-center rounded-xl bg-red-600 px-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-red-700 sm:h-11 sm:px-4 sm:text-sm"
        >
          ثبت‌نام
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Customer Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={customer.fullName}
        aria-label="باز کردن منوی حساب کاربری"
        className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100 sm:h-11 sm:w-11"
      >
        <User />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <button
                type="button"
                aria-label="بستن منوی حساب"
                onClick={() => setOpen(false)}
                className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
              />

              {/* Modal */}
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="customer-menu-title"
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl sm:p-6"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="بستن"
                  className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
                >
                  <X size={19} />
                </button>

                {/* Customer Info */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600">
                    <UserRound size={24} />
                  </span>

                  <div className="min-w-0">
                    <h2
                      id="customer-menu-title"
                      className="truncate font-black text-slate-900"
                    >
                      {customer.fullName}
                    </h2>

                    <p
                      dir="ltr"
                      className="mt-1 text-sm text-slate-500"
                    >
                      {customer.mobile}
                    </p>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="mt-4 space-y-2">
                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center gap-3 rounded-xl px-3 font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <User
                      size={19}
                      className="text-red-600"
                    />

                    حساب کاربری
                  </Link>

                  <Link
                    href="/account/orders"
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center gap-3 rounded-xl px-3 font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <PackageSearch
                      size={19}
                      className="text-red-600"
                    />

                    سفارش‌های من
                  </Link>
                </div>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-50 font-bold text-red-600 transition hover:bg-red-100"
                >
                  <LogOut size={18} />

                  خروج از حساب
                </button>
              </motion.section>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
;
