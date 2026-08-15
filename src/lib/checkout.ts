import { z } from "zod";

export const checkoutSchema = z.object({
  items: z.array(z.object({ productId: z.number().int().positive(), quantity: z.number().int().min(1).max(99) })).min(1),
  customer: z.object({
    fullName: z.string().trim().min(3).max(100),
    mobile: z.string().trim().regex(/^09\d{9}$/),
    email: z.string().trim().email().or(z.literal("")),
    province: z.string().trim().min(2).max(60),
    city: z.string().trim().min(2).max(60),
    address: z.string().trim().min(10).max(500),
    postalCode: z.string().trim().regex(/^\d{10}$/),
    note: z.string().trim().max(500).default(""),
  }),
});

export const shippingCost = Number(process.env.SHIPPING_COST_TOMAN) || 0;
export const freeShippingMinimum = Number(process.env.FREE_SHIPPING_MINIMUM_TOMAN) || 0;
