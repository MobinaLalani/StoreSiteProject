import Hero from "@/src/features/home/Hero";
import Categories from "@/src/features/home/Categories";
import ProductSection from "@/src/features/products/components/ProductSection/ProductSection";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Categories />

      <ProductSection
        title="جدیدترین محصولات"
        description="جدیدترین محصولات فروشگاه"
      />
    </>
  );
}
