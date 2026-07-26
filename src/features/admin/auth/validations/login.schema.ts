import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "نام کاربری الزامی است."),

  password: z.string().min(4, "رمز عبور الزامی است."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
