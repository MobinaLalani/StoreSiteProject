import type { Category } from "@/src/types/category";
import type { Product } from "@/src/types/product";

export type SearchableProduct = Product & { categoryTitle?: string };

export function normalizeSearchText(value: string) {
  return value.toLocaleLowerCase("fa").replace(/[يى]/g, "ی").replace(/ك/g, "ک").replace(/ة/g, "ه").replace(/[أإٱ]/g, "ا").replace(/[\u064B-\u065F\u0670\u200c\u200d]/g, " ").replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/g, " ");
}

function scoreProduct(product: SearchableProduct, terms: string[]) {
  const fields = [[product.title, 12], [product.categoryTitle ?? "", 9], [product.tags.join(" "), 8], [product.shortDescription, 6], [product.specifications.map(({ title, value }) => `${title} ${value}`).join(" "), 5], [product.colors.join(" "), 3], [product.description, 2], [product.slug, 1]] as const;
  const normalizedTitle = normalizeSearchText(product.title);
  let score = 0;
  for (const term of terms) {
    let matched = false;
    for (const [value, weight] of fields) {
      const normalized = normalizeSearchText(value);
      if (!normalized.includes(term)) continue;
      matched = true;
      score += weight + (normalized === term ? weight : 0) + (normalized.startsWith(term) ? 2 : 0);
    }
    if (!matched) return 0;
  }
  if (normalizedTitle.includes(terms.join(" "))) score += 15;
  return score;
}

export function searchProducts(products: SearchableProduct[], query: string) {
  const terms = normalizeSearchText(query).split(" ").filter(Boolean);
  if (!terms.length) return products;
  return products.map((product) => ({ product, score: scoreProduct(product, terms) })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score || b.product.rating - a.product.rating).map(({ product }) => product);
}

export function attachCategoryTitles(products: Product[], categories: Category[]): SearchableProduct[] {
  const categoryNames = new Map(categories.map((category) => [category.id, category.title]));
  return products.map((product) => ({ ...product, categoryTitle: categoryNames.get(product.categoryId) }));
}
