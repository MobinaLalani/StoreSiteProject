"use client";

import { Star, Boxes, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryInfoProps {
  productCount: number;
  brandCount: number;
  averageRating: number;
}

const cards = [
  {
    key: "products",
    title: "محصول",
    icon: Boxes,
  },
  {
    key: "brands",
    title: "برند",
    icon: BadgeCheck,
  },
  {
    key: "rating",
    title: "امتیاز",
    icon: Star,
  },
];

export default function CategoryInfo({
  productCount,
  brandCount,
  averageRating,
}: CategoryInfoProps) {
  const values = {
    products: productCount,
    brands: brandCount,
    rating: averageRating,
  };

  return (
    <section className="my-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
              }}
              className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                hover:-translate-y-1
                hover:border-red-200
                hover:shadow-xl
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>

                  <h3 className="mt-3 text-3xl font-bold text-gray-900">
                    {values[card.key as keyof typeof values]}
                  </h3>
                </div>

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-red-50
                  "
                >
                  <Icon className="text-red-500" size={28} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
