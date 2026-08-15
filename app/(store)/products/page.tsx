import type { Metadata } from "next";
import ProductExplorer from "@/src/features/products/filtering/ProductExplorer";
import { productRepository } from "@/src/repositories/product.repository";
import { categoryRepository } from "@/src/repositories/category.repository";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "محصولات فروشگاه", description: "مشاهده، فیلتر و مقایسه محصولات فروشگاه.", alternates: { canonical: "/products" }, openGraph: { url: "/products", title: "محصولات فروشگاه" } };

export default async function ProductsPage() {
  const [allProducts, categories] = await Promise.all([productRepository.getAll(), categoryRepository.getAll()]);
  const products = allProducts.filter((product) => product.status === "active");
  return <ProductExplorer products={products} categories={categories} title="همه محصولات" description="محصول موردنظر را بر اساس قیمت، دسته‌بندی، موجودی، تخفیف، رنگ، ویژگی و امتیاز پیدا کنید."/>;
}
