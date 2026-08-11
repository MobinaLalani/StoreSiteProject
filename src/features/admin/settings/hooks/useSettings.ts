import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "../services/settings.service";
import type { SiteSettings } from "../types";

export const settingsKeys = { all: ["settings"] as const, public: ["settings", "public"] as const };
export function useAdminSettings() { return useQuery({ queryKey: settingsKeys.all, queryFn: settingsService.getAdmin }); }
export function usePublicSettings() { return useQuery({ queryKey: settingsKeys.public, queryFn: settingsService.getPublic, staleTime: 10 * 60 * 1000 }); }
export function useUpdateSettings() {
  const client = useQueryClient();
  return useMutation({ mutationFn: (data: SiteSettings) => settingsService.update(data), onSuccess(data) { client.setQueryData(settingsKeys.all, data); client.invalidateQueries({ queryKey: settingsKeys.public }); } });
}
