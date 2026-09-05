"use client";

import React from "react";
import { useFormik } from "formik";

import type { OtpFormValues } from "../type/type";
import { otpValidationSchema } from "../validation/validation";

interface OtpStepProps {
  phoneNumber: string;
  isLoading: boolean;
  error?: string | null;
  onSuccess: (otp: string) => Promise<void>;
  onBack: () => void;
}

function OtpStep({
  phoneNumber,
  isLoading,
  error,
  onSuccess,
  onBack,
}: OtpStepProps): React.JSX.Element {
  const formik = useFormik<OtpFormValues>({
    initialValues: {
      otp: "",
    },

    validationSchema: otpValidationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSuccess(values.otp);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOtpChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;

    // فقط عدد
    if (!/^\d*$/.test(value)) {
      return;
    }

    // حداکثر ۶ رقم
    if (value.length > 6) {
      return;
    }

    formik.setFieldValue("otp", value);
  };

  const isSubmitting = isLoading || formik.isSubmitting;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="
        w-full
        max-w-md
        space-y-5
        rounded-2xl
        border
        border-black
        bg-white
        p-8
        shadow-lg
      "
    >
      {/* عنوان */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">کد تأیید</h2>

        <p className="mt-3 text-sm text-gray-500">کد تأیید به شماره</p>

        <p className="mt-1 font-bold">{phoneNumber}</p>
      </div>

      {/* OTP */}
      <div>
        <label htmlFor="otp" className="mb-2 block font-medium">
          کد تأیید را وارد کنید
        </label>

        <input
          id="otp"
          name="otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="------"
          value={formik.values.otp}
          onChange={handleOtpChange}
          onBlur={formik.handleBlur}
          disabled={isSubmitting}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            text-center
            text-2xl
            tracking-[0.5em]
            outline-none
            transition-all
            focus:border-black
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        />

        {formik.touched.otp && formik.errors.otp && (
          <p className="mt-2 text-sm text-red-500">{formik.errors.otp}</p>
        )}
      </div>

      {/* خطای API */}
      {error && (
        <div
          className="
            rounded-xl
            bg-red-50
            px-4
            py-3
            text-center
            text-sm
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {/* تأیید */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          flex
          w-full
          items-center
          justify-center
          rounded-xl
          border
          border-black
          bg-red-500
          py-3
          text-white
          transition-all
          duration-300
          hover:bg-gray-800
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isSubmitting ? "در حال بررسی..." : "تأیید کد"}
      </button>

      {/* برگشت */}
      <button
        type="button"
        onClick={onBack}
        disabled={isSubmitting}
        className="
          w-full
          text-sm
          text-gray-500
          transition-colors
          hover:text-black
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        ویرایش شماره موبایل
      </button>
    </form>
  );
}

export default OtpStep;
