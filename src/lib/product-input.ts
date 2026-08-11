import type { Product } from "@/src/types/product";

const fields = ["title", "slug", "shortDescription", "description", "thumbnail", "images", "price", "oldPrice", "discount", "rating", "reviewCount", "stock", "sku", "brand", "categoryId", "tags", "colors", "specifications", "status", "isFeatured"] as const;

export function filterProduct(body: Record<string, unknown>) {
  return Object.fromEntries(fields.filter((key) => key in body).map((key) => [key, body[key]])) as Partial<Product>;
}

export function validateProduct(data: Partial<Product>, creating: boolean) {
  const errors: Record<string, string> = {};
  for (const field of ["title", "slug", "shortDescription", "description", "thumbnail", "sku", "brand"] as const)
    if ((creating || field in data) && (typeof data[field] !== "string" || !data[field]?.trim())) errors[field] = `${field} is required`;
  for (const field of ["stock", "categoryId"] as const)
    if ((creating || field in data) && (typeof data[field] !== "number" || Number(data[field]) < 0)) errors[field] = `${field} must be a positive number`;
  for (const field of ["images", "tags", "colors", "specifications"] as const)
    if (field in data && !Array.isArray(data[field])) errors[field] = `${field} must be an array`;
  if (data.status && !["active", "draft", "archived"].includes(data.status)) errors.status = "Invalid status";
  return errors;
}
