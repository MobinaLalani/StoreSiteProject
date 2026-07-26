import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "../services/product.service";

import type { Product } from "@/src/types/product";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) =>
      productService.createProduct(data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
