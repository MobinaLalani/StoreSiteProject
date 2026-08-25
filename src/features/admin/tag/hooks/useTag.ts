"use client";
 import {useQuery} from "@tanstack/react-query";
 import {getTags} from "../services/tag.service";
 import {queryKeys} from "@/src/lib/queryKeys";

 export function useTags() {
   return useQuery({
     queryKey: queryKeys.tags,
     queryFn: getTags,
   });
 }