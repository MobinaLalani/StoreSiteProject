"use client";

import Hero from "./hero/Hero";
import Categories from "./Categories";
import HomeCallToAction from "./HomeCallToAction";
import ProductSection from "@/src/features/products/components/ProductSection/ProductSection";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";
import type { Product } from "@/src/types/product";
import type { Category } from "@/src/types/category";

export default function HomeContent({ products, categories }: { products: Product[]; categories: Category[] }) {
  const { data } = usePublicSettings();
  return <div className="overflow-hidden bg-slate-50">
    <Hero products={products} categoryCount={categories.length} />
    {data?.appearance.showCategories !== false && <Categories categories={categories} />}
    {data?.appearance.showFeaturedProducts !== false && <div className="relative bg-white"><div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-50 to-white"/><div className="relative"><ProductSection products={products} title="تازه‌ترین محصولات" description="جدیدترین محصولات اضافه‌شده به فروشگاه" /></div></div>}
    <HomeCallToAction />
  </div>;
}
