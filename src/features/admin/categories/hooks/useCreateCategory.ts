"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCategory } from "../services/category.service";
import { queryKeys } from "@/src/lib/queryKeys";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories,
      });
    },
  });
}
