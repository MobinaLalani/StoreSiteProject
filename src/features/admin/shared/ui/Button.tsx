"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "outline"
  | "ghost";

type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-60",

        {
          // Variants
          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",

          "bg-gray-700 text-white hover:bg-gray-800": variant === "secondary",

          "bg-red-600 text-white hover:bg-red-700": variant === "danger",

          "bg-green-600 text-white hover:bg-green-700": variant === "success",

          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100":
            variant === "outline",

          "bg-transparent text-gray-700 hover:bg-gray-100": variant === "ghost",

          // Sizes
          "h-9 px-3 text-sm": size === "sm",
          "h-11 px-5 text-base": size === "md",
          "h-12 px-6 text-lg": size === "lg",

          "w-full": fullWidth,
        },

        className,
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}
