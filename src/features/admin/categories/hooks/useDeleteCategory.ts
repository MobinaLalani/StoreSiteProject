"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategory } from "../services/category.service";
import { queryKeys } from "@/src/lib/queryKeys";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories,
      });
    },
  });
}
