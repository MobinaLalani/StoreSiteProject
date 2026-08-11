import { Product } from "@/src/types/product";
import { readJson, updateJson } from "@/src/lib/json-store";

const filename = "products.json";

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    return readJson<Product[]>(filename, []);
  }

  async getById(id: number): Promise<Product | undefined> {
    const products = await this.getAll();

    return products.find((product) => product.id === id);
  }

  async create(
    data: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ): Promise<Product> {
    let newProduct!: Product;
    await updateJson<Product[]>(filename, [], (products) => {
      const now = new Date().toISOString();
      newProduct = { id: products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1, ...data, createdAt: now, updatedAt: now };
      return [...products, newProduct];
    });
    return newProduct;
  }

  async update(
    id: number,
    data: Partial<Omit<Product, "id">>,
  ): Promise<Product | null> {
    let updated: Product | null = null;
    await updateJson<Product[]>(filename, [], (products) => products.map((product) => {
      if (product.id !== id) return product;
      const { id: _id, createdAt: _createdAt, ...safeData } = data as Partial<Product>;
      void _id; void _createdAt;
      updated = { ...product, ...safeData, updatedAt: new Date().toISOString() };
      return updated;
    }));
    return updated;
  }

  async delete(id: number): Promise<boolean> {
    let deleted = false;
    await updateJson<Product[]>(filename, [], (products) => products.filter((item) => {
      if (item.id === id) deleted = true;
      return item.id !== id;
    }));
    return deleted;
  }
}

export const productRepository = new ProductRepository();
