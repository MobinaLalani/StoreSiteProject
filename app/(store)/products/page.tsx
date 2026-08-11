import type { Metadata } from "next";
import ProductSection from "@/src/features/products/components/ProductSection/ProductSection";
import { productRepository } from "@/src/repositories/product.repository";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "محصولات و تجهیزات صنعتی", description: "مشاهده محصولات و تجهیزات صنعتی همراه با مشخصات فنی، مشاوره تخصصی و استعلام قیمت.", alternates: { canonical: "/products" }, openGraph: { url: "/products", title: "محصولات و تجهیزات صنعتی" } };

export default async function ProductsPage() {
  const products = (await productRepository.getAll()).filter((product) => product.status === "active");
  return <ProductSection products={products} title="همه محصولات" description="محصولات موجود فروشگاه" />;
}
