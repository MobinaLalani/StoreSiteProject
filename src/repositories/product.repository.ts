import fs from "fs/promises";
import path from "path";

import { Product } from "@/src/types/product";

const filePath = path.join(process.cwd(), "src", "data", "products.json");

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    const file = await fs.readFile(filePath, "utf-8");

    return JSON.parse(file);
  }

  async getById(id: number): Promise<Product | undefined> {
    const products = await this.getAll();

    return products.find((product) => product.id === id);
  }

  async create(
    data: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ): Promise<Product> {
    const products = await this.getAll();

    const now = new Date().toISOString();

    const newProduct: Product = {
      id:
        products.length > 0
          ? Math.max(...products.map((item) => item.id)) + 1
          : 1,

      ...data,

      createdAt: now,

      updatedAt: now,
    };

    products.push(newProduct);

    await fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf-8");

    return newProduct;
  }

  async update(
    id: number,
    data: Partial<Omit<Product, "id">>,
  ): Promise<Product | null> {
    const products = await this.getAll();

    const index = products.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    products[index] = {
      ...products[index],

      ...data,

      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf-8");

    return products[index];
  }

  async delete(id: number): Promise<boolean> {
    const products = await this.getAll();

    const filtered = products.filter((item) => item.id !== id);

    if (filtered.length === products.length) {
      return false;
    }

    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2), "utf-8");

    return true;
  }
}

export const productRepository = new ProductRepository();
