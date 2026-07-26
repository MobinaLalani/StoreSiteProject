"use client";

import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;

  title?: string;
  subtitle?: string;

  header?: ReactNode;
  footer?: ReactNode;

  padding?: "none" | "sm" | "md" | "lg";

  bordered?: boolean;
  hoverable?: boolean;
}

export default function Card({
  children,
  title,
  subtitle,
  header,
  footer,
  padding = "md",
  bordered = true,
  hoverable = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-2xl bg-white",

        bordered && "border border-gray-200",

        hoverable &&
          "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",

        className,
      )}
      {...props}
    >
      {(title || subtitle || header) && (
        <div className="border-b border-gray-100 px-6 py-5">
          {header ?? (
            <>
              {title && (
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              )}

              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
              )}
            </>
          )}
        </div>
      )}

      <div
        className={clsx({
          "p-0": padding === "none",
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
        })}
      >
        {children}
      </div>

      {footer && (
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}
