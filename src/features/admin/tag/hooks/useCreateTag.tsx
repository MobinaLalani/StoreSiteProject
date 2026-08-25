"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTag } from "../services/tag.service";
import { queryKeys } from "@/src/lib/queryKeys";
 
export function useCreateTag() {
  const queryClient = useQueryClient();
   return useMutation({
       mutationFn: createTag,
       onSuccess: () => {   
        queryClient.invalidateQueries({
          queryKey: queryKeys.tags,
        });
      },
    });
} 
