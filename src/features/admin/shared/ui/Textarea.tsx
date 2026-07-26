"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      showCount = false,
      maxLength,
      className,
      value,
      ...props
    },
    ref,
  ) => {
    const length = String(value ?? "").length;

    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={clsx(
            "min-h-[120px] w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            "disabled:bg-gray-100 disabled:text-gray-500",
            error && "border-red-500 focus:border-red-500 focus:ring-red-100",
            className,
          )}
          {...props}
        />

        <div className="mt-2 flex items-center justify-between">
          <div>
            {error ? (
              <p className="text-xs font-medium text-red-500">{error}</p>
            ) : (
              hint && <p className="text-xs text-gray-500">{hint}</p>
            )}
          </div>

          {showCount && (
            <span className="text-xs text-gray-400">
              {length}
              {maxLength ? ` / ${maxLength}` : ""}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
