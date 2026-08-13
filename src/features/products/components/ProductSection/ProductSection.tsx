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
    return <div className="py-12 sm:py-20"><ProductSectionHeader title={title} description={description} /><ProductEmpty /></div>;

  }

  return (
    <>
      <Container>
        <section className="mx-0 py-12 sm:mx-6 sm:py-16 lg:mx-10 lg:py-20" aria-label={title}>
          <ProductSectionHeader title={title} description={description} />

          <ProductGrid products={products} />
        </section>
      </Container>
    </>
  );
}
