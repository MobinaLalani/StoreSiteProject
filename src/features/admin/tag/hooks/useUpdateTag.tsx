"use client";
 import { useMutation, useQueryClient } from "@tanstack/react-query";
 import { updateTag } from "../services/tag.service";
 import { queryKeys } from "@/src/lib/queryKeys";
 
 export function useUpdateTag() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        value,
        data,
      }: {
        value: number;
        data: Parameters<typeof updateTag>[1];
      }) => updateTag(value, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.tags,
        });
      },
    });
 }