"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/src/features/cart/CartProvider";
import { useCustomer } from "@/src/features/customer/useCustomer";
import { formatToman } from "@/src/lib/money";

const fields = [
  ["fullName", "نام و نام خانوادگی"],
  ["mobile", "موبایل (مثال 09123456789)"],
  ["email", "ایمیل (اختیاری)"],
  ["province", "استان"],
  ["city", "شهر"],
  ["postalCode", "کد پستی ۱۰ رقمی"],
  ["address", "نشانی کامل"],
  ["note", "توضیحات سفارش (اختیاری)"],
] as const;

export default function CheckoutPage() {
  const router = useRouter();

  const { items, subtotal } = useCart();

  const {
    data: customer,
    isLoading: authLoading,
  } = useCustomer();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);

    const customerData = Object.fromEntries(
      fields.map(([name]) => [
        name,
        String(form.get(name) || ""),
      ]),
    );

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items.map(({ productId, quantity }) => ({
          productId,
          quantity,
        })),
        customer: customerData,
      }),
    });

    const result = await response
      .json()
      .catch(() => null) as {
        paymentUrl?: string;
        message?: string;
      } | null;

    setLoading(false);

    if (response.status === 401) {
      return router.push("/login?next=/checkout");
    }

    if (!response.ok || !result?.paymentUrl) {
      return setError(
        result?.message || "ثبت سفارش ناموفق بود.",
      );
    }

    router.push(result.paymentUrl);
  }

  if (authLoading) {
    return (
      <main className="min-h-[60vh] p-16 text-center">
        در حال بررسی حساب کاربری...
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black">
          برای ادامه خرید وارد شوید
        </h1>

        <p className="mt-3 text-slate-500">
          سبد خرید شما حفظ می‌شود و پس از ورود به همین مرحله برمی‌گردید.
        </p>

        

        <div className="mt-7 flex justify-center gap-3">
          <Link
            href="/login?next=/checkout"
            className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white"
          >
            ورود
          </Link>

          <Link
            href="/register?next=/checkout"
            className="rounded-xl border px-6 py-3 font-bold"
          >
            ررر
          </Link>
        </div>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black">
          سبد خرید خالی است
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-black">
        تسویه‌حساب
      </h1>

      <form
        onSubmit={submit}
        className="grid gap-6 lg:grid-cols-[1fr_360px]"
      >
        {/* اطلاعات مشتری */}
        <section className="grid gap-4 rounded-3xl border bg-white p-5 sm:grid-cols-2">
          {fields.map(([name, label]) => {
            const isTextarea =
              name === "address" || name === "note";

            const isAddress = name === "address";

            return (
              <label
                key={name}
                className={
                  isTextarea
                    ? "sm:col-span-2"
                    : ""
                }
              >
                <span className="mb-2 block text-sm font-bold">
                  {label}
                </span>

                {isTextarea ? (
                  <textarea
                    name={name}
                    required={isAddress}
                    rows={isAddress ? 3 : 2}
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-red-500"
                  />
                ) : (
                  <input
                    name={name}
                    defaultValue={
                      name === "fullName"
                        ? customer.fullName
                        : name === "mobile"
                          ? customer.mobile
                          : name === "email"
                            ? customer.email
                            : ""
                    }
                    required={name !== "email"}
                    inputMode={
                      name === "mobile" ||
                      name === "postalCode"
                        ? "numeric"
                        : undefined
                    }
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-red-500"
                  />
                )}
              </label>
            );
          })}
        </section>

        {/* صورتحساب */}
        <aside className="h-fit rounded-3xl border bg-white p-6">
          <h2 className="font-black">
            صورتحساب
          </h2>

          <div className="my-5 space-y-3 text-sm">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between gap-3"
              >
                <span className="line-clamp-1">
                  {item.title} ×{" "}
                  {item.quantity.toLocaleString("fa-IR")}
                </span>

                <span>
                  {formatToman(
                    item.unitPrice * item.quantity,
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t pt-4">
            <strong>
              جمع کالاها
            </strong>

            <strong>
              {formatToman(subtotal)}
            </strong>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            مبلغ نهایی و ارسال توسط سرور محاسبه می‌شود.
          </p>

          {error && (
            <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 min-h-12 w-full rounded-xl bg-red-600 font-bold text-white disabled:opacity-60"
          >
            {loading
              ? "در حال ثبت..."
              : "رفتن به پرداخت آزمایشی"}
          </button>
        </aside>
      </form>
    </main>
  );
}
;
