"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTag } from "../services/tag.service";
import { queryKeys } from "@/src/lib/queryKeys";

export function useDeleteTag() {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTag,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.tags,
            });
        }
    });
}