"use client";

import { useState } from "react";

import type {
  AuthStep,
  OtpFormValues,
  PhoneFormValues,
  RegisterFormValues,
} from "../type/type";

interface UseAuthFlowReturn {
  step: AuthStep;
  phoneNumber: string;
  isLoading: boolean;
  error: string | null;

  handlePhoneSubmit: (phoneNumber: string) => Promise<void>;

  handleOtpSubmit: (otp: string) => Promise<void>;

  handleRegisterSubmit: (values: RegisterFormValues) => Promise<void>;

  backToPhone: () => void;
}

export function useAuthFlow(): UseAuthFlowReturn {
  const [step, setStep] = useState<AuthStep>("phone");

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  // -----------------------------
  // شماره موبایل
  // -----------------------------

  const handlePhoneSubmit = async (phone: string): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      // فعلاً استاتیک
      console.log("Send OTP:", phone);

      // شبیه‌سازی درخواست API
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
      });

      setPhoneNumber(phone);

      // رفتن به مرحله OTP
      setStep("otp");
    } catch {
      setError("ارسال کد تأیید با خطا مواجه شد");
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------
  // تأیید OTP
  // -----------------------------

  const handleOtpSubmit = async (otp: string): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      // فعلاً کد ثابت برای تست
      console.log("Verify OTP:", phoneNumber, otp);

      // شبیه‌سازی درخواست
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
      });

      // کد صحیح تستی
      if (otp !== "111111") {
        setError("کد تأیید وارد شده صحیح نیست");
        return;
      }

      // کد صحیح است
      console.log("OTP verified successfully");

      // فعلاً مستقیم برو مرحله ثبت‌نام
      setStep("register");
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------
  // ثبت نام
  // -----------------------------

  const handleRegisterSubmit = async (
    values: RegisterFormValues,
  ): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      console.log("Register:", phoneNumber, values);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
      });

      console.log("Registration successful");

      // بعداً اینجا:
      // SetUserToken(...)
      // router.push(...)
    } catch {
      setError("ثبت‌نام با خطا مواجه شد");
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------
  // برگشت به شماره موبایل
  // -----------------------------

  const backToPhone = (): void => {
    setError(null);
    setStep("phone");
  };

  return {
    step,
    phoneNumber,
    isLoading,
    error,

    handlePhoneSubmit,
    handleOtpSubmit,
    handleRegisterSubmit,

    backToPhone,
  };
}
