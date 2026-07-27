"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Button from "@/src/features/admin/shared/ui/Button";
import Input from "@/src/features/admin/shared/ui/Input";

import { useLogin } from "../hooks/useLogin";
import { loginSchema, LoginFormValues } from "../validations/login.schema";

export default function LoginForm() {
  const router = useRouter();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function submitHandler(data: LoginFormValues) {
    try {
    await loginMutation.mutateAsync(data);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    router.push("/admin/Products");
    } catch {}
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <Input
        label="نام کاربری"
        placeholder="admin"
        leftIcon={<User size={18} />}
        error={errors.username?.message}
        {...register("username")}
      />

      <Input
        label="رمز عبور"
        type="password"
        placeholder="******"
        leftIcon={<Lock size={18} />}
        error={errors.password?.message}
        {...register("password")}
      />

      {loginMutation.isError && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          نام کاربری یا رمز عبور اشتباه است.
        </div>
      )}

      <Button
        type="submit"
        loading={loginMutation.isPending}
        className="w-full"
      >
        ورود به پنل مدیریت
      </Button>
    </form>
  );
}
