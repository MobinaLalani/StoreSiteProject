import { Product } from "@/src/types/product";

const BASE_URL = "/api/products";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  return response.json();
}

export async function createProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">,
): Promise<Product> {
  const response = await fetch(BASE_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create product.");
  }

  return response.json();
}

export async function updateProduct(
  id: number,
  data: Partial<Omit<Product, "id">>,
): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();

    console.log(error);

    throw new Error(error);
  }

  return response.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product.");
  }
}

export const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};