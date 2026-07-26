import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3),

  slug: z.string().min(3),

  shortDescription: z.string(),

  description: z.string(),

  thumbnail: z.string(),

  images: z.array(z.string()),

  price: z.number().positive(),

  oldPrice: z.number().optional(),

  discount: z.number().optional(),

  stock: z.number(),

  sku: z.string(),

  brand: z.string(),

  categoryId: z.number(),

  tags: z.array(z.string()),

  colors: z.array(z.string()),

  specifications: z.array(
    z.object({
      title: z.string(),
      value: z.string(),
    }),
  ),

  status: z.enum(["active", "inactive"]),

  isFeatured: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
