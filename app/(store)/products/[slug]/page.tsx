import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ProductDescription,
  ProductGallery,
  ProductInfo,
  ProductSpecifications,
  RelatedProducts,
} from "@/src/features/products/ProductDetails";

import type { SiteSettings } from "@/src/features/admin/settings/types";

import { categoryRepository } from "@/src/repositories/category.repository";
import { productRepository } from "@/src/repositories/product.repository";
import { settingsRepository } from "@/src/repositories/settings.repository";

import { absoluteUrl, cleanDescription, safeJsonLd } from "@/src/lib/seo";

import { effectivePrice } from "@/src/lib/money";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

/**
 * Dynamic SEO metadata for every product page
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);

  const [products, settings] = await Promise.all([
    productRepository.getAll(),

    settingsRepository.getPublic() as Promise<unknown> as Promise<SiteSettings>,
  ]);

  const product = products.find(
    (item) => item.slug === decodedSlug && item.status === "active",
  );
  console.log("product/[slug]", product);
  if (!product) {
    return {
      title: "محصول پیدا نشد",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/products/${encodeURIComponent(product.slug)}`;

  const canonicalUrl = absoluteUrl(canonicalPath, settings);

  const description = cleanDescription(
    product.shortDescription || product.description,
    `مشخصات، قیمت و استعلام ${product.title}`,
  );

  /**
   * If later you add metaTitle / metaDescription to Product,
   * simply replace these fallbacks.
   */
  const seoTitle = product.title;

  const seoDescription = description;

  /**
   * Tags are useful here as metadata/context,
   * but they are NOT a replacement for proper SEO content.
   */
  const keywords = [
    product.title,

    product.brand,

    product.mpn,

    productCategoryKeyword(product.title),

    ...(product.tags ?? []),
  ]
    .filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0,
    )
    .map((value) => value.trim());

  const uniqueKeywords = [...new Set(keywords)];

  /**
   * Always try to provide an absolute OG image URL.
   */
  const rawImage =
    product.thumbnail || settings.seo?.shareImage || "/opengraph-image";

  const image = absoluteUrl(rawImage, settings);

  return {
    title: seoTitle,

    description: seoDescription,

    keywords: uniqueKeywords,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "website",

      locale: "fa_IR",

      url: canonicalUrl,

      title: seoTitle,

      description: seoDescription,

      siteName: settings.store?.name,

      images: [
        {
          url: image,

          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: seoTitle,

      description: seoDescription,

      images: [image],
    },
  };
}

/**
 * Product details page
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);

  const [products, settings] = await Promise.all([
    productRepository.getAll(),

    settingsRepository.getPublic() as Promise<unknown> as Promise<SiteSettings>,
  ]);

  const product = products.find(
    (item) => item.slug === decodedSlug && item.status === "active",
  );

  if (!product) {
    notFound();
  }

  /**
   * Category
   */
  const productCategory = await categoryRepository.getById(product.categoryId);

  /**
   * Related products
   */
  const relatedProducts = products
    .filter(
      (item) =>
        item.categoryId === product.categoryId &&
        item.id !== product.id &&
        item.status === "active",
    )
    .slice(0, 4);

  /**
   * Canonical URL
   */
  const canonical = absoluteUrl(
    `/products/${encodeURIComponent(product.slug)}`,
    settings,
  );

  /**
   * Effective price is in Toman.
   *
   * Schema.org uses IRR here,
   * therefore convert Toman → Rial.
   */
  const priceInToman = effectivePrice(product);

  const priceInRial = priceInToman > 0 ? priceInToman * 10 : 0;

  /**
   * Offer schema
   */
  const offer =
    priceInRial > 0
      ? {
          "@type": "Offer",

          url: canonical,

          price: priceInRial,

          priceCurrency: "IRR",

          itemCondition: "https://schema.org/NewCondition",

          availability:
            product.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
        }
      : undefined;

  /**
   * Product images
   */
  const productImages = [product.thumbnail, ...(product.images ?? [])]
    .filter(
      (image): image is string =>
        typeof image === "string" && image.trim().length > 0,
    )
    .map((image) => absoluteUrl(image, settings));

  const uniqueProductImages = [...new Set(productImages)];

  /**
   * Product structured data
   */
  const productSchema = {
    "@context": "https://schema.org",

    "@type": "Product",

    "@id": `${canonical}#product`,

    name: product.title,

    url: canonical,

    description: cleanDescription(
      product.description,
      product.shortDescription,
    ),

    image: uniqueProductImages.length > 0 ? uniqueProductImages : undefined,

    sku: String(product.id),

    mpn: product.mpn?.trim() || undefined,

    brand: {
      "@type": "Brand",

      name: product.brand?.trim() || settings.store?.name,
    },

    category: productCategory?.title || undefined,

    color: product.colors?.length ? product.colors.join(", ") : undefined,

    additionalProperty: product.specifications?.length
      ? product.specifications
          .filter((item) => item.title?.trim() && item.value?.trim())
          .map((item) => ({
            "@type": "PropertyValue",

            name: item.title,

            value: item.value,
          }))
      : undefined,

    offers: offer,
  };

  /**
   * Breadcrumb structured data
   */
  const breadcrumbItems = [
    {
      "@type": "ListItem",

      position: 1,

      name: "خانه",

      item: absoluteUrl("/home", settings),
    },

    {
      "@type": "ListItem",

      position: 2,

      name: "محصولات",

      item: absoluteUrl("/products", settings),
    },

    ...(productCategory
      ? [
          {
            "@type": "ListItem",

            position: 3,

            name: productCategory.title,

            item: absoluteUrl(
              `/products/category/${encodeURIComponent(productCategory.slug)}`,
              settings,
            ),
          },
        ]
      : []),

    {
      "@type": "ListItem",

      position: productCategory ? 4 : 3,

      name: product.title,

      item: canonical,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: breadcrumbItems,
  };

  return (
    <main className="mx-auto max-w-7xl space-y-20 px-4 py-10">
      {/* Product structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(productSchema),
        }}
      />

      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbSchema),
        }}
      />

      {/* Breadcrumb UI */}
      <nav aria-label="مسیر صفحه" className="text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/home" className="transition hover:text-gray-900">
              خانه
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link href="/products" className="transition hover:text-gray-900">
              محصولات
            </Link>
          </li>

          {productCategory && (
            <>
              <li aria-hidden="true">/</li>

              <li>
                <Link
                  href={`/products/category/${encodeURIComponent(
                    productCategory.slug,
                  )}`}
                  className="transition hover:text-gray-900"
                >
                  {productCategory.title}
                </Link>
              </li>
            </>
          )}

          <li aria-hidden="true">/</li>

          <li aria-current="page" className="text-gray-900">
            {product.title}
          </li>
        </ol>
      </nav>

      {/* Main product information */}
      <section className="grid gap-12 lg:grid-cols-2">
        <ProductGallery product={product} />

        <ProductInfo product={product} />
      </section>

      {/* Product description */}
      <ProductDescription product={product} />

      {/* Technical specifications */}
      <ProductSpecifications product={product} />

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </main>
  );
}

/**
 * Can later be removed once we have
 * dedicated SEO keywords/meta fields.
 */
function productCategoryKeyword(title: string) {
  return `خرید ${title}`;
}
