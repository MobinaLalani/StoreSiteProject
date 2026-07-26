import { LoginFormValues } from "../validations/login.schema";

export async function login(data: LoginFormValues) {
  const response = await fetch("/api/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("نام کاربری یا رمز عبور اشتباه است.");
  }

  return response.json();
}
