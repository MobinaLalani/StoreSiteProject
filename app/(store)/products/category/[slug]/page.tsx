import ProductCategoryPage from "@/src/features/products/productCategory";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <ProductCategoryPage slug={slug} />;
}
