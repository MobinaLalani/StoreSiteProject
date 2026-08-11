"use client";

import { useState, type FormEvent } from "react";
import { KeyRound, Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/src/features/admin/shared/ui/Button";
import Card from "@/src/features/admin/shared/ui/Card";
import Input from "@/src/features/admin/shared/ui/Input";

type Fields = "currentPassword" | "newPassword" | "confirmPassword";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Fields | "form", string>>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const currentPassword = String(form.get("currentPassword") ?? "");
    const newPassword = String(form.get("newPassword") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");
    const nextErrors: Partial<Record<Fields, string>> = {};
    if (!currentPassword) nextErrors.currentPassword = "رمز عبور فعلی را وارد کنید.";
    if (newPassword.length < 10) nextErrors.newPassword = "رمز جدید باید حداقل ۱۰ کاراکتر باشد.";
    if (newPassword !== confirmPassword) nextErrors.confirmPassword = "تکرار رمز عبور با رمز جدید مطابقت ندارد.";
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    setLoading(true);
    setErrors({});
    try {
      const response = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) { setErrors({ form: result.message ?? "تغییر رمز عبور انجام نشد." }); return; }
      router.replace("/admin/login?passwordChanged=true");
      router.refresh();
    } catch {
      setErrors({ form: "ارتباط با سرور برقرار نشد. دوباره تلاش کنید." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title="تغییر رمز عبور" subtitle="پس از تغییر رمز، تمام نشست‌های قبلی باطل می‌شوند." className="max-w-2xl">
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <Input name="currentPassword" type="password" autoComplete="current-password" label="رمز عبور فعلی" placeholder="رمز فعلی را وارد کنید" leftIcon={<Lock size={18} />} error={errors.currentPassword} />
        <Input name="newPassword" type="password" autoComplete="new-password" label="رمز عبور جدید" placeholder="حداقل ۱۰ کاراکتر" hint="برای امنیت بیشتر از حروف، عدد و نشانه‌ها استفاده کنید." leftIcon={<KeyRound size={18} />} error={errors.newPassword} />
        <Input name="confirmPassword" type="password" autoComplete="new-password" label="تکرار رمز عبور جدید" placeholder="رمز جدید را دوباره وارد کنید" leftIcon={<ShieldCheck size={18} />} error={errors.confirmPassword} />
        {errors.form && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{errors.form}</div>}
        <div className="flex justify-end pt-2"><Button type="submit" loading={loading} leftIcon={<ShieldCheck size={18} />}>ذخیره رمز جدید</Button></div>
      </form>
    </Card>
  );
}
