"use client";

import React from "react";
import { useFormik } from "formik";

import type { PhoneFormValues } from "../type/type";
import { phoneValidationSchema } from "../validation/validation";

interface PhoneStepProps {
  isLoading: boolean;
  onSubmit: (phoneNumber: string) => Promise<void>;
}

function PhoneStep({
  isLoading,
  onSubmit,
}: PhoneStepProps): React.JSX.Element {
  const formik = useFormik<PhoneFormValues>({
    initialValues: {
      phoneNumber: "",
    },

    validationSchema: phoneValidationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values.phoneNumber);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handlePhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;

    // فقط عدد
    if (!/^\d*$/.test(value)) {
      return;
    }

    formik.setFieldValue("phoneNumber", value);
  };

  const isSubmitting =
    isLoading || formik.isSubmitting;

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
      <div>
        <label
          htmlFor="phoneNumber"
          className="mb-2 block font-medium"
        >
          شماره موبایل خود را وارد کنید.
        </label>

        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="09123456789"
          maxLength={11}
          value={formik.values.phoneNumber}
          onChange={handlePhoneChange}
          onBlur={formik.handleBlur}
          disabled={isSubmitting}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            outline-none
            transition-all
            focus:border-black
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        />

        {formik.touched.phoneNumber &&
          formik.errors.phoneNumber && (
            <p className="mt-2 text-sm text-red-500">
              {formik.errors.phoneNumber}
            </p>
          )}
      </div>

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
        {isSubmitting ? "در حال ارسال..." : "ادامه"}
      </button>
    </form>
  );
}

export default PhoneStep;