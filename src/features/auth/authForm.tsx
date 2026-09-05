"use client";

import { useState } from "react";
import PhoneStep from "./components/PhoneStep";
import OtpStep from "./components/OtpStep";
import RegisterStep from "./components/RegisterStep";
import type { AuthStep } from "./type/type";

import { useAuthFlow } from "./hooks/useAuthFlow";

function AuthForm(): React.JSX.Element {
  const {
    step,
    phoneNumber,
    isLoading,
    error,

    handlePhoneSubmit,
    handleOtpSubmit,
    handleRegisterSubmit,

    backToPhone,
  } = useAuthFlow();

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        gap-3
        px-4
      "
    >
      <p
        className="
          text-4xl
          font-black
          text-red-500
        "
      >
        اتصال گستر
      </p>

      {error && (
        <div
          className="
            w-full
            max-w-md
            rounded-xl
            bg-red-50
            p-3
            text-center
            text-sm
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {step === "phone" && (
        <PhoneStep
          isLoading={isLoading}
          onSubmit={handlePhoneSubmit}
        />
      )}

      {step === "otp" && (
        <OtpStep
          phoneNumber={phoneNumber}
          isLoading={isLoading}
          onSuccess={handleOtpSubmit}
          onBack={backToPhone}
        />
      )}

      {step === "register" && (
        <RegisterStep
          phoneNumber={phoneNumber}
          isLoading={isLoading}
          onSubmit={handleRegisterSubmit}
        />
      )}
    </div>
  );
}

export default AuthForm;

