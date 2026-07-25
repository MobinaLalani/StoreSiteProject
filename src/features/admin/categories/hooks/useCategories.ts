"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategories } from "../services/category.service";
import { queryKeys } from "@/src/lib/queryKeys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
  });
}
