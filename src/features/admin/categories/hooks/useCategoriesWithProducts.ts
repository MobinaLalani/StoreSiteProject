"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/src/lib/queryKeys";
import { getCategoriesWithProducts } from "../services/category.service";

export function useCategoriesWithProducts() {
  return useQuery({
    queryKey: queryKeys.categoriesWithProducts,
    queryFn: getCategoriesWithProducts,
  });
}