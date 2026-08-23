import type { MetadataRoute } from "next";

import type { SiteSettings } from "@/src/features/admin/settings/types";
import { absoluteUrl } from "@/src/lib/seo";
import { categoryRepository } from "@/src/repositories/category.repository";
import { productRepository } from "@/src/repositories/product.repository";
import { settingsRepository } from "@/src/repositories/settings.repository";

export const revalidate = 3600;

/**
 * URL را برای sitemap استاندارد می‌کند.
 *
 * - همیشه HTTPS
 * - حذف trailing slash اضافه
 */
function normalizeSitemapUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);

    // برای SEO نسخه اصلی سایت را HTTPS در نظر می‌گیریم
    parsedUrl.protocol = "https:";

    // به جز root، trailing slash را حذف می‌کنیم
    if (parsedUrl.pathname !== "/") {
      parsedUrl.pathname = parsedUrl.pathname.replace(/\/+$/, "");
    }

    return parsedUrl.toString();
  } catch {
    return url.replace(/^http:\/\//i, "https://");
  }
}

/**
 * ساخت URL نهایی sitemap
 */
function createSitemapUrl(path: string, settings: SiteSettings): string {
  return normalizeSitemapUrl(absoluteUrl(path, settings));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [rawSettings, products, categories] = await Promise.all([
    settingsRepository.getPublic(),
    productRepository.getAll(),
    categoryRepository.getAll(),
  ]);

  const settings = rawSettings as unknown as SiteSettings;

  /**
   * فقط محصولاتی که واقعاً قابل نمایش هستند
   */
  const activeProducts = products.filter(
    (product) => product.status === "active" && Boolean(product.slug?.trim()),
  );

  /**
   * فقط categoryهایی که:
   * 1. slug معتبر دارند
   * 2. حداقل یک محصول active دارند
   */
  const activeCategories = categories.filter(
    (category) =>
      Boolean(category.slug?.trim()) &&
      activeProducts.some((product) => product.categoryId === category.id),
  );

  /**
   * صفحات ثابت
   */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: createSitemapUrl("/", settings),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: createSitemapUrl("/products", settings),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  /**
   * صفحات دسته‌بندی
   */
  const categoryPages: MetadataRoute.Sitemap = activeCategories.map(
    (category) => {
      const categoryProducts = activeProducts.filter(
        (product) => product.categoryId === category.id,
      );

      /**
       * آخرین زمان تغییر یکی از محصولات این category
       */
      const lastModified = categoryProducts.reduce<Date | undefined>(
        (latestDate, product) => {
          const rawDate = product.updatedAt ?? product.createdAt;

          if (!rawDate) {
            return latestDate;
          }

          const currentDate = new Date(rawDate);

          if (Number.isNaN(currentDate.getTime())) {
            return latestDate;
          }

          if (!latestDate || currentDate > latestDate) {
            return currentDate;
          }

          return latestDate;
        },
        undefined,
      );

      const slug = category.slug.trim();

      return {
        url: createSitemapUrl(
          `/products/category/${encodeURIComponent(slug)}`,
          settings,
        ),

        ...(lastModified
          ? {
              lastModified,
            }
          : {}),

        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    },
  );

  /**
   * صفحات محصول
   */
  const productPages: MetadataRoute.Sitemap = activeProducts.map((product) => {
    const rawDate = product.updatedAt ?? product.createdAt;

    let lastModified: Date | undefined;

    if (rawDate) {
      const parsedDate = new Date(rawDate);

      if (!Number.isNaN(parsedDate.getTime())) {
        lastModified = parsedDate;
      }
    }

    const slug = product.slug.trim();

    return {
      url: createSitemapUrl(`/products/${encodeURIComponent(slug)}`, settings),

      ...(lastModified
        ? {
            lastModified,
          }
        : {}),

      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  /**
   * حذف URLهای duplicate
   */
  const allPages: MetadataRoute.Sitemap = [
    ...staticPages,
    ...categoryPages,
    ...productPages,
  ];

  const uniquePages = Array.from(
    new Map(allPages.map((page) => [page.url, page])).values(),
  );

  return uniquePages;
}
