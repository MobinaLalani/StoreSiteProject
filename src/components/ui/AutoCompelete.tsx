"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { ChevronDown, X } from "lucide-react";

export interface AutoCompleteOption {
  label: string;
  value: string | number;
}

interface AutoCompleteProps {
  label?: string;
  placeholder?: string;

  options: AutoCompleteOption[];

  value?: string | number | Array<string | number>;

  onChange?: (
    value: string | number | Array<string | number>,
    option?: AutoCompleteOption,
  ) => void;

  onClear?: () => void;

  multiple?: boolean;

  readonly?: boolean;

  loading?: boolean;

  error?: string;

  hint?: string | ReactNode;

  className?: string;

  inputClassName?: string;

  maxItems?: number;
}

export default function AutoComplete({
  label,
  placeholder = "انتخاب کنید",
  options,
  value,
  onChange,
  onClear,
  multiple = false,
  readonly = false,
  loading = false,
  error,
  hint,
  className = "",
  inputClassName = "",
  maxItems,
}: AutoCompleteProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  /**
   * فیلتر کردن گزینه‌ها بر اساس متن جستجو
   *
   * نیازی به state جداگانه ندارد چون از
   * options + search قابل محاسبه است.
   */
  const filteredOptions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(normalizedSearch),
    );
  }, [options, search]);

  /**
   * Single selected option
   */
  const selectedOption = useMemo(() => {
    if (multiple) {
      return undefined;
    }

    return options.find(
      (option) => String(option.value) === String(value ?? ""),
    );
  }, [multiple, options, value]);

  /**
   * Multi selected values
   */
  const selectedValues = useMemo(() => {
    if (!multiple) {
      return [];
    }

    return Array.isArray(value) ? value : [];
  }, [multiple, value]);

  /**
   * Multi selected options
   */
  const selectedOptions = useMemo(() => {
    if (!multiple) {
      return [];
    }

    return options.filter((option) =>
      selectedValues.some(
        (selectedValue) => String(selectedValue) === String(option.value),
      ),
    );
  }, [multiple, options, selectedValues]);

  /**
   * حذف آیتم‌هایی که قبلاً انتخاب شده‌اند
   * از dropdown
   */
  const availableOptions = useMemo(() => {
    if (!multiple) {
      return filteredOptions;
    }

    return filteredOptions.filter(
      (option) =>
        !selectedValues.some(
          (selectedValue) => String(selectedValue) === String(option.value),
        ),
    );
  }, [multiple, filteredOptions, selectedValues]);

  /**
   * بستن dropdown هنگام کلیک بیرون
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * تغییر متن جستجو
   */
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    setShowOptions(true);
  }

  /**
   * انتخاب یک گزینه
   */
  function handleOptionSelect(option: AutoCompleteOption) {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];

      const alreadySelected = currentValues.some(
        (item) => String(item) === String(option.value),
      );

      if (alreadySelected) {
        return;
      }

      if (maxItems && currentValues.length >= maxItems) {
        return;
      }

      const newValue = [...currentValues, option.value];

      onChange?.(newValue, option);

      setSearch("");
      setShowOptions(false);

      return;
    }

    onChange?.(option.value, option);

    setSearch("");
    setShowOptions(false);
  }

  /**
   * حذف آیتم در حالت multi select
   */
  function handleRemove(option: AutoCompleteOption) {
    if (!Array.isArray(value)) {
      return;
    }

    const newValue = value.filter(
      (item) => String(item) !== String(option.value),
    );

    onChange?.(newValue);
  }

  /**
   * پاک کردن مقدار
   */
  function handleClear() {
    if (multiple) {
      onChange?.([]);
    } else {
      onChange?.("");
    }

    setSearch("");
    setShowOptions(false);

    onClear?.();
  }

  /**
   * باز و بسته کردن dropdown
   */
  function handleToggleDropdown() {
    if (readonly) {
      return;
    }

    setShowOptions((prev) => !prev);
  }

  /**
   * مقدار نمایشی input
   */
  const inputValue = multiple ? search : search || selectedOption?.label || "";

  const reachedMaxItems =
    multiple && !!maxItems && selectedValues.length >= maxItems;

  return (
    <div ref={wrapperRef} className={`w-full ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleSearch}
            onFocus={() => {
              if (!readonly) {
                setShowOptions(true);
              }
            }}
            readOnly={readonly}
            autoComplete="off"
            className={`
              h-11
              w-full
              rounded-xl
              border
              bg-white
              px-4
              pl-20
              text-sm
              text-gray-700
              outline-none
              transition

              ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-600"
              }

              ${readonly ? "cursor-default bg-gray-50 text-gray-500" : ""}

              ${inputClassName}
            `}
          />

          {!readonly && (
            <div className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {(selectedOption || selectedOptions.length > 0) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    text-gray-400
                    transition
                    hover:bg-red-50
                    hover:text-red-500
                  "
                  aria-label="پاک کردن"
                >
                  <X size={16} />
                </button>
              )}

              <button
                type="button"
                onClick={handleToggleDropdown}
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  text-gray-500
                  transition
                  hover:bg-gray-100
                "
                aria-label="باز کردن لیست"
              >
                <ChevronDown
                  size={18}
                  className={`
                    transition-transform
                    ${showOptions ? "rotate-180" : ""}
                  `}
                />
              </button>
            </div>
          )}
        </div>

        {showOptions && !readonly && (
          <div
            className="
                absolute
                z-50
                mt-2
                w-full
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                shadow-lg
              "
          >
            <ul className="max-h-60 overflow-y-auto py-1">
              {loading ? (
                <li className="px-4 py-4 text-center text-sm text-gray-500">
                  در حال دریافت...
                </li>
              ) : reachedMaxItems ? (
                <li className="px-4 py-4 text-center text-sm text-gray-500">
                  حداکثر {maxItems} مورد قابل انتخاب است
                </li>
              ) : availableOptions.length > 0 ? (
                availableOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => handleOptionSelect(option)}
                      className="
                            w-full
                            px-4
                            py-2.5
                            text-right
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-100
                          "
                    >
                      {option.label}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-4 text-center text-sm text-gray-500">
                  داده‌ای موجود نیست
                </li>
              )}
            </ul>
          </div>
        )}

        {multiple && selectedOptions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedOptions.map((option) => (
              <div
                key={option.value}
                className="
                      flex
                      items-center
                      gap-1.5
                      rounded-lg
                      border
                      border-red-200
                      bg-red-50
                      px-3
                      py-1.5
                      text-xs
                      font-bold
                      text-red-600
                    "
              >
                <span>{option.label}</span>

                {!readonly && (
                  <button
                    type="button"
                    onClick={() => handleRemove(option)}
                    className="
                          rounded
                          p-0.5
                          transition
                          hover:bg-red-100
                        "
                    aria-label={`حذف ${option.label}`}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      ) : (
        hint && <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}
