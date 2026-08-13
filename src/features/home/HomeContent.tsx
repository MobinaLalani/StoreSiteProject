"use client";
import Hero from "./hero/Hero";
import Categories from "./Categories";
import ProductSection from "@/src/features/products/components/ProductSection/ProductSection";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";
import type { Product } from "@/src/types/product";
import type { Category } from "@/src/types/category";
export default function HomeContent({ products, categories }: { products: Product[]; categories: Category[] }) { const { data } = usePublicSettings(); return <><Hero />{data?.appearance.showCategories !== false && <Categories categories={categories} />}{data?.appearance.showFeaturedProducts !== false && <ProductSection products={products} title="جدیدترین محصولات" description="جدیدترین محصولات فروشگاه" />}</>; }
