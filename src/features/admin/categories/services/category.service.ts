import { Category } from "@/src/types/category";

const BASE_URL = "/api/categories";

async function categoryError(response: Response, fallback: string) {
  const body = await response.json().catch(() => null) as { message?: string } | null;
  return new Error(body?.message || fallback);
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }

  return response.json();
}

export async function createCategory(
  data: Omit<Category, "id">,
): Promise<Category> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw await categoryError(response, "ایجاد دسته‌بندی ناموفق بود.");
  }

  return response.json();
}

export async function updateCategory(
  id: number,
  data: Partial<Omit<Category, "id">>,
): Promise<Category> {
  const response = await fetch(`/api/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw await categoryError(response, "ویرایش دسته‌بندی ناموفق بود.");
  }

  return response.json();
}
export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw await categoryError(response, "حذف دسته‌بندی ناموفق بود.");
  }
}

export async function getCategoriesWithProducts() {
  const response = await fetch("/api/categories?includeProducts=true");

  if (!response.ok) {
    throw new Error("Failed to fetch categories with products.");
  }

  return response.json();
}
