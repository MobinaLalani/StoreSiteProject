"use client";

import Link from "next/link";
import { forwardRef, SelectHTMLAttributes } from "react";
import { FolderTree, Loader2, RefreshCw } from "lucide-react";
import Select from "@/src/features/admin/shared/ui/Select";
import { useCategories } from "@/src/features/admin/categories/hooks/useCategories";

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> { error?: string }

const ProductCategorySelect = forwardRef<HTMLSelectElement, Props>(({ error, ...props }, ref) => {
  const { data: categories = [], isLoading, isError, refetch, isFetching } = useCategories();
  return <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
    <div className="mb-3 flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-red-500 shadow-sm"><FolderTree size={20} /></span><div><p className="text-sm font-bold text-slate-800">دسته‌بندی محصول</p><p className="mt-0.5 text-xs text-slate-500">محل نمایش محصول در فروشگاه</p></div></div>
    <Select ref={ref} aria-label="دسته‌بندی محصول" placeholder={isLoading ? "در حال دریافت..." : "یک دسته‌بندی انتخاب کنید"} options={categories.map(({ id, title }) => ({ label: title, value: id }))} disabled={isLoading || isError || categories.length === 0} error={error || (isError ? "دریافت دسته‌بندی‌ها ناموفق بود." : undefined)} {...props} />
    {isLoading && <p className="mt-2 flex items-center gap-2 text-xs text-slate-500"><Loader2 size={14} className="animate-spin" />در حال بارگذاری گزینه‌ها</p>}
    {isError && <button type="button" onClick={() => refetch()} disabled={isFetching} className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-red-600"><RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />تلاش دوباره</button>}
    {!isLoading && !isError && categories.length === 0 && <p className="mt-3 text-xs text-amber-700">دسته‌ای ثبت نشده است. <Link href="/admin/Categories" className="font-bold underline">ایجاد دسته‌بندی</Link></p>}
  </div>;
});

ProductCategorySelect.displayName = "ProductCategorySelect";
export default ProductCategorySelect;
