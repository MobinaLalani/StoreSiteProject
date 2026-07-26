"use client";

import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../services/product.service";
import { queryKeys } from "@/src/lib/queryKeys";

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,

    queryFn: getProducts,
  });
}
