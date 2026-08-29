"use client";

import { FormEvent, useMemo, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";

import {
  Check,
  ChevronDown,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import type { Category } from "@/src/types/category";
import type { Product } from "@/src/types/product";
import type { TagType } from "@/src/types/tag";

import { effectivePrice, formatToman } from "@/src/lib/money";
import { normalizeSearchText } from "@/src/lib/product-search";

import { useTags } from "@/src/features/admin/tag";

import ProductGrid from "../components/ProductSection/ProductGrid";
import ProductEmpty from "../components/ProductSection/ProductEmpty";

type SortKey =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "popular"
  | "name";

const sortLabels: Record<SortKey, string> = {
  newest: "جدیدترین",
  "price-asc": "ارزان‌ترین",
  "price-desc": "گران‌ترین",
  rating: "بالاترین امتیاز",
  popular: "محبوب‌ترین",
  name: "نام محصول",
};

function split(value: string | null): string[] {
  return value?.split(",").filter(Boolean) ?? [];
}

function numberParam(value: string | null): number {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

interface ProductExplorerProps {
  products: Product[];
  categories: Category[];
  title?: string;
  description?: string;
  fixedCategoryId?: number;
}

export default function ProductExplorer({
  products,
  categories,
  title = "همه محصولات",
  description,
  fixedCategoryId,
}: ProductExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { data: tags = [] } = useTags();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [queryDraft, setQueryDraft] = useState(params.get("q") ?? "");

  // -----------------------------
  // Query Params
  // -----------------------------

  const selectedCategories = useMemo(() => {
    if (fixedCategoryId) {
      return [String(fixedCategoryId)];
    }

    return split(params.get("categories"));
  }, [fixedCategoryId, params]);

  const selectedColors = split(params.get("colors"));

  const selectedTags = split(params.get("tags"));

  /*
   * QueryString همیشه string است:
   *
   * ?tags=1,4,7
   *
   * ولی Product.tags از نوع number[] است.
   *
   * بنابراین:
   *
   * ["1", "4", "7"]
   *
   * تبدیل می‌شود به:
   *
   * [1, 4, 7]
   */
  const selectedTagValues = useMemo(
    () => selectedTags.map(Number).filter(Number.isFinite),
    [selectedTags],
  );

  const min = numberParam(params.get("min"));

  const max = numberParam(params.get("max"));

  const minRating = numberParam(params.get("rating"));

  const available = params.get("available") === "1";

  const sale = params.get("sale") === "1";

  const featured = params.get("featured") === "1";

  const sortParam = params.get("sort");

  const sort: SortKey =
    sortParam && sortParam in sortLabels ? (sortParam as SortKey) : "newest";

  // -----------------------------
  // Colors
  // -----------------------------

  const allColors = useMemo(() => {
    return [...new Set(products.flatMap((product) => product.colors))].sort(
      (a, b) => a.localeCompare(b, "fa"),
    );
  }, [products]);

  // -----------------------------
  // Tags
  // -----------------------------

  /*
   * فقط Tagهایی را نمایش می‌دهیم
   * که حداقل در یک Product استفاده شده‌اند.
   */
  const usedTagValues = useMemo(() => {
    return new Set(products.flatMap((product) => product.tags));
  }, [products]);

  /*
   * تبدیل:
   *
   * Product.tags:
   * [1, 3, 7]
   *
   * به:
   *
   * [
   *   { value: 1, label: "ابزار" },
   *   ...
   * ]
   */
  const allTags = useMemo(() => {
    return tags
      .filter((tag) => usedTagValues.has(tag.value))
      .sort((a, b) => a.label.localeCompare(b.label, "fa"));
  }, [tags, usedTagValues]);

  /*
   * برای تبدیل سریع value به label
   */
  const tagLabelMap = useMemo(() => {
    return new Map<number, string>(tags.map((tag) => [tag.value, tag.label]));
  }, [tags]);

  // -----------------------------
  // Highest price
  // -----------------------------

  const highestPrice = useMemo(() => {
    const prices = products.map(effectivePrice).filter((price) => price > 0);

    if (!prices.length) {
      return 0;
    }

    return Math.max(...prices);
  }, [products]);

  // -----------------------------
  // Update QueryString
  // -----------------------------

  function update(changes: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());

    for (const [key, value] of Object.entries(changes)) {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    }

    const query = next.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  // -----------------------------
  // Toggle filters
  // -----------------------------

  function toggle(key: "categories" | "colors" | "tags", value: string) {
    const values = new Set(split(params.get(key)));

    if (values.has(value)) {
      values.delete(value);
    } else {
      values.add(value);
    }

    update({
      [key]: [...values].join(",") || null,
    });
  }

  // -----------------------------
  // Search
  // -----------------------------

  function submitSearch(event: FormEvent) {
    event.preventDefault();

    update({
      q: queryDraft.trim() || null,
    });
  }

  function clear() {
    setQueryDraft("");

    router.replace(pathname, {
      scroll: false,
    });
  }

  // -----------------------------
  // Filter Products
  // -----------------------------

  const filtered = useMemo(() => {
    const query = normalizeSearchText(params.get("q") ?? "");

    const terms = query.split(" ").filter(Boolean);

    const result = products.filter((product) => {
      const price = effectivePrice(product);

      /*
       * چون product.tags فقط ID دارد،
       * برای Search به label تبدیلشان می‌کنیم.
       */
      const productTagLabels = product.tags
        .map((tagValue) => tagLabelMap.get(tagValue) ?? "")
        .filter(Boolean);

      const haystack = normalizeSearchText(
        [
          product.title,
          product.shortDescription,
          product.description,

          productTagLabels.join(" "),

          product.colors.join(" "),

          product.specifications
            .map((item) => `${item.title} ${item.value}`)
            .join(" "),
        ].join(" "),
      );

      const matchesSearch =
        !terms.length || terms.every((term) => haystack.includes(term));

      const matchesCategory =
        !selectedCategories.length ||
        selectedCategories.includes(String(product.categoryId));

      const matchesColors =
        !selectedColors.length ||
        selectedColors.every((color) => product.colors.includes(color));

      /*
       * مهم:
       *
       * selectedTagValues:
       * number[]
       *
       * product.tags:
       * number[]
       */
      const matchesTags =
        !selectedTagValues.length ||
        selectedTagValues.every((tagValue) => product.tags.includes(tagValue));

      const matchesMinPrice = !min || price >= min;

      const matchesMaxPrice = !max || price <= max;

      const matchesRating = !minRating || product.rating >= minRating;

      const matchesAvailability = !available || product.stock > 0;

      const matchesSale =
        !sale ||
        (product.salePrice != null &&
          product.salePrice < Number(product.price));

      const matchesFeatured = !featured || product.isFeatured;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesColors &&
        matchesTags &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRating &&
        matchesAvailability &&
        matchesSale &&
        matchesFeatured
      );
    });

    return result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return effectivePrice(a) - effectivePrice(b);

        case "price-desc":
          return effectivePrice(b) - effectivePrice(a);

        case "rating":
          return b.rating - a.rating;

        case "popular":
          return b.reviewCount - a.reviewCount;

        case "name":
          return a.title.localeCompare(b.title, "fa");

        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });
  }, [
    products,
    params,
    selectedCategories,
    selectedColors,
    selectedTagValues,
    min,
    max,
    minRating,
    available,
    sale,
    featured,
    sort,
    tagLabelMap,
  ]);

  // -----------------------------
  // Active Filter Count
  // -----------------------------

  const activeCount = [
    params.get("q"),
    params.get("categories"),
    params.get("colors"),
    params.get("tags"),
    params.get("min"),
    params.get("max"),
    params.get("rating"),
    available,
    sale,
    featured,
  ].filter(Boolean).length;

  // -----------------------------
  // Filter Panel
  // -----------------------------

  const panel = (
    <FilterPanel
      categories={categories}
      fixedCategoryId={fixedCategoryId}
      selectedCategories={selectedCategories}
      selectedColors={selectedColors}
      selectedTags={selectedTags}
      colors={allColors}
      tags={allTags}
      min={min}
      max={max}
      highestPrice={highestPrice}
      minRating={minRating}
      available={available}
      sale={sale}
      featured={featured}
      toggle={toggle}
      update={update}
      clear={clear}
    />
  );

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Header */}

      <div className="overflow-hidden rounded-[2rem] bg-gradient-to-l from-slate-950 via-slate-900 to-red-950 px-5 py-7 text-white shadow-xl sm:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-red-200">
              <Sparkles size={15} />
              فروشگاه آنلاین
            </span>

            <h1 className="mt-4 text-3xl font-black sm:text-4xl">{title}</h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
              {description ||
                "با فیلترهای دقیق، محصول مناسب خود را سریع‌تر پیدا کنید."}
            </p>
          </div>

          <form
            onSubmit={submitSearch}
            className="flex w-full max-w-xl rounded-2xl bg-white p-1.5 shadow-lg"
          >
            <Search className="mr-3 self-center text-slate-400" size={20} />

            <input
              value={queryDraft}
              onChange={(event) => setQueryDraft(event.target.value)}
              placeholder="جستجو در محصولات، ویژگی‌ها، تگ‌ها و رنگ‌ها..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none"
            />

            <button className="rounded-xl bg-red-600 px-5 text-sm font-bold text-white">
              جستجو
            </button>
          </form>
        </div>
      </div>

      {/* Toolbar */}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(true)}
            className="relative flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 font-bold text-white lg:hidden"
          >
            <Filter size={18} />
            فیلترها
            {activeCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px]">
                {activeCount.toLocaleString("fa-IR")}
              </span>
            )}
          </button>

          <span className="text-sm text-slate-500">
            <strong className="text-slate-900">
              {filtered.length.toLocaleString("fa-IR")}
            </strong>{" "}
            محصول پیدا شد
          </span>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <span className="hidden text-slate-500 sm:inline">مرتب‌سازی:</span>

          <select
            value={sort}
            onChange={(event) =>
              update({
                sort:
                  event.target.value === "newest" ? null : event.target.value,
              })
            }
            className="min-h-11 rounded-xl border bg-slate-50 px-3 font-bold outline-none focus:border-red-400"
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Active Filters */}

      {activeCount > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            فیلترهای فعال:
          </span>

          {queryDraft && params.get("q") && (
            <Chip
              text={`جستجو: ${params.get("q")}`}
              onRemove={() => {
                setQueryDraft("");

                update({
                  q: null,
                });
              }}
            />
          )}

          {!fixedCategoryId &&
            selectedCategories.map((id) => (
              <Chip
                key={id}
                text={
                  categories.find((item) => String(item.id) === id)?.title ?? id
                }
                onRemove={() => toggle("categories", id)}
              />
            ))}

          {selectedColors.map((value) => (
            <Chip
              key={value}
              text={`رنگ: ${value}`}
              onRemove={() => toggle("colors", value)}
            />
          ))}

          {selectedTags.map((value) => (
            <Chip
              key={value}
              text={tagLabelMap.get(Number(value)) ?? value}
              onRemove={() => toggle("tags", value)}
            />
          ))}

          <button
            onClick={clear}
            className="flex items-center gap-1 px-2 py-1 text-xs font-bold text-red-600"
          >
            <RotateCcw size={13} />
            پاک‌کردن همه
          </button>
        </div>
      )}

      {/* Content */}

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hide-scrollbar sticky top-4 hidden max-h-[calc(100vh-2rem)] overflow-y-auto rounded-3xl border bg-white p-5 shadow-sm lg:block">
          {panel}
        </aside>

        <main>
          {filtered.length ? (
            <ProductGrid products={filtered} className="xl:grid-cols-3" />
          ) : (
            <ProductEmpty
              title="محصولی با این فیلترها پیدا نشد"
              description="فیلترها را تغییر دهید یا همه فیلترها را پاک کنید."
              buttonText="پاک‌کردن فیلترها"
              href={pathname}
            />
          )}
        </main>
      </div>

      {/* Mobile Filter */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              aria-label="بستن فیلترها"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 300,
              }}
              className="hide-scrollbar fixed inset-y-0 right-0 z-[100] w-[min(90vw,380px)] overflow-y-auto bg-white p-5 shadow-2xl lg:hidden"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-black">
                  <SlidersHorizontal size={21} />
                  فیلتر محصولات
                </h2>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {panel}

              <button
                onClick={() => setMobileOpen(false)}
                className="sticky bottom-2 mt-6 min-h-12 w-full rounded-xl bg-red-600 font-bold text-white"
              >
                نمایش {filtered.length.toLocaleString("fa-IR")} محصول
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function Chip({ text, onRemove }: { text: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700"
    >
      {text}

      <X size={13} />
    </button>
  );
}

interface FilterPanelProps {
  categories: Category[];
  fixedCategoryId?: number;

  selectedCategories: string[];
  selectedColors: string[];

  /*
   * QueryString است،
   * پس string[] باقی می‌ماند.
   */
  selectedTags: string[];

  colors: string[];

  /*
   * برای نمایش Label،
   * خود TagType را پاس می‌دهیم.
   */
  tags: TagType[];

  min: number;
  max: number;
  highestPrice: number;
  minRating: number;

  available: boolean;
  sale: boolean;
  featured: boolean;

  toggle: (key: "categories" | "colors" | "tags", value: string) => void;

  update: (changes: Record<string, string | null>) => void;

  clear: () => void;
}

function FilterPanel(props: FilterPanelProps) {
  const { update } = props;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-black">
          <SlidersHorizontal size={19} />
          فیلتر محصولات
        </h2>

        <button
          onClick={props.clear}
          className="text-xs font-bold text-red-600"
        >
          پاک‌کردن
        </button>
      </div>

      {!props.fixedCategoryId && (
        <Group title="دسته‌بندی">
          <div className="space-y-1.5">
            {props.categories.map((category) => (
              <CheckRow
                key={category.id}
                checked={props.selectedCategories.includes(String(category.id))}
                label={category.title}
                onClick={() => props.toggle("categories", String(category.id))}
              />
            ))}
          </div>
        </Group>
      )}

      <Group title="وضعیت محصول">
        <div className="space-y-2">
          <CheckRow
            checked={props.available}
            label="فقط کالاهای موجود"
            onClick={() =>
              update({
                available: props.available ? null : "1",
              })
            }
          />

          <CheckRow
            checked={props.sale}
            label="فقط محصولات تخفیف‌دار"
            onClick={() =>
              update({
                sale: props.sale ? null : "1",
              })
            }
          />

          <CheckRow
            checked={props.featured}
            label="محصولات ویژه"
            onClick={() =>
              update({
                featured: props.featured ? null : "1",
              })
            }
          />
        </div>
      </Group>

      <Group title="محدوده قیمت">
        <div className="grid grid-cols-2 gap-2">
          <PriceInput
            key={`min-${props.min}`}
            label="از"
            value={props.min || ""}
            placeholder="۰"
            onCommit={(value) =>
              update({
                min: value || null,
              })
            }
          />

          <PriceInput
            key={`max-${props.max}`}
            label="تا"
            value={props.max || ""}
            placeholder={
              props.highestPrice ? String(props.highestPrice) : "بدون محدودیت"
            }
            onCommit={(value) =>
              update({
                max: value || null,
              })
            }
          />
        </div>

        {props.highestPrice > 0 && (
          <p className="mt-2 text-[11px] text-slate-400">
            بیشترین قیمت: {formatToman(props.highestPrice)}
          </p>
        )}
      </Group>

      <Group title="حداقل امتیاز">
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                update({
                  rating: rating ? String(rating) : null,
                })
              }
              className={`rounded-xl border px-1 py-2 text-xs font-bold ${
                props.minRating === rating
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "bg-white text-slate-500"
              }`}
            >
              {rating ? `${rating}+ ⭐` : "همه"}
            </button>
          ))}
        </div>
      </Group>

      {props.colors.length > 0 && (
        <Group title="رنگ">
          <div className="flex flex-wrap gap-2">
            {props.colors.map((color) => (
              <button
                key={color}
                onClick={() => props.toggle("colors", color)}
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  props.selectedColors.includes(color)
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "bg-white text-slate-600"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </Group>
      )}

      {props.tags.length > 0 && (
        <Group title="ویژگی‌ها">
          <div className="flex flex-wrap gap-2">
            {props.tags.map((tag) => {
              /*
               * برای URL مقدار را string می‌کنیم.
               */
              const value = String(tag.value);

              const selected = props.selectedTags.includes(value);

              return (
                <button
                  key={tag.value}
                  onClick={() => props.toggle("tags", value)}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                    selected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "bg-white text-slate-600"
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </Group>
      )}
    </div>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details open className="group border-t pt-5">
      <summary className="mb-3 flex cursor-pointer list-none items-center justify-between font-black text-slate-800">
        {title}

        <ChevronDown size={17} className="transition group-open:rotate-180" />
      </summary>

      {children}
    </details>
  );
}

function CheckRow({
  checked,
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-right text-sm transition hover:bg-slate-50"
    >
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
          checked
            ? "border-red-500 bg-red-500 text-white"
            : "border-slate-300 bg-white"
        }`}
      >
        {checked && <Check size={14} />}
      </span>

      <span>{label}</span>
    </button>
  );
}

function PriceInput({
  label,
  value,
  placeholder,
  onCommit,
}: {
  label: string;
  value: number | "";
  placeholder: string;
  onCommit: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value ? String(value) : "");

  return (
    <label>
      <span className="mb-1 block text-[11px] text-slate-500">
        {label} (تومان)
      </span>

      <input
        value={draft}
        onChange={(event) => setDraft(event.target.value.replace(/\D/g, ""))}
        onBlur={() => onCommit(draft)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();

            onCommit(draft);
          }
        }}
        inputMode="numeric"
        placeholder={placeholder}
        className="w-full rounded-xl border px-3 py-2.5 text-xs outline-none focus:border-red-400"
      />
    </label>
  );
}
