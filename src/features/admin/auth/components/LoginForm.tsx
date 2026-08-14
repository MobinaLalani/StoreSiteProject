"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LockKeyhole, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormValues } from "../validations/login.schema";

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), defaultValues: { username: "", password: "" } });
  async function submitHandler(data: LoginFormValues) { try { await loginMutation.mutateAsync(data); router.replace("/admin/Products"); router.refresh(); } catch {} }

  return <form onSubmit={handleSubmit(submitHandler)} className="space-y-5" noValidate>
    <label className="block"><span className="text-xs font-bold">نام کاربری</span><span className="relative mt-2 flex items-center border-b border-[#7B604A]/35 focus-within:border-[#7B604A]"><UserRound size={17} className="shrink-0 opacity-45"/><input autoComplete="username" enterKeyHint="next" placeholder="نام کاربری خود را وارد کنید" className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#7B604A]/40" {...register("username")}/></span>{errors.username && <small className="mt-1.5 block text-xs font-medium text-red-700">{errors.username.message}</small>}</label>
    <label className="block"><span className="text-xs font-bold">رمز عبور</span><span className="relative mt-2 flex items-center border-b border-[#7B604A]/35 focus-within:border-[#7B604A]"><LockKeyhole size={17} className="shrink-0 opacity-45"/><input type={showPassword ? "text" : "password"} autoComplete="current-password" enterKeyHint="go" placeholder="رمز عبور خود را وارد کنید" className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#7B604A]/40" {...register("password")}/><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"} className="grid h-11 w-11 place-items-center opacity-50">{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></span>{errors.password && <small className="mt-1.5 block text-xs font-medium text-red-700">{errors.password.message}</small>}</label>
    {loginMutation.isError && <div role="alert" className="rounded-xl border border-red-900/10 bg-red-100/60 px-3 py-2.5 text-xs font-bold text-red-800">نام کاربری یا رمز عبور صحیح نیست.</div>}
    <button type="submit" disabled={loginMutation.isPending} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#7B604A] px-5 text-sm font-black text-white shadow-lg shadow-[#7B604A]/20 transition active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-60">{loginMutation.isPending ? <><Loader2 size={17} className="animate-spin"/>در حال ورود...</> : "ورود به پنل مدیریت"}</button>
    <p className="text-center text-[10px] leading-5 text-[#7B604A]/55 sm:text-xs">با ورود به پنل، مسئولیت حفظ محرمانگی اطلاعات حساب را می‌پذیرید.</p>
  </form>;
}
