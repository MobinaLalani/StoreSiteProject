"use client";

import React from "react";
import { useFormik } from "formik";

import type { RegisterFormValues } from "../type/type";
import { registerValidationSchema } from "../validation/validation";

interface RegisterStepProps {
  phoneNumber: string;
  isLoading: boolean;
  onSubmit: (values: RegisterFormValues) => Promise<void>;
}

function RegisterStep({
  phoneNumber,
  isLoading,
  onSubmit,
}: RegisterStepProps): React.JSX.Element {
  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
    },

    validationSchema: registerValidationSchema,

    onSubmit: async (values: RegisterFormValues): Promise<void> => {
      try {
        console.log({
          phoneNumber,
          ...values,
        });

        await onSubmit(values);
      } catch (error) {
        console.error("Register error:", error);
      }
    },
  });

  const loading = isLoading || formik.isSubmitting;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-md space-y-5 rounded-2xl border border-black bg-white p-8 shadow-lg"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold">تکمیل ثبت‌نام</h2>

        <p className="mt-2 text-sm text-gray-500">
          اطلاعات حساب خود را وارد کنید
        </p>
      </div>

      {/* First Name */}
      <div>
        <label htmlFor="firstName" className="mb-2 block font-medium">
          نام
        </label>

        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={loading}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            outline-none
            transition
            focus:border-black
            disabled:cursor-not-allowed
            disabled:bg-gray-100
            disabled:opacity-70
          "
        />

        {formik.touched.firstName && formik.errors.firstName && (
          <p className="mt-2 text-sm text-red-500">{formik.errors.firstName}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="lastName" className="mb-2 block font-medium">
          نام خانوادگی
        </label>

        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={loading}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            outline-none
            transition
            focus:border-black
            disabled:cursor-not-allowed
            disabled:bg-gray-100
            disabled:opacity-70
          "
        />

        {formik.touched.lastName && formik.errors.lastName && (
          <p className="mt-2 text-sm text-red-500">{formik.errors.lastName}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
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
        {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
      </button>
    </form>
  );
}

export default RegisterStep;
