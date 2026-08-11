import { notFound } from "next/navigation";

import CategoryBreadcrumb from "./CategoryBreadcrumb";
import CategorySectionHero from "./CategorySectionHero";
import CategoryInfo from "./CategoryInfo";
import ProductGrid from "../components/ProductSection/ProductGrid";

import { getCategoryData } from "./utils/getCategoryData";

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

  return (
    <main className="container mx-auto px-4 py-10">
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
