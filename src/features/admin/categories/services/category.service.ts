import { Category } from "@/src/types/category";

const BASE_URL = "/api/categories";

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
    throw new Error("Failed to create category.");
  }

  return response.json();
}

export async function updateCategory(
  id: number,
  data: Partial<Omit<Category, "id">>,
): Promise<Category> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update category.");
  }

  return response.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete category.");
  }
}
