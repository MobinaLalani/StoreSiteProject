import fs from "fs/promises";
import path from "path";

import { Category } from "@/src/types/category";
import { Product } from "@/src/types/product";
const filePath = path.join(process.cwd(), "src", "data", "categories.json");
const productFilePath = path.join(
  process.cwd(),
  "src",
  "data",
  "products.json",
);export class CategoryRepository {
  async getAll(): Promise<Category[]> {
    const file = await fs.readFile(filePath, "utf-8");

    return JSON.parse(file);
  }

  async getById(id: number): Promise<Category | undefined> {
    const categories = await this.getAll();

    return categories.find((category) => category.id === id);
  }

  async create(data: Omit<Category, "id">): Promise<Category> {
    const categories = await this.getAll();

    const newCategory: Category = {
      id:
        categories.length > 0
          ? Math.max(...categories.map((item) => item.id)) + 1
          : 1,
      ...data,
    };

    categories.push(newCategory);

    await fs.writeFile(filePath, JSON.stringify(categories, null, 2), "utf-8");

    return newCategory;
  }

  async update(
    id: number,
    data: Partial<Omit<Category, "id">>,
  ): Promise<Category | null> {
    const categories = await this.getAll();

    const index = categories.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    categories[index] = {
      ...categories[index],
      ...data,
    };

    await fs.writeFile(filePath, JSON.stringify(categories, null, 2), "utf-8");

    return categories[index];
  }

  async delete(id: number): Promise<boolean> {
    const categories = await this.getAll();

    const filtered = categories.filter((item) => item.id !== id);

    if (filtered.length === categories.length) {
      return false;
    }

    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2), "utf-8");

    return true;
  }
  async getAllWithProducts(): Promise<(Category & { products: Product[] })[]> {
    const categories = await this.getAll();

    const productFile = await fs.readFile(productFilePath, "utf-8");
    const products: Product[] = JSON.parse(productFile);

    return categories.map((category) => ({
      ...category,
      products: products.filter(
        (product) => product.categoryId === category.id,
      ),
    }));
  }
}

export const categoryRepository = new CategoryRepository();