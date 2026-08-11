"use client";

import ProductSectionHeader from "./ProductSectionHeader";
import ProductGrid from "./ProductGrid";
import ProductEmpty from "./ProductEmpty";

import Container from "../../../../components/ui/Container";

import ProductGridSkeleton from "../skeletons/ProductGridSkeleton";

import { useProducts } from "@/src/features/admin/products/hooks/useProducts";

interface ProductSectionProps {
  title: string;
  description?: string;
}

export default function ProductSection({
  
  title,
  description,
}: ProductSectionProps) {
  const { data: products = [], isLoading, isError } = useProducts();

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (isError) {
    return <div className="mx-auto my-16 max-w-2xl rounded-2xl bg-red-50 p-6 text-center text-red-600">دریافت محصولات از سرور ناموفق بود.</div>;
  }

  if (products.length === 0) {
    return <ProductEmpty />;

  }

  return (
    <>
      <Container>
        <section className="m-10 mt-0 py-20">
          <ProductSectionHeader title={title} description={description} />

          <ProductGrid products={products} />
        </section>
      </Container>
    </>
  );
}
