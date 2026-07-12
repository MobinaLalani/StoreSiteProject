import { notFound } from "next/navigation";

import { products } from "@/src/data/products";

import ProductGallery from "@/src/features/products/ProductDetails/ProductGallery";
import ProductInfo from "@/src/features/products/ProductDetails/ProductInfo";
import ProductDescription from "@/src/features/products/ProductDetails/ProductDescription";
import ProductSpecifications from "@/src/features/products/ProductDetails/ProductSpecifications";
import RelatedProducts from "@/src/features/products/ProductDetails/RelatedProducts";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl space-y-20 px-4 py-10">
      <section className="grid gap-12 lg:grid-cols-2">
        <ProductGallery product={product} />

        <ProductInfo product={product} />
      </section>

      <ProductDescription product={product} />

      <ProductSpecifications product={product} />
      <RelatedProducts
        categorySlug={product.category.slug}
        currentProductId={product.id}
      />
    </main>
  );
}
