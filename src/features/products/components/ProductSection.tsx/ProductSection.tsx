import ProductSectionHeader from "./ProductSectionHeader";
import ProductGrid from "./ProductGrid";
import ProductEmpty from "./ProductEmpty";
import {products} from '../../../../data/products'

import ProductGridSkeleton from "../skeletons/ProductGridSkeleton";

export default function ProductSection() {
  const isLoading = false;

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return <ProductEmpty />;
  }

  return (
    <section>
      <ProductSectionHeader title="جدیدترین محصولات" />

      <ProductGrid products={products} />
    </section>
  );
}
