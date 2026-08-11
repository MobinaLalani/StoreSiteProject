import PageHeader from "@/src/features/admin/shared/components/PageHeader";
import ChangePasswordForm from "@/src/features/admin/security/ChangePasswordForm";

export default function SecurityPage() {
  return (
    <div dir="rtl" className="space-y-6">
      <PageHeader title="امنیت حساب" description="رمز عبور مدیریت فروشگاه را تغییر دهید." />
      <ChangePasswordForm />
    </div>
  );
}
