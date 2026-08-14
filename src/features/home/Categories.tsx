import CategoryCard from "./CategoryCard";
import type { Category } from "@/src/types/category";

export default function Categories({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;

  return (
    <section className="w-full bg-transparent py-8 sm:py-11 lg:py-14">
      <div className="mb-6 px-4 sm:mb-8 sm:px-6 lg:px-10">
        <p className="text-[10px] font-black tracking-[0.14em] text-[#7B604A] sm:text-xs">
          انتخاب سریع
        </p>
        <h2 className="mt-1.5 text-xl font-black text-[#30251d] sm:text-2xl lg:text-3xl">
          دسته‌بندی محصولات
        </h2>
      </div>

      <div
        className="hide-scrollbar w-full snap-x snap-proximity touch-pan-x overflow-x-auto overscroll-x-contain px-4 py-4 scroll-smooth sm:px-6 lg:px-10"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex w-max min-w-full gap-2 min-[390px]:gap-3 sm:gap-5 lg:justify-center lg:gap-7">
          {categories.map((category) => (
            <div key={category.id} className="shrink-0 snap-start scroll-ms-4 sm:scroll-ms-6 lg:scroll-ms-10">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
