
"use client";

import { useState } from "react";

import {
  sendOtp,
  verifyOtp,
  registerUser,
} from "../services/auth.service";

import type {
  AuthStep,
  RegisterFormValues,
} from "../type/type";

interface UseAuthFlowReturn {
  step: AuthStep;
  phoneNumber: string;
  isLoading: boolean;
  error: string | null;

  handlePhoneSubmit: (
    phoneNumber: string
  ) => Promise<void>;

  handleOtpSubmit: (
    otp: string
  ) => Promise<void>;

  handleRegisterSubmit: (
    values: RegisterFormValues
  ) => Promise<void>;

  backToPhone: () => void;

  clearError: () => void;
}

export const useAuthFlow =
  (): UseAuthFlowReturn => {
    const [step, setStep] =
      useState<AuthStep>("phone");

    const [phoneNumber, setPhoneNumber] =
      useState<string>("");

    const [isLoading, setIsLoading] =
      useState<boolean>(false);

    const [error, setError] =
      useState<string | null>(null);

    /**
     * مرحله اول:
     * ارسال شماره موبایل
     */
    const handlePhoneSubmit = async (
      phone: string
    ): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const response =
          await sendOtp({
            phoneNumber: phone,
          });

        if (!response.success) {
          setError(
            response.message ??
              "ارسال کد تایید ناموفق بود"
          );

          return;
        }

        setPhoneNumber(phone);

        setStep("otp");
      } catch {
        setError(
          "خطایی در ارسال کد تایید رخ داد"
        );
      } finally {
        setIsLoading(false);
      }
    };

    /**
     * مرحله دوم:
     * بررسی OTP
     */
    const handleOtpSubmit = async (
      otp: string
    ): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const response =
          await verifyOtp({
            phoneNumber,
            otp,
          });

        if (!response.success) {
          setError(
            response.message ??
              "کد تایید صحیح نیست"
          );

          return;
        }

        /**
         * اگر کاربر جدید باشد
         * وارد مرحله ثبت نام می‌شویم.
         */
        if (response.isNewUser) {
          setStep("register");
          return;
        }

        /**
         * اگر کاربر قبلاً ثبت نام کرده باشد
         * اینجا باید Login انجام شود.
         */
        console.log(
          "Existing user - Login"
        );

        // TODO:
        // ذخیره Token
        // Redirect
      } catch {
        setError(
          "خطایی در بررسی کد تایید رخ داد"
        );
      } finally {
        setIsLoading(false);
      }
    };

    /**
     * مرحله سوم:
     * ثبت نام کاربر جدید
     */
    const handleRegisterSubmit = async (
      values: RegisterFormValues
    ): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const response =
          await registerUser({
            phoneNumber,
            firstName: values.firstName,
            lastName: values.lastName,
          });

        if (!response.success) {
          setError(
            response.message ??
              "ثبت نام ناموفق بود"
          );

          return;
        }

        /**
         * ثبت نام موفق
         *
         * اینجا معمولاً:
         * 1. Token دریافت می‌کنیم
         * 2. Token را ذخیره می‌کنیم
         * 3. کاربر را Redirect می‌کنیم
         */

        console.log(
          "Registration successful"
        );
      } catch {
        setError(
          "خطایی در ثبت نام رخ داد"
        );
      } finally {
        setIsLoading(false);
      }
    };

    /**
     * برگشت از OTP به شماره موبایل
     */
    const backToPhone = (): void => {
      setStep("phone");
      setError(null);
    };

    /**
     * پاک کردن Error
     */
    const clearError = (): void => {
      setError(null);
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
      clearError,
    };
  };

