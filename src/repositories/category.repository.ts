import { Category } from "@/src/types/category";
import { Product } from "@/src/types/product";
import { readJson, updateJson } from "@/src/lib/json-store";
const filename = "categories.json";
export class CategoryRepository {
  async getAll(): Promise<Category[]> {
    return readJson<Category[]>(filename, []);
  }

  async getById(id: number): Promise<Category | undefined> {
    const categories = await this.getAll();

    return categories.find((category) => category.id === id);
  }

  async create(data: Omit<Category, "id">): Promise<Category> {
    let newCategory!: Category;
    await updateJson<Category[]>(filename, [], (categories) => {
      newCategory = { id: categories.length ? Math.max(...categories.map((item) => item.id)) + 1 : 1, ...data };
      return [...categories, newCategory];
    });
    return newCategory;
  }

  async update(
    id: number,
    data: Partial<Omit<Category, "id">>,
  ): Promise<Category | null> {
    let updated: Category | null = null;
    await updateJson<Category[]>(filename, [], (categories) => categories.map((category) => {
      if (category.id !== id) return category;
      updated = { ...category, ...data };
      return updated;
    }));
    return updated;
  }

  async delete(id: number): Promise<boolean> {
    let deleted = false;
    await updateJson<Category[]>(filename, [], (categories) => categories.filter((item) => {
      if (item.id === id) deleted = true;
      return item.id !== id;
    }));
    return deleted;
  }
  async getAllWithProducts(activeOnly = false): Promise<(Category & { products: Product[] })[]> {
    const categories = await this.getAll();

    const products = await readJson<Product[]>("products.json", []);

    return categories.map((category) => ({
      ...category,
      products: products.filter(
        (product) => product.categoryId === category.id && (!activeOnly || product.status === "active"),
      ),
    }));
  }
}

export const categoryRepository = new CategoryRepository();
