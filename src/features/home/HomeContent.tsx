"use client";

import Hero from "./hero/Hero";
import Categories from "./Categories";
import HomeCallToAction from "./HomeCallToAction";
import ProductSection from "@/src/features/products/components/ProductSection/ProductSection";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";
import type { Product } from "@/src/types/product";
import type { Category } from "@/src/types/category";

export default function HomeContent({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const { data } = usePublicSettings();

  return (
    <div className="overflow-hidden bg-[#e9e7e2]">
      <Hero products={products} categoryCount={categories.length} />
      {data?.appearance.showCategories !== false && (
        <Categories categories={categories} />
      )}
      {data?.appearance.showFeaturedProducts !== false && (
        <div className="relative bg-[#e9e7e2]">
          <ProductSection
            products={products}
            title="تازه‌ترین محصولات"
            description="جدیدترین محصولات اضافه‌شده به فروشگاه"
          />
        </div>
      )}
      <HomeCallToAction />
    </div>
  );
}
