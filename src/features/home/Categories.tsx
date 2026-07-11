"use client";

import { motion } from "framer-motion";

import Container from "../../components/ui/Container";

import { categories } from "@/src/data/categories";

import CategoryCard from "./CategoryCard";

export default function Categories() {
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
