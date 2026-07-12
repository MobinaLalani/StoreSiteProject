import { notFound } from "next/navigation";

import { products } from "@/src/data/products";

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

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.category.slug === product.category.slug && item.id !== product.id,
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
