import type { Category } from "@/src/types/category";

export function categoryInput(body: Record<string, unknown>) {
  return Object.fromEntries(["title", "slug", "image", "description"].filter((key) => key in body).map((key) => [key, body[key]])) as Partial<Category>;
}

export function categoryErrors(data: Partial<Category>, creating: boolean) {
  const errors: Record<string, string> = {};
  for (const field of ["title", "slug"] as const) if ((creating || field in data) && (typeof data[field] !== "string" || !data[field]?.trim())) errors[field] = `${field} is required`;
  for (const field of ["image", "description"] as const) if (field in data && typeof data[field] !== "string") errors[field] = `${field} must be a string`;
  return errors;
}
