import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "../services/product.service";

import type { Product } from "@/src/types/product";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<Product, "id">>;
    }) => productService.updateProduct(id, data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
