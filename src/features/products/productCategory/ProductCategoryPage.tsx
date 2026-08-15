import { notFound } from "next/navigation";
import CategoryBreadcrumb from "./CategoryBreadcrumb";
import CategorySectionHero from "./CategorySectionHero";
import CategoryInfo from "./CategoryInfo";
import ProductExplorer from "../filtering/ProductExplorer";
import { getCategoryData } from "./utils/getCategoryData";
import { settingsRepository } from "@/src/repositories/settings.repository";
import { categoryRepository } from "@/src/repositories/category.repository";
import type { SiteSettings } from "@/src/features/admin/settings/types";
import { absoluteUrl, safeJsonLd } from "@/src/lib/seo";

export default async function ProductCategoryPage({ slug }: { slug: string }) {
  const data = await getCategoryData(slug); if (!data) notFound();
  const { category, products, productCount, averageRating } = data;
  const [settings, categories] = await Promise.all([settingsRepository.getPublic() as Promise<unknown> as Promise<SiteSettings>, categoryRepository.getAll()]);
  const canonical = absoluteUrl(`/products/category/${encodeURIComponent(category.slug)}`, settings);
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${canonical}#collection`, name: `محصولات ${category.title}`, description: category.description, url: canonical, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "خانه", item: absoluteUrl("/", settings) }, { "@type": "ListItem", position: 2, name: "محصولات", item: absoluteUrl("/products", settings) }, { "@type": "ListItem", position: 3, name: category.title, item: canonical }] }, mainEntity: { "@type": "ItemList", numberOfItems: productCount, itemListElement: products.map((product, index) => ({ "@type": "ListItem", position: index + 1, url: absoluteUrl(`/products/${encodeURIComponent(product.slug)}`, settings), name: product.title })) } };
  return <main className="container mx-auto px-4 py-10"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}/><CategoryBreadcrumb title={category.title}/><CategorySectionHero title={category.title} description={category.description} image={category.image} slug={category.slug} productCount={productCount} averageRating={averageRating}/><CategoryInfo productCount={productCount} averageRating={averageRating}/><div className="-mx-4 mt-10"><ProductExplorer products={products} categories={categories} fixedCategoryId={category.id} title={`محصولات ${category.title}`} description={`فیلتر و مرتب‌سازی محصولات دسته ${category.title}`}/></div></main>;
}
