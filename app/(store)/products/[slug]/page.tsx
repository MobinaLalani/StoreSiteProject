import { notFound } from "next/navigation";

import { productRepository } from "@/src/repositories/product.repository";

import {
  ProductGallery,
  ProductInfo,
  ProductDescription,
  ProductSpecifications,
  RelatedProducts,
} from "@/src/features/products/ProductDetails";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await productRepository.getAll();
  const product = products.find((item) => item.slug === decodeURIComponent(slug));

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.categoryId === product.categoryId && item.id !== product.id,
    )
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl space-y-20 px-4 py-10">
      <section className="grid gap-12 lg:grid-cols-2">
        <ProductGallery product={product} />

        <ProductInfo product={product} />
      </section>

      <ProductDescription product={product} />
      

      <ProductSpecifications product={product} />
      

      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
