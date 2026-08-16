import type { MetadataRoute } from "next";

import type { SiteSettings } from "@/src/features/admin/settings/types";
import { categoryRepository } from "@/src/repositories/category.repository";
import { productRepository } from "@/src/repositories/product.repository";
import { settingsRepository } from "@/src/repositories/settings.repository";
import { absoluteUrl } from "@/src/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, products, categories] = await Promise.all([
    settingsRepository.getPublic() as Promise<unknown> as Promise<SiteSettings>,
    productRepository.getAll(),
    categoryRepository.getAll(),
  ]);
  const activeProducts = products.filter((product) => product.status === "active");
  return [
    { url: absoluteUrl("/home", settings), lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/products", settings), lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...categories.filter((category) => activeProducts.some((product) => product.categoryId === category.id)).map((category) => ({ url: absoluteUrl(`/products/category/${encodeURIComponent(category.slug)}`, settings), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...activeProducts.map((product) => ({ url: absoluteUrl(`/products/${encodeURIComponent(product.slug)}`, settings), lastModified: product.updatedAt || product.createdAt, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
