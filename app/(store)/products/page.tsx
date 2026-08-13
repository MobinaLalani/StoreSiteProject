import type { Metadata } from "next";
import ProductSection from "@/src/features/products/components/ProductSection/ProductSection";
import { productRepository } from "@/src/repositories/product.repository";
import { categoryRepository } from "@/src/repositories/category.repository";
import { attachCategoryTitles, searchProducts } from "@/src/lib/product-search";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "محصولات و تجهیزات صنعتی", description: "مشاهده محصولات و تجهیزات صنعتی همراه با مشخصات فنی، مشاوره تخصصی و استعلام قیمت.", alternates: { canonical: "/products" }, openGraph: { url: "/products", title: "محصولات و تجهیزات صنعتی" } };

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim().slice(0, 100) : "";
  const products = (await productRepository.getAll()).filter((product) => product.status === "active");
  const categories = await categoryRepository.getAll();
  const results = query ? searchProducts(attachCategoryTitles(products, categories), query) : products;
  return <ProductSection products={results} title={query ? `نتایج جستجو برای «${query}»` : "همه محصولات"} description={query ? `${results.length.toLocaleString("fa-IR")} محصول مرتبط پیدا شد` : "محصولات موجود فروشگاه"} />;
}
