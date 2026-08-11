import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { productRepository } from "@/src/repositories/product.repository";

import {
  ProductGallery,
  ProductInfo,
  ProductDescription,
  ProductSpecifications,
  RelatedProducts,
} from "@/src/features/products/ProductDetails";
import { settingsRepository } from "@/src/repositories/settings.repository";
import type { SiteSettings } from "@/src/features/admin/settings/types";
import { absoluteUrl, cleanDescription, safeJsonLd } from "@/src/lib/seo";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = (await productRepository.getAll()).find((item) => item.slug === decodeURIComponent(slug) && item.status === "active");
  if (!product) return { title: "محصول پیدا نشد", robots: { index: false, follow: false } };
  const description = cleanDescription(product.shortDescription || product.description, `مشخصات و استعلام ${product.title}`);
  const canonical = `/products/${encodeURIComponent(product.slug)}`;
  return { title: product.title, description, alternates: { canonical }, openGraph: { type: "website", url: canonical, title: product.title, description, images: product.thumbnail ? [{ url: product.thumbnail, alt: product.title }] : undefined }, twitter: { card: "summary_large_image", title: product.title, description, images: product.thumbnail ? [product.thumbnail] : undefined } };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [products, settings] = await Promise.all([productRepository.getAll(), settingsRepository.getPublic() as Promise<unknown> as Promise<SiteSettings>]);
  const product = products.find((item) => item.slug === decodeURIComponent(slug) && item.status === "active");

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.categoryId === product.categoryId && item.id !== product.id && item.status === "active",
    )
    .slice(0, 4);

  const category = (await import("@/src/repositories/category.repository")).categoryRepository;
  const productCategory = (await category.getById(product.categoryId));
  const canonical = absoluteUrl(`/products/${encodeURIComponent(product.slug)}`, settings);
  const productSchema = { "@context": "https://schema.org", "@type": "Product", "@id": `${canonical}#product`, name: product.title, description: cleanDescription(product.description, product.shortDescription), image: [...new Set([product.thumbnail, ...product.images].filter(Boolean))].map((image) => absoluteUrl(image, settings)), category: productCategory?.title, sku: String(product.id), url: canonical, aggregateRating: product.rating > 0 && product.reviewCount > 0 ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount, bestRating: 5, worstRating: 1 } : undefined, offers: { "@type": "Offer", availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: canonical } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "خانه", item: absoluteUrl("/", settings) }, { "@type": "ListItem", position: 2, name: "محصولات", item: absoluteUrl("/products", settings) }, ...(productCategory ? [{ "@type": "ListItem", position: 3, name: productCategory.title, item: absoluteUrl(`/products/category/${encodeURIComponent(productCategory.slug)}`, settings) }] : []), { "@type": "ListItem", position: productCategory ? 4 : 3, name: product.title, item: canonical }] };

  return (
    <main className="mx-auto max-w-7xl space-y-20 px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <nav aria-label="مسیر صفحه" className="text-sm text-gray-500"><ol className="flex flex-wrap gap-2"><li><Link href="/">خانه</Link></li><li aria-hidden="true">/</li><li><Link href="/products">محصولات</Link></li>{productCategory && <><li aria-hidden="true">/</li><li><Link href={`/products/category/${encodeURIComponent(productCategory.slug)}`}>{productCategory.title}</Link></li></>}<li aria-hidden="true">/</li><li aria-current="page">{product.title}</li></ol></nav>
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
