import { notFound } from "next/navigation";

import CategoryBreadcrumb from "./CategoryBreadcrumb";
import CategorySectionHero from "./CategorySectionHero";
import CategoryInfo from "./CategoryInfo";
import ProductGrid from "../components/ProductSection/ProductGrid";

import { getCategoryData } from "./utils/getCategoryData";

interface ProductCategoryPageProps {
  slug: string;
}

export default function ProductCategoryPage({
  slug,
}: ProductCategoryPageProps) {
  const data = getCategoryData(slug);

  if (!data) {
    notFound();
  }

  const { category, products, productCount, brandCount, averageRating } = data;

  return (
    <main className="container mx-auto px-4 py-10">
      <CategoryBreadcrumb title={category.title} />

      <CategorySectionHero
        title={category.title}
        description={category.description}
        image={category.image}
        slug={category.slug}
        productCount={productCount}
        brandCount={brandCount}
        averageRating={averageRating}
      />

      <CategoryInfo
        productCount={productCount}
        brandCount={brandCount}
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
