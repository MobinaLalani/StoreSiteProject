import { notFound } from "next/navigation";

import CategoryBreadcrumb from "./CategoryBreadcrumb";
import CategorySectionHero from "./CategorySectionHero";
import CategoryInfo from "./CategoryInfo";
import ProductGrid from "../components/ProductSection/ProductGrid";

import { getCategoryData } from "./utils/getCategoryData";
import { settingsRepository } from "@/src/repositories/settings.repository";
import type { SiteSettings } from "@/src/features/admin/settings/types";
import { absoluteUrl, safeJsonLd } from "@/src/lib/seo";

interface ProductCategoryPageProps {
  slug: string;
}

export default async function ProductCategoryPage({
  slug,
}: ProductCategoryPageProps) {
  const data = await getCategoryData(slug);

  if (!data) {
    notFound();
  }

  const { category, products, productCount, averageRating } = data;
  const settings = await settingsRepository.getPublic() as unknown as SiteSettings;
  const canonical = absoluteUrl(`/products/category/${encodeURIComponent(category.slug)}`, settings);
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${canonical}#collection`, name: `محصولات ${category.title}`, description: category.description, url: canonical, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "خانه", item: absoluteUrl("/", settings) }, { "@type": "ListItem", position: 2, name: "محصولات", item: absoluteUrl("/products", settings) }, { "@type": "ListItem", position: 3, name: category.title, item: canonical }] }, mainEntity: { "@type": "ItemList", numberOfItems: productCount, itemListElement: products.map((product, index) => ({ "@type": "ListItem", position: index + 1, url: absoluteUrl(`/products/${encodeURIComponent(product.slug)}`, settings), name: product.title })) } };

  return (
    <main className="container mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
      <CategoryBreadcrumb title={category.title} />

      <CategorySectionHero
        title={category.title}
        description={category.description}
        image={category.image}
        slug={category.slug}
        productCount={productCount}
        averageRating={averageRating}
      />

      <CategoryInfo
        productCount={productCount}
        averageRating={averageRating}
      />

      <section className="mt-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">محصولات {category.title}</h2>

            <p className="mt-2 text-gray-500">
              {productCount} محصول در این دسته
            </p>
          </div>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}
