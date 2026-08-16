"use client";

import { useEffect, useState } from "react";
import { Plus, Star, X } from "lucide-react";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Product } from "@/src/types/product";
import { productSchema } from "../validations/product.schema";

import Input from "@/src/features/admin/shared/ui/Input";
import Textarea from "@/src/features/admin/shared/ui/Textarea";
import Button from "@/src/features/admin/shared/ui/Button";
import ProductCategorySelect from "./ProductCategorySelect";

import ImageUpload from "@/src/features/admin/shared/components/ImageUpload";

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialValues?: Product | null;

  loading?: boolean;

  submissionError?: string;

  onSubmit: (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
}

export default function ProductForm({
  initialValues,

  loading = false,

  submissionError,

  onSubmit,
}: ProductFormProps) {
  const {
    register,

    handleSubmit,

    reset,

    control,

    watch,

    setValue,

    formState: { errors },
  } = useForm<
    z.input<typeof productSchema>,
    unknown,
    z.output<typeof productSchema>
  >({
    resolver: zodResolver(productSchema),

    defaultValues: {
      title: "",

      slug: "",

      shortDescription: "",

      description: "",

      thumbnail: "",

      images: [],

      rating: 0,

      reviewCount: 0,

      stock: 0,

      price: 0,

      salePrice: null,

      categoryId: 0,

      tags: [],

      colors: [],

      specifications: [],

      status: "active",

      isFeatured: false,

      isWholesaleAvailable: false,
    },
  });

  const thumbnail = watch("thumbnail");
  const images = watch("images") ?? [];
  const rating = Number(watch("rating") ?? 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { fields: specificationFields, append: appendSpecification, remove: removeSpecification } = useFieldArray({ control, name: "specifications" });

  useEffect(() => {
    reset({
      title: initialValues?.title ?? "",

      slug: initialValues?.slug ?? "",

      shortDescription: initialValues?.shortDescription ?? "",

      description: initialValues?.description ?? "",

      thumbnail: initialValues?.thumbnail ?? "",

      images: initialValues?.images ?? [],

      rating: initialValues?.rating ?? 0,

      reviewCount: initialValues?.reviewCount ?? 0,

      stock: initialValues?.stock ?? 0,

      price: initialValues?.price ?? 0,

      salePrice: initialValues?.salePrice ?? null,

      categoryId: initialValues?.categoryId ?? 0,

      tags: initialValues?.tags ?? [],

      colors: initialValues?.colors ?? [],

      specifications: initialValues?.specifications ?? [],

      status: initialValues?.status ?? "active",

      isFeatured: initialValues?.isFeatured ?? false,

      isWholesaleAvailable: initialValues?.isWholesaleAvailable ?? false,
    });
  }, [initialValues, reset]);

  async function submitHandler(data: ProductFormValues) {
    await onSubmit(data);

    if (!initialValues) {
      reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="mb-5"><h3 className="font-black text-slate-900">اطلاعات اصلی</h3><p className="mt-1 text-xs text-slate-500">مشخصات پایه و محل نمایش محصول را تعیین کنید.</p></div>
        <div className="grid gap-5 md:grid-cols-2">
      <Input
        label="عنوان محصول"
        placeholder="مثلاً iPhone 16 Pro"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="Slug"
        placeholder="iphone-16-pro"
        error={errors.slug?.message || (submissionError?.includes("آدرس محصول") ? submissionError : undefined)}
        hint="این مقدار آدرس اختصاصی محصول است و نمی‌تواند تکراری باشد."
        {...register("slug")}
      />

      <Input
        label="توضیح کوتاه"
        placeholder="جدیدترین گوشی اپل"
        error={errors.shortDescription?.message}
        {...register("shortDescription")}
      />

      <ProductCategorySelect error={errors.categoryId?.message} {...register("categoryId")} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="mb-5"><h3 className="font-black text-slate-900">معرفی محصول</h3><p className="mt-1 text-xs text-slate-500">این متن در بخش «معرفی محصول» صفحه جزئیات نمایش داده می‌شود.</p></div>
      <Textarea
        label="متن معرفی محصول"
        rows={5}
        showCount
        maxLength={1000}
        error={errors.description?.message}
        {...register("description")}
      />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-black text-slate-900">مشخصات فنی</h3>
            <p className="mt-1 text-xs text-slate-500">هر مورد در جدول مشخصات فنی صفحه محصول نمایش داده می‌شود.</p>
          </div>
          <button type="button" onClick={() => appendSpecification({ title: "", value: "" })} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white">
            <Plus size={17} />افزودن مشخصه
          </button>
        </div>
        <div className="space-y-3">
          {specificationFields.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">هنوز مشخصه‌ای ثبت نشده است.</p>}
          {specificationFields.map((field, index) => (
            <div key={field.id} className="grid gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <Input label="عنوان مشخصه" placeholder="مثلاً جنس بدنه" {...register(`specifications.${index}.title`)} />
              <Input label="مقدار" placeholder="مثلاً آلومینیوم" {...register(`specifications.${index}.value`)} />
              <button type="button" onClick={() => removeSpecification(index)} aria-label="حذف مشخصه" className="flex min-h-11 items-center justify-center rounded-xl bg-red-50 px-3 text-red-600 hover:bg-red-100">
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-5"><h3 className="font-black text-slate-900">تصاویر و موجودی</h3><p className="mt-1 text-xs text-slate-500">تصویر اصلی، گالری و تعداد موجود را مدیریت کنید.</p></div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">تصویر اصلی محصول</p>

        <ImageUpload
          value={thumbnail}
          onChange={(url) => {
            setValue("thumbnail", url as string, {
              shouldValidate: true,
            });
          }}
        />

        {errors.thumbnail && (
          <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <Input
          label="موجودی"
          type="number"
          error={errors.stock?.message}
          {...register("stock")}
        />
        <Input label="قیمت (تومان)" type="number" min="0" error={errors.price?.message} {...register("price")} />
        <Input label="قیمت فروش ویژه (اختیاری)" type="number" min="0" error={errors.salePrice?.message} {...register("salePrice")} />
      </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-gray-800">امتیاز محصول</p>
            <p className="mt-1 text-xs text-gray-500">برای تعیین امتیاز روی یکی از ستاره‌ها کلیک کنید.</p>
          </div>

          <div
            className="flex items-center gap-1"
            dir="ltr"
            onMouseLeave={() => setHoveredRating(0)}
          >
            {[1, 2, 3, 4, 5].map((value) => {
              const active = value <= (hoveredRating || rating);
              return (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} ستاره`}
                  title={`${value} ستاره`}
                  onMouseEnter={() => setHoveredRating(value)}
                  onFocus={() => setHoveredRating(value)}
                  onBlur={() => setHoveredRating(0)}
                  onClick={() => {
                    setValue("rating", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  className="rounded-lg p-1 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300"
                >
                  <Star
                    size={30}
                    className={active
                      ? "fill-amber-400 text-amber-400"
                      : "fill-transparent text-gray-300"}
                  />
                </button>
              );
            })}
            <span className="ml-2 min-w-8 text-center text-sm font-bold text-gray-600">
              {rating}/5
            </span>
          </div>
        </div>

        {errors.rating && (
          <p className="mt-3 text-sm text-red-500">{errors.rating.message}</p>
        )}
      </section>

      <section className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div>
          <p className="text-sm font-medium text-gray-700">گالری تصاویر محصول</p>
          <p className="mt-1 text-xs text-gray-500">می‌توانید چند تصویر را هم‌زمان انتخاب کنید. برای حذف هر تصویر روی علامت × بزنید.</p>
        </div>

        <ImageUpload
          multiple
          value={images}
          onChange={(urls) => {
            setValue("images", urls as string[], {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />

        {errors.images && (
          <p className="text-sm text-red-500">{errors.images.message}</p>
        )}
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"><span><strong className="block text-sm text-slate-800">محصول ویژه</strong><small className="mt-1 block text-xs text-slate-500">محصول با نشان پیشنهاد ویژه نمایش داده شود.</small></span><input type="checkbox" className="h-5 w-5 accent-red-600" {...register("isFeatured")} /></label>
        <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 p-4"><span><strong className="block text-sm text-amber-950">فروش عمده دارد</strong><small className="mt-1 block text-xs text-amber-800">اطلاعات تماس عمده‌فروشی در صفحه این محصول نمایش داده شود.</small></span><input type="checkbox" className="h-5 w-5 accent-amber-600" {...register("isWholesaleAvailable")} /></label>
      </div>

      <div className="sticky bottom-0 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,.08)] backdrop-blur sm:flex-row sm:items-center sm:justify-end">
        {submissionError && !submissionError.includes("آدرس محصول") && <p role="alert" className="ml-auto rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{submissionError}</p>}
        <Button type="submit" loading={loading} size="lg" className="bg-red-600 hover:bg-red-700">
          {initialValues ? "ویرایش محصول" : "افزودن محصول"}
        </Button>
      </div>
    </form>
  );
}
