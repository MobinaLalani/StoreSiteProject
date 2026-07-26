"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  label?: string;
  hint?: string;
  error?: string;

  options: SelectOption[];

  placeholder?: string;

  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      hint,
      error,
      options,
      placeholder = "انتخاب کنید",
      className,
      fullWidth = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={clsx(fullWidth && "w-full")}>
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={clsx(
              `
                h-11
                w-full
                appearance-none
                rounded-xl
                border
                bg-white
                px-4
                pr-10
                text-sm
                outline-none
                transition
              `,
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-600",
              className,
            )}
            {...props}
          >
            <option value="">{placeholder}</option>

            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />
        </div>

        {error ? (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        ) : (
          hint && <p className="mt-1 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
