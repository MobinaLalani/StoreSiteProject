"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import type { Category } from "@/src/types/category";

const AUTO_PLAY_DELAY = 4000;

export default function Categories({ categories }: { categories: Category[] }) {
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [canSlide, setCanSlide] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const measureOverflow = () => {
      const track = trackRef.current;
      if (!track) return;
      setCanSlide(track.scrollWidth > strip.clientWidth + 2);
    };

    const observer = new ResizeObserver(measureOverflow);
    observer.observe(strip);
    const frame = requestAnimationFrame(measureOverflow);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [categories.length]);

  const move = useCallback((step: number) => {
    if (!canSlide) return;
    setDirection(step);
    setPage((current) => (current + step + categories.length) % categories.length);
  }, [canSlide, categories.length]);

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!canSlide || shouldReduceMotion) return;
    timerRef.current = setInterval(() => move(1), AUTO_PLAY_DELAY);
  }, [canSlide, move, shouldReduceMotion]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  if (!categories.length) return null;

  const orderedCategories = categories.map(
    (_, index) => categories[(page + index) % categories.length],
  );

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

      <div className="w-full overflow-hidden px-4 py-2 sm:px-6 lg:px-10">
        <div ref={stripRef} className="min-w-0 overflow-hidden py-2">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.div
              ref={trackRef}
              key={page}
              custom={direction}
              variants={{
                enter: (slideDirection: number) => ({ x: slideDirection * 32, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (slideDirection: number) => ({ x: slideDirection * -32, opacity: 0 }),
              }}
              initial={shouldReduceMotion ? false : "enter"}
              animate="center"
              exit={shouldReduceMotion ? undefined : "exit"}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              drag={canSlide ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragStart={() => {
                if (timerRef.current) clearInterval(timerRef.current);
              }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 35 || Math.abs(info.velocity.x) > 350) {
                  move(info.offset.x < 0 ? 1 : -1);
                }
                restartTimer();
              }}
              className={`flex min-w-max touch-pan-y gap-2 select-none min-[390px]:gap-3 sm:gap-5 lg:gap-7 ${canSlide ? "justify-start cursor-grab active:cursor-grabbing" : "justify-center"}`}
            >
              {orderedCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
