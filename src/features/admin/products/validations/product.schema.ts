import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2, "عنوان الزامی است."),

  slug: z.string().min(2, "Slug الزامی است."),

  shortDescription: z.string().min(5, "توضیح کوتاه الزامی است."),

  description: z.string().min(10, "توضیحات الزامی است."),

  thumbnail: z.string().min(1, "تصویر اصلی الزامی است."),

  images: z.array(z.string()),

  price: z.coerce.number().positive("قیمت باید بیشتر از صفر باشد."),

  oldPrice: z.coerce.number().optional(),

  discount: z.coerce.number().optional(),

  rating: z.coerce.number().default(0),

  reviewCount: z.coerce.number().default(0),

  stock: z.coerce.number().min(0),

  sku: z.string().min(2, "SKU الزامی است."),

  brand: z.string().min(2, "برند الزامی است."),

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
