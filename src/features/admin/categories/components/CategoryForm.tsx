"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Category } from "@/src/types/category";

import Input from "@/src/features/admin/shared/ui/Input";
import Textarea from "@/src/features/admin/shared/ui/Textarea";
import Button from "@/src/features/admin/shared/ui/Button";

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
    reset({
      title: initialValues?.title ?? "",
      slug: initialValues?.slug ?? "",
      image: initialValues?.image ?? "",
      description: initialValues?.description ?? "",
    });
  }, [initialValues, reset]);

  async function submitHandler(data: CategoryFormValues) {
    await onSubmit(data);

    if (!initialValues) {
      reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <Input
        label="عنوان"
        placeholder="مثلاً موبایل"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="Slug"
        placeholder="mobile"
        error={errors.slug?.message}
        hint="فقط حروف انگلیسی و خط تیره"
        {...register("slug")}
      />

      <Input
        label="تصویر"
        placeholder="/Image/categories/mobile.jpg"
        error={errors.image?.message}
        {...register("image")}
      />

      <Textarea
        label="توضیحات"
        placeholder="توضیحات دسته بندی..."
        rows={5}
        showCount
        maxLength={500}
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button type="submit" loading={loading}>
          {initialValues ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
        </Button>
      </div>
    </form>
  );
}
