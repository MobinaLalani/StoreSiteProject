"use client";
import Hero from "./hero/Hero";
import Categories from "./Categories";
import About from "./About";
import ProductSection from "@/src/features/products/components/ProductSection/ProductSection";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";
export default function HomeContent() { const { data } = usePublicSettings(); return <><Hero />{data?.appearance.showCategories !== false && <Categories />}{data?.appearance.showFeaturedProducts !== false && <ProductSection title="جدیدترین محصولات" description="جدیدترین محصولات فروشگاه" />}<About /></>; }
