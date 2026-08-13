import { Product } from "@/src/types/product";
import { readJson, updateJson } from "@/src/lib/json-store";

const filename = "products.json";
export class DuplicateProductSlugError extends Error { constructor() { super("این آدرس محصول قبلاً استفاده شده است."); this.name = "DuplicateProductSlugError"; } }
export function normalizeProductSlug(slug: string) { return slug.trim().replace(/^\/+|\/+$/g, "").toLocaleLowerCase("en-US"); }

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
      const slug = normalizeProductSlug(data.slug);
      if (products.some((product) => normalizeProductSlug(product.slug) === slug)) throw new DuplicateProductSlugError();
      const now = new Date().toISOString();
      newProduct = { id: products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1, ...data, slug, createdAt: now, updatedAt: now };
      return [...products, newProduct];
    });
    return newProduct;
  }

  async update(
    id: number,
    data: Partial<Omit<Product, "id">>,
  ): Promise<Product | null> {
    let updated: Product | null = null;
    await updateJson<Product[]>(filename, [], (products) => {
      const nextSlug = data.slug === undefined ? undefined : normalizeProductSlug(data.slug);
      if (nextSlug && products.some((product) => product.id !== id && normalizeProductSlug(product.slug) === nextSlug)) throw new DuplicateProductSlugError();
      return products.map((product) => {
      if (product.id !== id) return product;
      const { id: _id, createdAt: _createdAt, ...safeData } = data as Partial<Product>;
      void _id; void _createdAt;
      updated = { ...product, ...safeData, ...(nextSlug ? { slug: nextSlug } : {}), updatedAt: new Date().toISOString() };
      return updated;
      });
    });
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
