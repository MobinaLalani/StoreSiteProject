"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCategory } from "../services/category.service";
import { queryKeys } from "@/src/lib/queryKeys";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Parameters<typeof updateCategory>[1];
    }) => updateCategory(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories,
      });
    },
  });
}
