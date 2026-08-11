import type { Metadata } from "next";
import ProductCategoryPage from "@/src/features/products/productCategory";
import { getCategoryData } from "@/src/features/products/productCategory/utils/getCategoryData";
import { cleanDescription } from "@/src/lib/seo";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const data = await getCategoryData(decodeURIComponent(slug)); if (!data) return { title: "دسته‌بندی پیدا نشد", robots: { index: false, follow: false } }; const canonical = `/products/category/${encodeURIComponent(data.category.slug)}`; const description = cleanDescription(data.category.description, `خرید و استعلام محصولات ${data.category.title}`); return { title: `محصولات ${data.category.title}`, description, alternates: { canonical }, openGraph: { url: canonical, title: `محصولات ${data.category.title}`, description, images: data.category.image ? [{ url: data.category.image, alt: data.category.title }] : undefined } }; }

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <ProductCategoryPage slug={decodeURIComponent(slug)} />;
}
