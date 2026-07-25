"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Category } from "@/src/types/category";

const categorySchema = z.object({
  title: z.string().min(2, "عنوان الزامی است."),
  slug: z.string().min(2, "Slug الزامی است."),
  image: z.string().min(1, "آدرس تصویر الزامی است."),
  description: z.string().min(5, "توضیحات الزامی است."),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialValues?: Category | null;
  loading?: boolean;
  onSubmit: (data: Omit<Category, "id">) => Promise<void>;
}

export default function CategoryForm({
  initialValues,
  loading = false,
  onSubmit,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      title: "",
      slug: "",
      image: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title,
        slug: initialValues.slug,
        image: initialValues.image,
        description: initialValues.description,
      });
    } else {
      reset({
        title: "",
        slug: "",
        image: "",
        description: "",
      });
    }
  }, [initialValues, reset]);

  const submitHandler = async (data: CategoryFormValues) => {
    await onSubmit(data);

    if (!initialValues) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      {/* Title */}

      <div>
        <label className="mb-2 block font-medium">عنوان</label>

        <input
          {...register("title")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          placeholder="مثلاً موبایل"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Slug */}

      <div>
        <label className="mb-2 block font-medium">Slug</label>

        <input
          {...register("slug")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          placeholder="mobile"
        />

        {errors.slug && (
          <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>
        )}
      </div>

      {/* Image */}

      <div>
        <label className="mb-2 block font-medium">مسیر تصویر</label>

        <input
          {...register("image")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          placeholder="/Image/categories/mobile.jpg"
        />

        {errors.image && (
          <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-medium">توضیحات</label>

        <textarea
          rows={4}
          {...register("description")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          placeholder="توضیحات دسته بندی..."
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Buttons */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "در حال ذخیره..." : "ذخیره"}
        </button>
      </div>
    </form>
  );
}
