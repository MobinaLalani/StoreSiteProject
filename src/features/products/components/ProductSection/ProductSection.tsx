import ProductSectionHeader from "./ProductSectionHeader";
import ProductGrid from "./ProductGrid";
import ProductEmpty from "./ProductEmpty";

import ProductGridSkeleton from "../skeletons/ProductGridSkeleton";

import { products } from "../../../../data/products";

interface ProductSectionProps {
  title: string;
  description?: string;
}

export default function ProductSection({
  title,
  description,
}: ProductSectionProps) {
  const isLoading = false;

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return <ProductEmpty />;
  }

  return (
    <section className="py-20">
      <ProductSectionHeader title={title} description={description} />

      <ProductGrid products={products} />
    </section>
  );
}
