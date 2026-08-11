"use client";

import { motion } from "framer-motion";

import Container from "../../components/ui/Container";

import { useCategories } from "@/src/features/admin/categories/hooks/useCategories";

import CategoryCard from "./CategoryCard";

export default function Categories() {
  const { data: categories = [], isLoading, isError } = useCategories();

  if (isLoading) return <section className="py-20 text-center text-gray-500">در حال دریافت دسته‌بندی‌ها...</section>;
  if (isError) return <section className="py-20 text-center text-red-600">دریافت دسته‌بندی‌ها ناموفق بود.</section>;
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <h2 className="text-4xl font-black">دسته‌بندی محصولات</h2>

          <p className="mt-3 text-gray-500">محبوب‌ترین دسته‌بندی‌های فروشگاه</p>
        </motion.div>

        <div
          className="
            mt-12
            grid
            grid-cols-2
            gap-6
            md:grid-cols-3
            lg:grid-cols-6
          "
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
