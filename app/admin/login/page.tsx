import LoginForm from "@/src/features/admin/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">پنل مدیریت</h1>

          <p className="mt-2 text-sm text-gray-500">
            برای ورود اطلاعات خود را وارد کنید.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
