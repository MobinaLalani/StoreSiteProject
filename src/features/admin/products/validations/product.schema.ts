import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2, "عنوان الزامی است."),

  slug: z.string().min(2, "Slug الزامی است."),

  shortDescription: z.string().min(5, "توضیح کوتاه الزامی است."),

  description: z.string().min(10, "توضیحات الزامی است."),

  thumbnail: z.string().min(1, "تصویر اصلی الزامی است."),

  images: z.array(z.string()),

  rating: z.coerce.number().min(0).max(5).default(0),

  reviewCount: z.coerce.number().default(0),

  stock: z.coerce.number().min(0),

  categoryId: z.coerce.number(),

  tags: z.array(z.string()),

  colors: z.array(z.string()),

  specifications: z.array(
    z.object({
      title: z.string(),
      value: z.string(),
    }),
  ),

  status: z.enum(["active", "draft", "archived"]),

  isFeatured: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
