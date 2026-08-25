"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { TagType } from "@/src/types/tag";

import Input from "@/src/features/admin/shared/ui/Input";
import Button from "@/src/features/admin/shared/ui/Button";

const tagSchema = z.object({
  label: z.string().min(2, "عنوان تگ الزامی است."),
});

type TagFormValues = z.infer<typeof tagSchema>;

interface TagFormProps {
  initialValues?: TagType | null;

  loading?: boolean;

  onSubmit: (data: Omit<TagType, "value">) => Promise<void>;
}

export default function TagForm({
  initialValues,
  loading = false,
  onSubmit,
}: TagFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),

    defaultValues: {
      label: "",
    },
  });

  useEffect(() => {
    reset({
      label: initialValues?.label ?? "",
    });
  }, [initialValues, reset]);

  async function submitHandler(data: TagFormValues) {
    await onSubmit(data);

    if (!initialValues) {
      reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <Input
        label="عنوان تگ"
        placeholder="مثلاً پرفروش"
        error={errors.label?.message}
        {...register("label")}
      />

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button type="submit" loading={loading}>
          {initialValues ? "ویرایش تگ" : "افزودن تگ"}
        </Button>
      </div>
    </form>
  );
}
