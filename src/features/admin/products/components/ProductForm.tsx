"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Product } from "@/src/types/product";
import { productSchema } from "../validations/product.schema";

import Input from "@/src/features/admin/shared/ui/Input";
import Textarea from "@/src/features/admin/shared/ui/Textarea";
import Button from "@/src/features/admin/shared/ui/Button";

import ImageUpload from "@/src/features/admin/shared/components/ImageUpload";

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialValues?: Product | null;

  loading?: boolean;

  onSubmit: (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
}

export default function ProductForm({
  initialValues,

  loading = false,

  onSubmit,
}: ProductFormProps) {
  const {
    register,

    handleSubmit,

    reset,

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

      price: 0,

      oldPrice: undefined,

      discount: undefined,

      rating: 0,

      reviewCount: 0,

      stock: 0,

      sku: "",

      brand: "",

      categoryId: 1,

      tags: [],

      colors: [],

      specifications: [],

      status: "draft",

      isFeatured: false,
    },
  });

  const thumbnail = watch("thumbnail");

  useEffect(() => {
    reset({
      title: initialValues?.title ?? "",

      slug: initialValues?.slug ?? "",

      shortDescription: initialValues?.shortDescription ?? "",

      description: initialValues?.description ?? "",

      thumbnail: initialValues?.thumbnail ?? "",

      images: initialValues?.images ?? [],

      price: initialValues?.price ?? 0,

      oldPrice: initialValues?.oldPrice,

      discount: initialValues?.discount,

      rating: initialValues?.rating ?? 0,

      reviewCount: initialValues?.reviewCount ?? 0,

      stock: initialValues?.stock ?? 0,

      sku: initialValues?.sku ?? "",

      brand: initialValues?.brand ?? "",

      categoryId: initialValues?.categoryId ?? 1,

      tags: initialValues?.tags ?? [],

      colors: initialValues?.colors ?? [],

      specifications: initialValues?.specifications ?? [],

      status: initialValues?.status ?? "draft",

      isFeatured: initialValues?.isFeatured ?? false,
    });
  }, [initialValues, reset]);

  async function submitHandler(data: ProductFormValues) {
    await onSubmit({
      ...data,

      images: initialValues?.images ?? [],

      tags: initialValues?.tags ?? [],

      colors: initialValues?.colors ?? [],

      specifications: initialValues?.specifications ?? [],

      rating: initialValues?.rating ?? 0,

      reviewCount: initialValues?.reviewCount ?? 0,
    });

    if (!initialValues) {
      reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <Input
        label="عنوان محصول"
        placeholder="مثلاً iPhone 16 Pro"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="Slug"
        placeholder="iphone-16-pro"
        error={errors.slug?.message}
        {...register("slug")}
      />

      <Input
        label="توضیح کوتاه"
        placeholder="جدیدترین گوشی اپل"
        error={errors.shortDescription?.message}
        {...register("shortDescription")}
      />

      <Textarea
        label="توضیحات"
        rows={5}
        showCount
        maxLength={1000}
        error={errors.description?.message}
        {...register("description")}
      />

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

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="قیمت"
          type="number"
          error={errors.price?.message}
          {...register("price")}
        />

        <Input
          label="قیمت قبل"
          type="number"
          error={errors.oldPrice?.message}
          {...register("oldPrice")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="موجودی"
          type="number"
          error={errors.stock?.message}
          {...register("stock")}
        />

        <Input
          label="SKU"
          placeholder="APL-IP16PRO"
          error={errors.sku?.message}
          {...register("sku")}
        />
      </div>

      <Input
        label="برند"
        placeholder="Apple"
        error={errors.brand?.message}
        {...register("brand")}
      />

      <div className="flex items-center gap-3">
        <input type="checkbox" {...register("isFeatured")} />

        <span>محصول ویژه</span>
      </div>

      <div className="flex justify-end border-t pt-5">
        <Button type="submit" loading={loading}>
          {initialValues ? "ویرایش محصول" : "افزودن محصول"}
        </Button>
      </div>
    </form>
  );
}
