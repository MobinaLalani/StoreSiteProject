import ProductSectionHeader from "./ProductSectionHeader";
import ProductGrid from "./ProductGrid";
import ProductEmpty from "./ProductEmpty";

import Container from "../../../../components/ui/Container";

import type { Product } from "@/src/types/product";

interface ProductSectionProps {
  title: string;
  description?: string;
  products: Product[];
}

export default function ProductSection({
  
  title,
  description,
  products,
}: ProductSectionProps) {
  if (products.length === 0) {
    return <ProductEmpty />;

  }

  return (
    <>
      <Container>
        <section className="m-10 mt-0 py-20" aria-label={title}>
          <ProductSectionHeader title={title} description={description} />

          <ProductGrid products={products} />
        </section>
      </Container>
    </>
  );
}
