"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { useCustomerActions } from "@/src/features/customer/useCustomer";

import { AuthField as Field, AuthShell } from "@/src/features/customer/AuthUI";

function safeNext(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/account";
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const { refresh } = useCustomerActions();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/customer/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        identity: form.get("identity"),
        password: form.get("password"),
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      setLoading(false);

      setError(result?.message || "ورود ناموفق بود.");

      return;
    }

    await refresh();

    router.replace(safeNext(params.get("next")));

    router.refresh();
  }

  return (
    <AuthShell title="ورود به حساب">
      <form onSubmit={submit} className="space-y-4">
        <Field
          name="identity"
          label="شماره موبایل یا ایمیل"
          autoComplete="username"
        />

        <Field
          name="password"
          label="رمز عبور"
          type="password"
          autoComplete="current-password"
        />

        {error && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="
            min-h-12
            w-full
            rounded-xl
            bg-red-600
            font-bold
            text-white
            disabled:opacity-60
          "
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        حساب ندارید؟
        <Link
          className="mr-1 font-bold text-red-600"
          href={`/register?next=${encodeURIComponent(
            safeNext(params.get("next")),
          )}`}
        >
          ثبت‌نام کنید
        </Link>
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
