import { z } from "zod";
export const registerSchema = z.object({
  fullName: z.string().trim().min(3, "نام و نام خانوادگی را کامل وارد کنید.").max(100),
  mobile: z.string().trim().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست."),
  email: z.string().trim().email("ایمیل معتبر نیست.").or(z.literal("")),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد.").max(128).regex(/[A-Za-z]/, "رمز عبور باید حداقل یک حرف داشته باشد.").regex(/\d/, "رمز عبور باید حداقل یک عدد داشته باشد."),
});
export const customerLoginSchema = z.object({ identity: z.string().trim().min(3), password: z.string().min(1).max(128) });
